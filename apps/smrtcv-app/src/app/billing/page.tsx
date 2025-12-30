'use client';

import React from 'react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { Subscription, Invoice } from '@/types/dashboard';
import { CurrentSubscription } from '@/components/billing/CurrentSubscription';
import { PlanComparison } from '@/components/billing/PlanComparison';
import { BillingHistory } from '@/components/billing/BillingHistory';
import { PaymentMethod } from '@/components/billing/PaymentMethod';

/**
 * Billing and Subscription Management Page.
 * Allows users to manage their plan, view invoices, and update payment methods.
 */
export default function BillingPage() {
  // Mock data for subscription
  const subscription: Subscription = {
    plan: 'Pro',
    status: 'active',
    nextBillingDate: 'Jan 15, 2026',
    price: '$12.00/mo'
  };

  // Mock data for invoices
  const invoices: Invoice[] = [
    { id: 'INV-001', date: 'Dec 15, 2025', amount: '$12.00', status: 'Paid' },
    { id: 'INV-002', date: 'Nov 15, 2025', amount: '$12.00', status: 'Paid' },
    { id: 'INV-003', date: 'Oct 15, 2025', amount: '$12.00', status: 'Paid' },
  ];

  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started.',
      features: ['3 Resumes', 'Standard Templates', 'Basic AI Support'],
      isCurrent: subscription.plan === 'Free',
    },
    {
      name: 'Pro',
      price: '$12',
      description: 'Best for active job seekers.',
      features: ['Unlimited Resumes', 'Premium Templates', 'Advanced AI Writer', 'Custom Branding'],
      isCurrent: subscription.plan === 'Pro',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$49',
      description: 'For teams and organizations.',
      features: ['Team Collaboration', 'Bulk Export', 'Dedicated Support', 'API Access'],
      isCurrent: subscription.plan === 'Enterprise',
    }
  ];

  return (
    <DashboardShell>
      {/* Hero Section */}
      <section className="text-center mb-12 sm:mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 sm:mb-6 tracking-tight text-foreground px-4">
          Billing & Subscription
        </h1>
        <p className="text-xl sm:text-2xl text-foreground font-medium opacity-90">
          Manage your plan and billing information.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-4 space-y-12 mb-24">
        <CurrentSubscription subscription={subscription} />
        <PlanComparison plans={plans} />
        <BillingHistory invoices={invoices} />
        <PaymentMethod />
      </div>
    </DashboardShell>
  );
}
