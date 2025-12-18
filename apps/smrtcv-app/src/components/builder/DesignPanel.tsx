"use client";

import { useCallback } from 'react';
import Image from "next/image";
import { useClientResumeStore } from "@/hooks/useClientResumeStore";
import { Template } from "@/types/template";
import TemplateCard from "./TemplateCard";

interface DesignPanelProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

export default function DesignPanel({ selectedTemplate, onTemplateSelect }: DesignPanelProps) {
  const { templates } = useClientResumeStore(useCallback((state) => ({ templates: state.templates }), []));

  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-full overflow-y-auto flex flex-col">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Choose a Template</h2>

      <div className="grid grid-cols-2 gap-4 pb-4">
        {templates.map((template: Template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplate === template.id}
            onSelect={onTemplateSelect}
          />
        ))}
      </div>
    </div>
  );
}