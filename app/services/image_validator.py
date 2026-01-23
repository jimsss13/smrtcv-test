from fastapi import HTTPException, UploadFile
from PIL import Image, ImageOps
import io

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB
MIN_DIMENSIONS = (320, 320)
ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"]

def validate_image(file: UploadFile):
    # 1. MIME Type Check
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Only {', '.join(ALLOWED_MIME_TYPES)} are allowed."
        )

    # 2. File Size Check
    if file.size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"File size exceeds the limit of {MAX_FILE_SIZE // 1024 // 1024} MB."
        )

def process_and_validate_image(contents: bytes) -> io.BytesIO:
    try:
        image = Image.open(io.BytesIO(contents))
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid or corrupted image file.")

    # 3. Dimensions Check
    if image.width < MIN_DIMENSIONS[0] or image.height < MIN_DIMENSIONS[1]:
        raise HTTPException(
            status_code=400,
            detail=f"Image dimensions must be at least {MIN_DIMENSIONS[0]}x{MIN_DIMENSIONS[1]} pixels."
        )

    # 4. Strip EXIF/GPS Metadata and handle image mode
    image = ImageOps.exif_transpose(image)
    
    # Save the processed image to an in-memory buffer
    processed_image_stream = io.BytesIO()
    # Default to JPEG, as it's widely supported and strips transparency by conversion.
    image_format = 'JPEG'

    # Convert to RGB if the image has an alpha channel (e.g., from a PNG)
    # This is necessary to save as JPEG, which doesn't support transparency.
    if image.mode in ('RGBA', 'P'):
        image = image.convert('RGB')

    image.save(processed_image_stream, format=image_format)
    processed_image_stream.seek(0)

    return processed_image_stream
