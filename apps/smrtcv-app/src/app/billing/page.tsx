'use client';

import React from 'react';
import { CreditCard, Check, Clock, FileText, ChevronRight } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { Button } from '@/components/ui/Button';
import { Subscription, Invoice } from '@/types/dashboard';

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
        {/* Current Subscription Card */}
        <section className="bg-white border border-gray-200 rounded-[32px] p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-foreground">Current Plan: {subscription.plan}</h2>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                  {subscription.status}
                </span>
              </div>
              <p className="text-gray-500 font-medium">
                Your next billing date is <span className="text-foreground font-bold">{subscription.nextBillingDate}</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Button variant="outline" className="rounded-2xl py-6 px-8 font-bold border-2">
                Cancel Plan
              </Button>
              <Button className="rounded-2xl py-6 px-8 font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                Update Payment
              </Button>
            </div>
          </div>
        </section>

        {/* Plan Comparison */}
        <section>
          <h3 className="text-2xl font-bold mb-8 ml-2">Available Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                className={`relative bg-white border-2 rounded-[40px] p-8 flex flex-col transition-all duration-300 ${
                  plan.popular ? 'border-primary shadow-xl scale-105 z-10' : 'border-gray-100 shadow-sm hover:border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-8">
                  <h4 className="text-xl font-black mb-1">{plan.name}</h4>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-black">{plan.price}</span>
                    <span className="text-gray-500 font-bold">/month</span>
                  </div>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="mt-1 bg-green-100 rounded-full p-0.5">
                        <Check className="w-4 h-4 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-600 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full py-7 rounded-2xl font-black text-lg transition-all ${
                    plan.isCurrent 
                      ? 'bg-gray-100 text-gray-400 cursor-default' 
                      : plan.popular
                        ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20'
                        : 'bg-gray-900 text-white hover:bg-black'
                  }`}
                  disabled={plan.isCurrent}
                >
                  {plan.isCurrent ? 'Current Plan' : `Upgrade to ${plan.name}`}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Billing History */}
        <section className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold">Billing History</h3>
            </div>
            <Button variant="outline" className="rounded-xl font-bold text-sm">
              Download All
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-8 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Invoice ID</th>
                  <th className="px-8 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-8 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-8 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-6 font-bold text-foreground">{invoice.date}</td>
                    <td className="px-8 py-6 text-gray-500 font-medium">{invoice.id}</td>
                    <td className="px-8 py-6 font-bold">{invoice.amount}</td>
                    <td className="px-8 py-6">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-primary font-bold hover:underline flex items-center gap-1 ml-auto">
                        PDF <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="bg-gray-900 rounded-[32px] p-8 sm:p-12 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CreditCard className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold">Payment Method</h3>
              </div>
              <div className="flex items-center gap-4 bg-white/10 p-6 rounded-2xl border border-white/10">
                <div className="bg-white/20 p-3 rounded-lg">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold">Visa ending in 4242</p>
                  <p className="text-white/50 text-sm">Expires 12/26</p>
                </div>
                <div className="ml-auto">
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold">DEFAULT</span>
                </div>
              </div>
            </div>
            <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-2xl py-6 px-10 font-black text-lg transition-all active:scale-95">
              Change Method
            </Button>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
