import { useState, useEffect } from 'react';
import { TEMPLATE_REGISTRY } from '@/lib/templates';
import { STORAGE_KEY_SELECTED_TEMPLATE } from '@/constants/storage';

/**
 * Custom hook to manage the selected resume template in the builder.
 * 
 * This hook synchronizes the selected template state with:
 * 1. URL search parameters (e.g., ?template=classic)
 * 2. Local storage for persistence across sessions
 * 
 * @param {boolean} isClient - Whether the component is rendered on the client
 * @returns {readonly [string, (template: string) => void]} A tuple containing the selected template ID and a setter function
 * 
 * @example
 * const [template, setTemplate] = useBuilderTemplate(true);
 * return <TemplateSelector value={template} onChange={setTemplate} />;
 */
export function useBuilderTemplate(
  isClient: boolean
): readonly [string, (template: string) => void] {
  const [selectedTemplate, setSelectedTemplate] = useState('classic');

  useEffect(() => {
    if (!isClient) return;

    const params = new URLSearchParams(window.location.search);
    const queryParamTemplate = params.get('template');
    
    if (queryParamTemplate && queryParamTemplate in TEMPLATE_REGISTRY) {
      setSelectedTemplate(queryParamTemplate);
      localStorage.setItem(STORAGE_KEY_SELECTED_TEMPLATE, queryParamTemplate);
    } else {
      const savedTemplate = localStorage.getItem(STORAGE_KEY_SELECTED_TEMPLATE);
      if (savedTemplate && savedTemplate in TEMPLATE_REGISTRY) {
        setSelectedTemplate(savedTemplate);
      }
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(STORAGE_KEY_SELECTED_TEMPLATE, selectedTemplate);
    }
  }, [selectedTemplate, isClient]);

  return [selectedTemplate, setSelectedTemplate] as const;
}
