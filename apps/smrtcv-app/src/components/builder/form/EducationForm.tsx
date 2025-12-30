"use client";

import React, { memo } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";
import { InputGroup } from "./FormComponents";

/**
 * Properties for the EducationForm component.
 */
interface EducationFormProps {
  /** Optional ID of the currently selected template. */
  selectedTemplate?: string;
}

/**
 * A form section for editing educational background in the resume.
 * Allows adding, removing, and editing details for each educational entry.
 * 
 * @param props - The component properties.
 */
const EducationForm = memo(({ selectedTemplate }: EducationFormProps) => {
  const { education } = useResumeStore((state) => state.resume);
  const { updateField, addSection, removeSection } = useResumeStore();

  return (
    <section className="space-y-6 animate-in fade-in duration-500">
      {(education || []).map((edu, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4 relative group">
          
          {/* Header with Delete Button */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-800">Education #{i + 1}</h3>
            
            {/* Only show delete if there is more than 1 item */}
            {education.length > 1 && (
              <button
                onClick={() => removeSection("education", i)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50"
                aria-label={`Remove education entry ${i + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <InputGroup
            label="Institution"
            value={edu.institution}
            onChange={(e) => updateField(`education.${i}.institution`, e.target.value)}
            placeholder="e.g. University of California"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup
              label="Degree"
              value={edu.studyType}
              onChange={(e) => updateField(`education.${i}.studyType`, e.target.value)}
              placeholder="e.g. Bachelor of Science"
            />
            <InputGroup
              label="Area of Study"
              value={edu.area}
              onChange={(e) => updateField(`education.${i}.area`, e.target.value)}
              placeholder="e.g. Computer Science"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputGroup
              label="Start Date"
              value={edu.startDate}
              onChange={(e) => updateField(`education.${i}.startDate`, e.target.value)}
              placeholder="YYYY-MM"
            />
            <InputGroup
              label="End Date"
              value={edu.endDate}
              onChange={(e) => updateField(`education.${i}.endDate`, e.target.value)}
              placeholder="YYYY-MM or Present"
            />
          </div>

          <InputGroup
            label="Location"
            value={edu.location || ""}
            onChange={(e) => updateField(`education.${i}.location`, e.target.value)}
            placeholder="e.g. San Francisco, CA"
          />
          
          {selectedTemplate === 'traditional' && (
            <InputGroup
              label="Grade / GPA"
              value={edu.score || ""}
              onChange={(e) => updateField(`education.${i}.score`, e.target.value)}
              placeholder="e.g. 4.0 GPA"
            />
          )}
        </div>
      ))}
      
      <button 
        onClick={() => addSection("education", { institution: "", studyType: "", area: "", startDate: "", endDate: "" })} 
        className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors w-full justify-center border-2 border-dashed border-blue-100 hover:border-blue-200"
      >
        <PlusCircle className="w-4 h-4" /> Add Education
      </button>
    </section>
  );
});

EducationForm.displayName = "EducationForm";

export { EducationForm };
export default EducationForm;