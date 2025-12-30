import React, { memo } from "react";
import { Volunteer as VolunteerType } from "@/types/resume";

/**
 * Properties for the Volunteer component.
 */
interface VolunteerProps {
  /** Array of volunteer experience entries. */
  volunteer: VolunteerType[] | undefined;
}

/**
 * Helper function to check if a volunteer entry is empty.
 * Trims strings and checks for meaningful content in organization, position, or startDate.
 * 
 * @param vol - The volunteer entry to check.
 * @returns True if the volunteer entry is considered empty.
 */
function isVolunteerEmpty(vol: VolunteerType) {
  if (!vol) return true;
  return !vol.organization?.trim() && 
         !vol.position?.trim() && 
         !vol.startDate?.trim();
}

/**
 * A component that renders the volunteer section of a resume.
 * Displays a list of volunteer experiences with organization names, positions, and dates.
 * Automatically filters out empty entries and hides the section if no entries exist.
 * Optimized for performance with React.memo.
 * 
 * @example
 * <Volunteer 
 *   volunteer={[
 *     { organization: "Code for Good", position: "Mentor", startDate: "2022", endDate: "2023" }
 *   ]} 
 * />
 * 
 * @param props - The component properties including an array of volunteer entries.
 */
export const Volunteer = memo(function Volunteer({ volunteer }: VolunteerProps) {
  const filteredVolunteer = (volunteer || []).filter(v => !isVolunteerEmpty(v));

  if (filteredVolunteer.length === 0) return null;

  return (
    <section className="mb-8 break-inside-avoid">
      <h2 className="uppercase font-semibold tracking-wide border-b border-gray-400 pb-1 text-sm mb-3">
        Volunteer
      </h2>
      {filteredVolunteer.map((vol, index) => (
        <div key={index} className="mb-3">
          <h3 className="font-semibold">{vol.organization}</h3>
          <p className="text-sm italic">{vol.position}</p>
          <p className="text-sm">
            {vol.startDate} – {vol.endDate}
          </p>
        </div>
      ))}
    </section>
  );
});