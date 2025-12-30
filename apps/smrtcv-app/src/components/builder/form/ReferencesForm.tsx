"use client";

import React, { memo } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";
import { InputGroup, TextAreaGroup } from "./FormComponents";

/**
 * A form section for editing references in the resume.
 * Allows adding, removing, and editing professional references with their contact details.
 */
const ReferencesForm = memo(function ReferencesForm() {
  const { references } = useResumeStore((state) => state.resume);
  const { updateField, addSection, removeSection } = useResumeStore();

  return (
    <section className="space-y-6 animate-in fade-in duration-500">
      {(references || []).map((ref, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-800">Reference #{i + 1}</h3>
            {references && references.length > 1 && (
              <button 
                onClick={() => removeSection("references", i)} 
                className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors"
                aria-label={`Remove reference ${i + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <InputGroup 
            label="Name" 
            value={ref.name} 
            onChange={(e) => updateField(`references.${i}.name`, e.target.value)} 
            placeholder="e.g. Jane Doe" 
          />
          <TextAreaGroup 
            label="Contact / Details" 
            value={ref.reference} 
            onChange={(e) => updateField(`references.${i}.reference`, e.target.value)} 
            placeholder="Manager at Acme Corp - jane@acme.com" 
          />
        </div>
      ))}
      <button 
        onClick={() => addSection("references", { name: "", reference: "" })} 
        className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors w-full justify-center border-2 border-dashed border-blue-100 hover:border-blue-200"
      >
        <PlusCircle className="w-4 h-4" /> Add Reference
      </button>
    </section>
  );
});

ReferencesForm.displayName = "ReferencesForm";

export { ReferencesForm };
export default ReferencesForm;