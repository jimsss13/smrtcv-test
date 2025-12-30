'use client';

import React, { memo } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { DashboardNav } from './DashboardNav';
import { useAuth } from '@/hooks/query/useAuth';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';

/**
 * Properties for the DashboardShell component.
 */
interface DashboardShellProps {
  /** The content to render within the shell's main area. */
  children: React.ReactNode;
  /** Whether to hide the standard dashboard navigation tabs. */
  hideNav?: boolean;
}

/**
 * A shell component that wraps all dashboard-related pages.
 * Ensures a consistent layout with header, navigation, and error handling.
 * Optimized for performance with React.memo to prevent unnecessary re-renders.
 * 
 * @example
 * <DashboardShell>
 *   <div>Dashboard content goes here</div>
 * </DashboardShell>
 * 
 * @param props - Component properties including children and optional hideNav flag.
 */
const DashboardShell = memo(function DashboardShell({ 
  children,
  hideNav = false
}: DashboardShellProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-foreground selection:bg-primary selection:text-white">
      <DashboardHeader userName={user?.name || "User"} />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {!hideNav && <DashboardNav />}
        <div className={hideNav ? "mt-0" : "mt-8"}>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
});

DashboardShell.displayName = 'DashboardShell';

export { DashboardShell };
export default DashboardShell;
