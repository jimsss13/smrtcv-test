/**
 * Centralized route management for the smrtcv-app.
 * This file defines all internal and external route constants to ensure
 * consistency and ease of maintenance across the application.
 */

/**
 * The base URL for the current application.
 */
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:4002';

/**
 * The base URL for the authentication application.
 */
export const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:4001';

/**
 * The base URL for the public marketing application.
 */
export const PUBLIC_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:4000';

/**
 * ROUTES object containing all primary navigation paths.
 * - Internal paths: relative to the current app (e.g., /dashboard)
 * - External paths: absolute URLs to other apps in the monorepo (e.g., auth, public)
 */
export const ROUTES = {
  /** Landing page / Root */
  HOME: '/',
  /** User dashboard */
  DASHBOARD: '/dashboard',
  /** Resume builder interface */
  BUILDER: '/builder',
  /** List of saved resumes */
  RESUMES: '/resumes',
  /** Template selection gallery */
  TEMPLATES: '/templates',
  /** Subscription and billing management */
  BILLING: '/billing',
  /** User profile and account settings */
  ACCOUNT: '/account',
  /** Help and FAQ page */
  FAQ: '/faq',
  /** About page and company information */
  ABOUT: '/about',
  
  // External Auth Routes
  /** External sign-in page */
  SIGNIN: `${AUTH_URL}/signin`,
  /** Callback for magic link authentication */
  MAGIC_CALLBACK: `${AUTH_URL}/magic/callback`,
} as const;

/**
 * List of routes that require authentication.
 * Used by AuthGuard to protect restricted areas and redirect unauthenticated users.
 */
export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.BUILDER,
  ROUTES.RESUMES,
  ROUTES.TEMPLATES,
  ROUTES.BILLING,
  ROUTES.ACCOUNT,
  ROUTES.FAQ,
  ROUTES.ABOUT,
] as const;

/**
 * Type representing all available internal routes.
 */
export type AppRoute = typeof ROUTES[keyof typeof ROUTES];
