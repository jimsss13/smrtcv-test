import React, { memo } from "react";
import { Education as EducationType } from "@/types/resume";

/**
 * Properties for the Education component.
 */
interface EducationProps {
  /** Array of education entries. */
  education: EducationType[];
}

/**
 * Helper function to check if an education entry is empty.
 * Trims strings and checks for meaningful content in institution, area, studyType, or location.
 * 
 * @param edu - The education entry to check.
 * @returns True if the education entry is considered empty.
 */
function isEducationEmpty(edu: EducationType) {
  if (!edu) return true;
  return !edu.institution?.trim() && 
         !edu.area?.trim() && 
         !edu.studyType?.trim() && 
         !edu.location?.trim();
}

/**
 * A component that renders the education section of a resume.
 * Displays a list of educational institutions, degrees, areas of study, dates, and locations.
 * Automatically filters out empty entries and hides the section if no entries exist.
 * Optimized for performance with React.memo.
 * 
 * @example
 * <Education 
 *   education={[
 *     { institution: "University of Life", area: "Computer Science", studyType: "Bachelor", endDate: "2020", location: "Online" }
 *   ]} 
 * />
 * 
 * @param props - The component properties including an array of education entries.
 */
export const Education = memo(function Education({ education }: EducationProps) {
  // 1. Filter out any education entries that are "empty"
  const filteredEducation = (education || []).filter(edu => !isEducationEmpty(edu));

  // 2. If the filtered array is empty, render nothing at all.
  if (filteredEducation.length === 0) return null;

  return (
    <section className="mb-8 break-inside-avoid">
      <h2 className="uppercase font-semibold tracking-wide border-b border-gray-400 pb-1 text-sm mb-3">
        Education
      </h2>
      {filteredEducation.map((edu, index) => (
        <div key={index} className="mb-3">
          <div className="flex justify-between items-baseline">
            <div>
              <h3 className="font-semibold">{edu.institution}</h3>
              <p className="italic text-sm">
                {edu.studyType} in {edu.area}
              </p>
            </div>
            <div className="text-sm text-gray-700 text-right">
              <p>{edu.endDate}</p>
              <p>{edu.location}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
});