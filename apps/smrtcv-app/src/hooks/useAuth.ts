'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types/dashboard';

/**
 * Hook to manage user authentication.
 * In production, this would integrate with an auth provider like NextAuth, 
 * or check a JWT token in cookies/localStorage.
 */
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user session
    const timer = setTimeout(() => {
      // For now, return a mock user
      setUser({
        id: '1',
        name: 'Mariel',
        email: 'mariel@example.com',
      });
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const logout = () => {
    setUser(null);
    // In production: clear cookies/tokens and redirect
    window.location.href = '/signin';
  };

  return { user, loading, logout };
};
