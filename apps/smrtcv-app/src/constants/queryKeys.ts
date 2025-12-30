/**
 * Constants for TanStack Query keys used throughout the application.
 */
export const QUERY_KEYS = {
  /** Key for the current authenticated user's session. */
  AUTH_USER: ['auth-user'] as const,
  
  /** Key for fetching available resume templates. */
  TEMPLATES: ['templates'] as const,
  
  /** Key for fetching all resumes for the current user. */
  RESUMES: ['resumes'] as const,
  
  /** 
   * Factory for individual resume keys.
   * @param id - The resume ID
   */
  RESUME: (id?: string) => ['resume', id] as const,
} as const;
