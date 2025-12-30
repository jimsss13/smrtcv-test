import React, { useState, memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TemplateCard } from '@/components/dashboard/TemplateCard';
import { Template } from '@/types/dashboard';

/**
 * Properties for the TemplateCarousel component.
 */
interface TemplateCarouselProps {
  /** Array of templates to display in the carousel. */
  templates: Template[];
}

/**
 * A carousel component for browsing resume templates.
 * Provides navigation arrows, indicators, and handles active state for template cards.
 * Optimized for performance with React.memo to prevent unnecessary re-renders.
 * 
 * @example
 * <TemplateCarousel 
 *   templates={[
 *     { id: '1', name: 'Template 1', ... },
 *     { id: '2', name: 'Template 2', ... }
 *   ]} 
 * />
 * 
 * @param props - Component properties containing the list of templates.
 */
const TemplateCarousel = memo(function TemplateCarousel({ templates }: TemplateCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % templates.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + templates.length) % templates.length);

  if (templates.length === 0) return null;

  return (
    <div className="relative group">
      {/* Main Display Area */}
      {templates.map((template, idx) => (
        <TemplateCard 
          key={template.id} 
          template={template} 
          isActive={idx === activeIndex} 
        />
      ))}

      {/* Navigation Arrows */}
      <button 
        onClick={handlePrev}
        className="absolute -left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary transition-all hover:scale-110 z-10"
        aria-label="Previous template"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={2.5} />
      </button>
      <button 
        onClick={handleNext}
        className="absolute -right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary transition-all hover:scale-110 z-10"
        aria-label="Next template"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={2.5} />
      </button>

      {/* Indicators */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 pt-6 sm:pt-8">
        {templates.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-2.5 sm:h-3 transition-all rounded-full ${
              idx === activeIndex ? "w-8 sm:w-10 bg-primary" : "w-2.5 sm:w-3 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to template ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
});

TemplateCarousel.displayName = 'TemplateCarousel';

export { TemplateCarousel };
export default TemplateCarousel;
