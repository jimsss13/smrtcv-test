"use client";

import React, { memo } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";
import { InputGroup } from "./FormComponents";

/**
 * A form section for editing certificates and certifications in the resume.
 * Allows adding, removing, and editing details for each certificate.
 */
const CertificatesForm = memo(function CertificatesForm() {
  const { certificates } = useResumeStore((state) => state.resume);
  const { updateField, addSection, removeSection } = useResumeStore();

  return (
    <section className="space-y-6 animate-in fade-in duration-500">
      {(certificates || []).map((cert, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-800">Certificate #{i + 1}</h3>
            {certificates && certificates.length > 1 && (
              <button 
                onClick={() => removeSection("certificates", i)} 
                className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors"
                aria-label={`Remove certificate ${i + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <InputGroup 
            label="Certificate Name" 
            value={cert.name} 
            onChange={(e) => updateField(`certificates.${i}.name`, e.target.value)} 
            placeholder="e.g. AWS Solutions Architect" 
          />
          <InputGroup 
            label="Issuer" 
            value={cert.issuer} 
            onChange={(e) => updateField(`certificates.${i}.issuer`, e.target.value)} 
            placeholder="e.g. Amazon Web Services" 
          />
          
          <div className="grid grid-cols-2 gap-4">
            <InputGroup 
              label="Date" 
              value={cert.date} 
              onChange={(e) => updateField(`certificates.${i}.date`, e.target.value)} 
              placeholder="2023-05" 
            />
            <InputGroup 
              label="URL" 
              value={cert.url} 
              onChange={(e) => updateField(`certificates.${i}.url`, e.target.value)} 
              placeholder="https://..." 
            />
          </div>
        </div>
      ))}
      
      <button 
        onClick={() => addSection("certificates", { name: "", issuer: "", date: "", url: "" })} 
        className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors w-full justify-center border-2 border-dashed border-blue-100 hover:border-blue-200"
      >
        <PlusCircle className="w-4 h-4" /> Add Certificate
      </button>
    </section>
  );
});

CertificatesForm.displayName = "CertificatesForm";

export { CertificatesForm };
export default CertificatesForm;