'use client';

import { useEffect } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:4002';

export default function MagicCallback() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token') || '';
    const next = url.searchParams.get('next') || `${APP_URL}/builder`;

    async function verify() {
      if (!token) {
        window.location.assign(next);
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/auth/magic-link/verify?token=${encodeURIComponent(token)}` , {
          method: 'GET',
          credentials: 'include'
        });
        try {
          const data = await res.json();
          if (data && data.access_token) {
            localStorage.setItem('smrtcv_token', data.access_token);
          }
        } catch {}
      } finally {
        window.location.assign(next);
      }
    }

    verify();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Verifying…</h1>
        <p className="mt-2 text-foreground-secondary">Please wait while we sign you in.</p>
      </div>
    </div>
  );
}

