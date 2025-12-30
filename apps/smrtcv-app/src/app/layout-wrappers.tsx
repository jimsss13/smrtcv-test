'use client';

import { usePathname } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export function HeaderWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardPage = pathname?.startsWith(ROUTES.DASHBOARD) || 
                          pathname?.startsWith(ROUTES.RESUMES) || 
                          pathname?.startsWith(ROUTES.TEMPLATES) ||
                          pathname?.startsWith(ROUTES.BUILDER) ||
                          pathname?.startsWith(ROUTES.BILLING) || 
                          pathname?.startsWith(ROUTES.ACCOUNT) ||
                          pathname?.startsWith(ROUTES.FAQ) ||
                          pathname?.startsWith(ROUTES.ABOUT);

  if (isDashboardPage) return null;
  return <>{children}</>;
}

export function FooterWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardPage = pathname?.startsWith(ROUTES.DASHBOARD) || 
                          pathname?.startsWith(ROUTES.RESUMES) || 
                          pathname?.startsWith(ROUTES.TEMPLATES) ||
                          pathname?.startsWith(ROUTES.BUILDER) ||
                          pathname?.startsWith(ROUTES.FAQ) ||
                          pathname?.startsWith(ROUTES.ABOUT);

  if (isDashboardPage) return null;
  return <>{children}</>;
}
