"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Download, LayoutDashboard, Palette, Eye, Edit3 } from "lucide-react";
import { useClientResumeStore } from "@/hooks/useClientResumeStore";
import { Resume } from "@/types/resume";
import ResumeForm from "@/components/builder/ResumeForm";
import DesignPanel from "@/components/builder/DesignPanel";
import { Template } from "@/types/template";

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

const sanitizeHtml = (html: string) => {
  if (!html) return "";
  // Very basic sanitization: strip script tags and event handlers to prevent XSS
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "")
    .replace(/on\w+='[^']*'/gi, "");
};

const bindDataToScope = (rootElement: Element, scopeData: Resume) => {
  try {
    const listContainers = Array.from(rootElement.querySelectorAll('[data-list]'));
    listContainers.forEach(container => {
      try {
        const listKey = container.getAttribute('data-list') || '';
        const listData = getValue(scopeData, listKey);
        const templateItem = container.querySelector('[data-template="item"], [data-template="sub-item"]');
        
        if (Array.isArray(listData) && templateItem) {
          const itemBlueprint = templateItem.cloneNode(true) as Element;
          itemBlueprint.removeAttribute('data-template');
          container.innerHTML = '';
          
          listData.forEach(itemData => {
            try {
              const newItem = itemBlueprint.cloneNode(true) as Element;
              const contextData = typeof itemData === 'object' ? itemData : { ui: itemData };
              bindDataToScope(newItem, contextData as Resume);
              container.appendChild(newItem);
            } catch (itemError) {
              console.error(`Error binding list item for ${listKey}:`, itemError);
            }
          });
        }
      } catch (listError) {
        console.error(`Error processing list container:`, listError);
      }
    });

    const bindElements = Array.from(rootElement.querySelectorAll('[data-bind]'));
    bindElements.forEach(el => {
      try {
        const key = el.getAttribute('data-bind') || '';
        const val = getValue(scopeData, key);
        
        if (val !== undefined && val !== null) {
          // Check if we should render as HTML or text
          const isHtml = el.hasAttribute('data-html');
          if (isHtml) {
            el.innerHTML = sanitizeHtml(String(val));
          } else {
            el.textContent = String(val);
          }
          
          // Handle attribute bindings (e.g., href)
          const attrPattern = el.getAttribute('data-attr-href');
          if (attrPattern) {
            el.setAttribute('href', attrPattern.replace(`{{${key}}}`, String(val)));
          }
        }
      } catch (bindError) {
        console.error(`Error binding element for ${el.getAttribute('data-bind')}:`, bindError);
      }
    });
  } catch (globalError) {
    console.error("Critical error in bindDataToScope:", globalError);
  }
};

const TEMPLATE_KEY = 'selectedTemplate';

