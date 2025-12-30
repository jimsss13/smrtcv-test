import React, { memo } from 'react';
import { Resume, Work, Education, Advisory } from '@/types/resume';

/**
 * Properties for the MainContent component.
 */
interface MainContentProps {
  /** The full resume data. */
  resume: Resume;
  /** Array defining the order in which main sections should appear. */
  order?: (keyof Resume)[];
}

/**
 * Helper function to check if a job entry is empty.
 * 
 * @param job - The work entry to check.
 * @returns True if the job entry is considered empty.
 */
function isJobEmpty(job: Work) {
  if (!job) return true;
  return !job.name?.trim() && !job.position?.trim();
}

/**
 * Helper function to check if an education entry is empty.
 * 
 * @param edu - The education entry to check.
 * @returns True if the education entry is considered empty.
 */
function isEducationEmpty(edu: Education) {
  if (!edu) return true;
  return !edu.institution?.trim() && !edu.area?.trim();
}

/**
 * Helper function to check if an advisory entry is empty.
 * 
 * @param adv - The advisory entry to check.
 * @returns True if the advisory entry is considered empty.
 */
function isAdvisoryEmpty(adv: Advisory) {
  if (!adv) return true;
  return !adv.organization?.trim() && !adv.position?.trim();
}

/**
 * A reusable title component for main content sections.
 * 
 * @param props - The title string.
 */
function MainTitle({ title }: { title: string }) {
  return (
    <h3 className="text-2xl font-bold text-[var(--trad-primary-color)] mb-3">
      {title}
    </h3>
  );
}

/**
 * The main content area for the traditional resume layout.
 * Displays professional summary, employment history, education, and advisory roles.
 * Supports dynamic section ordering based on the provided order prop.
 * 
 * @param props - The component properties.
 */
const MainContent = memo(({ resume, order = [] }: MainContentProps) => {
  const { basics, work, education, advisory } = resume;

  // --- Filtered arrays ---
  const filteredWork = (work || []).filter(w => !isJobEmpty(w));
  const filteredEducation = (education || []).filter(e => !isEducationEmpty(e));
  const filteredAdvisory = (advisory || []).filter(a => !isAdvisoryEmpty(a));

  // Define renderers for sections
  const renderers: Record<string, () => React.ReactNode> = {
    summary: () => basics.summary?.trim() && (
      <section className="mb-6" key="summary" aria-labelledby="section-summary">
        <MainTitle title="Profile Summary" />
        <p className="text-sm leading-relaxed">{basics.summary}</p>
      </section>
    ),
    work: () => filteredWork.length > 0 && (
      <section className="mb-6" key="work" aria-labelledby="section-work">
        <MainTitle title="Employment History" />
        <div className="space-y-4">
          {filteredWork.map((job, i) => (
            <div key={i} className="break-inside-avoid">
              <h4 className="text-lg font-bold">{job.position}</h4>
              <p className="text-sm font-semibold">{job.name}</p>
              <p className="text-xs text-[var(--trad-text-subtle)] mb-1">
                {job.startDate} - {job.endDate || 'Present'}
              </p>
              <p className="text-sm mb-2">{job.summary}</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {(job.highlights || []).map((hl, j) => (
                  <li key={j}>{hl}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    ),
    education: () => filteredEducation.length > 0 && (
      <section className="mb-6" key="education" aria-labelledby="section-education">
        <MainTitle title="Education" />
        <div className="space-y-4">
          {filteredEducation.map((edu, i) => (
            <div key={i} className="break-inside-avoid">
              <h4 className="text-lg font-bold">{edu.studyType}</h4>
              <p className="text-sm font-semibold">{edu.institution} {edu.location && `, ${edu.location}`}</p>
              <p className="text-xs text-[var(--trad-text-subtle)]">
                {edu.startDate} - {edu.endDate}
              </p>
            </div>
          ))}
        </div>
      </section>
    ),
    advisory: () => filteredAdvisory.length > 0 && (
      <section className="mb-6" key="advisory" aria-labelledby="section-advisory">
        <MainTitle title="Advisory Roles" />
        <div className="space-y-4">
          {filteredAdvisory.map((adv, i) => (
            <div key={i} className="break-inside-avoid">
              <h4 className="text-lg font-bold">{adv.position}</h4>
              <p className="text-sm font-semibold">{adv.organization}</p>
            </div>
          ))}
        </div>
      </section>
    ),
  };

  // Determine the final order: provided order first, then any missing defaults
  const defaultOrder: (keyof Resume)[] = ['work', 'education', 'advisory'];
  const finalOrder = [...new Set([...order, 'summary' as keyof Resume, ...defaultOrder])];

  return (
    <main className="w-full md:w-2/3 p-6" role="main" aria-label="Resume Main Content">
      {finalOrder.map(key => {
        const renderer = renderers[key as string];
        return renderer ? renderer() : null;
      })}
    </main>
  );
});

MainContent.displayName = 'MainContent';

export { MainContent };
export default MainContent;