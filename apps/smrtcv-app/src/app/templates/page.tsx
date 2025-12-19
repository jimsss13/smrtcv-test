'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { TemplateCard } from '@/components/dashboard/TemplateCard';
import { Template } from '@/types/dashboard';

/**
 * Template Selection Page.
 * Showcases available resume templates in an interactive carousel.
 */
export default function TemplatesPage() {
  const [activeTemplateIndex, setActiveTemplateIndex] = useState(0);

  const templates: Template[] = [
    { 
      id: "classic",
      name: "Classic Professional", 
      users: "45,000",
      description: "Timeless and elegant, perfect for traditional industries like Law and Finance.",
      color: "bg-blue-600",
      popular: true
    },
    { 
      id: "modern",
      name: "Modern Minimalist", 
      users: "32,000",
      description: "Clean lines and plenty of white space for a contemporary, tech-focused look.",
      color: "bg-emerald-600"
    },
    { 
      id: "traditional",
      name: "Traditional Executive", 
      users: "18,000",
      description: "Structured and dense, ideal for senior leaders with extensive experience.",
      color: "bg-slate-800"
    },
  ];

  const handleNext = () => setActiveTemplateIndex((prev) => (prev + 1) % templates.length);
  const handlePrev = () => setActiveTemplateIndex((prev) => (prev - 1 + templates.length) % templates.length);

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
        <div className="relative group">
          {/* Main Display Area */}
          {templates.map((template, idx) => (
            <TemplateCard 
              key={template.id} 
              template={template} 
              isActive={idx === activeTemplateIndex} 
            />
          ))}

          {/* Navigation Arrows */}
          <button 
            onClick={handlePrev}
            className="absolute -left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary transition-all hover:scale-110 z-10"
            aria-label="Previous template"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={2.5} />
          </button>
          <button 
            onClick={handleNext}
            className="absolute -right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary transition-all hover:scale-110 z-10"
            aria-label="Next template"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={2.5} />
          </button>

          {/* Indicators */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 pt-6 sm:pt-8">
            {templates.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTemplateIndex(idx)}
                className={`h-2.5 sm:h-3 transition-all rounded-full ${
                  idx === activeTemplateIndex ? "w-8 sm:w-10 bg-primary" : "w-2.5 sm:w-3 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to template ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
