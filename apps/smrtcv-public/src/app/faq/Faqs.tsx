'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import { Search } from 'lucide-react';
import { faqData } from '@/contexts/faq';

export const Faqs = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter FAQs based on search input
  const filteredFaqs = faqData.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-foreground-secondary">
            Got questions? We&apos;ve got answers.
          </p>
        </div>

        {/* Layout: 2/3 for content, 1/3 for image */}
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Left Column: Search + Accordion */}
          <div className="md:col-span-2">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-background-card p-4 pl-10 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground-muted" />
            </div>

            {/* Accordion List */}
            <Accordion type="single" collapsible className="mt-8 w-full">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                <p className="mt-8 text-center text-foreground-secondary">
                  No results found for "{searchQuery}"
                </p>
              )}
            </Accordion>
            
            {filteredFaqs.length > 0 && (
               <p className="mt-4 text-sm text-foreground-muted cursor-pointer hover:underline">...See More</p>
            )}
          </div>

          {/* Right Column: Image Placeholder */}
          <div className="flex items-start justify-center">
            <div className="sticky top-24 w-full max-w-sm rounded-lg border border-border bg-background-light p-4 shadow-sm aspect-[3/4]">
              <div className="flex h-full w-full items-center justify-center">
                <p className="text-foreground-muted">*Display Picture</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};