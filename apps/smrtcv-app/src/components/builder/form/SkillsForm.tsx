"use client";

import React, { memo } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";
import { InputGroup } from "./FormComponents";

/**
 * A form section for editing skills in the resume.
 * Allows adding, removing, and editing skill categories with proficiency levels and keywords.
 */
export const SkillsForm = memo(function SkillsForm() {
  const { skills } = useResumeStore((state) => state.resume);
  const { updateField, updateStringArray, addSection, removeSection } = useResumeStore();

  return (
    <section className="space-y-6 animate-in fade-in duration-500">
      {(skills || []).map((skill, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-800">Skill Set #{i + 1}</h3>
            {skills && skills.length > 1 && (
              <button 
                onClick={() => removeSection("skills", i)} 
                className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors"
                aria-label={`Remove skill set ${i + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputGroup 
              label="Category Name" 
              value={skill.name} 
              onChange={(e) => updateField(`skills.${i}.name`, e.target.value)} 
              placeholder="e.g. Frontend" 
            />
            <InputGroup 
              label="Proficiency" 
              value={skill.level} 
              onChange={(e) => updateField(`skills.${i}.level`, e.target.value)} 
              placeholder="e.g. Expert" 
            />
          </div>
          <InputGroup 
            label="Keywords (Comma separated)" 
            value={skill.keywords?.join(', ')} 
            onChange={(e) => updateStringArray(`skills.${i}.keywords`, e.target.value)} 
            placeholder="React, TypeScript, Tailwind..." 
          />
        </div>
      ))}
      <button 
        onClick={() => addSection("skills", { name: "", level: "", keywords: [] })} 
        className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors w-full justify-center border-2 border-dashed border-blue-100 hover:border-blue-200"
      >
        <PlusCircle className="w-4 h-4" /> Add Skill Category
      </button>
    </section>
  );
});