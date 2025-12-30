/* TEMPORARY DEVELOPMENT OVERRIDE - REMOVE BEFORE PRODUCTION */
/* BACKEND CONNECTIVITY DISABLED FOR TESTING PURPOSES ONLY */

'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/query/useAuth';

/**
 * Properties for the AuthGuard component.
 */
interface AuthGuardProps {
  /** The content to be protected by the authentication guard. */
  children: React.ReactNode;
}

/**
 * A guard component that protects routes and manages authentication-based redirection.
 * 
 * Responsibilities:
 * 1. Monitors authentication state using the useAuth hook.
 * 2. Identifies if the current route is protected based on PROTECTED_ROUTES.
 * 3. Redirects unauthenticated users to the Sign-In page while preserving the 
 *    original destination in the 'next' query parameter.
 * 4. Provides a loading state while the session is being fetched.
 * 
 * @param props - The component properties.
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading, error } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    /* TEMPORARY BYPASS - No redirection in development mode */
    console.log("AuthGuard bypass active for path:", pathname);

    /* Original code (commented out)
    if (!isLoading) {
      const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname?.startsWith(route));
      
      if (isProtectedRoute && (error || !user)) {
        // Redirect to sign in with the current path as a 'next' parameter
        const nextParam = pathname ? `?next=${encodeURIComponent(pathname)}` : '';
        window.location.href = `${ROUTES.SIGNIN}${nextParam}`;
      }
    }
    */
  }, [user, isLoading, error, pathname, router]);

  /* TEMPORARY BYPASS - Always render children immediately */
  return <>{children}</>;

  /* Original code (commented out)
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-foreground-secondary">Loading your session...</p>
        </div>
      </div>
    );
  }

  // If we have an error and it's a protected route, we'll be redirecting in useEffect
  // but we should still show nothing or a loading state until then
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname?.startsWith(route));
  if (isProtectedRoute && (error || !user)) {
    return null;
  }

  return <>{children}</>;
  */
}
