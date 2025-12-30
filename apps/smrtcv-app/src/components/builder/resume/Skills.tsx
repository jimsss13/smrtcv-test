import React, { memo } from "react";
import { Skill } from "@/types/resume";

/**
 * Properties for the Skills component.
 */
interface SkillsProps {
  /** Array of skill entries. */
  skills: Skill[] | undefined;
}

/**
 * Helper function to check if a skill entry is empty.
 * Trims strings and checks for meaningful content in name, level, or keywords.
 * 
 * @param skill - The skill entry to check.
 * @returns True if the skill entry is considered empty.
 */
function isSkillEmpty(skill: Skill) {
  if (!skill) return true;
  return !skill.name?.trim() && 
         !skill.level?.trim() && 
         (!skill.keywords || skill.keywords.filter(k => k.trim()).length === 0);
}

/**
 * A component that renders the skills section of a resume.
 * Displays a list of skill categories with their associated keywords.
 * Automatically filters out empty entries and hides the section if no entries exist.
 * Optimized for performance with React.memo.
 * 
 * @example
 * <Skills 
 *   skills={[
 *     { name: "Frontend", keywords: ["React", "TypeScript", "Tailwind"] }
 *   ]} 
 * />
 * 
 * @param props - The component properties including an array of skills.
 */
export const Skills = memo(function Skills({ skills }: SkillsProps) {
  const filteredSkills = skills?.filter(s => !isSkillEmpty(s));

  if (!filteredSkills || filteredSkills.length === 0) return null;
  
  return (
    <section className="mb-8 break-inside-avoid">
      <h2 className="uppercase font-semibold tracking-wide border-b border-gray-400 pb-1 text-sm mb-3">
        Skills
      </h2>
      <ul className="text-sm space-y-1">
        {filteredSkills.map((skill, index) => (
          <li key={index}>
            <span className="font-semibold">{skill.name}:</span>{" "}
            {skill.keywords?.join(", ")}
          </li>
        ))}
      </ul>
    </section>
  );
});