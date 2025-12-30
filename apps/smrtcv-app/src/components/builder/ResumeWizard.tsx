"use client";

import React, { memo, ComponentType } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  LayoutDashboard
} from "lucide-react";
import { Resume } from "@/types/resume";

/**
 * Properties for the ResumeWizard component.
 */
interface ResumeWizardProps {
  /** The index of the current step in the wizard. */
  stepIndex: number;
  /** Array of active resume section keys. */
  activeSections: (keyof Resume)[];
  /** Configuration for each resume section, including titles and components. */
  sectionConfig: Record<keyof Resume, { title: string; component: ComponentType<{ selectedTemplate: string }> }>;
  /** The ID of the currently selected template. */
  selectedTemplate: string;
  /** Callback function to proceed to the next step. */
  onNext: () => void;
  /** Callback function to go back to the previous step. */
  onBack: () => void;
  /** Callback function to skip the wizard and go directly to the editor. */
  onSkipToEditor: () => void;
}

/**
 * A guided, step-by-step interface for the resume builder.
 * Walks users through each section of the resume sequentially.
 * Optimized with React.memo to ensure smooth transitions between steps.
 * 
 * @example
 * <ResumeWizard 
 *   stepIndex={0} 
 *   activeSections={sections} 
 *   sectionConfig={config}
 *   ... 
 * />
 * 
 * @param props - Component properties.
 */
export const ResumeWizard = memo(function ResumeWizard({
  stepIndex,
  activeSections,
  sectionConfig,
  selectedTemplate,
  onNext,
  onBack,
  onSkipToEditor,
}: ResumeWizardProps) {
  const currentSectionKey = activeSections[stepIndex];
  const { title, component: CurrentComponent } = sectionConfig[currentSectionKey];
  const progress = ((stepIndex + 1) / activeSections.length) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full max-h-[calc(100vh-140px)]">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {title}
          </h2>
          <button 
            onClick={onSkipToEditor} 
            className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1"
            aria-label="Skip to overview"
          >
            <LayoutDashboard className="w-3 h-3" />
            Skip to Overview
          </button>
        </div>
        <div 
          className="w-full bg-gray-100 rounded-full h-2"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-gray-400 mt-2 text-right">Step {stepIndex + 1} of {activeSections.length}</p>
      </div>
      <div className="flex-grow overflow-y-auto p-6">
        <CurrentComponent selectedTemplate={selectedTemplate} />
      </div>
      <div className="p-6 border-t border-gray-100 flex justify-between bg-gray-50 rounded-b-xl">
        <button
          onClick={onBack}
          disabled={stepIndex === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200 disabled:opacity-50"
          aria-label="Previous step"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md"
          aria-label={stepIndex === activeSections.length - 1 ? "Finish" : "Next step"}
        >
          {stepIndex === activeSections.length - 1 ? "Finish" : "Next"}
          {stepIndex === activeSections.length - 1 ? <CheckCircle className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
});
