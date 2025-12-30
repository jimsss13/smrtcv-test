'use client';

import React, { memo } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/**
 * Component for managing account notification settings.
 * Displays a section for configuring alerts and notifications.
 * Optimized for performance with React.memo.
 * 
 * @example
 * <NotificationSettings />
 */
const NotificationSettings = memo(function NotificationSettings() {
  return (
    <section className="bg-white border border-gray-200 rounded-[32px] p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Bell className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold">Notifications</h3>
      </div>
      <p className="text-sm text-gray-500 mb-4 font-medium">Manage your alerts.</p>
      <Button variant="outline" className="w-full rounded-xl py-5 font-bold border-2 text-sm">
        Configure Alerts
      </Button>
    </section>
  );
});

NotificationSettings.displayName = 'NotificationSettings';

export { NotificationSettings };
export default NotificationSettings;
