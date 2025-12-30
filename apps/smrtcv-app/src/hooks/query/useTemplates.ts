'use client';

import { useQuery } from '@tanstack/react-query';
import { Template } from '@/types/dashboard';
import { API_CONFIG } from '@/config/api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { simulateRequest } from '@/lib/mockApi';

/**
 * Interface representing the state for resume templates.
 */
export interface TemplatesState {
  /** Array of available resume templates. */
  templates: Template[];
  /** Whether the templates are currently being fetched. */
  isLoading: boolean;
  /** Any error that occurred during fetching. */
  error: Error | null;
}

/**
 * Hook for fetching available resume templates.
 * 
 * @returns {TemplatesState} Templates state
 */
export const useTemplates = (): TemplatesState => {
  const { data: templates, isLoading, error } = useQuery<Template[]>({
    queryKey: QUERY_KEYS.TEMPLATES,
    queryFn: async () => {
      if (API_CONFIG.USE_MOCKS) {
        return simulateRequest([
          { 
            id: "classic",
            name: "Classic Professional", 
            users: "45,000",
            description: "Timeless and elegant, perfect for traditional industries like Law and Finance.",
            color: "bg-blue-600",
            popular: true
          },
          { 
            id: "modern",
            name: "Modern Minimalist", 
            users: "32,000",
            description: "Clean lines and plenty of white space for a contemporary, tech-focused look.",
            color: "bg-emerald-600"
          },
          { 
            id: "traditional",
            name: "Traditional Executive", 
            users: "18,000",
            description: "Structured and dense, ideal for senior leaders with extensive experience.",
            color: "bg-slate-800"
          },
        ]);
      }

      const res = await fetch(`${API_CONFIG.BASE_URL}/templates`, {
        method: "GET",
        credentials: "include"
      });

      if (!res.ok) throw new Error('Failed to fetch templates');
      return res.json();
    }
  });

  return {
    templates: templates || [],
    isLoading,
    error: error as Error | null
  };
};
