"use client";

import React, { memo } from "react";
import Image from "next/image";
import { TEMPLATE_REGISTRY } from "@/lib/templates";

/**
 * Properties for the DesignPanel component.
 */
interface DesignPanelProps {
  /** The ID of the currently selected template. */
  selectedTemplate: string;
  /** Callback function triggered when a template is selected. */
  onTemplateSelect: (templateId: string) => void;
}

/**
 * A panel for selecting resume templates.
 * Displays a grid of available templates with thumbnails and selection indicators.
 * Optimized for performance with React.memo to prevent unnecessary re-renders.
 * 
 * @example
 * <DesignPanel 
 *   selectedTemplate="modern" 
 *   onTemplateSelect={(id) => setTemplate(id)} 
 * />
 * 
 * @param props - Component properties.
 */
export const DesignPanel = memo(function DesignPanel({ selectedTemplate, onTemplateSelect }: DesignPanelProps) {
  // Convert Registry to Array for rendering
  const availableTemplates = Object.values(TEMPLATE_REGISTRY);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-full overflow-y-auto flex flex-col">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Choose a Template</h2>

      <div className="grid grid-cols-2 gap-4 pb-4">
        {availableTemplates.map((template) => {
          const isSelected = selectedTemplate === template.id;

          return (
            <button
              key={template.id}
              onClick={() => onTemplateSelect(template.id)}
              aria-pressed={isSelected}
              aria-label={`Select ${template.name} template`}
              className={`
                group relative flex flex-col items-center rounded-lg border-2 transition-all overflow-hidden
                ${isSelected 
                  ? 'border-blue-600 ring-2 ring-blue-100 ring-offset-2' 
                  : 'border-transparent hover:border-gray-200 hover:shadow-lg'
                }
              `}
            >
              {/* Thumbnail Image */}
              <div className="relative w-full aspect-[210/297] bg-gray-100">
                {template.thumbnail ? (
                  <Image
                    src={template.thumbnail}
                    alt={`${template.name} preview`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className={`object-cover object-top transition-transform duration-500 ${isSelected ? 'scale-105' : 'group-hover:scale-105'}`}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400 text-xs uppercase tracking-widest font-medium">
                    No Preview
                  </div>
                )}

                {/* Selected Overlay/Checkmark */}
                {isSelected && (
                  <div className="absolute inset-0 bg-blue-600/10 z-10 flex items-center justify-center">
                    <div className="bg-blue-600 text-white rounded-full p-1.5 shadow-sm transform scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Template Name Footer */}
              <div className="w-full bg-white p-3 text-center border-t border-gray-100">
                <span className={`text-sm font-medium ${isSelected ? 'text-blue-600' : 'text-gray-700'}`}>
                  {template.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
});

export default DesignPanel;