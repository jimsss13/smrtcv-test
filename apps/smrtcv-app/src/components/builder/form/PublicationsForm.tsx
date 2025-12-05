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

export function PublicationsForm() {
  const { publications } = useResumeStore((state) => state.resume);
  const { updateField, addSection, removeSection } = useResumeStore();

  return (
    <section className="space-y-6 animate-in fade-in duration-500">
      {(publications || []).map((pub, i) => (
        <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-gray-800">Publication #{i + 1}</h3>
            {publications && publications.length > 1 && (
              <button onClick={() => removeSection("publications", i)} className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <InputGroup label="Title" value={pub.name} onChange={(e: any) => updateField(`publications.${i}.name` as any, e.target.value)} placeholder="e.g. Advanced React Patterns" />
          <div className="grid grid-cols-2 gap-4">
            <InputGroup label="Publisher" value={pub.publisher} onChange={(e: any) => updateField(`publications.${i}.publisher` as any, e.target.value)} placeholder="e.g. Medium" />
            <InputGroup label="Date" value={pub.releaseDate} onChange={(e: any) => updateField(`publications.${i}.releaseDate` as any, e.target.value)} placeholder="2024-01" />
          </div>
          <InputGroup label="URL" value={pub.url} onChange={(e: any) => updateField(`publications.${i}.url` as any, e.target.value)} placeholder="https://..." />
          <TextAreaGroup label="Summary" value={pub.summary} onChange={(e: any) => updateField(`publications.${i}.summary` as any, e.target.value)} placeholder="A deep dive into..." />
        </div>
      ))}
      <button onClick={() => addSection("publications", { name: "", publisher: "", releaseDate: "", url: "", summary: "" })} className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
        <PlusCircle className="w-4 h-4" /> Add Publication
      </button>
    </section>
  )
}