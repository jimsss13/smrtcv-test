"use client";

// This interface defines the props this component expects
interface DesignPanelProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

// Define the templates based on the user's image
const templates = [
  { id: 'classic', name: 'Classic' },
  { id: 'traditional', name: 'Traditional' },
  { id: 'professional', name: 'Professional' },
  { id: 'prime_ats', name: 'Prime ATS' },
  { id: 'pure_ats', name: 'Pure ATS' },
  { id: 'specialist', name: 'Specialist' },
  { id: 'clean', name: 'Clean' },
  { id: 'simple_ats', name: 'Simple ATS' },
];

export default function DesignPanel({ selectedTemplate, onTemplateSelect }: DesignPanelProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-full overflow-y-auto">
      {/* Header section from the image */}
      <h2 className="text-lg font-semibold mb-6">Templates</h2>

      {/* Grid of templates */}
      <div className="grid grid-cols-2 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateSelect(template.id)}
            className={`border-2 rounded-lg p-2 transition-colors relative group ${
              selectedTemplate === template.id
                ? 'border-blue-500' // Highlight if selected
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            {/* Placeholder for template thumbnail */}
            <div className="bg-gray-200 h-32 w-full rounded flex items-center justify-center text-gray-500 text-sm">
              {template.name}
            </div>
            
            {/* Checkmark from image */}
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {/* Checkmark SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}