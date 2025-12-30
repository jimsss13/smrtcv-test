"use client";

import React, { memo } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";
import { InputGroup, TextAreaGroup } from "./FormComponents";

/**
 * A form section for editing work experience in the resume.
 * Allows adding, removing, and editing employment details including company, position, dates, and achievements.
 */
export const WorkForm = memo(function WorkForm() {
  const { work } = useResumeStore((state) => state.resume);
  const { updateField, addSection, removeSection } = useResumeStore();

  return (
    <section className="space-y-6 animate-in fade-in duration-500">
      {(work || []).map((job, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4 relative group">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-800">Position #{i + 1}</h3>
            {work && work.length > 1 && (
              <button 
                onClick={() => removeSection("work", i)} 
                className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors"
                aria-label={`Remove position ${i + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <InputGroup 
            label="Company Name" 
            value={job.name} 
            onChange={(e) => updateField(`work.${i}.name`, e.target.value)} 
            placeholder="e.g. Acme Corp" 
          />
          <InputGroup 
            label="Job Title" 
            value={job.position} 
            onChange={(e) => updateField(`work.${i}.position`, e.target.value)} 
            placeholder="e.g. Senior Product Manager" 
          />
          
          <div className="grid grid-cols-2 gap-4">
            <InputGroup 
              label="Start Date" 
              value={job.startDate} 
              onChange={(e) => updateField(`work.${i}.startDate`, e.target.value)} 
              placeholder="2022-03" 
            />
            <InputGroup 
              label="End Date" 
              value={job.endDate} 
              onChange={(e) => updateField(`work.${i}.endDate`, e.target.value)} 
              placeholder="Present" 
            />
          </div>

          <InputGroup 
            label="Company Website" 
            value={job.url} 
            onChange={(e) => updateField(`work.${i}.url`, e.target.value)} 
            placeholder="https://acme.com" 
          />
          
          <TextAreaGroup 
            label="Summary & Achievements" 
            value={job.summary} 
            onChange={(e) => updateField(`work.${i}.summary`, e.target.value)} 
            placeholder="Led a team of 5 developers..." 
          />
        </div>
      ))}
      <button 
        onClick={() => addSection("work", { name: "", position: "", url: "", startDate: "", endDate: "", summary: "", highlights: [] })} 
        className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors w-full justify-center border-2 border-dashed border-blue-100 hover:border-blue-200"
      >
        <PlusCircle className="w-4 h-4" /> Add Employment
      </button>
    </section>
  );
});