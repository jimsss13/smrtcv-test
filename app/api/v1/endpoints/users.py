import json
import pycountry
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, validator
from pathlib import Path

router = APIRouter()

# Define the path to the JSON file
JSON_FILE_PATH = Path(__file__).parent / "user_profile.json"

class UserProfile(BaseModel):
    email_address: str
    full_name: str
    city: str
    country: str

def read_user_profile() -> dict:
    """Reads user profile data from the JSON file."""
    if not JSON_FILE_PATH.is_file():
        raise HTTPException(status_code=404, detail="User profile not found.")
    with open(JSON_FILE_PATH, 'r') as f:
        return json.load(f)

def write_user_profile(user_profile: dict):
    """Writes user profile data to the JSON file."""
    with open(JSON_FILE_PATH, 'w') as f:
        json.dump(user_profile, f, indent=4)

@router.get("/countries")
def get_countries():
    """
    Get a list of all countries.
    """
    return [country.name for country in pycountry.countries]

@router.get("/me", response_model=UserProfile)
def read_user_me():
    """
    Get current user's profile.
    """
    return read_user_profile()

@router.put("/me", response_model=UserProfile)
def update_user_me(user_profile: UserProfile):
    """
    Update current user's profile.
    """
    try:
        write_user_profile(user_profile.dict())
        return user_profile
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
