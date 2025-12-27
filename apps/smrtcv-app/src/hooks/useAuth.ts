'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '@/types/dashboard';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002/api/v1";

/**
 * Hook to manage user authentication using TanStack Query.
 */
export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: ['auth-user'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/users/me`, {
        method: "GET",
        credentials: "include"
      });

      if (!res.ok) {
        throw new Error('Failed to fetch user session');
      }

      const data = await res.json();
      
      return {
        id: data.id || "1",
        name: data.name || "User",
        email: data.email || "user@example.com",
        avatar: data.avatar
      };
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: false,
  });

  const logout = () => {
    queryClient.setQueryData(['auth-user'], null);
    window.location.href = '/signin';
  };

  return { 
    user, 
    loading: isLoading, 
    error,
    logout 
  };
};
