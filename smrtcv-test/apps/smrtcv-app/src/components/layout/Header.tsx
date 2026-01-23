'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/faq', label: 'FAQs' },
  { href: '/about', label: 'About' },
  { href: '/signin', label: 'Sign In' },
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 max-w-8xl items-center justify-between px-4">
        <Link href="/" className="flex items-center text-lg font-bold">
          <div>
            <Image
              src="/logo.png" 
              alt="Smart CV Logo"
              width={120} 
              height={30} 
              className="h-10 w-auto" 
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link
            href="/faq"
            className="text-foreground-secondary transition-colors hover:text-foreground"
          >
            FAQs
          </Link>
          <Link
            href="/about"
            className="text-foreground-secondary transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/signin"
            className="text-foreground-secondary transition-colors hover:text-foreground"
          >
            Sign In
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link href="/signin">Create Resume as Guest</Link>
          </Button>
        </nav>

        {/* --- Mobile Menu & Controls --- */}
        <div className="flex items-center gap-2 md:hidden">
          <Button asChild variant="outline" size="sm">
            <Link href="/signin">Create Resume</Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
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
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                'transition-colors',
                link.href === '/signin'
                  ? 'font-semibold text-foreground'
                  : 'text-foreground-secondary hover:text-foreground'
              )}
              onClick={handleLinkClick}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};