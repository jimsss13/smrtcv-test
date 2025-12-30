'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import { 
  QueryClient, 
  QueryClientProvider
} from '@tanstack/react-query';
import { 
  QueryContextType
} from '@/types/query';

const QueryContext = createContext<QueryContextType | undefined>(undefined);

/**
 * QueryProvider Component
 * 
 * Provides application-wide query and mutation functionality using TanStack Query.
 * This component abstracts the underlying query engine and provides a consistent
 * interface for data fetching, caching, and state management.
 * 
 * @param props - Component properties
 * @param props.children - React components to be wrapped by the provider
 */
export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize the QueryClient with default options for the application
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        /** Data remains fresh for 5 minutes by default */
        staleTime: 1000 * 60 * 5,
        /** Retry failed queries once */
        retry: 1,
        /** Disable automatic refetch on window focus to save resources */
        refetchOnWindowFocus: false,
      },
    },
  }));

  /**
   * Memoized context value to prevent unnecessary re-renders of consuming components.
   */
  const contextValue: QueryContextType = useMemo(() => ({
    queryClient,

    invalidate: async (queryKey) => {
      await queryClient.invalidateQueries({ queryKey });
    },

    prefetch: async (queryKey, queryFn) => {
      await queryClient.prefetchQuery({
        queryKey,
        queryFn,
      });
    },

    clearCache: () => {
      queryClient.clear();
    },
  }), [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <QueryContext.Provider value={contextValue}>
        {children}
      </QueryContext.Provider>
    </QueryClientProvider>
  );
};

/**
 * Custom hook to use the QueryContext
 * 
 * @throws Error if used outside of a QueryProvider
 * @returns The QueryContext value
 */
export const useQueryContext = () => {
  const context = useContext(QueryContext);
  if (context === undefined) {
    throw new Error('useQueryContext must be used within a QueryProvider');
  }
  return context;
};
