import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Resume as ResumeSummary } from '@/types/dashboard';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002/api/v1";

/**
 * Hook for managing the collection of resumes (Archive).
 */
export const useResumes = () => {
  const queryClient = useQueryClient();

  // 1. Fetch all resumes for the current user
  const { data: resumes, isLoading, error } = useQuery<ResumeSummary[]>({
    queryKey: ['resumes'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/resumes`, {
        method: "GET",
        credentials: "include"
      });

      if (!res.ok) throw new Error('Failed to fetch resumes');
      return res.json();
    }
  });

  // 2. Delete a resume
  const deleteMutation = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await fetch(`${API_BASE_URL}/resumes/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (!res.ok) throw new Error('Failed to delete resume');
      return id;
    },
    onSuccess: () => {
      // Invalidate and refetch resumes list after deletion
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    }
  });

  return {
    resumes,
    isLoading,
    error,
    deleteResume: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending
  };
};
