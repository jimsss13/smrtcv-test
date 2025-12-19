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
    <DashboardShell>
      {/* Hero Section */}
      <section className="text-center mb-12 sm:mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 sm:mb-6 tracking-tight text-foreground px-4">
          Account Settings
        </h1>
        <p className="text-xl sm:text-2xl text-foreground font-medium opacity-90">
          Manage your personal information and preferences.
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-4 space-y-8 mb-24">
        {/* Profile Photo Section */}
        <section className="bg-white border border-gray-200 rounded-[32px] p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-gray-400" />
                )}
              </div>
              <button className="absolute bottom-2 right-2 bg-primary text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center sm:text-left space-y-2">
              <h2 className="text-3xl font-bold text-foreground">{user?.name || "User"}</h2>
              <p className="text-gray-500 font-medium">Profile photo will be used on your resumes if selected.</p>
              <div className="pt-2">
                <Button variant="outline" className="rounded-xl font-bold border-2">
                  Remove Photo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Info Form */}
        <section className="bg-white border border-gray-200 rounded-[32px] p-8 sm:p-12 shadow-sm">
          <h3 className="text-2xl font-bold mb-8">Personal Information</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 uppercase ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    defaultValue={user?.name || ""}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-medium"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 uppercase ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="email" 
                    defaultValue={user?.email || ""}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-medium"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>
            <div className="pt-4">
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-black py-6 px-12 rounded-2xl text-lg shadow-lg shadow-primary/20 transition-all active:scale-95">
                Save Changes
              </Button>
            </div>
          </form>
        </section>

        {/* Preferences & Security */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white border border-gray-200 rounded-[32px] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold">Security</h3>
            </div>
            <p className="text-gray-500 mb-6 font-medium">Keep your account secure by updating your password regularly.</p>
            <Button variant="outline" className="w-full rounded-xl py-6 font-bold border-2">
              Update Password
            </Button>
          </section>

          <section className="bg-white border border-gray-200 rounded-[32px] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold">Notifications</h3>
            </div>
            <p className="text-gray-500 mb-6 font-medium">Manage how you receive updates and alerts from Smart CV.</p>
            <Button variant="outline" className="w-full rounded-xl py-6 font-bold border-2">
              Configure Alerts
            </Button>
          </section>
        </div>
      </div>
    </DashboardShell>
  );
}
