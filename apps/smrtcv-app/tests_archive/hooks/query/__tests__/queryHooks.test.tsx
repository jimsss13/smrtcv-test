// @ts-nocheck
import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from '../useAuth';
import { useResumes } from '../useResumes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

// Mock API_CONFIG to use mocks
jest.mock('@/config/api', () => ({
  API_CONFIG: {
    USE_MOCKS: true,
    MOCK_DELAY: 0,
    MOCK_ERROR_RATE: 0,
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  
  return Wrapper;
};

describe('Query Hooks', () => {
  describe('useAuth', () => {
    it('should fetch user session', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });
      
      expect(result.current.isLoading).toBe(true);
      
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      
      expect(result.current.user).toBeDefined();
      expect(result.current.user?.email).toBe('demo@smrtcv.com');
    });
  });

  describe('useResumes', () => {
    it('should fetch resumes list', async () => {
      const { result } = renderHook(() => useResumes(), { wrapper: createWrapper() });
      
      expect(result.current.isLoading).toBe(true);
      
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      
      expect(result.current.resumes).toBeDefined();
      expect(Array.isArray(result.current.resumes)).toBe(true);
    });
  });
});
