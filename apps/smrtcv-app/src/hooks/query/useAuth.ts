'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '@/types/dashboard';
import { ROUTES } from '@/constants/routes';
import { API_CONFIG } from '@/config/api';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { simulateRequest } from '@/lib/mockApi';

/**
 * Interface representing the authentication state and methods.
 */
export interface AuthState {
  /** The current authenticated user, or undefined if not logged in or loading. */
  user: User | undefined;
  /** Whether the user session is currently being fetched. */
  isLoading: boolean;
  /** Any error that occurred during the session fetch. */
  error: Error | null;
  /** Method to log out the current user and redirect to the sign-in page. */
  logout: () => Promise<void>;
}

/**
 * Hook to manage user authentication and session state.
 * 
 * This hook uses TanStack Query to fetch and cache the current user's session.
 * It also provides a logout method to clear the session and redirect the user.
 * 
 * @returns {AuthState} Authentication state and methods
 * 
 * @example
 * const { user, isLoading, logout } = useAuth();
 */
export const useAuth = (): AuthState => {
  const queryClient = useQueryClient();

  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: QUERY_KEYS.AUTH_USER,
    queryFn: async () => {
      if (API_CONFIG.USE_MOCKS) {
        return simulateRequest({
          id: "mock-user-123",
          name: "Demo User",
          email: "demo@smrtcv.com",
          avatar: undefined
        });
      }

      const res = await fetch(`${API_CONFIG.BASE_URL}/users/me`, {
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
    retry: API_CONFIG.USE_MOCKS ? false : 1,
  });

  /**
   * Logs out the current user by clearing the query cache and redirecting.
   */
  const logout = async () => {
    if (API_CONFIG.USE_MOCKS) {
      console.log("Logout simulated in dev mode");
      queryClient.setQueryData(QUERY_KEYS.AUTH_USER, null);
      window.location.href = ROUTES.HOME;
      return;
    }

    try {
      // Clear cache first for immediate UI feedback
      queryClient.setQueryData(QUERY_KEYS.AUTH_USER, null);
      
      await fetch(`${API_CONFIG.BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
    } finally {
      window.location.href = ROUTES.SIGNIN;
    }
  };

  return { 
    user, 
    isLoading, 
    error: error as Error | null,
    logout 
  };
};
