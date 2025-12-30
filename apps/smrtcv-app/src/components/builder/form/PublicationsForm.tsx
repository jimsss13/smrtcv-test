"use client";

import React, { memo } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";
import { InputGroup, TextAreaGroup } from "./FormComponents";

/**
 * A form section for editing publications in the resume.
 * Allows adding, removing, and editing publication details including title, publisher, date, URL, and summary.
 */
const PublicationsForm = memo(function PublicationsForm() {
  const { publications } = useResumeStore((state) => state.resume);
  const { updateField, addSection, removeSection } = useResumeStore();

  return (
    <section className="space-y-6 animate-in fade-in duration-500">
      {(publications || []).map((pub, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-800">Publication #{i + 1}</h3>
            {publications && publications.length > 1 && (
              <button 
                onClick={() => removeSection("publications", i)} 
                className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors"
                aria-label={`Remove publication ${i + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <InputGroup 
            label="Title" 
            value={pub.name} 
            onChange={(e) => updateField(`publications.${i}.name`, e.target.value)} 
            placeholder="e.g. Advanced React Patterns" 
          />
          <div className="grid grid-cols-2 gap-4">
            <InputGroup 
              label="Publisher" 
              value={pub.publisher} 
              onChange={(e) => updateField(`publications.${i}.publisher`, e.target.value)} 
              placeholder="e.g. Medium" 
            />
            <InputGroup 
              label="Date" 
              value={pub.releaseDate} 
              onChange={(e) => updateField(`publications.${i}.releaseDate`, e.target.value)} 
              placeholder="2024-01" 
            />
          </div>
          <InputGroup 
            label="URL" 
            value={pub.url} 
            onChange={(e) => updateField(`publications.${i}.url`, e.target.value)} 
            placeholder="https://..." 
          />
          <TextAreaGroup 
            label="Summary" 
            value={pub.summary} 
            onChange={(e) => updateField(`publications.${i}.summary`, e.target.value)} 
            placeholder="A deep dive into..." 
          />
        </div>
      ))}
      <button 
        onClick={() => addSection("publications", { name: "", publisher: "", releaseDate: "", url: "", summary: "" })} 
        className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors w-full justify-center border-2 border-dashed border-blue-100 hover:border-blue-200"
      >
        <PlusCircle className="w-4 h-4" /> Add Publication
      </button>
    </section>
  );
});

PublicationsForm.displayName = "PublicationsForm";

export { PublicationsForm };
export default PublicationsForm;