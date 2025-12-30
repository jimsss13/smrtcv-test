import React from 'react';
import { GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface DraggableAccordionProps {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

/**
 * DraggableAccordion component for the resume form.
 * Supports drag-and-drop reordering and collapsible content.
 */
export function DraggableAccordion({ 
  id, 
  title, 
  isOpen, 
  onToggle, 
  children 
}: DraggableAccordionProps) {
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
