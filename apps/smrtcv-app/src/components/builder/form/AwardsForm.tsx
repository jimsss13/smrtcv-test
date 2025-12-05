"use client";
import { PlusCircle, Trash2 } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";

const InputGroup = ({ label, value, placeholder, onChange }: any) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
    <input type="text" value={value || ""} onChange={onChange} placeholder={placeholder} className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm" />
  </div>
);

const TextAreaGroup = ({ label, value, placeholder, onChange }: any) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
    <textarea value={value || ""} onChange={onChange} placeholder={placeholder} className="flex min-h-[80px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y shadow-sm" />
  </div>
);

export function AwardsForm() {
  const { awards } = useResumeStore((state) => state.resume);
  const { updateField, addSection, removeSection } = useResumeStore();

  return (
    <section className="space-y-6 animate-in fade-in duration-500">
      {(awards || []).map((award, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-800">Award #{i + 1}</h3>
            {awards && awards.length > 1 && (
              <button onClick={() => removeSection("awards", i)} className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <InputGroup label="Award Title" value={award.title} onChange={(e: any) => updateField(`awards.${i}.title` as any, e.target.value)} placeholder="e.g. Employee of the Month" />
          <div className="grid grid-cols-2 gap-4">
            <InputGroup label="Awarder" value={award.awarder} onChange={(e: any) => updateField(`awards.${i}.awarder` as any, e.target.value)} placeholder="e.g. Google" />
            <InputGroup label="Date" value={award.date} onChange={(e: any) => updateField(`awards.${i}.date` as any, e.target.value)} placeholder="2023-12" />
          </div>
          <TextAreaGroup label="Summary" value={award.summary} onChange={(e: any) => updateField(`awards.${i}.summary` as any, e.target.value)} placeholder="Recognized for outstanding performance..." />
        </div>
      ))}
      <button onClick={() => addSection("awards", { title: "", awarder: "", date: "", summary: "" })} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
        <PlusCircle className="w-4 h-4" /> Add Award
      </button>
    </section>
  )
}