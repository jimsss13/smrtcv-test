from azure.ai.vision.face import FaceClient
from azure.core.credentials import AzureKeyCredential
from app.core.config import settings
import io

# NOTE: This client is synchronous, but we will call it from an async context
# using FastAPI's run_in_executor to avoid blocking the event loop.
face_client = FaceClient(endpoint=settings.AZURE_FACE_ENDPOINT, credential=AzureKeyCredential(settings.AZURE_FACE_KEY))

def detect_faces_from_stream(image_stream: io.BytesIO):
    image_bytes = image_stream.read()
    # The SDK's detect method is synchronous here, but it performs network I/O.
    # We will run this function in a thread pool executor from the endpoint.
    detected_faces = face_client.detect(image_content=image_bytes, detection_model='detection_03', recognition_model='recognition_04', return_face_id=False)
    return detected_faces

def detect_faces(image_url: str):
    # We will run this function in a thread pool executor from the endpoint.
    detected_faces = face_client.detect(image_url=image_url, detection_model='detection_03', recognition_model='recognition_04', return_face_id=False)
    return detected_faces
