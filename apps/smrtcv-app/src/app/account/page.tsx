'use client';

import React from 'react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { useAuth } from '@/hooks/query/useAuth';
import { ProfilePhoto } from '@/components/account/ProfilePhoto';
import { NotificationSettings } from '@/components/account/NotificationSettings';
import { PersonalInfoForm } from '@/components/account/PersonalInfoForm';

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
            <ProfilePhoto avatar={user?.avatar} name={user?.name} />
            <NotificationSettings />
          </div>

          {/* Right Side: Personal Information */}
          <div className="lg:col-span-8">
            <PersonalInfoForm initialData={{ name: user?.name, email: user?.email }} />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
