import React, { memo } from "react";
import { Interest } from "@/types/resume";

/**
 * Properties for the Interests component.
 */
interface InterestsProps {
  /** Array of interest entries. */
  interests: Interest[] | undefined;
}

/**
 * Helper function to check if an interest entry is empty.
 * Trims strings and checks for meaningful content in name or keywords.
 * 
 * @param interest - The interest entry to check.
 * @returns True if the interest entry is considered empty.
 */
function isInterestEmpty(interest: Interest) {
  if (!interest) return true;
  return !interest.name?.trim() && 
         (!interest.keywords || interest.keywords.filter(k => k.trim()).length === 0);
}

/**
 * A component that renders the interests section of a resume.
 * Displays a list of interests with their categories and associated keywords.
 * Automatically filters out empty entries and hides the section if no entries exist.
 * Optimized for performance with React.memo.
 * 
 * @example
 * <Interests 
 *   interests={[
 *     { name: "Hobbies", keywords: ["Coding", "Chess", "Cooking"] }
 *   ]} 
 * />
 * 
 * @param props - The component properties including an array of interests.
 */
export const Interests = memo(function Interests({ interests }: InterestsProps) {
  const filteredInterests = interests?.filter(i => !isInterestEmpty(i));

  if (!filteredInterests || filteredInterests.length === 0) return null;
  
  return (
    <section className="mb-8 break-inside-avoid">
      <h2 className="uppercase font-semibold tracking-wide border-b border-gray-400 pb-1 text-sm mb-3">
        Interests
      </h2>
      <ul className="text-sm">
        {filteredInterests.map((interest, i) => (
          <li key={i}>
            <span className="font-semibold">{interest.name}:</span>{" "}
            {interest.keywords?.join(", ")}
          </li>
        ))}
      </ul>
    </section>
  );
});