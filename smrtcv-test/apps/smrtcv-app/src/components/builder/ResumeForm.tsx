"use client";

import { useState, useMemo } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  GripVertical, 
  ChevronDown, 
  ChevronUp,
  LayoutDashboard
} from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";
import { Resume } from "@/types/resume";

// DND Kit Imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Import All Form Components
import { BasicsForm } from "@/components/builder/form/BasicsForm";
import { WorkForm } from "@/components/builder/form/WorkForm";
import { EducationForm } from "@/components/builder/form/EducationForm";
import { AdvisoryForm } from "@/components/builder/form/AdvisoryForm";
import { SkillsForm } from "@/components/builder/form/SkillsForm";
import { LanguagesForm } from "@/components/builder/form/LanguagesForm";
import { InterestsForm } from "@/components/builder/form/InterestsForm";
import { ProjectsForm } from "@/components/builder/form/ProjectsForm";
import { AwardsForm } from "@/components/builder/form/AwardsForm";
import { CertificatesForm } from "@/components/builder/form/CertificatesForm";
import { PublicationsForm } from "@/components/builder/form/PublicationsForm";
import { VolunteerForm } from "@/components/builder/form/VolunteerForm";
import { ReferencesForm } from "@/components/builder/form/ReferencesForm";

interface Props {
  selectedTemplate: string;
}

// Configuration mapping keys to Titles and Components
const SECTION_CONFIG: Record<keyof Resume, { title: string; component: any }> = {
  basics: { title: "Personal Details", component: BasicsForm },
  work: { title: "Employment History", component: WorkForm },
  education: { title: "Education", component: EducationForm },
  skills: { title: "Skills", component: SkillsForm },
  projects: { title: "Projects", component: ProjectsForm },
  awards: { title: "Awards", component: AwardsForm },
  certificates: { title: "Certificates", component: CertificatesForm },
  languages: { title: "Languages", component: LanguagesForm },
  interests: { title: "Interests", component: InterestsForm },
  publications: { title: "Publications", component: PublicationsForm },
  volunteer: { title: "Volunteer Experience", component: VolunteerForm },
  references: { title: "References", component: ReferencesForm },
  advisory: { title: "Advisory Roles", component: AdvisoryForm },
};

// --- Draggable Accordion Item Component ---
interface AccordionProps {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function DraggableAccordion({ id, title, isOpen, onToggle, children }: AccordionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : 1,
    position: 'relative' as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mb-4 rounded-xl border transition-all bg-white shadow-sm ${
        isDragging ? 'shadow-2xl scale-105 ring-2 ring-blue-500 opacity-90' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Header Row */}
      <div 
        className={`flex items-center p-4 select-none ${isOpen ? 'border-b border-gray-100' : ''}`}
      >
        {/* Drag Handle */}
        <button 
          {...attributes} 
          {...listeners} 
          className="p-2 mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded cursor-grab active:cursor-grabbing transition-colors"
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-5 h-5" />
        </button>

        {/* Title & Toggle Area */}
        <div 
          className="flex-grow flex items-center justify-between cursor-pointer"
          onClick={onToggle}
        >
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-800">{title}</span>
            {!isOpen && (
              <span className="text-xs text-gray-400 font-medium">Click to expand</span>
            )}
          </div>
          
          <button className="text-gray-400 hover:text-blue-600 transition-colors">
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Content Body */}
      {isOpen && (
        <div className="p-5 bg-gray-50/50 rounded-b-xl animate-accordion-down">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ResumeForm({ selectedTemplate }: Props) {
  const { sectionOrder, reorderSections } = useResumeStore();
  
  // Modes: Wizard (Guided) vs Editor (Free-form)
  const [mode, setMode] = useState<'wizard' | 'editor'>('wizard');
  
  // Wizard State
  const [stepIndex, setStepIndex] = useState(0);
  
  // Editor State: Track which accordion is open
  const [expandedSection, setExpandedSection] = useState<keyof Resume | null>('basics');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Filter sections based on the active template
  const activeSections = useMemo(() => {
    return sectionOrder.filter(key => {
      if (selectedTemplate !== 'traditional' && key === 'advisory') return false;
      return true;
    });
  }, [sectionOrder, selectedTemplate]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = sectionOrder.indexOf(active.id as keyof Resume);
      const newIndex = sectionOrder.indexOf(over?.id as keyof Resume);
      reorderSections(arrayMove(sectionOrder, oldIndex, newIndex));
    }
  };

  // --- Wizard Handlers ---
  const handleNext = () => {
    if (stepIndex < activeSections.length - 1) {
      setStepIndex(s => s + 1);
    } else {
      setMode('editor');
      setExpandedSection('basics');
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex(s => s - 1);
  };

  // --- RENDER: WIZARD MODE ---
  if (mode === 'wizard') {
    const currentSectionKey = activeSections[stepIndex];
    const CurrentComponent = SECTION_CONFIG[currentSectionKey].component;
    const progress = ((stepIndex + 1) / activeSections.length) * 100;

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full max-h-[calc(100vh-140px)]">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {SECTION_CONFIG[currentSectionKey].title}
            </h2>
            <button 
              onClick={() => setMode('editor')} 
              className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1"
            >
              <LayoutDashboard className="w-3 h-3" />
              Skip to Overview
            </button>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-2 text-right">Step {stepIndex + 1} of {activeSections.length}</p>
        </div>
        <div className="flex-grow overflow-y-auto p-6">
          <CurrentComponent selectedTemplate={selectedTemplate} />
        </div>
        <div className="p-6 border-t border-gray-100 flex justify-between bg-gray-50 rounded-b-xl">
          <button
            onClick={handleBack}
            disabled={stepIndex === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200 disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md"
          >
            {stepIndex === activeSections.length - 1 ? "Finish" : "Next"}
            {stepIndex === activeSections.length - 1 ? <CheckCircle className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    );
  }

  // --- RENDER: EDITOR MODE (Accordion List) ---
  return (
    <div className="h-full max-h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <div className="mb-4 flex justify-between items-end px-1">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Edit Resume</h2>
          <p className="text-sm text-gray-500">Drag sections to reorder • Expand to edit</p>
        </div>
        <button 
          onClick={() => setMode('wizard')}
          className="text-xs text-blue-600 hover:underline font-medium"
        >
          Restart Wizard
        </button>
      </div>

      {/* Scrollable Accordion List */}
      <div className="flex-grow overflow-y-auto pr-2 pb-10">
        <DndContext 
          sensors={sensors} 
          collisionDetection={closestCenter} 
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={activeSections} 
            strategy={verticalListSortingStrategy}
          >
            {activeSections.map((key) => {
              const { title, component: Component } = SECTION_CONFIG[key];
              return (
                <DraggableAccordion
                  key={key}
                  id={key}
                  title={title}
                  isOpen={expandedSection === key}
                  onToggle={() => setExpandedSection(prev => prev === key ? null : key)}
                >
                  <Component selectedTemplate={selectedTemplate} />
                </DraggableAccordion>
              );
            })}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}