// Fallback templates in case remote fetch fails
const FALLBACK_TEMPLATES: Template[] = [
  {
    id: 'classic',
    name: 'Classic Professional',
    thumbnail_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/classic.png',
    html_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/template1/classic.html?sp=r&st=2025-12-08T15:21:20Z&se=2026-12-31T23:36:20Z&sv=2024-11-04&sr=b&sig=WbOLJJAeomyrGYWsT9OmGCjM53%2F32jUhF4rE6w2l98c%3D',
    config_json_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/template1/config.json',
    css_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/template1/style.css'
  },
  {
    id: 'traditional',
    name: 'Executive Traditional',
    thumbnail_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/traditional.png',
    html_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/template2/traditional.html',
    config_json_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/template2/config.json',
    css_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/template2/style.css'
  },
  {
    id: 'modern',
    name: 'Modern Creative',
    thumbnail_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/classic.png', 
    html_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/template1/classic.html?sp=r&st=2025-12-08T15:21:20Z&se=2026-12-31T23:36:20Z&sv=2024-11-04&sr=b&sig=WbOLJJAeomyrGYWsT9OmGCjM53%2F32jUhF4rE6w2l98c%3D',
    config_json_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/template1/config.json',
    css_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/template1/style.css'
  },
  {
    id: 'minimal',
    name: 'Clean Minimalist',
    thumbnail_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/traditional.png', 
    html_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/template2/traditional.html',
    config_json_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/template2/config.json',
    css_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/template2/style.css'
  },
  {
    id: 'professional',
    name: 'Corporate Elite',
    thumbnail_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/traditional.png', 
    html_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/template2/traditional.html',
    config_json_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/template2/config.json',
    css_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/template2/style.css'
  },
  {
    id: 'sleek',
    name: 'Sleek Tech',
    thumbnail_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/classic.png',
    html_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/template1/classic.html?sp=r&st=2025-12-08T15:21:20Z&se=2026-12-31T23:36:20Z&sv=2024-11-04&sr=b&sig=WbOLJJAeomyrGYWsT9OmGCjM53%2F32jUhF4rE6w2l98c%3D',
    config_json_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/template1/config.json',
    css_sas_url: 'https://devsmrtcvstgtemplates.blob.core.windows.net/templates/template1/style.css'
  }
];

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
  const { resume, sectionOrder, selectedTemplate, setSelectedTemplate, exportSettings } = useClientResumeStore(
    useCallback((state) => ({ 
      resume: state.resume, 
      sectionOrder: state.sectionOrder, 
      selectedTemplate: state.selectedTemplate, 
      setSelectedTemplate: state.setSelectedTemplate,
      exportSettings: state.exportSettings
    }), [])
  );
  const debouncedResume = useDebounce(resume, 200);
  const debouncedSettings = useDebounce(exportSettings, 200);
  
  const [isClient, setIsClient] = useState(false);
  const [panelView, setPanelView] = useState<'edit' | 'design'>('edit');
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');
  const [rawTemplate, setRawTemplate] = useState<string | null>(null);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const { templates, setTemplates } = useClientResumeStore(useCallback((state) => ({ templates: state.templates, setTemplates: state.setTemplates }), []));

  useEffect(() => {
    setIsClient(true);
    const fetchTemplatesFromIndex = async () => {
      const templatesJsonSasUrl = process.env.NEXT_PUBLIC_TEMPLATES_JSON_URL;
      console.log("Starting template fetch from:", templatesJsonSasUrl ? "URL provided" : "No URL found");

      try {
        if (!templatesJsonSasUrl) {
          throw new Error("Templates JSON SAS URL is not defined in environment variables (NEXT_PUBLIC_TEMPLATES_JSON_URL).");
        }

        // Check for expiry in the SAS token if possible
        try {
          const url = new URL(templatesJsonSasUrl);
          const se = url.searchParams.get('se');
          if (se) {
            const expiry = new Date(se);
            const now = new Date();
            if (expiry < now) {
              console.warn(`SAS Token for templates.json appears to be expired. Expiry: ${se}, Current Time: ${now.toISOString()}`);
            }
          }
        } catch (e) {
          console.error("Error parsing SAS token URL:", e);
        }

        const templatesRes = await fetch(templatesJsonSasUrl, { 
          mode: 'cors',
          cache: 'no-cache' // Ensure we don't get a cached 403/CORS error
        });

        if (!templatesRes.ok) {
          const errorText = await templatesRes.text().catch(() => "No error body");
          throw new Error(`HTTP error fetching templates.json! status: ${templatesRes.status}, body: ${errorText}`);
        }
        
        const data: Template[] = await templatesRes.json();
        
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Invalid or empty templates data received from remote.");
        }

        console.log(`Successfully loaded ${data.length} templates from remote.`);
        setTemplates(data);

        const params = new URLSearchParams(window.location.search);
        const qp = params.get('template');
        const templateMap = data.reduce((acc, template) => {
          acc[template.id] = template;
          return acc;
        }, {} as Record<string, Template>);

        if (qp && templateMap[qp]) {
          setSelectedTemplate(qp);
        } else {
          const savedTemplate = localStorage.getItem(TEMPLATE_KEY);
          if (savedTemplate && templateMap[savedTemplate]) {
            setSelectedTemplate(savedTemplate);
          }
        }
      } catch (error) {
        console.error("Template fetch failed:", error);
        
        if (error instanceof TypeError && error.message === "Failed to fetch") {
          console.error("This is likely a CORS error or network failure. Please ensure the Azure Storage account allows origin 'http://localhost:4002' and headers 'Content-Type'.");
        }

        console.log("Falling back to hardcoded local templates...");
        setTemplates(FALLBACK_TEMPLATES);
        
        const savedTemplate = localStorage.getItem(TEMPLATE_KEY);
        const fallbackIds = FALLBACK_TEMPLATES.map(t => t.id);
        
        if (!savedTemplate || !fallbackIds.includes(savedTemplate)) {
          setSelectedTemplate(FALLBACK_TEMPLATES[0].id);
        } else {
          setSelectedTemplate(savedTemplate);
        }
      }
    };
    fetchTemplatesFromIndex();
  }, [setTemplates, setSelectedTemplate]);

  // Get the template URL from the registry
  useEffect(() => {
    const templateConfig = templates.find((t: Template) => t.id === selectedTemplate);
    
    if (templateConfig && templateConfig.html_sas_url && templateConfig.config_json_sas_url) {
      console.log(`Fetching sub-resources for template: ${selectedTemplate}`);
      
      const fetchWithTimeout = async (url: string, options = {}, timeout = 8000) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        try {
          const response = await fetch(url, {
            ...options,
            signal: controller.signal,
            mode: 'cors',
            cache: 'no-cache'
          });
          clearTimeout(id);
          return response;
        } catch (e) {
          clearTimeout(id);
          throw e;
        }
      };

      Promise.all([
        fetchWithTimeout(templateConfig.html_sas_url).then(async res => {
          if (!res.ok) {
            const body = await res.text().catch(() => "No body");
            throw new Error(`HTML fetch failed: ${res.status} - ${body}`);
          }
          return res.text();
        }),
        fetchWithTimeout(templateConfig.config_json_sas_url).then(async res => {
          if (!res.ok) {
            const body = await res.text().catch(() => "No body");
            throw new Error(`Config fetch failed: ${res.status} - ${body}`);
          }
          return res.json();
        })
      ])
      .then(([htmlContent, configData]) => {
        console.log(`Successfully loaded sub-resources for ${selectedTemplate}`);
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");

        // Find the script that loads the config and replace it
        const scriptToReplace = doc.querySelector('script');
        if (scriptToReplace) {
          const newScript = doc.createElement('script');
          newScript.textContent = `window.templateConfigData = ${JSON.stringify(configData)};`;
          scriptToReplace.parentNode?.replaceChild(newScript, scriptToReplace);
        }

        // Update CSS link hrefs to use the SAS URL
        const styleLinks = doc.querySelectorAll('link[rel="stylesheet"]');
        styleLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href && !href.startsWith('http://') && !href.startsWith('https://') && templateConfig.css_sas_url) {
            link.setAttribute('href', templateConfig.css_sas_url);
          }
        });

        const serializer = new XMLSerializer();
        setRawTemplate(serializer.serializeToString(doc));
      })
      .catch((error) => {
        console.error(`Error fetching template (${selectedTemplate}) sub-resources:`, error);
        
        // Detailed error logging for CORS
        if (error instanceof TypeError && error.message === "Failed to fetch") {
          console.error(`CORS or Network error while fetching sub-resources for ${selectedTemplate}. Check Azure Storage CORS settings.`);
        }

        // Fallback logic if it's a known template
        const fallback = FALLBACK_TEMPLATES.find(t => t.id === selectedTemplate);
        if (fallback && templateConfig.html_sas_url !== fallback.html_sas_url) {
          console.log(`Attempting to use hardcoded fallback for ${selectedTemplate}...`);
          // This would ideally trigger a re-fetch with fallback URLs, 
          // but for now we'll just log and set rawTemplate to null to show skeleton
        }
        setRawTemplate(null);
      });
    } else {
      setRawTemplate(null);
      if (selectedTemplate && templates.length > 0) {
        console.warn(`Template configuration or URL missing for: ${selectedTemplate}`, templateConfig);
      }
    }
  }, [selectedTemplate, templates]);

  useEffect(() => {
    if (!rawTemplate) return;

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawTemplate, "text/html");
      
      // Inject Export Settings Styles
      const marginMap = { narrow: '10mm', normal: '20mm', wide: '30mm' };
      const fontSizeMap = { small: '10pt', medium: '12pt', large: '14pt' };
      
      const styleTag = doc.createElement('style');
      styleTag.textContent = `
        :root {
          --primary-color: ${debouncedSettings.primaryColor};
          --font-size: ${fontSizeMap[debouncedSettings.fontSize]};
          --page-margin: ${marginMap[debouncedSettings.margins]};
        }
        @page {
          size: ${debouncedSettings.pageSize};
          margin: var(--page-margin);
        }
        body {
          font-size: var(--font-size);
          color: #1a1a1a;
          line-height: 1.5;
        }
        /* Ensure primary color is applied to elements that use it */
        .text-primary { color: var(--primary-color) !important; }
        .bg-primary { background-color: var(--primary-color) !important; }
        .border-primary { border-color: var(--primary-color) !important; }
      `;
      doc.head.appendChild(styleTag);

      bindDataToScope(doc.documentElement, debouncedResume);
      const serializer = new XMLSerializer();
      setPreviewHtml(serializer.serializeToString(doc));
    } catch (error) {
      console.error("Error generating preview:", error);
      setPreviewHtml("Error rendering preview.");
    }
  }, [rawTemplate, debouncedResume, debouncedSettings]);

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

  // --- Actions ---
  const handleDownloadPdf = () => {
    const iframe = document.querySelector('iframe');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.print();
    }
  };

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
    <main className="flex flex-col bg-gray-100 h-screen overflow-hidden text-black relative">
      {/* Mobile Toggle Bar */}
      <div className="md:hidden flex items-center justify-center p-2 bg-white border-b border-gray-200">
        <div className="flex bg-gray-100 p-1 rounded-lg w-full max-w-xs">
          <button 
            onClick={() => setMobileView('edit')}
            className={`flex items-center justify-center gap-2 flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${mobileView === 'edit' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit
          </button>
          <button 
            onClick={() => setMobileView('preview')}
            className={`flex items-center justify-center gap-2 flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
          >
            <Eye className="w-3.5 h-3.5" />
            Preview
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row grow overflow-hidden p-4 md:p-8 gap-4 md:gap-8">
        {/* LEFT PANEL */}
        <div className={`md:w-1/3 overflow-y-auto shrink-0 flex flex-col gap-4 ${mobileView === 'preview' ? 'hidden md:flex' : 'flex'}`}>
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm border border-gray-200">
            <div className="flex grow items-center bg-gray-100 p-1 rounded-lg">
              <button 
                onClick={() => setPanelView('edit')} 
                className={`flex items-center justify-center gap-2 w-1/2 py-2 rounded-md text-sm font-bold transition-all ${panelView === 'edit' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Edit
              </button>
              <button 
                onClick={() => setPanelView('design')} 
                className={`flex items-center justify-center gap-2 w-1/2 py-2 rounded-md text-sm font-bold transition-all ${panelView === 'design' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Palette className="w-4 h-4" />
                Design
              </button>
            </div>
            
            <button 
              onClick={handleDownloadPdf}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-all shadow-md active:scale-95"
              title="Download as PDF"
            >
              <Download className="w-4 h-4" />
              <span className="hidden lg:inline">Export</span>
            </button>
          </div>
          
          <div className="flex-grow">
            {panelView === 'edit' && <ResumeForm selectedTemplate={selectedTemplate} />}
            {panelView === 'design' && <DesignPanel selectedTemplate={selectedTemplate} onTemplateSelect={setSelectedTemplate} />}
          </div>
        </div>
        
        {/* RIGHT PANEL */}
        <div 
          ref={containerRef}
          className={`md:w-2/3 flex justify-center overflow-y-auto bg-gray-500/10 rounded-xl p-4 md:p-8 relative ${mobileView === 'edit' ? 'hidden md:flex' : 'flex'}`}
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