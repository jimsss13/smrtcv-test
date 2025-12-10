"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false); 

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className="w-1/4 flex flex-col items-center py-10 space-y-6 border-blue-500"
        style={{ background: "#1A91f010" }}
      >
        <div
          className="relative w-50 h-50 border-2 border-blue-500 rounded-full"
          style={{ borderColor: "#1A91F0" }}
        >
          <Image
            src="/templates/profile-pic.jpg"
            alt="Profile Photo"
            className="rounded-full object-cover"
            fill
          />
        </div>

        <button
          className="font-medium hover:font-bold"
          style={{ color: "#1A91F0" }}
        >
          Change photo
        </button>

        <nav className="flex flex-col space-y-3 mt-4">
          <button
            className="flex items-center text-blue-500 font-semibold space-x-2"
            style={{ color: "#1A91F0", fontWeight: 600 }}
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Edit Profile</span>
          </button>
          <button
            className="flex items-center text-blue-500 space-x-2 hover:font-bold"
            style={{ color: "#1A91F0" }}
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Go to Dashboard</span>
          </button>
          <button
            className="flex items-center text-blue-500 space-x-2 hover:font-bold"
            style={{ color: "#1A91F0" }}
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
          <h2 className="font-bold mb-2" style={{ color: "#1A91F0" }}>
            Data Protection Policy Notice
          </h2>

          <p className="mb-6" style={{ color: "#1A91F0" }}>
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
            <label className="w-32 text-[#1A91F0]">Email Address:</label>
            <input
              type="email"
              placeholder="Enter your email"
              disabled={!isEditing}
              className="flex-1 p-2 rounded bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            />
          </div>

          <div className="flex items-center">
            <label className="w-32 text-[#1A91F0]">Full Name:</label>
            <input
              type="text"
              placeholder="Enter your full name"
              disabled={!isEditing}
              className="flex-1 p-2 rounded bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            />
          </div>

          <div className="flex items-center">
            <label className="w-32 text-[#1A91F0]">City:</label>
            <input
              type="text"
              placeholder="Enter your city"
              disabled={!isEditing}
              className="flex-1 p-2 rounded bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            />
          </div>

          <div className="flex items-center">
            <label className="w-32 text-[#1A91F0]">Country:</label>
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
                className="px-4 py-2 rounded text-white bg-[#1A91F0] hover:bg-[#0068BB]"
                onClick={() => setIsEditing(true)}
                >
                Edit Profile
                </button>
            ) : (
                <>
                <button
                    type="button"
                    className="px-4 py-2 rounded text-white bg-[#1A91F0] hover:bg-[#0068BB]"
                    onClick={() => {
                    setIsEditing(false);
                    }}
                >
                    Save Changes
                </button>

                <button
                    type="button"
                    className="px-4 py-2 rounded text-gray-700 bg-gray-200 hover:bg-gray-300"
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
