"use client";

import { useState, useEffect, useRef } from "react";
import { useResumeStore } from "@/stores/resumeStore";
import { Resume } from "@/types/resume";
import ResumeForm from "@/components/builder/ResumeForm";
import DesignPanel from "@/components/builder/DesignPanel";
import { TEMPLATE_REGISTRY } from "@/lib/templates";

const getValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const bindDataToScope = (rootElement: Element, scopeData: Resume) => {
  const listContainers = Array.from(rootElement.querySelectorAll('[data-list]'));
  listContainers.forEach(container => {
    const listKey = container.getAttribute('data-list') || '';
    const listData = getValue(scopeData, listKey);
    const templateItem = container.querySelector('[data-template="item"], [data-template="sub-item"]');
    if (Array.isArray(listData) && templateItem) {
      const itemBlueprint = templateItem.cloneNode(true) as Element;
      itemBlueprint.removeAttribute('data-template');
      container.innerHTML = '';
      listData.forEach(itemData => {
        const newItem = itemBlueprint.cloneNode(true) as Element;
        const contextData = typeof itemData === 'object' ? itemData : { ui: itemData };
        bindDataToScope(newItem, contextData as Resume);
        container.appendChild(newItem);
      });
    }
  });
  const bindElements = Array.from(rootElement.querySelectorAll('[data-bind]'));
  bindElements.forEach(el => {
    const key = el.getAttribute('data-bind') || '';
    const val = getValue(scopeData, key);
    if (val !== undefined) {
      el.textContent = val;
      const attrPattern = el.getAttribute('data-attr-href');
      if (attrPattern) el.setAttribute('href', attrPattern.replace(`{{${key}}}`, val));
    }
  });
};

const TEMPLATE_KEY = 'selectedTemplate';

// --- Loading Skeleton Component ---
function ResumePreviewSkeleton() {
  return (
    <div className="p-10 h-full w-full bg-white animate-pulse flex flex-col gap-6">
      {/* Header Area */}
      <div className="space-y-3">
        <div className="h-8 w-1/3 bg-gray-200 rounded" />
        <div className="h-4 w-1/4 bg-gray-200 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 rounded mt-2" />
      </div>
      
      {/* Content Blocks */}
      <div className="grid grid-cols-1 gap-8 mt-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-5 w-32 bg-gray-200 rounded border-b border-gray-300 pb-1" />
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-5/6 bg-gray-100 rounded" />
            <div className="h-4 w-4/6 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BuilderPage() {
  const { resume, sectionOrder } = useResumeStore((state) => state);
  const debouncedResume = useDebounce(resume, 200);
  
  const [isClient, setIsClient] = useState(false);
  const [panelView, setPanelView] = useState<'edit' | 'design'>('edit');
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [rawTemplate, setRawTemplate] = useState<string | null>(null);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);



  useEffect(() => {
    setIsClient(true);
    const params = new URLSearchParams(window.location.search);
    const qp = params.get('template');
    if (qp && TEMPLATE_REGISTRY[qp]) {
      setSelectedTemplate(qp);
      localStorage.setItem(TEMPLATE_KEY, qp);
    } else {
      const savedTemplate = localStorage.getItem(TEMPLATE_KEY);
      if (savedTemplate) {
        setSelectedTemplate(savedTemplate);
      }
    }
  }, []);

  // Get the template URL from the registry
  useEffect(() => {
    const templateConfig = TEMPLATE_REGISTRY[selectedTemplate];
    if (templateConfig && templateConfig.templateUrl) {
      fetch(templateConfig.templateUrl)
        .then((res) => res.text())
        .then(setRawTemplate)
        .catch((error) => console.error("Error fetching template:", error));
    } else {
      setRawTemplate(null); // Clear template if not found
      console.error(`Template configuration or URL not found for: ${selectedTemplate}`);
    }
  }, [selectedTemplate]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(TEMPLATE_KEY, selectedTemplate);
    }
  }, [selectedTemplate, isClient]);

  useEffect(() => {
    if (!rawTemplate) return;

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawTemplate, "text/html");
      bindDataToScope(doc.documentElement, debouncedResume);
      const serializer = new XMLSerializer();
      setPreviewHtml(serializer.serializeToString(doc));
    } catch (error) {
      console.error("Error generating preview:", error);
      setPreviewHtml("Error rendering preview.");
    }
  }, [rawTemplate, debouncedResume]);

  // --- Scaling Logic ---
  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.clientWidth;
      const padding = 48; 
      const availableWidth = containerWidth - padding;
      // A4 width in pixels (96 DPI) -> 210mm * 3.7795 approx 794px
      const standardWidth = 794;

      if (availableWidth < standardWidth) {
        setScale(availableWidth / standardWidth);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  // --- Render Strategy ---
  const renderPreviewContent = () => {
    if (!isClient || !previewHtml) {
      return <ResumePreviewSkeleton />;
    }

    return (
      <iframe
        title="Resume Preview"
        srcDoc={previewHtml}
        className="w-full h-full border-none bg-white"
        style={{ transformOrigin: 'top left' }}
      />
    );
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
        <div 
          ref={containerRef}
          className="md:w-2/3 flex justify-center overflow-y-auto bg-gray-500/10 rounded-xl p-8 relative"
        >
          {/* A4 PAPER WRAPPER */}
          <div
            className="origin-top transition-transform duration-200 ease-out bg-white shadow-2xl print:shadow-none print:transform-none print:m-0"
            style={{ 
              transform: `scale(${scale})`,
              width: '210mm',
              minHeight: '297mm'
            }}
          >
            {renderPreviewContent()}
          </div>
        </div>
      </div>
    </main>
  );
}