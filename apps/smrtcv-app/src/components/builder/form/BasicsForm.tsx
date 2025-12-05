"use client";
import { useResumeStore } from "@/stores/resumeStore";

interface Props {
  selectedTemplate: string;
}

// Reusable Input Component for consistent styling
// (You can move this to src/components/ui/Input.tsx later if you want)
const InputGroup = ({ 
  label, 
  value, 
  placeholder, 
  onChange, 
  className = "" 
}: { 
  label: string; 
  value: string; 
  placeholder?: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  className?: string;
}) => (
  <div className={`space-y-1.5 ${className}`}>
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
      {label}
    </label>
    <input
      type="text"
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm"
    />
  </div>
);

export function BasicsForm({ selectedTemplate }: Props) {
  const basics = useResumeStore((state) => state.resume.basics);
  const updateField = useResumeStore((state) => state.updateField);

  return (
    <section className="space-y-6 animate-in fade-in duration-500">
      
      {/* Photo & Name Group */}
      <div className="grid grid-cols-1 gap-4">
        <InputGroup
          label="Full Name"
          value={basics.name}
          onChange={(e) => updateField("basics.name", e.target.value)}
          placeholder="e.g. John Doe"
        />
        
        <InputGroup
          label="Job Title"
          value={basics.label}
          onChange={(e) => updateField("basics.label", e.target.value)}
          placeholder="e.g. Senior Frontend Developer"
        />
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputGroup
          label="Email"
          value={basics.email}
          onChange={(e) => updateField("basics.email", e.target.value)}
          placeholder="john@example.com"
        />
        <InputGroup
          label="Phone"
          value={basics.phone}
          onChange={(e) => updateField("basics.phone", e.target.value)}
          placeholder="+1 234 567 890"
        />
      </div>

      <InputGroup
        label="Website / LinkedIn"
        value={basics.url}
        onChange={(e) => updateField("basics.url", e.target.value)}
        placeholder="https://linkedin.com/in/johndoe"
      />

      {/* Location - Grouped logically */}
      <div className="space-y-4 pt-2 border-t border-gray-100">
        <h3 className="text-sm font-medium text-gray-900">Location</h3>
        
        {selectedTemplate === 'traditional' && (
          <InputGroup
            label="Address"
            value={basics.location?.address || ''}
            onChange={(e) => updateField("basics.location.address", e.target.value)}
            placeholder="123 Main St, Apt 4B"
          />
        )}

        <div className="grid grid-cols-2 gap-4">
          <InputGroup
            label="City"
            value={basics.location.city}
            onChange={(e) => updateField("basics.location.city", e.target.value)}
            placeholder="New York"
          />
          <InputGroup
            label="Region / State"
            value={basics.location.region}
            onChange={(e) => updateField("basics.location.region", e.target.value)}
            placeholder="NY"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {selectedTemplate === 'traditional' && (
            <InputGroup
              label="Postal Code"
              value={basics.location?.postalCode || ''}
              onChange={(e) => updateField("basics.location.postalCode", e.target.value)}
              placeholder="10001"
            />
          )}
          <InputGroup
            label="Country"
            value={basics.location.countryCode}
            onChange={(e) => updateField("basics.location.countryCode", e.target.value)}
            placeholder="United States"
          />
        </div>
        
        {selectedTemplate === 'traditional' && (
          <InputGroup
            label="Nationality"
            value={basics.nationality || ''}
            onChange={(e) => updateField("basics.nationality", e.target.value)}
            placeholder="American"
          />
        )}
      </div>

      {/* Summary Area */}
      <div className="space-y-1.5 pt-2 border-t border-gray-100">
        <div className="flex justify-between items-baseline">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Profile Summary
          </label>
          <span className="text-[10px] text-gray-400">Markdown supported</span>
        </div>
        <textarea
          value={basics.summary}
          onChange={(e) => updateField("basics.summary", e.target.value)}
          placeholder="Briefly describe your professional background..."
          className="flex min-h-[120px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                     disabled:cursor-not-allowed disabled:opacity-50 resize-y shadow-sm"
        />
      </div>
    </section>
  )
}