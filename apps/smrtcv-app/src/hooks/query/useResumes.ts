'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ResumeSummary } from '@/types/dashboard';
import { API_CONFIG } from '@/config/api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { simulateRequest } from '@/lib/mockApi';

/**
 * Interface representing the state and methods for managing a collection of resumes.
 */
export interface ResumesState {
  /** Array of resume summaries for the current user. */
  resumes: ResumeSummary[];
  /** Whether the resumes collection is currently being fetched. */
  isLoading: boolean;
  /** Any error that occurred during fetching. */
  error: Error | null;
  /** Method to delete a resume by its ID. */
  deleteResume: (id: string | number) => void;
  /** Whether a resume deletion is currently in progress. */
  isDeleting: boolean;
}

/**
 * Hook for managing a collection of resumes for the current user.
 * 
 * Provides functionality for fetching all resumes and deleting individual resumes.
 * Ideal for use in the Dashboard or Archive pages.
 * 
 * @returns {ResumesState} Resumes collection state and management methods
 * 
 * @example
 * const { resumes, deleteResume } = useResumes();
 */
export const useResumes = (): ResumesState => {
  const queryClient = useQueryClient();

  /**
   * Fetches all resumes associated with the current user.
   */
  const { data: resumes, isLoading, error } = useQuery<ResumeSummary[]>({
    queryKey: QUERY_KEYS.RESUMES,
    queryFn: async () => {
      if (API_CONFIG.USE_MOCKS) {
        return simulateRequest([
          {
            id: "1",
            name: "Senior Software Engineer",
            date: "Dec 28, 2025",
            thumbnail: "classic"
          },
          {
            id: "2",
            name: "Frontend Developer",
            date: "Dec 25, 2025",
            thumbnail: "traditional"
          },
          {
            id: "3",
            name: "Fullstack Architect",
            date: "Dec 20, 2025",
            thumbnail: "classic"
          }
        ]);
      }

      const res = await fetch(`${API_CONFIG.BASE_URL}/resumes`, {
        method: "GET",
        credentials: "include"
      });

      if (!res.ok) throw new Error('Failed to fetch resumes');
      return res.json();
    }
  });

  /**
   * Mutation for deleting a specific resume.
   */
  const deleteMutation = useMutation({
    mutationFn: async (id: string | number) => {
      if (API_CONFIG.USE_MOCKS) {
        console.log("Delete simulated for resume ID:", id);
        return simulateRequest(id);
      }

      const res = await fetch(`${API_CONFIG.BASE_URL}/resumes/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (!res.ok) throw new Error('Failed to delete resume');
      return id;
    },
    onSuccess: () => {
      // Invalidate and refetch resumes list after successful deletion
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RESUMES });
    }
  });

  return {
    resumes: resumes || [], // Ensure we always return an array
    isLoading,
    error: error as Error | null,
    deleteResume: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending
  };
};
