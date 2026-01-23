"use client";


import { useState, useEffect } from "react";
import Image from "next/image";
import CropModal from "@/components/user-profile/CropModal"; // Import the modal component
import { Toaster, toast } from 'react-hot-toast';

interface UserProfileData {
  email_address: string;
  full_name: string;
  city: string;
  country: string;
}

const capitalizeWords = (str: string): string => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [cropSource, setCropSource] = useState<string | null>(null); // To hold the image source for the modal
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [originalUserProfile, setOriginalUserProfile] = useState<UserProfileData | null>(null);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch user profile
        const userResponse = await fetch("https://photovalidator-function-dev-bfdbade3fdfkardf.westeurope-01.azurewebsites.net/api/userprofile");
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user profile.');
        }
        const userData: UserProfileData = await userResponse.json();
        setUserProfile(userData);
        setOriginalUserProfile(userData);

        // Fetch countries
        const countriesResponse = await fetch("https://photovalidator-function-dev-bfdbade3fdfkardf.westeurope-01.azurewebsites.net/api/getcountries");
        if (!countriesResponse.ok) {
          throw new Error('Failed to fetch countries.');
        }
        const countryData: string[] = await countriesResponse.json();
        setCountries(countryData);

      } catch (error) {
        toast.error("Could not load initial data.");
      }
    };

    fetchInitialData();
  }, []);

  const handleSave = async () => {
    if (!userProfile) return;

    const toastId = toast.loading('Updating profile...');

    try {
      const response = await fetch("https://photovalidator-function-dev-bfdbade3fdfkardf.westeurope-01.azurewebsites.net/api/userprofile", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfile),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update profile.');
      }

      const data: UserProfileData = await response.json();
      setUserProfile(data);
      setOriginalUserProfile(data);
      setIsEditing(false);
      toast.success('Profile updated successfully!', { id: toastId });
    } catch (error: any) {
      toast.error(error.message || "Could not update profile.", { id: toastId });
    }
  };

  const handleCancel = () => {
    setUserProfile(originalUserProfile); // Revert to original state
    setIsEditing(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setCropSource(imageUrl); // Open the modal with the selected image
    }
  };

  const handleConfirmCrop = async (croppedImageBlob: Blob) => {
    const croppedFile = new File([croppedImageBlob], "cropped_photo.jpg", { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append("file", croppedFile);

    const toastId = toast.loading('Uploading photo...');

    try {
      const response = await fetch("https://photovalidator-function-dev-bfdbade3fdfkardf.westeurope-01.azurewebsites.net/api/facedetection", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = data.detail || "An unknown error occurred.";
        if (typeof data.detail === 'object' && data.detail !== null) {
          errorMessage = data.detail.message;
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      if (data.photo_url) {
        setPhoto(data.photo_url);
      }
      toast.success("Successfully uploaded and saved photo", { id: toastId });

    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    } finally {
      setCropSource(null); // Close the modal
    }
  };

  const handleCancelCrop = () => {
    setCropSource(null); // Close the modal
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Modal Render */}
      {cropSource && (
        <CropModal 
          src={cropSource} 
          onConfirm={handleConfirmCrop} 
          onCancel={handleCancelCrop} 
        />
      )}

      {/* Sidebar */}
      <div
        className="w-1/4 flex flex-col items-center py-10 space-y-6 border-blue-500"
        style={{ background: "#1A91f010" }}
      >
        {/* PROFILE PHOTO FRAME */}
        <div
          className="relative w-50 h-50 border-2 border-blue-500 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center"
          style={{ borderColor: "#1A91F0" }}
        >
          {photo ? (
            <Image
              src={photo}
              alt="Profile Photo"
              fill
              className="object-cover rounded-full"
            />
          ) : (
            <span className="text-gray-500 text-sm">No photo</span>
          )}
        </div>

        <input
          id="photo-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoChange}
        />
        <button
          className="font-medium hover:underline"
          style={{ color: "#1A91F0" }}
          onClick={() => document.getElementById("photo-input")?.click()}
        >
          Change photo
        </button>
        <nav className="flex flex-col space-y-3 mt-4">
          <button
            className="flex items-center text-blue-500 font-bold space-x-2"
            style={{ color: "#1A91F0", fontSize: "18px" }}
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Account Details</span>
          </button>
          <button
            className="flex items-center text-blue-500 space-x-2 hover:font-bold"
            style={{ color: "#1A91F0", fontSize: "18px" }}
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Go to Dashboard</span>
          </button>
          <button
            className="flex items-center text-blue-500 space-x-2 hover:font-bold"
            style={{ color: "#1A91F0", fontSize: "18px" }}
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="mb-8">
          <h1
            className="text-blue-600 font-semibold mb-2"
            style={{ color: "#1A91F0", fontSize: "24px" }}
          >
            Edit Profile
          </h1>
        </div>

        <div className="mb-8">
          <h2 className="font-bold mb-2" style={{ color: "black" }}>
            Data Protection Policy Notice
          </h2>

          <p className="mb-6" style={{ color: "black" }}>
            We collect only limited personal data necessary to provide our
            services and to ensure compliance with the General Data Protection
            Regulation (EU 2016/679). All information is processed lawfully,
            kept secure, and never shared without your consent. You may request
            access, correction, or deletion of your data at any time.
            <a
              href="https://gdpr-info.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:font-bold ml-2"
              style={{ color: "#1A91F0", textDecoration: "underline" }}
            >
              Learn more about GDPR (EU2016/679)
            </a>
          </p>
        </div>

        {/* Profile Form */}
        {userProfile ? (
          <form className="space-y-4 max-w-lg">
            <div className="flex items-center">
              <label className="w-32 text-[black]">Email Address:</label>
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  disabled
                  value={userProfile.email_address}
                  className="w-full p-2 rounded bg-gray-200 focus:outline-none disabled:opacity-70 cursor-not-allowed pr-10"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <label className="w-32 text-[black]">Full Name:</label>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter your full name"
                  disabled
                  value={userProfile.full_name}
                  className="w-full p-2 rounded bg-gray-200 focus:outline-none disabled:opacity-70 cursor-not-allowed pr-10"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <label className="w-32 text-[black]">City:</label>
              <input
                type="text"
                placeholder="Enter your city"
                disabled={!isEditing}
                value={userProfile.city}
                onChange={(e) => setUserProfile({ ...userProfile, city: capitalizeWords(e.target.value) })}
                className="flex-1 p-2 rounded bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              />
            </div>

            <div className="flex items-center">
              <label className="w-32 text-[black]">Country:</label>
              <select
                disabled={!isEditing}
                value={userProfile.country}
                onChange={(e) => setUserProfile({ ...userProfile, country: e.target.value })}
                className="flex-1 p-2 rounded bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-4">
              {!isEditing ? (
                <button
                  type="button"
                  className="px-4 py-2 rounded text-white bg-[#1A91F0] hover:bg-[#0068BB] ml-32"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <div className="flex">
                    <button
                      type="button"
                      className="ml-32 px-4 py-2 rounded text-white bg-[#1A91F0] hover:bg-[#0068BB] whitespace-nowrap min-w-[120px]"
                      onClick={handleSave}
                    >
                      Save Changes
                    </button>
                  </div>
                  <button
                    type="button"
                    className="ml-1 px-4 py-2 rounded text-gray-700 bg-gray-200 hover:bg-gray-300"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </form>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
}
