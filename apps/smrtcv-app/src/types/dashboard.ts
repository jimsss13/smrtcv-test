export interface Resume {
  id: string | number;
  name: string;
  date: string;
  thumbnail?: string;
}

export interface Template {
  id: string;
  name: string;
  users: string;
  description: string;
  color: string;
  popular?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Subscription {
  plan: 'Free' | 'Pro' | 'Enterprise';
  status: 'active' | 'canceled' | 'past_due';
  nextBillingDate: string;
  price: string;
}

export interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Failed';
}
