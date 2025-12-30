'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Resume } from '@/types/resume';
import sampleResume from '@/data/sampleResume.json';
import { API_CONFIG } from '@/config/api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { simulateRequest } from '@/lib/mockApi';

/**
 * Interface representing the state and methods for managing a single resume.
 */
export interface ResumeState {
  /** The fetched resume data, or undefined if not loaded. */
  resume: Resume | undefined;
  /** Whether the resume is currently being fetched. */
  isLoading: boolean;
  /** Any error that occurred during fetching. */
  error: Error | null;
  /** Method to update the resume data. */
  saveResume: (updatedData: Partial<Resume>) => void;
  /** Whether a resume update is currently in progress. */
  isSaving: boolean;
}

/**
 * Hook for managing a single resume's data and state.
 * 
 * Provides functionality for fetching specific resume details and saving updates.
 * Ideal for use in the Resume Builder.
 * 
 * @param {string} [id] - The unique identifier of the resume to fetch
 * @returns {ResumeState} Resume state and management methods
 * 
 * @example
 * const { resume, saveResume } = useResume('resume-id');
 */
export const useResume = (id?: string): ResumeState => {
  const queryClient = useQueryClient();

  /**
   * Fetches specific resume details based on the provided ID.
   */
  const { data: resume, isLoading, error } = useQuery<Resume>({
    queryKey: QUERY_KEYS.RESUME(id),
    queryFn: async () => {
      if (API_CONFIG.USE_MOCKS) {
        console.log("Fetch simulated for resume ID:", id);
        return simulateRequest(sampleResume as Resume);
      }

      if (!id) return null;
      const res = await fetch(`${API_CONFIG.BASE_URL}/resumes/${id}`, {
        method: "GET",
        credentials: "include"
      });

      if (!res.ok) throw new Error('Failed to fetch resume details');
      return res.json();
    },
    enabled: !!id, // Only fetch if an ID is provided
  });

  /**
   * Mutation for updating/autosaving resume data.
   */
  const updateMutation = useMutation({
    mutationFn: async (updatedData: Partial<Resume>) => {
      if (API_CONFIG.USE_MOCKS) {
        console.log("Update simulated for resume ID:", id);
        return simulateRequest({ ...resume, ...updatedData } as Resume);
      }

      if (!id) throw new Error('No resume ID provided for update');
      
      const res = await fetch(`${API_CONFIG.BASE_URL}/resumes/${id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
        credentials: "include"
      });

      if (!res.ok) throw new Error('Failed to save resume');
      return res.json();
    },
    onSuccess: (data) => {
      // Optimistically update the cache for the specific resume
      queryClient.setQueryData(QUERY_KEYS.RESUME(id), data);
    }
  });

  return {
    resume,
    isLoading,
    error: error as Error | null,
    saveResume: updateMutation.mutate,
    isSaving: updateMutation.isPending
  };
};
