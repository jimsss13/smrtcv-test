import React, { memo } from "react";
import { Project } from "@/types/resume";

/**
 * Properties for the Projects component.
 */
interface ProjectsProps {
  /** Array of project entries. */
  projects: Project[] | undefined;
}

/**
 * Helper function to check if a project entry is empty.
 * Trims strings and checks for meaningful content in name, description, or URL.
 * 
 * @param project - The project entry to check.
 * @returns True if the project entry is considered empty.
 */
function isProjectEmpty(project: Project) {
  if (!project) return true;
  return !project.name?.trim() && 
         !project.description?.trim() && 
         !project.url?.trim();
}

/**
 * A component that renders the projects section of a resume.
 * Displays a list of projects with their names, descriptions, and optional URLs.
 * Automatically filters out empty entries and hides the section if no entries exist.
 * Optimized for performance with React.memo.
 * 
 * @example
 * <Projects 
 *   projects={[
 *     { name: "Portfolio", description: "My personal portfolio website.", url: "https://example.com" }
 *   ]} 
 * />
 * 
 * @param props - The component properties including an array of projects.
 */
export const Projects = memo(function Projects({ projects }: ProjectsProps) {
  const filteredProjects = projects?.filter(p => !isProjectEmpty(p));

  if (!filteredProjects || filteredProjects.length === 0) return null;
  
  return (
    <section className="mb-8">
      <h2 className="uppercase font-semibold tracking-wide border-b border-gray-400 pb-1 text-sm mb-3">
        Projects
      </h2>
      {filteredProjects.map((proj, index) => (
        <div key={index} className="mb-3">
          <h3 className="font-semibold">{proj.name}</h3>
          <p className="text-sm">{proj.description}</p>
          {proj.url && (
            <a
              href={proj.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm underline"
            >
              {proj.url}
            </a>
          )}
        </div>
      ))}
    </section>
  );
});