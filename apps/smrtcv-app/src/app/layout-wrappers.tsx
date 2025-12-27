'use client';

import { usePathname } from 'next/navigation';

export function HeaderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardPage = pathname?.startsWith('/dashboard') || 
                          pathname?.startsWith('/resumes') || 
                          pathname?.startsWith('/templates') ||
                          pathname?.startsWith('/builder') ||
                          pathname?.startsWith('/billing') || 
                          pathname?.startsWith('/account');

  if (isDashboardPage) return null;
  return <>{children}</>;
}

export function FooterWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardPage = pathname?.startsWith('/dashboard') || 
                          pathname?.startsWith('/resumes') || 
                          pathname?.startsWith('/templates') ||
                          pathname?.startsWith('/builder');

  if (isDashboardPage) return null;
  return <>{children}</>;
}
