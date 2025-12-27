import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Resume } from '@/types/resume';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002/api/v1";

/**
 * Hook for managing a single resume (Builder).
 */
export const useResume = (id?: string) => {
  const queryClient = useQueryClient();

  // 1. Fetch specific resume details
  const { data: resume, isLoading, error } = useQuery<Resume>({
    queryKey: ['resume', id],
    queryFn: async () => {
      if (!id) return null;
      const res = await fetch(`${API_BASE_URL}/resumes/${id}`, {
        method: "GET",
        credentials: "include"
      });

      if (!res.ok) throw new Error('Failed to fetch resume details');
      return res.json();
    },
    enabled: !!id, // Only fetch if an ID is provided
  });

  // 2. Update/Autosave resume
  const updateMutation = useMutation({
    mutationFn: async (updatedData: Partial<Resume>) => {
      if (!id) throw new Error('No resume ID provided for update');
      
      const res = await fetch(`${API_BASE_URL}/resumes/${id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
        credentials: "include"
      });

      if (!res.ok) throw new Error('Failed to save resume');
      return res.json();
    },
    onSuccess: (data) => {
      // Optimistically update the cache
      queryClient.setQueryData(['resume', id], data);
    }
  });

  return {
    resume,
    isLoading,
    error,
    saveResume: updateMutation.mutate,
    isSaving: updateMutation.isPending
  };
};
