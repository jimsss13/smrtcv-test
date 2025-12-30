"use client";

import React, { memo } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";
import { InputGroup } from "./FormComponents";

/**
 * A form section for editing language proficiency in the resume.
 * Allows adding, removing, and editing languages with their fluency levels.
 */
const LanguagesForm = memo(function LanguagesForm() {
  const { languages } = useResumeStore((state) => state.resume);
  const { updateField, addSection, removeSection } = useResumeStore();

  return (
    <section className="space-y-6 animate-in fade-in duration-500">
      {(languages || []).map((lang, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-800">Language #{i + 1}</h3>
            {languages && languages.length > 1 && (
              <button 
                onClick={() => removeSection("languages", i)} 
                className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors"
                aria-label={`Remove language ${i + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputGroup 
              label="Language" 
              value={lang.language} 
              onChange={(e) => updateField(`languages.${i}.language`, e.target.value)} 
              placeholder="e.g. Spanish" 
            />
            <InputGroup 
              label="Fluency" 
              value={lang.fluency} 
              onChange={(e) => updateField(`languages.${i}.fluency`, e.target.value)} 
              placeholder="e.g. Native Speaker" 
            />
          </div>
        </div>
      ))}
      <button 
        onClick={() => addSection("languages", { language: "", fluency: "" })} 
        className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors w-full justify-center border-2 border-dashed border-blue-100 hover:border-blue-200"
      >
        <PlusCircle className="w-4 h-4" /> Add Language
      </button>
    </section>
  );
});

LanguagesForm.displayName = "LanguagesForm";

export { LanguagesForm };
export default LanguagesForm;