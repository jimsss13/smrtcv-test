import React from 'react';
import { Resume } from '@/types/resume';
import {
  Awards,
  Certificates,
  Education,
  Experience,
  Header,
  Interests,
  Projects,
  Publications,
  References,
  Skills,
  Volunteer,
} from '@/components/builder/resume';

// 1. Move the component map here
const PREVIEW_COMPONENTS: Record<string, React.ElementType> = {
  work: Experience,
  education: Education,
  skills: Skills,
  projects: Projects,
  awards: Awards,
  certificates: Certificates,
  publications: Publications,
  volunteer: Volunteer,
  references: References,
  interests: Interests,
};

interface Props {
  data: Resume;
  sectionOrder?: (keyof Resume)[];
}

// 2. The isolated component
export const ResumePreviewClassic = ({ data, sectionOrder = [] }: Props) => {
  return (
    <div className="p-10 leading-relaxed h-full flex flex-col justify-start text-gray-900">
      {/* Header is always first in Classic */}
      <Header basics={data.basics} />
      
      {/* Dynamic Sections */}
      {sectionOrder.map((key) => {
        if (key === 'basics') return null; // Already rendered
        if (key === 'advisory') return null; // Not supported in Classic yet

        const Component = PREVIEW_COMPONENTS[key];
        if (!Component) return null;

        // Type-safe dynamic access
        const sectionData = data[key as keyof Resume];
        
        // Don't render empty sections if you want that logic, 
        // but for now we pass it through
        return <Component key={key} {...{ [key]: sectionData }} />;
      })}
    </div>
  );
};