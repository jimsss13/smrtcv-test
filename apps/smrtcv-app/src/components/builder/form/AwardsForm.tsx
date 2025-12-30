"use client";

import React, { memo } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";
import { InputGroup, TextAreaGroup } from "./FormComponents";

/**
 * A form section for editing awards and recognitions in the resume.
 * Allows adding, removing, and editing details for each award.
 */
const AwardsForm = memo(function AwardsForm() {
  const { awards } = useResumeStore((state) => state.resume);
  const { updateField, addSection, removeSection } = useResumeStore();

  return (
    <section className="space-y-6 animate-in fade-in duration-500">
      {(awards || []).map((award, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-800">Award #{i + 1}</h3>
            {awards && awards.length > 1 && (
              <button 
                onClick={() => removeSection("awards", i)} 
                className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors"
                aria-label={`Remove award ${i + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <InputGroup 
            label="Award Title" 
            value={award.title} 
            onChange={(e) => updateField(`awards.${i}.title`, e.target.value)} 
            placeholder="e.g. Employee of the Month" 
          />
          
          <div className="grid grid-cols-2 gap-4">
            <InputGroup 
              label="Awarder" 
              value={award.awarder} 
              onChange={(e) => updateField(`awards.${i}.awarder`, e.target.value)} 
              placeholder="e.g. Google" 
            />
            <InputGroup 
              label="Date" 
              value={award.date} 
              onChange={(e) => updateField(`awards.${i}.date`, e.target.value)} 
              placeholder="2023-12" 
            />
          </div>

          <TextAreaGroup 
            label="Summary" 
            value={award.summary} 
            onChange={(e) => updateField(`awards.${i}.summary`, e.target.value)} 
            placeholder="Recognized for outstanding performance..." 
          />
        </div>
      ))}
      
      <button 
        onClick={() => addSection("awards", { title: "", awarder: "", date: "", summary: "" })} 
        className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors w-full justify-center border-2 border-dashed border-blue-100 hover:border-blue-200"
      >
        <PlusCircle className="w-4 h-4" /> Add Award
      </button>
    </section>
  );
});

AwardsForm.displayName = "AwardsForm";

export { AwardsForm };
export default AwardsForm;