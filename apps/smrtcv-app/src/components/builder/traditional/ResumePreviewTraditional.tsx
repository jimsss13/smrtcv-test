import React, { memo } from 'react';
import { Resume } from '@/types/resume'; 
import { BasicsSection } from './Basics';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';

/**
 * Properties for the ResumePreviewTraditional component.
 */
interface ResumePreviewTraditionalProps {
  /** The full resume data to render. */
  data: Resume;
  /** Optional array defining the order in which main sections should appear. */
  sectionOrder?: (keyof Resume)[];
}

/**
 * A resume preview component using a traditional layout.
 * Features a header, a sidebar for metadata/skills, and a main content area for history.
 * 
 * @param props - The component properties.
 */
const ResumePreviewTraditional = memo(({ data, sectionOrder = [] }: ResumePreviewTraditionalProps) => {
  if (!data.basics.name?.trim()) {
    return (
      <article className="trad-theme font-sans text-gray-900 h-full min-h-[297mm] flex items-center justify-center">
        <p className="text-gray-400">Enter data in the form to see a preview.</p>
      </article>
    );
  }

  return (
    <article className="trad-theme font-sans text-gray-900 h-full min-h-[297mm] flex flex-col">
      <BasicsSection basics={data.basics} />
      <div className="flex flex-col md:flex-row flex-grow">
        <Sidebar
          nationality={data.basics.nationality}
          skills={data.skills}
          languages={data.languages}
          interests={data.interests}
        />
        <MainContent resume={data} order={sectionOrder} />
      </div>
    </article>
  );
});

ResumePreviewTraditional.displayName = 'ResumePreviewTraditional';

export { ResumePreviewTraditional };
export default ResumePreviewTraditional;