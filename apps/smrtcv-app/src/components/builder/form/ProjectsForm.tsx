"use client";

import React, { memo } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";
import { InputGroup, TextAreaGroup } from "./FormComponents";

/**
 * A form section for editing projects in the resume.
 * Allows adding, removing, and editing project details including name, URL, dates, and description.
 */
const ProjectsForm = memo(function ProjectsForm() {
  const { projects } = useResumeStore((state) => state.resume);
  const { updateField, addSection, removeSection } = useResumeStore();

  return (
    <section className="space-y-6 animate-in fade-in duration-500">
      {(projects || []).map((project, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-800">Project #{i + 1}</h3>
            {projects && projects.length > 1 && (
              <button 
                onClick={() => removeSection("projects", i)} 
                className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors"
                aria-label={`Remove project ${i + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <InputGroup 
            label="Project Name" 
            value={project.name} 
            onChange={(e) => updateField(`projects.${i}.name`, e.target.value)} 
            placeholder="e.g. E-Commerce Platform" 
          />
          <InputGroup 
            label="Project URL" 
            value={project.url} 
            onChange={(e) => updateField(`projects.${i}.url`, e.target.value)} 
            placeholder="https://github.com/..." 
          />
          <div className="grid grid-cols-2 gap-4">
            <InputGroup 
              label="Start Date" 
              value={project.startDate} 
              onChange={(e) => updateField(`projects.${i}.startDate`, e.target.value)} 
              placeholder="2023-01" 
            />
            <InputGroup 
              label="End Date" 
              value={project.endDate} 
              onChange={(e) => updateField(`projects.${i}.endDate`, e.target.value)} 
              placeholder="2023-06" 
            />
          </div>
          <TextAreaGroup 
            label="Description" 
            value={project.description} 
            onChange={(e) => updateField(`projects.${i}.description`, e.target.value)} 
            placeholder="Built a full-stack app using..." 
          />
        </div>
      ))}
      <button 
        onClick={() => addSection("projects", { name: "", description: "", url: "", startDate: "", endDate: "", highlights: [] })} 
        className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors w-full justify-center border-2 border-dashed border-blue-100 hover:border-blue-200"
      >
        <PlusCircle className="w-4 h-4" /> Add Project
      </button>
    </section>
  );
});

ProjectsForm.displayName = "ProjectsForm";

export { ProjectsForm };
export default ProjectsForm;