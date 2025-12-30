/**
 * API Configuration for smrtcv-app.
 * 
 * This object centralizes all API-related constants and settings,
 * including base URLs, mock settings, and testing parameters.
 * 
 * It uses environment variables with sensible defaults for local development.
 */
export const API_CONFIG = {
  /**
   * The base URL for the backend API.
   * Defaults to local development endpoint if NEXT_PUBLIC_API_URL is not set.
   */
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8002/api/v1",

  /**
   * Whether to use mock data instead of making actual API calls.
   * Useful for development when the backend is not available.
   * 
   * @defaultValue true (for development)
   */
  USE_MOCKS: process.env.NEXT_PUBLIC_USE_MOCKS === 'true' || true,

  /**
   * Simulated delay in milliseconds for mock API calls to test loading states.
   */
  MOCK_DELAY: 800,

  /**
   * Probability (0-1) of a mock API call failing to test error states.
   */
  MOCK_ERROR_RATE: 0.05,
} as const;

/**
 * Type representing the API configuration.
 */
export type ApiConfig = typeof API_CONFIG;
