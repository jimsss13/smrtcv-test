"use client";

import React, { memo } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";
import { InputGroup } from "./FormComponents";

/**
 * A form section for editing volunteer experience in the resume.
 * Allows adding, removing, and editing organization details, positions, and dates.
 */
export const VolunteerForm = memo(function VolunteerForm() {
  const { volunteer } = useResumeStore((state) => state.resume);
  const { updateField, addSection, removeSection } = useResumeStore();

  return (
    <section className="space-y-6 animate-in fade-in duration-500">
      {(volunteer || []).map((vol, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-800">Volunteer #{i + 1}</h3>
            {volunteer && volunteer.length > 1 && (
              <button 
                onClick={() => removeSection("volunteer", i)} 
                className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors"
                aria-label={`Remove volunteer experience ${i + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <InputGroup 
            label="Organization" 
            value={vol.organization} 
            onChange={(e) => updateField(`volunteer.${i}.organization`, e.target.value)} 
            placeholder="e.g. Red Cross" 
          />
          <InputGroup 
            label="Position" 
            value={vol.position} 
            onChange={(e) => updateField(`volunteer.${i}.position`, e.target.value)} 
            placeholder="e.g. Coordinator" 
          />
          <div className="grid grid-cols-2 gap-4">
            <InputGroup 
              label="Start Date" 
              value={vol.startDate} 
              onChange={(e) => updateField(`volunteer.${i}.startDate`, e.target.value)} 
              placeholder="YYYY-MM" 
            />
            <InputGroup 
              label="End Date" 
              value={vol.endDate} 
              onChange={(e) => updateField(`volunteer.${i}.endDate`, e.target.value)} 
              placeholder="YYYY-MM" 
            />
          </div>
        </div>
      ))}
      <button 
        onClick={() => addSection("volunteer", { organization: "", position: "", url: "", startDate: "", endDate: "", summary: "", highlights: [] })} 
        className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors w-full justify-center border-2 border-dashed border-blue-100 hover:border-blue-200"
      >
        <PlusCircle className="w-4 h-4" /> Add Volunteer
      </button>
    </section>
  );
});