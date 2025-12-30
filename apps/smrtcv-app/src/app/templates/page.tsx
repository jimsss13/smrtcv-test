'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { TemplateCarousel } from '@/components/dashboard/TemplateCarousel';
import { useTemplates } from '@/hooks/query/useTemplates';

/**
 * Template Selection Page.
 * Showcases available resume templates in an interactive carousel.
 */
export default function TemplatesPage() {
  const { templates, isLoading, error } = useTemplates();

  if (error) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
          <AlertCircle className="w-12 h-12 text-destructive mb-4" />
          <h2 className="text-2xl font-bold mb-2">Failed to load templates</h2>
          <p className="text-gray-500 mb-6">There was an error fetching the templates. Please try again later.</p>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {/* Hero Section */}
      <section className="text-center mb-10 sm:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 sm:mb-6 tracking-tight text-foreground px-4">
          Pick your professional template.
        </h1>
        <p className="text-xl sm:text-2xl text-foreground font-medium opacity-90">
          Tailored to your industry and experience level.
        </p>
      </section>

      {/* Template Carousel */}
      <div className="max-w-6xl mx-auto px-4 mb-24">
        {isLoading ? (
          <div className="aspect-video bg-gray-100 animate-pulse rounded-[32px] sm:rounded-[48px]" />
        ) : (
          <TemplateCarousel templates={templates} />
        )}
      </div>
    </DashboardShell>
  );
}
