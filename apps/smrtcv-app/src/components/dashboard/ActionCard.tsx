import React, { memo } from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/**
 * Properties for the ActionCard component.
 */
interface ActionCardProps {
  /** The main heading of the card. */
  title: string;
  /** A brief description of the action or section. */
  description: string;
  /** 
   * The Lucide icon component to display.
   * @example {FilePlus}
   */
  icon: LucideIcon;
  /** The destination URL when the button is clicked. */
  href: string;
  /** The label for the call-to-action button. */
  buttonText: string;
  /** Optional CSS class for the icon element. */
  iconClassName?: string;
}

/**
 * A call-to-action card component for the dashboard.
 * Displays an icon, title, description, and a button that links to a specific page.
 * Optimized for performance with React.memo.
 * 
 * @example
 * <ActionCard
 *   title="Create New Resume"
 *   description="Start building your professional resume from scratch or using a template."
 *   icon={FilePlus}
 *   href="/builder"
 *   buttonText="Create Now"
 * />
 * 
 * @param props - Component properties including title, description, icon, and link.
 */
const ActionCard = memo(function ActionCard({
  title,
  description,
  icon: Icon,
  href,
  buttonText,
  iconClassName = "w-10 h-10 sm:w-12 sm:h-12",
}: ActionCardProps) {
  return (
    <article className="group bg-white border border-gray-300 rounded-4xl sm:rounded-[50px] p-8 sm:p-16 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 sm:mb-8 ring-4 ring-gray-50 transition-colors group-hover:bg-primary/5">
        <Icon className={`${iconClassName} text-primary`} strokeWidth={3} />
      </div>
      <h2 className="text-2xl sm:text-4xl font-extrabold mb-3 sm:mb-4 text-foreground">{title}</h2>
      <p className="text-gray-500 text-base sm:text-lg mb-8 sm:mb-10 max-w-xs leading-relaxed">
        {description}
      </p>
      <Button asChild className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-foreground font-bold py-6 sm:py-7 px-8 sm:px-12 rounded-2xl text-lg sm:text-xl border-none shadow-none transition-all active:scale-95">
        <Link href={href}>{buttonText}</Link>
      </Button>
    </article>
  );
});

ActionCard.displayName = 'ActionCard';

export { ActionCard };
export default ActionCard;
