/**
 * Represents a summary of a resume for display in lists and dashboards.
 */
export interface ResumeSummary {
  /** Unique identifier for the resume. */
  id: string | number;
  /** User-defined name or title of the resume. */
  name: string;
  /** Formatted date string of when the resume was last updated. */
  date: string;
  /** Optional URL or identifier for the resume's thumbnail preview. */
  thumbnail?: string;
}

/**
 * Represents a resume template available for selection.
 */
export interface Template {
  /** Unique identifier for the template (e.g., 'classic', 'traditional'). */
  id: string;
  /** Human-readable name of the template. */
  name: string;
  /** Formatted string representing the number of users using this template. */
  users: string;
  /** Brief description of the template's style and ideal use case. */
  description: string;
  /** Primary brand color or theme color associated with the template. */
  color: string;
  /** Whether the template is currently trending or highly used. */
  popular?: boolean;
}

/**
 * Basic user profile information for dashboard display.
 */
export interface User {
  /** Unique identifier for the user. */
  id: string;
  /** Full name of the user. */
  name: string;
  /** Primary email address associated with the account. */
  email: string;
  /** Optional URL to the user's avatar image. */
  avatar?: string;
}

/**
 * Details of a user's current subscription plan.
 */
export interface Subscription {
  /** The tier of the current subscription plan. */
  plan: 'Free' | 'Pro' | 'Enterprise';
  /** The current status of the subscription. */
  status: 'active' | 'canceled' | 'past_due';
  /** Formatted date string for the next billing cycle. */
  nextBillingDate: string;
  /** Formatted price string for the current plan. */
  price: string;
}

/**
 * Represents a billing invoice for the user.
 */
export interface Invoice {
  /** Unique identifier for the invoice. */
  id: string;
  /** Formatted date string of when the invoice was issued. */
  date: string;
  /** Formatted amount string (e.g., '$19.00'). */
  amount: string;
  /** Current payment status of the invoice. */
  status: 'Paid' | 'Pending' | 'Failed';
}
