'use client';

import React from 'react';
import { User, Mail, Camera, Shield, Bell } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

/**
 * Account Settings Page.
 * Allows users to manage their personal information and profile photo.
 */
export default function AccountPage() {
  const { user } = useAuth();

  return (
    <DashboardShell hideNav={true}>
      <div className="max-w-5xl mx-auto px-4 mb-24">
        {/* Header Section */}
        <header className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Account Settings
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 font-medium mt-2">
            Manage your personal information and preferences.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side: Profile & Actions */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Photo Section */}
            <section className="bg-white border border-gray-200 rounded-[32px] p-6 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="relative group mb-4">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <button className="absolute bottom-1 right-1 bg-primary text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-foreground truncate w-full">{user?.name || "User"}</h2>
                <p className="text-xs text-gray-500 font-medium mt-1 mb-4">Profile photo for your resumes</p>
                <Button variant="outline" size="sm" className="w-full rounded-xl font-bold border-2">
                  Remove Photo
                </Button>
              </div>
            </section>

            {/* Notifications Section */}
            <section className="bg-white border border-gray-200 rounded-[32px] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">Notifications</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4 font-medium">Manage your alerts.</p>
              <Button variant="outline" className="w-full rounded-xl py-5 font-bold border-2 text-sm">
                Configure Alerts
              </Button>
            </section>
          </div>

          {/* Right Side: Personal Information */}
          <div className="lg:col-span-8">
            <section className="bg-white border border-gray-200 rounded-[32px] p-8 sm:p-10 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-8">
                <User className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold">Personal Information</h3>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="text" 
                        defaultValue={user?.name || ""}
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-medium text-sm"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="email" 
                        defaultValue={user?.email || ""}
                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-medium text-sm"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 mt-8">
                  <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-black py-6 px-12 rounded-2xl text-lg shadow-lg shadow-primary/20 transition-all active:scale-95">
                    Save Changes
                  </Button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
