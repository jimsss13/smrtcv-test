'use client';

import React from 'react';
import { Plus, Upload } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { ActionCard } from '@/components/dashboard/ActionCard';
import { useAuth } from '@/hooks/query/useAuth';
import { ROUTES } from '@/constants/routes';

/**
 * Dashboard Overview Page.
 * Displays primary entry points for resume creation and enhancement.
 */
export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <DashboardShell>
      {/* Greeting Section */}
      <section className="text-center mb-12 sm:mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-6 tracking-tight text-foreground">
          Hello, {user?.name || "User"}!
        </h1>
        <p className="text-xl sm:text-2xl text-foreground font-medium opacity-90">
          How should we get started?
        </p>
      </section>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 max-w-6xl mx-auto px-4 mb-12">
        <ActionCard
          title="Start from scratch!"
          description="Build your resume step-by-step with our guided form."
          icon={Plus}
          href={ROUTES.BUILDER}
          buttonText="Create New Resume"
        />

        <ActionCard
          title="Improve Existing File"
          description="Upload your current resume (PDF/DOCX) to improve it."
          icon={Upload}
          href={ROUTES.BUILDER}
          buttonText="Upload Existing Resume"
          iconClassName="w-8 h-8 sm:w-10 sm:h-10"
        />
      </div>
    </DashboardShell>
  );
}
