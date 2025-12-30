"use client";

import React, { useState, useMemo, memo } from "react";
import { useResumeStore } from "@/stores/resumeStore";
import { Resume } from "@/types/resume";

// DND Kit Imports
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import { ResumeWizard } from "@/components/builder/ResumeWizard";
import { ResumeEditor } from "@/components/builder/ResumeEditor";
import { SECTION_CONFIG } from "@/components/builder/sectionConfig";

/**
 * Properties for the ResumeForm component.
 */
interface ResumeFormProps {
  /** The ID of the currently selected template. */
  selectedTemplate: string;
}

/**
 * A composite component that provides a multi-mode interface for editing resume data.
 * Supports a guided "Wizard" mode and a free-form "Editor" mode.
 * Handles section reordering via drag-and-drop.
 * 
 * @param props - The component properties.
 */
export const ResumeForm = memo(function ResumeForm({ selectedTemplate }: ResumeFormProps) {
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

  if (mode === 'wizard') {
    return (
      <ResumeWizard
        stepIndex={stepIndex}
        activeSections={activeSections}
        sectionConfig={SECTION_CONFIG}
        selectedTemplate={selectedTemplate}
        onNext={handleNext}
        onBack={handleBack}
        onSkipToEditor={() => {
          setMode('editor');
          setExpandedSection('basics');
        }}
      />
    );
  }

  return (
    <ResumeEditor
      activeSections={activeSections}
      sectionConfig={SECTION_CONFIG}
      selectedTemplate={selectedTemplate}
      expandedSection={expandedSection}
      onToggleSection={(key) => setExpandedSection(prev => prev === key ? null : key)}
      onRestartWizard={() => setMode('wizard')}
      sensors={sensors}
      onDragEnd={handleDragEnd}
    />
  );
});

export default ResumeForm;