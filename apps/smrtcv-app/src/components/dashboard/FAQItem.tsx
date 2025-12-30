'use client';

import React, { memo } from 'react';
import { Star, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Properties for the FAQItem component.
 */
interface FAQItemProps {
  /** The FAQ data object. */
  faq: {
    /** Unique identifier for the FAQ. */
    id: string;
    /** The question text. */
    question: string;
    /** The answer text. */
    answer: string;
    /** The category or topic of the FAQ. */
    topic: string;
    /** A numeric score indicating how often this FAQ is viewed. */
    popularity: number;
    /** The date when this FAQ was last modified. */
    lastUpdated: string;
  };
  /** Whether the FAQ item is currently expanded to show the answer. */
  isExpanded: boolean;
  /** Callback function to toggle the expansion state. */
  onToggle: () => void;
  /** Function to wrap search terms in a highlight element. */
  highlightText: (text: string) => React.ReactNode;
}

/**
 * An individual FAQ item component with expand/collapse functionality.
 * Supports highlighting text for search results and displaying popularity badges.
 * Optimized for performance with React.memo to prevent unnecessary re-renders.
 * 
 * @example
 * <FAQItem 
 *   faq={{ 
 *     id: '1', 
 *     question: 'How do I use this?', 
 *     answer: 'Click the buttons.', 
 *     topic: 'General', 
 *     popularity: 100, 
 *     lastUpdated: '2023-10-27' 
 *   }} 
 *   isExpanded={false} 
 *   onToggle={() => {}} 
 *   highlightText={(text) => text} 
 * />
 * 
 * @param props - Component properties including the FAQ data and toggle state.
 */
const FAQItem = memo(function FAQItem({ faq, isExpanded, onToggle, highlightText }: FAQItemProps) {
  return (
    <div 
      className={cn(
        "bg-white border-2 rounded-[32px] overflow-hidden transition-all duration-300",
        isExpanded ? "border-primary shadow-lg" : "border-gray-100 hover:border-gray-200"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4"
        aria-expanded={isExpanded}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              {faq.topic}
            </span>
            {faq.popularity > 90 && (
              <span className="flex items-center gap-1 text-amber-500 text-[10px] font-bold uppercase">
                <Star className="w-3 h-3 fill-current" />
                Popular
              </span>
            )}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground">
            {highlightText(faq.question)}
          </h3>
        </div>
        <div className={cn(
          "w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center transition-transform duration-300",
          isExpanded ? "bg-primary text-white rotate-180" : "text-gray-400"
        )}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-6 sm:px-8 pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="h-px bg-gray-100 mb-6" />
          <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
            {highlightText(faq.answer)}
          </p>
          <div className="mt-6 flex items-center gap-2 text-gray-400 text-xs font-medium">
            <span>Last updated: {faq.lastUpdated}</span>
          </div>
        </div>
      )}
    </div>
  );
});

FAQItem.displayName = 'FAQItem';

export { FAQItem };
export default FAQItem;
