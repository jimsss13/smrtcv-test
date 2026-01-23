import azure.functions as func
import logging
import json
import pycountry
import os
from face_detection import PhotoValidator
from azure.storage.blob import BlobServiceClient, generate_blob_sas, BlobSasPermissions
import uuid
from datetime import datetime, timedelta
import io
from PIL import Image

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

# In memory user profile data (for demonstration purposes)
user_profile_data = {
    "email_address": "cleven.javier@smrtcv.com",
    "full_name": "Cleven Javier",
    "city": "Quezon",
    "country": "Philippines"
}

@app.route(route="UserProfile", methods=["GET", "PUT"])
def UserProfile(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request for user profile.')

    if req.method == "GET":
        try:
            return func.HttpResponse(
                json.dumps(user_profile_data),
                status_code=200,
                mimetype='application/json'
            )
        except Exception as e:
            logging.error(f"An error occurred while fetching user profile: {e}")
            return func.HttpResponse(
                "An internal server error occurred.",
                status_code=500
            )
    elif req.method == "PUT":
        try:
            req_body = req.get_json()
            # Basic validation
            for key in req_body:
                if key in user_profile_data:
                    user_profile_data[key] = req_body[key]
            
            return func.HttpResponse(
                json.dumps(user_profile_data),
                status_code=200,
                mimetype='application/json'
            )
        except ValueError:
            return func.HttpResponse(
                "Invalid JSON format in request body.",
                status_code=400
            )
        except Exception as e:
            logging.error(f"An error occurred while updating user profile: {e}")
            return func.HttpResponse(
                "An internal server error occurred.",
                status_code=500
            )

@app.route(route="GetCountries")
def GetCountries(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request for countries.')
    try:
        countries = [country.name for country in pycountry.countries]
        return func.HttpResponse(
            json.dumps(countries),
            status_code=200,
            mimetype='application/json'
        )
    except Exception as e:
        logging.error(f"An error occurred while fetching countries: {e}")
        return func.HttpResponse(
            "An internal server error occurred.",
            status_code=500
        )

@app.route(route="FaceDetection")
def FaceDetection(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request for FaceDetection.')

    try:
        # Get environment variables
        content_safety_endpoint = os.environ.get("AZURE_CONTENT_SAFETY_ENDPOINT")
        content_safety_key = os.environ.get("AZURE_CONTENT_SAFETY_KEY")
        face_endpoint = os.environ.get("AZURE_FACE_ENDPOINT")
        face_key = os.environ.get("AZURE_FACE_KEY")
        connect_str = os.environ.get("AzureWebJobsStorage")

        if not all([content_safety_endpoint, content_safety_key, face_endpoint, face_key, connect_str]):
            logging.error("Azure service environment variables not set.")
            return func.HttpResponse(
                json.dumps({"detail": "Server is not configured correctly."}), 
                status_code=500, 
                mimetype='application/json'
            )

        file = req.files.get('file')
        if not file:
            return func.HttpResponse(
                json.dumps({"detail": "Please upload a file."}),
                status_code=400,
                mimetype='application/json'
            )

        file_content = file.read()
        content_type = file.content_type
        file_size = len(file_content)

        # 1. Basic Validation & Processing
        validator = PhotoValidator(
            file_content, 
            content_type, 
            file_size,
            content_safety_endpoint,
            content_safety_key,
            face_endpoint,
            face_key
        )
        is_valid, message = validator.validate()

        if not is_valid:
            return func.HttpResponse(
                json.dumps({"detail": message}),
                status_code=400,
                mimetype='application/json'
            )

        processed_image_stream, message = validator.process_and_validate_image()

        if not processed_image_stream:
            return func.HttpResponse(
                json.dumps({"detail": message}),
                status_code=400,
                mimetype='application/json'
            )

        # 2. Upload to 'photos-incoming'
        try:
            blob_service_client = BlobServiceClient.from_connection_string(connect_str)
            incoming_container = blob_service_client.get_container_client("photos-incoming")
            if not incoming_container.exists():
                incoming_container.create_container()
            
            filename = f"{uuid.uuid4()}.jpg"
            incoming_blob = incoming_container.get_blob_client(filename)
            
            processed_image_stream.seek(0)
            incoming_blob.upload_blob(processed_image_stream, overwrite=True)
            logging.info(f"Uploaded to photos-incoming: {filename}")
        except Exception as e:
            logging.error(f"Failed to upload to photos-incoming: {e}")
            return func.HttpResponse(
                json.dumps({"detail": f"Failed to upload photo: {str(e)}"}),
                status_code=500,
                mimetype='application/json'
            )

        # 3. Advanced Validation (Content Safety & Face Detection)
        processed_image_stream.seek(0)
        is_safe, rejection_reason = validator.analyze_content_safety(processed_image_stream)
        
        has_face = False
        face_message = ""
        if is_safe:
            processed_image_stream.seek(0)
            has_face, face_message = validator.detect_faces(processed_image_stream)

        # 4. Handle Validation Result
        if not is_safe or not has_face:
            # DELETE from incoming
            try:
                incoming_blob.delete_blob()
                logging.info(f"Deleted rejected photo from photos-incoming: {filename}")
            except Exception as e:
                logging.error(f"Failed to delete rejected blob: {e}")
            
            error_detail = rejection_reason if not is_safe else face_message
            return func.HttpResponse(
                json.dumps({"detail": error_detail}),
                status_code=400,
                mimetype='application/json'
            )

        # 5. Move to 'photos-approved' & Generate Thumbnail
        try:
            # Move to Approved
            approved_container = blob_service_client.get_container_client("photos-approved")
            if not approved_container.exists():
                approved_container.create_container()
            
            approved_blob = approved_container.get_blob_client(filename)
            # Copy from incoming
            approved_blob.start_copy_from_url(incoming_blob.url)
            
            # Wait for copy to complete (simple check)
            import time
            props = approved_blob.get_blob_properties()
            while props.copy.status == 'pending':
                time.sleep(0.1)
                props = approved_blob.get_blob_properties()
            
            if props.copy.status != 'success':
                 raise Exception(f"Copy failed with status: {props.copy.status}")

            # Generate Thumbnail
            thumbnails_container = blob_service_client.get_container_client("thumbnails")
            if not thumbnails_container.exists():
                thumbnails_container.create_container()
            
            thumb_filename = f"{filename.replace('.jpg', '')}_256.jpg"
            thumb_blob = thumbnails_container.get_blob_client(thumb_filename)
            
            processed_image_stream.seek(0)
            with Image.open(processed_image_stream) as img:
                img.thumbnail((256, 256))
                thumb_io = io.BytesIO()
                img.save(thumb_io, format='JPEG', quality=85)
                thumb_io.seek(0)
                thumb_blob.upload_blob(thumb_io, overwrite=True)

            # Delete from Incoming
            incoming_blob.delete_blob()
            logging.info(f"Moved to approved and deleted from incoming: {filename}")

            # Generate SAS for Approved Photo
            params = dict(item.split('=', 1) for item in connect_str.split(';') if '=' in item)
            account_name = params.get('AccountName')
            account_key = params.get('AccountKey')

            sas_token = generate_blob_sas(
                account_name=account_name,
                container_name="photos-approved",
                blob_name=filename,
                account_key=account_key,
                permission=BlobSasPermissions(read=True),
                expiry=datetime.utcnow() + timedelta(days=36500)
            )

            photo_url = f"{approved_blob.url}?{sas_token}"
            
            # Update user profile
            user_profile_data["photo_url"] = photo_url

            return func.HttpResponse(
                json.dumps({
                    "message": "Photo uploaded and verified successfully.",
                    "photo_url": photo_url
                }),
                status_code=200,
                mimetype='application/json'
            )

        except Exception as e:
            logging.error(f"Failed during approved/thumbnail processing: {e}")
            # Try to cleanup approved if partial failure? 
            # For now, just return error.
            return func.HttpResponse(
                json.dumps({"detail": f"Failed to process approved photo: {str(e)}"}),
                status_code=500,
                mimetype='application/json'
            )

    except Exception as e:
        logging.error(f"An error occurred during FaceDetection: {e}")
        return func.HttpResponse(
            json.dumps({"detail": "An internal server error occurred."}),
            status_code=500,
            mimetype='application/json'
        )