/**
 * Represents a user testimonial for display on the landing page or about section.
 */
export type Testimonial = {
  /** Unique identifier for the testimonial. */
  id: string;
  /** Numerical rating from 1 to 5. */
  rating: number;
  /** The testimonial text content. */
  text: string;
  /** Name of the person providing the testimonial. */
  author: string;
  /** Formatted date string of when the testimonial was given. */
  date: string;
};

// Re-export all other types for centralized access
export * from './resume';
export * from './dashboard';
export * from './query';