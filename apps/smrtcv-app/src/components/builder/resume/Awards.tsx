import React, { memo } from "react";
import { Award } from "@/types/resume";

/**
 * Properties for the Awards component.
 */
interface AwardsProps {
  /** Array of award entries. */
  awards: Award[] | undefined;
}

/**
 * Helper function to check if an award entry is empty.
 * Trims strings and checks for meaningful content in title, awarder, date, or summary.
 * 
 * @param award - The award entry to check.
 * @returns True if the award entry is considered empty.
 */
function isAwardEmpty(award: Award) {
  if (!award) return true;
  return !award.title?.trim() && 
         !award.awarder?.trim() && 
         !award.date?.trim() && 
         !award.summary?.trim();
}

/**
 * A component that renders the awards section of a resume.
 * Displays a list of awards with their titles, awarders, dates, and summaries.
 * Automatically filters out empty entries and hides the section if no entries exist.
 * Optimized for performance with React.memo.
 * 
 * @example
 * <Awards 
 *   awards={[
 *     { title: "Employee of the Month", awarder: "Company Inc.", date: "2023-05", summary: "For outstanding performance." }
 *   ]} 
 * />
 * 
 * @param props - The component properties including an array of awards.
 */
export const Awards = memo(function Awards({ awards }: AwardsProps) {
  const filteredAwards = awards?.filter(award => !isAwardEmpty(award));

  if (!filteredAwards || filteredAwards.length === 0) return null;
  
  return (
    <section className="mb-8">
      <h2 className="uppercase font-semibold tracking-wide border-b border-gray-400 pb-1 text-sm mb-3">
        Awards
      </h2>
      {filteredAwards.map((award, index) => (
        <div key={index} className="mb-2">
          <h3 className="font-semibold">{award.title}</h3>
          <p className="text-sm">
            {award.awarder} – {award.date}
          </p>
          {award.summary && <p className="text-sm mt-1">{award.summary}</p>}
        </div>
      ))}
    </section>
  );
});