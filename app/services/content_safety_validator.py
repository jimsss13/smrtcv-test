from fastapi import HTTPException
from azure.ai.contentsafety import ContentSafetyClient
from azure.core.credentials import AzureKeyCredential
from azure.core.exceptions import HttpResponseError
from azure.ai.contentsafety.models import AnalyzeImageOptions, ImageData
from app.core.config import settings
import io

# Define strict thresholds for content safety categories (0-1 is very strict, higher is more lenient)
# We will reject any image where the severity is 2 or greater.
VIOLENCE_THRESHOLD = 2
SEXUAL_THRESHOLD = 2
SELF_HARM_THRESHOLD = 2
HATE_THRESHOLD = 2

content_safety_client = ContentSafetyClient(
    endpoint=settings.AZURE_CONTENT_SAFETY_ENDPOINT,
    credential=AzureKeyCredential(settings.AZURE_CONTENT_SAFETY_KEY)
)

def analyze_image_for_content_safety(image_stream: io.BytesIO) -> tuple[dict[str, int], str | None]:
    """
    Analyzes an image for harmful content and returns scores and a rejection reason.

    Returns:
        tuple[dict[str, int], str | None]: A tuple containing the severity scores
        and a rejection reason string if a threshold is met, otherwise None.
    """
    image_bytes = image_stream.read()
    request = AnalyzeImageOptions(image=ImageData(content=image_bytes))

    try:
        response = content_safety_client.analyze_image(request)
    except HttpResponseError as e:
        # Handle errors from the Azure service
        raise HTTPException(status_code=500, detail=f"Error with Content Safety service: {e.message}")

    scores = {category.category: category.severity for category in response.categories_analysis}
    rejection_reason = None

    # Check category severities against our defined thresholds
    if scores.get('Violence', 0) >= VIOLENCE_THRESHOLD:
        rejection_reason = "Image rejected due to violent content."
    elif scores.get('Sexual', 0) >= SEXUAL_THRESHOLD:
        rejection_reason = "Image rejected due to sexual content."
    elif scores.get('SelfHarm', 0) >= SELF_HARM_THRESHOLD:
        rejection_reason = "Image rejected due to self-harm content."
    elif scores.get('Hate', 0) >= HATE_THRESHOLD:
        rejection_reason = "Image rejected due to hate speech content."

    # Reset the stream position so it can be read again by other services
    image_stream.seek(0)

    return scores, rejection_reason
