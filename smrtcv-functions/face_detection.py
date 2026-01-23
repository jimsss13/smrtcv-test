import io
from azure.cognitiveservices.vision.face import FaceClient
from msrest.authentication import CognitiveServicesCredentials
from PIL import Image, ImageOps
from azure.ai.contentsafety import ContentSafetyClient
from azure.core.credentials import AzureKeyCredential
from azure.ai.contentsafety.models import AnalyzeImageOptions, ImageData

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB
MIN_DIMENSIONS = (320, 320)
ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"]

# Define strict thresholds for content safety categories
VIOLENCE_THRESHOLD = 2
SEXUAL_THRESHOLD = 2
SELF_HARM_THRESHOLD = 2
HATE_THRESHOLD = 2

class PhotoValidator:
    def __init__(self, file_content, content_type, file_size, content_safety_endpoint, content_safety_key, face_endpoint, face_key):
        self.file_content = file_content
        self.content_type = content_type
        self.file_size = file_size
        self.face_client = FaceClient(face_endpoint, CognitiveServicesCredentials(face_key))
        self.content_safety_client = ContentSafetyClient(
            endpoint=content_safety_endpoint,
            credential=AzureKeyCredential(content_safety_key)
        )

    def validate(self):
        # 1. MIME Type Check
        if self.content_type not in ALLOWED_MIME_TYPES:
            return False, f"Invalid file type. Only {', '.join(ALLOWED_MIME_TYPES)} are allowed."

        # 2. File Size Check
        if self.file_size > MAX_FILE_SIZE:
            return False, f"File size exceeds the limit of {MAX_FILE_SIZE // 1024 // 1024} MB."

        return True, ""

    def process_and_validate_image(self):
        try:
            image = Image.open(io.BytesIO(self.file_content))
        except Exception:
            return None, "Invalid or corrupted image file."

        # 3. Dimensions Check
        if image.width < MIN_DIMENSIONS[0] or image.height < MIN_DIMENSIONS[1]:
            return None, f"Image dimensions must be at least {MIN_DIMENSIONS[0]}x{MIN_DIMENSIONS[1]} pixels."

        # 4. Strip EXIF/GPS Metadata and handle image mode
        image = ImageOps.exif_transpose(image)
        
        processed_image_stream = io.BytesIO()
        image_format = 'JPEG'

        if image.mode in ('RGBA', 'P'):
            image = image.convert('RGB')

        image.save(processed_image_stream, format=image_format)
        processed_image_stream.seek(0)

        return processed_image_stream, ""

    def detect_faces(self, image_stream: io.BytesIO) -> tuple[bool, str]:
        """
        Detects faces in an image.
        Returns a tuple (has_face, message).
        """
        image_stream.seek(0)
        try:
            detected_faces = self.face_client.face.detect_with_stream(
                image=image_stream,
                detection_model='detection_01',
                recognition_model='recognition_04',
                return_face_id=False
            )
            if not detected_faces:
                return False, "No face detected in the image."
            if len(detected_faces) > 1:
                return False, "Multiple faces detected. Please upload a photo with only one face."
            return True, ""
        except Exception as e:
            return False, f"Error with Face Detection service: {e}"

    def analyze_content_safety(self, image_stream: io.BytesIO) -> tuple[bool, str]:
        """
        Analyzes an image for harmful content.
        Returns a tuple (is_safe, rejection_reason).
        """
        image_bytes = image_stream.read()
        request = AnalyzeImageOptions(image=ImageData(content=image_bytes))

        try:
            response = self.content_safety_client.analyze_image(request)
        except Exception as e:
            return False, f"Error with Content Safety service: {e}"

        scores = {category.category: category.severity for category in response.categories_analysis}
        
        if scores.get('Violence', 0) >= VIOLENCE_THRESHOLD:
            return False, "Image rejected due to violent content."
        if scores.get('Sexual', 0) >= SEXUAL_THRESHOLD:
            return False, "Image rejected due to sexual content."
        if scores.get('SelfHarm', 0) >= SELF_HARM_THRESHOLD:
            return False, "Image rejected due to self-harm content."
        if scores.get('Hate', 0) >= HATE_THRESHOLD:
            return False, "Image rejected due to hate speech content."

        image_stream.seek(0)
        return True, ""
