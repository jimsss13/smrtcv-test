"use client";
import { PlusCircle, Trash2 } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";

const InputGroup = ({ label, value, placeholder, onChange }: any) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
    <input type="text" value={value || ""} onChange={onChange} placeholder={placeholder} className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm" />
  </div>
);

export function SkillsForm() {
  const { skills } = useResumeStore((state) => state.resume);
  const { updateField, updateStringArray, addSection, removeSection } = useResumeStore();

  return (
    <section className="space-y-6 animate-in fade-in duration-500">
      {(skills || []).map((skill, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-800">Skill Set #{i + 1}</h3>
            {skills.length > 1 && (
              <button onClick={() => removeSection("skills", i)} className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputGroup label="Category Name" value={skill.name} onChange={(e: any) => updateField(`skills.${i}.name`, e.target.value)} placeholder="e.g. Frontend" />
            <InputGroup label="Proficiency" value={skill.level} onChange={(e: any) => updateField(`skills.${i}.level`, e.target.value)} placeholder="e.g. Expert" />
          </div>
          <InputGroup label="Keywords (Comma separated)" value={skill.keywords?.join(', ')} onChange={(e: any) => updateStringArray(`skills.${i}.keywords`, e.target.value)} placeholder="React, TypeScript, Tailwind..." />
        </div>
      ))}
      <button onClick={() => addSection("skills", { name: "", level: "", keywords: [] })} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
        <PlusCircle className="w-4 h-4" /> Add Skill Category
      </button>
    </section>
  )
}