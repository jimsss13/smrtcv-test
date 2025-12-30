'use client';

import React, { memo } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/**
 * Represents a subscription plan option.
 */
interface Plan {
  /** The name of the plan (e.g., "Basic", "Pro"). */
  name: string;
  /** The price of the plan per month. */
  price: string;
  /** A short description of the plan's target audience or benefits. */
  description: string;
  /** List of features included in this plan. */
  features: string[];
  /** Whether this is the user's current active plan. */
  isCurrent: boolean;
  /** Whether to highlight this plan as "Most Popular". */
  popular?: boolean;
}

/**
 * Properties for the PlanComparison component.
 */
interface PlanComparisonProps {
  /** Array of available plans to compare. */
  plans: Plan[];
}

/**
 * A component that displays a comparison of different subscription plans.
 * Highlights the most popular plan and indicates the user's current plan.
 * Optimized for performance with React.memo.
 * 
 * @example
 * <PlanComparison 
 *   plans={[
 *     { name: 'Basic', price: '$0', description: 'Free forever', features: ['1 Resume'], isCurrent: true },
 *     { name: 'Pro', price: '$10', description: 'Best for pros', features: ['Unlimited Resumes'], isCurrent: false, popular: true }
 *   ]} 
 * />
 * 
 * @param props - The component properties.
 */
const PlanComparison = memo(function PlanComparison({ plans }: PlanComparisonProps) {
  return (
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
  );
});

PlanComparison.displayName = 'PlanComparison';

export { PlanComparison };
export default PlanComparison;
