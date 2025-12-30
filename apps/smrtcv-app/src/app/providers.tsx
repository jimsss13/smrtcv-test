'use client';

import { AuthGuard } from '@/components/auth/AuthGuard';
import { QueryProvider } from '@/contexts/QueryContext';

/**
 * Main Providers Component
 * 
 * Wraps the application with all necessary React Context Providers.
 * Includes QueryProvider for data fetching and AuthGuard for session management.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthGuard>
        {children}
      </AuthGuard>
    </QueryProvider>
  );
}
