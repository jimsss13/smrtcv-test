import React from 'react';
import { ResumePreviewTraditional } from '@/components/builder/traditional/ResumePreviewTraditional';
import { ResumePreviewClassic } from '@/app/builder/classic/ResumePreviewClassic';

// 1. Define the shape of a Template Definition
export type TemplateId = 'traditional' | 'classic' | 'modern'; // Add more as we build them

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  templateUrl: string;
  thumbnail: string;
  description: string;
}

// 2. The Registry Map - This is our Switchboard
export const TEMPLATE_REGISTRY: Record<string, TemplateConfig> = {
  traditional: {
    id: 'traditional',
    name: 'Traditional',
    templateUrl: '/templates/traditional/index.html',
    thumbnail: '/templates/traditional.png',
    description: 'A timeless, professional layout suitable for corporate roles.',
  },
  classic: {
    id: 'classic',
    name: 'Classic',
    templateUrl: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/template1/classic.html?sp=r&st=2025-12-11T14:50:28Z&se=2025-12-11T23:05:28Z&spr=https&sv=2024-11-04&sr=b&sig=L0DyCO%2BcTzRZ5YYUQyW63s9AX0XCrdopDtGdyn286R8%3D',
    thumbnail: '/templates/classic.png',
    description: 'Clean and readable with a focus on typography.',
  },
};