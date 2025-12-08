import React from 'react';
import { ResumePreviewTraditional } from '@/components/builder/traditional/ResumePreviewTraditional';
import { ResumePreviewClassic } from '@/app/builder/classic/ResumePreviewClassic';

// 1. Define the shape of a Template Definition
export type TemplateId = 'traditional' | 'classic' | 'modern'; // Add more as we build them

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  component: React.ComponentType<any>; // Using 'any' for now, but should be { data: ResumeData }
  thumbnail: string;
  description: string;
}

// 2. The Registry Map - This is our Switchboard
export const TEMPLATE_REGISTRY: Record<string, TemplateConfig> = {
  traditional: {
    id: 'traditional',
    name: 'Traditional',
    component: ResumePreviewTraditional,
    thumbnail: '/templates/traditional.png',
    description: 'A timeless, professional layout suitable for corporate roles.',
  },
  // Placeholder for the next template to prevent crashes if selected
  classic: {
    id: 'classic',
    name: 'Classic',
    // Fallback to Traditional until Classic is built
    component: ResumePreviewClassic, 
    thumbnail: '/templates/classic.png',
    description: 'Clean and readable with a focus on typography.',
  },
};

// 3. Helper to get component by ID (Safe Lookup)
export const getTemplateComponent = (id: string) => {
  const template = TEMPLATE_REGISTRY[id];
  if (!template) {
    console.warn(`Template "${id}" not found, falling back to Traditional.`);
    return TEMPLATE_REGISTRY['traditional'].component;
  }
  return template.component;
};