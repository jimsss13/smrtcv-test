import React, { memo } from "react";
import { Work } from "@/types/resume";

/**
 * Properties for the Experience component.
 */
interface ExperienceProps {
  /** Array of work experience entries. */
  work: Work[];
}

/**
 * Helper function to check if a job entry is empty.
 * Trims strings and checks for meaningful content in name, position, summary, or highlights.
 * 
 * @param job - The work entry to check.
 * @returns True if the job entry is considered empty.
 */
function isJobEmpty(job: Work) {
  if (!job) return true;
  return !job.name?.trim() && 
         !job.position?.trim() && 
         !job.summary?.trim() && 
         (!job.highlights || job.highlights.filter(h => h.trim()).length === 0);
}

/**
 * A component that renders the work experience section of a resume.
 * Displays a list of jobs with company name, position, dates, summary, and highlights.
 * Automatically filters out empty entries and hides the section if no entries exist.
 * Optimized for performance with React.memo.
 * 
 * @example
 * <Experience 
 *   work={[
 *     { name: "Tech Corp", position: "Senior Dev", startDate: "2021", endDate: "Present", summary: "Led the team.", highlights: ["Increased efficiency by 20%"] }
 *   ]} 
 * />
 * 
 * @param props - The component properties including an array of work entries.
 */
export const Experience = memo(function Experience({ work }: ExperienceProps) {
  // 1. Filter out any jobs that are "empty"
  const filteredWork = (work || []).filter(job => !isJobEmpty(job));

  // 2. If the filtered array is empty, render nothing at all.
  if (filteredWork.length === 0) return null;

  return (
    <section className="mb-8 break-inside-avoid">
      <h2 className="uppercase font-semibold tracking-wide border-b border-gray-400 pb-1 text-sm mb-3">
        Experience
      </h2>
      {filteredWork.map((job, index) => (
        <div key={index} className="mb-5 break-inside-avoid">
          <div className="flex justify-between items-baseline">
            <div>
              <h3 className="font-semibold">{job.name}</h3>
              <p className="italic text-sm">{job.position}</p>
            </div>
            <div className="text-sm text-gray-700 text-right">
              <p>
                {job.startDate} – {job.endDate || "Present"}
              </p>
            </div>
          </div>
          <ul className="list-disc ml-6 mt-2 text-sm space-y-1">
            {job.summary && <li>{job.summary}</li>}
            {job.highlights?.map((highlight, hIndex) => (
              <li key={hIndex}>{highlight}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
});