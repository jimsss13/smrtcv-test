'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

// --- CONFIG ---
// In development, Auth is on port 3001. In production, this would be 'auth.smrtcv.com'
const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:4001';

const navLinks = [
  { href: '/faq', label: 'FAQs' },
  { href: '/about', label: 'About' },
  { href: `${AUTH_URL}/signin`, label: 'Sign In', external: true },
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center text-lg font-bold">
          <div>
            <Image
              src="/logov3.png" 
              alt="Smart CV Logo"
              width={200} 
              height={60} 
              className="h-18 w-auto" 
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 text-sm md:flex">

          <Link
            href="/faq"
            className="text-black text-[16px] transition-all hover:font-semibold"
            style={{fontFamily: 'Poppins, Sans-serif'}}
          >
            FAQs
          </Link>
          <Link
            href="/about"
            className="text-black text-[16px] transition-all hover:font-semibold"
            style={{fontFamily: 'Poppins, Sans-serif'}}
          >
            About
          </Link>
          <Link
            href="/legal-pages"
            className="text-black text-[16px] transition-all hover:font-semibold"
            style={{fontFamily: 'Poppins, Sans-serif'}}
          >
            Terms and Policies
          </Link>
          <Link
            href="/subscription"
            className="text-black text-[16px] transition-all hover:font-semibold"
            style={{fontFamily: 'Poppins, Sans-serif'}}
          >
            Subscription
          </Link>
          <a
            href={`${AUTH_URL}/signin`}
            className="text-black text-[16px] transition-all hover:font-semibold"
            style={{fontFamily: 'Poppins, Sans-serif'}}
          >
            Sign In
          </a>
         
          <Button asChild variant="outline" size="sm"
          className="px-6 py-6 rounded-xl text-white bg-[#1A91F0] hover:bg-[#0068BB] text-[16px]">
            <a href={`${AUTH_URL}/signin`}>Create Resume as Guest</a>
          </Button>
        </nav>

        {/* --- Mobile Menu & Controls --- */}
        <div className="flex items-center gap-2 md:hidden">
          <Button asChild variant="outline" size="sm"
          className="text-white bg-[#1A91F0] hover:bg-[#0068BB] rounded p-2"
          style={{fontFamily: 'Poppins, Sans-serif'}}>
            <a href={`${AUTH_URL}/signin`}>Create Resume</a>
          </Button>

          <Button variant="ghost" size="icon" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          aria-label="Toggle menu"> 
          {isMobileMenuOpen ? ( <X className="h-6 w-6" /> ) : 
          ( <Menu className="h-6 w-6" /> )} 
          </Button>

        </div>
      </div>

      {/* --- Mobile Menu Drawer --- */}
      <div
        className={cn(
          'border-t border-border md:hidden',
          isMobileMenuOpen ? 'block' : 'hidden'
        )}
      >
        <nav className="flex flex-col items-start gap-4 p-4">
          <Link
            href="/faq"
            onClick={handleLinkClick}
            className="text-foreground-secondary transition-colors hover:text-foreground"
            style={{fontFamily: 'Poppins, Sans-serif'}}
          >
            FAQs
          </Link>
           <Link
            href="/about"
            onClick={handleLinkClick}
            className="text-foreground-secondary transition-colors hover:text-foreground"
            style={{fontFamily: 'Poppins, Sans-serif'}}>
            About
          </Link>
          <a
            href={`${AUTH_URL}/signin`}
            className="text-foreground"
            style={{fontFamily: 'Poppins, Sans-serif'}}>
            Sign In
          </a>
        </nav>
      </div>
    </header>
  );
};
