"use client";

import { useState } from "react";
import Image from "next/image";
import CropModal from "@/components/user-profile/CropModal"; // Import the modal component

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [cropSource, setCropSource] = useState<string | null>(null); // To hold the image source for the modal
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setCropSource(imageUrl); // Open the modal with the selected image
      setMessage(null);
      setError(null);
    }
  };

  const handleConfirmCrop = async (croppedImageBlob: Blob) => {
    const croppedFile = new File([croppedImageBlob], "cropped_photo.jpg", { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append("file", croppedFile);

    try {
      const response = await fetch("http://localhost:8000/api/v1/detect-faces/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = data.detail || "An unknown error occurred.";
        if (typeof data.detail === 'object' && data.detail !== null) {
          errorMessage = `Error: ${data.detail.message} - Scores: ${JSON.stringify(data.detail.content_safety_scores)}`;
        }
        throw new Error(errorMessage);
      }
      
      const croppedImageUrl = URL.createObjectURL(croppedImageBlob);
      setPhoto(croppedImageUrl);
      setMessage(`Success: ${data.message} - Scores: ${JSON.stringify(data.content_safety_scores)}`);
      setError(null);

    } catch (err: any) {
      setError(err.message);
      setMessage(null);
    } finally {
      setCropSource(null); // Close the modal
    }
  };

  const handleCancelCrop = () => {
    setCropSource(null); // Close the modal
    setMessage(null);
    setError(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
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

          {/* backend response */}
        {message && <div className="text-green-600 text-sm text-center">{message}</div>}
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}

        <nav className="flex flex-col space-y-3 mt-4">
          <button
            className="flex items-center text-blue-500 font-bold space-x-2"
            style={{ color: "#1A91F0", fontSize: "18px" }}
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Edit Profile</span>
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
        <form className="space-y-4 max-w-lg">
          <div className="flex items-center">
            <label className="w-32 text-[black]">Email Address:</label>
            <input
              type="email"
              placeholder="Enter your email"
              disabled={!isEditing}
              className="flex-1 p-2 rounded bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            />
          </div>

          <div className="flex items-center">
            <label className="w-32 text-[black]">Full Name:</label>
            <input
              type="text"
              placeholder="Enter your full name"
              disabled={!isEditing}
              className="flex-1 p-2 rounded bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            />
          </div>

          <div className="flex items-center">
            <label className="w-32 text-[black]">City:</label>
            <input
              type="text"
              placeholder="Enter your city"
              disabled={!isEditing}
              className="flex-1 p-2 rounded bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            />
          </div>

          <div className="flex items-center">
            <label className="w-32 text-[black]">Country:</label>
            <input
              type="text"
              placeholder="Enter your country"
              disabled={!isEditing}
              className="flex-1 p-2 rounded bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            />
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
                  onClick={() => setIsEditing(false)}
                >
                  Save Changes
                </button>
                </div>
                <button
                  type="button"
                  className="ml-1 px-4 py-2 rounded text-gray-700 bg-gray-200 hover:bg-gray-300"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
