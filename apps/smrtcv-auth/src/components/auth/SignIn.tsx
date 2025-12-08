'use client';

import { Button } from '@/components/ui/Button';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import MagicLinkForm from './MagicLinkForm';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:4002';

export const SignIn = () => {
  const handleLogin = () => {
    window.location.href = `${APP_URL}/builder`;
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Sign In
          </h1>
          <p className="mt-2 text-foreground-secondary">
            Welcome back, let&apos;s pick up where you left off.
          </p>
          
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Button variant="secondary" size="lg" className="w-full" onClick={handleLogin}>
              <GoogleIcon className="mr-2 h-5 w-5 fill-current" />
              Google
            </Button>
            <Button variant="secondary" size="lg" className="w-full" onClick={handleLogin}>
              <LinkedInIcon className="mr-2 h-5 w-5" />
              LinkedIn
            </Button>
          </div>
          <MagicLinkForm />
        </div>
      </div>
    </div>
  );
};
