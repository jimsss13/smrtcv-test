'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

/**
 * Properties for the DashboardHeader component.
 */
interface DashboardHeaderProps {
  /** The name of the current user to display in the profile section. */
  userName: string;
}

/**
 * Shared header component for the dashboard area.
 * Provides consistent navigation links and user profile access.
 * Optimized for performance with React.memo to prevent unnecessary re-renders.
 * 
 * @example
 * <DashboardHeader userName="John Doe" />
 * 
 * @param props - Component properties containing the user's name.
 */
const DashboardHeader = memo(function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <header className="border-b border-border bg-white sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
        <Link href={ROUTES.DASHBOARD} className="flex items-center group transition-opacity hover:opacity-80">
          <div className="bg-gray-200 px-4 py-2 rounded-md text-sm font-bold tracking-tight">
            Smart CV Logo
          </div>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-8">
          <Link 
            href={ROUTES.FAQ} 
            className="hidden sm:block text-sm font-semibold text-foreground-secondary hover:text-primary transition-colors"
          >
            FAQs
          </Link>
          <Link 
            href={ROUTES.ABOUT} 
            className="hidden sm:block text-sm font-semibold text-foreground-secondary hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link href={ROUTES.ACCOUNT} className="flex items-center gap-2 bg-gray-200 pl-3 sm:pl-4 pr-1 py-1 rounded-full shadow-sm hover:bg-gray-300 transition-colors">
            <span className="text-xs sm:text-sm font-bold text-foreground max-w-20 sm:max-w-none truncate">{userName}</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-400 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-100" />
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
});

DashboardHeader.displayName = 'DashboardHeader';

export { DashboardHeader };
export default DashboardHeader;
