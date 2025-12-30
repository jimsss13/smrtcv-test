"use client";

import React, { memo, ComponentType } from "react";
import { Resume } from "@/types/resume";
import {
  DndContext,
  closestCenter,
  SensorDescriptor,
  SensorOptions,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DraggableAccordion } from "@/components/builder/DraggableAccordion";

/**
 * Properties for the ResumeEditor component.
 */
interface ResumeEditorProps {
  /** Array of active resume section keys. */
  activeSections: (keyof Resume)[];
  /** Configuration for each resume section, including titles and components. */
  sectionConfig: Record<keyof Resume, { title: string; component: ComponentType<{ selectedTemplate: string }> }>;
  /** The ID of the currently selected template. */
  selectedTemplate: string;
  /** The key of the currently expanded section in the accordion. */
  expandedSection: keyof Resume | null;
  /** Callback function to toggle the expansion state of a section. */
  onToggleSection: (key: keyof Resume) => void;
  /** Callback function to switch back to the wizard mode. */
  onRestartWizard: () => void;
  /** Drag-and-drop sensor descriptors for reordering sections. */
  sensors: SensorDescriptor<SensorOptions>[];
  /** Callback function triggered when a drag-and-drop operation ends. */
  onDragEnd: (event: DragEndEvent) => void;
}

/**
 * A free-form editor for the resume builder.
 * Allows users to reorder sections via drag-and-drop and edit section content in accordions.
 * Optimized with React.memo for smooth drag-and-drop performance.
 * 
 * @example
 * <ResumeEditor 
 *   activeSections={sections} 
 *   sectionConfig={config} 
 *   selectedTemplate="modern"
 *   ... 
 * />
 * 
 * @param props - Component properties.
 */
export const ResumeEditor = memo(function ResumeEditor({
  activeSections,
  sectionConfig,
  selectedTemplate,
  expandedSection,
  onToggleSection,
  onRestartWizard,
  sensors,
  onDragEnd,
}: ResumeEditorProps) {
  return (
    <div className="h-full max-h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <div className="mb-4 flex justify-between items-end px-1">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Edit Resume</h2>
          <p className="text-sm text-gray-500">Drag sections to reorder • Expand to edit</p>
        </div>
        <button 
          onClick={onRestartWizard}
          className="text-xs text-blue-600 hover:underline font-medium"
          aria-label="Restart wizard"
        >
          Restart Wizard
        </button>
      </div>

      {/* Scrollable Accordion List */}
      <div className="flex-grow overflow-y-auto pr-2 pb-10">
        <DndContext 
          sensors={sensors} 
          collisionDetection={closestCenter} 
          onDragEnd={onDragEnd}
        >
          <SortableContext 
            items={activeSections} 
            strategy={verticalListSortingStrategy}
          >
            {activeSections.map((key) => {
              const { title, component: Component } = sectionConfig[key];
              return (
                <DraggableAccordion
                  key={key}
                  id={key}
                  title={title}
                  isOpen={expandedSection === key}
                  onToggle={() => onToggleSection(key)}
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
});
