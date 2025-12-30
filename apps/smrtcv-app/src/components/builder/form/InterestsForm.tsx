"use client";

import React, { memo } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";
import { InputGroup } from "./FormComponents";

/**
 * A form section for editing interests and hobbies in the resume.
 * Allows adding, removing, and editing categories of interests with associated keywords.
 */
const InterestsForm = memo(function InterestsForm() {
  const { interests } = useResumeStore((state) => state.resume);
  const { updateField, updateStringArray, addSection, removeSection } = useResumeStore();

  return (
    <section className="space-y-6 animate-in fade-in duration-500">
      {(interests || []).map((interest, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-800">Interest Group #{i + 1}</h3>
            {interests && interests.length > 1 && (
              <button 
                onClick={() => removeSection("interests", i)} 
                className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors"
                aria-label={`Remove interest group ${i + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <InputGroup 
            label="Category" 
            value={interest.name} 
            onChange={(e) => updateField(`interests.${i}.name`, e.target.value)} 
            placeholder="e.g. Hobbies" 
          />
          <InputGroup 
            label="Keywords (Comma separated)" 
            value={interest.keywords?.join(', ')} 
            onChange={(e) => updateStringArray(`interests.${i}.keywords`, e.target.value)} 
            placeholder="Hiking, Chess, Photography" 
          />
        </div>
      ))}
      <button 
        onClick={() => addSection("interests", { name: "", keywords: [] })} 
        className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors w-full justify-center border-2 border-dashed border-blue-100 hover:border-blue-200"
      >
        <PlusCircle className="w-4 h-4" /> Add Interest
      </button>
    </section>
  );
});

InterestsForm.displayName = "InterestsForm";

export { InterestsForm };
export default InterestsForm;