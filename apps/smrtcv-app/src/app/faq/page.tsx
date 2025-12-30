'use client';

import React, { useState, useCallback } from 'react';
import { Search, Filter, X, RefreshCw, ChevronDown, HelpCircle } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { Button } from '@/components/ui/Button';
import { faqData, type FAQItem as FAQType } from '@/data/faq';
import { FAQItem } from '@/components/dashboard/FAQItem';
import { useSearchAndFilter } from '@/hooks/useSearchAndFilter';

/**
 * FAQ Page with comprehensive filtering and search.
 */
export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Sorting logic for FAQ
  const sortLogic = useCallback((data: FAQType[], sortBy: string) => {
    return [...data].sort((a, b) => {
      if (sortBy === 'popularity') {
        return b.popularity - a.popularity;
      } else {
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      }
    });
  }, []);

  // Use the reusable search and filter hook
  const {
    searchTerm,
    setSearchTerm,
    isLoading,
    filteredData: filteredFAQs,
    updateFilters,
    resetFilters,
    sortBy,
    searchParams,
  } = useSearchAndFilter<FAQType>({
    data: faqData,
    searchFields: ['question', 'answer'],
    filterFields: { topic: 'topic' },
    defaultSortBy: 'popularity',
    sortLogic,
  });

  const query = searchParams.get('q') || '';
  const topic = searchParams.get('topic') || 'All';

  // Helper to highlight search matches
  const highlightText = useCallback((text: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => (
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-primary/20 text-primary font-bold rounded-sm px-0.5">
              {part}
            </mark>
          ) : part
        ))}
      </>
    );
  }, [query]);

  const topics = ['All', 'General', 'Builder', 'Account', 'Templates', 'Billing'];

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto px-4 mb-24">
        {/* Header */}
        <header className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-lg text-gray-500 font-medium">
            Everything you need to know about Smart CV.
          </p>
        </header>

        {/* Filter Bar */}
        <section className="bg-white border border-gray-200 rounded-[32px] p-6 mb-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && updateFilters({ q: searchTerm })}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-medium"
              />
              {searchTerm && (
                <button 
                  onClick={() => { setSearchTerm(''); updateFilters({ q: null }); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Topic Dropdown */}
            <div className="md:col-span-3">
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={topic}
                  onChange={(e) => updateFilters({ topic: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-medium appearance-none cursor-pointer"
                >
                  {topics.map(t => (
                    <option key={t} value={t}>{t} Topic</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => updateFilters({ sortBy: e.target.value })}
                  className="w-full pl-4 pr-10 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-medium appearance-none cursor-pointer"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="date">Latest Updated</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filters & Reset */}
          {(query || topic !== 'All' || sortBy !== 'popularity') && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-400 uppercase mr-2">Active Filters:</span>
              {query && (
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  Search: {query}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilters({ q: null })} />
                </span>
              )}
              {topic !== 'All' && (
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  Topic: {topic}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => updateFilters({ topic: null })} />
                </span>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetFilters}
                className="rounded-full text-xs h-8 border-2"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Reset All
              </Button>
            </div>
          )}
        </section>

        {/* FAQ List */}
        <div className="space-y-4">
          {isLoading ? (
            // Loading Skeletons
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-[32px] animate-pulse" />
            ))
          ) : filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isExpanded={expandedId === faq.id}
                onToggle={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                highlightText={highlightText}
              />
            ))
          ) : (
            // Empty State
            <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">No FAQs found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
              <Button 
                variant="outline" 
                className="mt-6 rounded-2xl"
                onClick={resetFilters}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
