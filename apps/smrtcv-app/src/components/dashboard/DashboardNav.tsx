'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';

/**
 * Shared navigation tabs for the dashboard area.
 * Automatically highlights the active tab based on the current URL pathname.
 * Optimized for performance with React.memo to prevent unnecessary re-renders.
 * 
 * @example
 * <DashboardNav />
 */
const DashboardNav = memo(function DashboardNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'My Dashboard', href: ROUTES.DASHBOARD },
    { label: 'My Resumes', href: ROUTES.RESUMES },
    { label: 'Templates', href: ROUTES.TEMPLATES },
  ];

  return (
    <nav className="flex flex-row gap-3 sm:gap-6 mb-12 sm:mb-16 px-4 md:px-0 overflow-x-auto no-scrollbar pb-2 sm:pb-0" aria-label="Dashboard navigation">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 sm:gap-4 py-2.5 sm:py-4 px-3 sm:px-8 rounded-full border-2 transition-all duration-300 min-w-[120px] sm:min-w-0",
              isActive 
                ? "bg-gray-200 border-gray-400 font-bold text-xs sm:text-lg text-foreground shadow-sm" 
                : "bg-white border-gray-300 font-medium text-xs sm:text-lg text-foreground-secondary hover:bg-gray-50 hover:border-gray-400"
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            <div 
              className={cn(
                "w-3.5 h-3.5 sm:w-7 sm:h-7 rounded-full border-2 bg-gray-300 transition-colors shrink-0",
                isActive ? "border-gray-400" : "border-gray-300"
              )} 
            />
            <span className="whitespace-nowrap">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
});

DashboardNav.displayName = 'DashboardNav';

export { DashboardNav };
export default DashboardNav;
