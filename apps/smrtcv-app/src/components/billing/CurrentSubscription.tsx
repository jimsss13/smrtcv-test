'use client';

import React, { memo } from 'react';
import { Button } from '@/components/ui/Button';
import { Subscription } from '@/types/dashboard';

/**
 * Properties for the CurrentSubscription component.
 */
interface CurrentSubscriptionProps {
  /** The user's current subscription details. */
  subscription: Subscription;
}

/**
 * A component that displays the user's current subscription status,
 * plan type, and next billing date. Provides actions to cancel or update payment.
 * Optimized for performance with React.memo.
 * 
 * @example
 * <CurrentSubscription 
 *   subscription={{ 
 *     plan: 'Pro', 
 *     status: 'Active', 
 *     nextBillingDate: '2023-11-01' 
 *   }} 
 * />
 * 
 * @param props - The component properties.
 */
const CurrentSubscription = memo(function CurrentSubscription({ subscription }: CurrentSubscriptionProps) {
  return (
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
  );
});

CurrentSubscription.displayName = 'CurrentSubscription';

export { CurrentSubscription };
export default CurrentSubscription;
