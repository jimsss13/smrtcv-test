"use client";
import { PlusCircle, Trash2 } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";

const InputGroup = ({ label, value, placeholder, onChange, className = "" }: any) => (
  <div className={`space-y-1.5 ${className}`}>
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
    <input
      type="text"
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
    />
  </div>
);

const TextAreaGroup = ({ label, value, placeholder, onChange, className = "" }: any) => (
  <div className={`space-y-1.5 ${className}`}>
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
    <textarea
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="flex min-h-[80px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y shadow-sm"
    />
  </div>
);

export function WorkForm() {
  const { work } = useResumeStore((state) => state.resume);
  const { updateField, addSection, removeSection } = useResumeStore();

  return (
    <section className="space-y-6 animate-in fade-in duration-500">
      {(work || []).map((job, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4 relative group">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-800">Position #{i + 1}</h3>
            {work.length > 1 && (
              <button onClick={() => removeSection("work", i)} className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <InputGroup label="Company Name" value={job.name} onChange={(e: any) => updateField(`work.${i}.name`, e.target.value)} placeholder="e.g. Acme Corp" />
          <InputGroup label="Job Title" value={job.position} onChange={(e: any) => updateField(`work.${i}.position`, e.target.value)} placeholder="e.g. Senior Product Manager" />
          
          <div className="grid grid-cols-2 gap-4">
            <InputGroup label="Start Date" value={job.startDate} onChange={(e: any) => updateField(`work.${i}.startDate`, e.target.value)} placeholder="2022-03" />
            <InputGroup label="End Date" value={job.endDate} onChange={(e: any) => updateField(`work.${i}.endDate`, e.target.value)} placeholder="Present" />
          </div>

          <InputGroup label="Company Website" value={job.url} onChange={(e: any) => updateField(`work.${i}.url`, e.target.value)} placeholder="https://acme.com" />
          
          <TextAreaGroup label="Summary & Achievements" value={job.summary} onChange={(e: any) => updateField(`work.${i}.summary`, e.target.value)} placeholder="Led a team of 5 developers..." />
        </div>
      ))}
      <button 
        onClick={() => addSection("work", { name: "", position: "", url: "", startDate: "", endDate: "", summary: "", highlights: [] })} 
        className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
      >
        <PlusCircle className="w-4 h-4" /> Add Employment
      </button>
    </section>
  )
}