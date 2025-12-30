"use client";

import React, { memo } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";
import { InputGroup } from "./FormComponents";

/**
 * A form section for editing advisory roles in the resume.
 * Allows adding, removing, and editing organization and position for each role.
 */
const AdvisoryForm = memo(function AdvisoryForm() {
  const { advisory } = useResumeStore((state) => state.resume);
  const { updateField, addSection, removeSection } = useResumeStore();

  return (
    <section className="space-y-6 animate-in fade-in duration-500">
      {(advisory || []).map((role, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-800">Role #{i + 1}</h3>
            {advisory && advisory.length > 1 && (
              <button 
                onClick={() => removeSection("advisory", i)} 
                className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors"
                aria-label={`Remove role ${i + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <InputGroup 
            label="Organization" 
            value={role.organization} 
            onChange={(e) => updateField(`advisory.${i}.organization`, e.target.value)} 
            placeholder="e.g. Tech Board" 
          />
          <InputGroup 
            label="Position" 
            value={role.position} 
            onChange={(e) => updateField(`advisory.${i}.position`, e.target.value)} 
            placeholder="e.g. Board Member" 
          />
        </div>
      ))}
      
      <button 
        onClick={() => addSection("advisory", { organization: "", position: "" })} 
        className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors w-full justify-center border-2 border-dashed border-blue-100 hover:border-blue-200"
      >
        <PlusCircle className="w-4 h-4" /> Add Advisory Role
      </button>
    </section>
  );
});

AdvisoryForm.displayName = "AdvisoryForm";

export { AdvisoryForm };
export default AdvisoryForm;