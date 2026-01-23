from fastapi import APIRouter, HTTPException, File, UploadFile, Form, BackgroundTasks
from app.services.face_validator import detect_faces, detect_faces_from_stream
from app.services.image_validator import validate_image, process_and_validate_image
from app.services.content_safety_validator import analyze_image_for_content_safety
import io
from typing import Optional
import asyncio

router = APIRouter()

@router.post("/detect-faces/")
async def detect_faces_endpoint(background_tasks: BackgroundTasks, image_url: Optional[str] = Form(None), file: Optional[UploadFile] = File(None)):
    try:
        if file:
            # 1. Initial validation (MIME type, file size)
            validate_image(file)
            
            contents = await file.read()
            
            # 2. Process image (check dimensions, strip metadata)
            processed_image_stream = process_and_validate_image(contents)
            
            # 3. Content Safety Analysis
            safety_scores, rejection_reason = analyze_image_for_content_safety(processed_image_stream)
            if rejection_reason:
                raise HTTPException(
                    status_code=400, 
                    detail={"message": rejection_reason, "content_safety_scores": safety_scores}
                )

            # 4. Run face detection on the processed image
            loop = asyncio.get_event_loop()
            detected_faces = await loop.run_in_executor(None, detect_faces_from_stream, processed_image_stream)
        elif image_url:
            # For URL-based images, we perform face detection first.
            # Content safety on URLs is not yet implemented.
            loop = asyncio.get_event_loop()
            detected_faces = await loop.run_in_executor(None, detect_faces, image_url)
            safety_scores = {}
        else:
            raise HTTPException(status_code=400, detail="Please provide either an image file or an image URL.")

        if not detected_faces:
            raise HTTPException(status_code=400, detail="No faces detected.")

        if len(detected_faces) > 1:
            raise HTTPException(status_code=400, detail=f"{len(detected_faces)} faces detected, image rejected")
        
        return {"message": "1 face detected.", "content_safety_scores": safety_scores}
    except HTTPException:
        # Re-raise HTTPException to let FastAPI handle it
        raise
    except Exception as e:
        # Catching potential exceptions from the Azure SDK or other unexpected errors
        if "InvalidRequest" in str(e):
            raise HTTPException(status_code=400, detail=f"Invalid request sent to Azure: {e}")
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
