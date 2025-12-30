import React from 'react';
import { ResumePreviewTraditional } from '@/components/builder/traditional/ResumePreviewTraditional';
import { ResumePreviewClassic } from '@/components/builder/classic/ResumePreviewClassic';
import { Resume } from '@/types/resume';

/**
 * Valid template identifiers for the resume builder.
 */
export type TemplateId = 'traditional' | 'classic' | 'modern';

/**
 * Common properties for all resume template components.
 */
export interface TemplateProps {
  /** The full resume data to render. */
  data: Resume;
  /** Optional custom order for resume sections. */
  sectionOrder?: (keyof Resume)[];
}

/**
 * Configuration object for a resume template.
 */
export interface TemplateConfig {
  /** Unique identifier for the template. */
  id: TemplateId;
  /** Human-readable name of the template. */
  name: string;
  /** The React component used to render the preview. */
  component: React.ComponentType<TemplateProps>;
  /** Path to the template's thumbnail image. */
  thumbnail: string;
  /** Short description of the template's style and use case. */
  description: string;
}

/**
 * Registry of all available resume templates in the application.
 * This acts as the central configuration for template selection and rendering.
 */
export const TEMPLATE_REGISTRY: Record<TemplateId, TemplateConfig> = {
  traditional: {
    id: 'traditional',
    name: 'Traditional',
    component: ResumePreviewTraditional,
    thumbnail: '/templates/traditional.png',
    description: 'A timeless, professional layout suitable for corporate roles.',
  },
  classic: {
    id: 'classic',
    name: 'Classic',
    component: ResumePreviewClassic, 
    thumbnail: '/templates/classic.png',
    description: 'Clean and readable with a focus on typography.',
  },
  modern: {
    id: 'modern',
    name: 'Modern',
    // Fallback to Traditional until Modern is implemented
    component: ResumePreviewTraditional,
    thumbnail: '/templates/modern.png',
    description: 'A contemporary, bold design with creative accents.',
  }
};

/**
 * Safely retrieves a template component by its identifier.
 * 
 * @param {string} id - The identifier of the template to retrieve
 * @returns {React.ComponentType<TemplateProps>} The template component, or a fallback if not found
 * 
 * @example
 * const Template = getTemplateComponent('classic');
 * return <Template data={resumeData} />;
 */
export const getTemplateComponent = (id: string): React.ComponentType<TemplateProps> => {
  const template = TEMPLATE_REGISTRY[id as TemplateId];
  
  if (!template) {
    console.warn(`Template "${id}" not found, falling back to Traditional.`);
    return TEMPLATE_REGISTRY['traditional'].component;
  }
  
  return template.component;
};