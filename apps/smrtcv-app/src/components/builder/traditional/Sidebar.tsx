import React, { memo } from 'react';
import { Skill, Language, Interest } from '@/types/resume';

/**
 * Properties for the Sidebar component.
 */
interface SidebarProps {
  /** Optional nationality information. */
  nationality?: string;
  /** Array of skill entries. */
  skills: Skill[];
  /** Array of language proficiency entries. */
  languages: Language[];
  /** Array of interest entries. */
  interests: Interest[];
}

/**
 * Helper function to check if a skill entry is empty.
 * 
 * @param skill - The skill entry to check.
 * @returns True if the skill entry is considered empty.
 */
function isSkillEmpty(skill: Skill) {
  if (!skill) return true;
  return !skill.name?.trim() && !skill.level?.trim();
}

/**
 * Helper function to check if a language entry is empty.
 * 
 * @param lang - The language entry to check.
 * @returns True if the language entry is considered empty.
 */
function isLanguageEmpty(lang: Language) {
  if (!lang) return true;
  return !lang.language?.trim() && !lang.fluency?.trim();
}

/**
 * Helper function to check if an interest entry is empty.
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
 * A helper component that renders a dot-based visualization of skill levels.
 * 
 * @param props - The level string.
 */
function SkillDots({ level }: { level: string }) {
  const levelMap: { [key: string]: number } = {
    beginner: 2,
    intermediate: 3,
    advanced: 4,
    expert: 5,
  };
  const filledDots = levelMap[level?.toLowerCase()] || 0;
  return (
    <div className="flex gap-1.5 mt-1" aria-label={`Level: ${level || 'Not specified'}`}>
      {Array(5).fill(0).map((_, i) => (
        <span
          key={i}
          className={`h-2.5 w-1/5 rounded-sm border border-gray-400 ${
            i < filledDots ? 'bg-[var(--trad-primary-color)] border-[var(--trad-primary-color)]' : 'bg-[var(--trad-dot-empty)]'
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/**
 * A reusable title component for sidebar sections.
 * 
 * @param props - The title string.
 */
function SidebarTitle({ title }: { title: string }) {
  return (
    <h3 className="text-lg font-bold text-[var(--trad-primary-color)] border-b-2 border-[var(--trad-primary-color)] pb-1 mb-3">
      {title}
    </h3>
  );
}

/**
 * The sidebar area for the traditional resume layout.
 * Displays nationality, skills, languages, and interests with visualizations.
 * Automatically filters out empty entries and hides sections if no data exists.
 * 
 * @param props - The component properties.
 */
const Sidebar = memo(({ nationality, skills, languages, interests }: SidebarProps) => {
  // --- Filtered arrays ---
  const filteredSkills = (skills || []).filter(s => !isSkillEmpty(s));
  const filteredLanguages = (languages || []).filter(l => !isLanguageEmpty(l));
  const filteredInterests = (interests || []).filter(i => !isInterestEmpty(i));

  return (
    <aside className="w-full md:w-1/3 p-6 space-y-6" aria-label="Resume Sidebar">
      
      {/* Only show Nationality if it exists */}
      {nationality?.trim() && (
        <section aria-labelledby="sidebar-nationality">
          <SidebarTitle title="Nationality" />
          <p className="text-sm">{nationality}</p>
        </section>
      )}

      {/* Only show Skills if the array has items */}
      {filteredSkills.length > 0 && (
        <section aria-labelledby="sidebar-skills">
          <SidebarTitle title="Skills" />
          <div className="space-y-3">
            {filteredSkills.map((skill, i) => (
              <div key={i}>
                <p className="text-sm font-semibold">{skill.name}</p>
                <SkillDots level={skill.level} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Only show Language if the array has items */}
      {filteredLanguages.length > 0 && (
        <section aria-labelledby="sidebar-language">
          <SidebarTitle title="Language" />
          <div className="space-y-3">
            {filteredLanguages.map((lang, i) => (
              <div key={i}>
                <p className="text-sm font-semibold">{lang.language}</p>
                <SkillDots level={lang.fluency} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Only show Interests if the array has items */}
      {filteredInterests.length > 0 && (
        <section aria-labelledby="sidebar-interests">
          <SidebarTitle title="Interests" />
          <div className="space-y-2">
            {filteredInterests.map((interest, i) => (
              <div key={i}>
                <p className="text-sm font-semibold">{interest.name}</p>
                {interest.keywords && interest.keywords.length > 0 && (
                  <p className="text-xs text-gray-600">{interest.keywords.join(", ")}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';

export { Sidebar };
export default Sidebar;