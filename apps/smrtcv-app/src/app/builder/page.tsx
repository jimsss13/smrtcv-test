"use client";

import { useState, useEffect, useRef } from "react";
import { useResumeStore } from "@/stores/resumeStore";
import ResumeForm from "@/components/builder/ResumeForm";
import DesignPanel from "@/components/builder/DesignPanel";
import { ResumePreviewSkeleton } from "@/components/builder/ResumePreviewSkeleton";
import { ResumePreviewContainer } from "@/components/builder/ResumePreviewContainer";
import { getTemplateComponent } from "@/lib/templates";
import { useBuilderScale } from "@/hooks/useBuilderScale";
import { useBuilderTemplate } from "@/hooks/useBuilderTemplate";

/**
 * Builder Page.
 * Main interface for creating and editing resumes.
 * Features a split-pane layout with a form/design panel on the left and a live preview on the right.
 */
export default function BuilderPage() {
  const { resume, sectionOrder } = useResumeStore((state) => state);
  
  const [isClient, setIsClient] = useState(false);
  const [panelView, setPanelView] = useState<'edit' | 'design'>('edit');
  
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [selectedTemplate, setSelectedTemplate] = useBuilderTemplate(isClient);
  const scale = useBuilderScale(containerRef, isClient);

  // --- Render Strategy ---
  const renderPreviewContent = () => {
    if (!isClient) {
      return <ResumePreviewSkeleton />;
    }

    const TemplateComponent = getTemplateComponent(selectedTemplate);
    return <TemplateComponent data={resume} sectionOrder={sectionOrder} />;
  };

  return (
    <main className="flex flex-col gap-8 p-8 bg-gray-100 h-[calc(100vh-64px)] overflow-hidden text-black">
      <div className="flex flex-col md:flex-row gap-8 flex-grow overflow-hidden">
        {/* LEFT PANEL */}
        <div className="md:w-1/3 overflow-y-auto flex-shrink-0">
          <div className="flex items-center justify-center mb-4 bg-gray-200 p-1 rounded-lg">
            <button 
              onClick={() => setPanelView('edit')} 
              className={`w-1/2 py-2 rounded-md font-semibold transition-colors ${panelView === 'edit' ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:bg-gray-300'}`}
            >
              Edit
            </button>
            <button 
              onClick={() => setPanelView('design')} 
              className={`w-1/2 py-2 rounded-md font-semibold transition-colors ${panelView === 'design' ? 'bg-white text-blue-600 shadow' : 'text-gray-600 hover:bg-gray-300'}`}
            >
              Templates
            </button>
          </div>
          
          {panelView === 'edit' && <ResumeForm selectedTemplate={selectedTemplate} />}
          {panelView === 'design' && <DesignPanel selectedTemplate={selectedTemplate} onTemplateSelect={setSelectedTemplate} />}
        </div>
        
        {/* RIGHT PANEL */}
        <ResumePreviewContainer
          containerRef={containerRef}
          scale={scale}
        >
          {renderPreviewContent()}
        </ResumePreviewContainer>
      </div>
    </main>
  );
}