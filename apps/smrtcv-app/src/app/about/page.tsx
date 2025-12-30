'use client';

import React, { useMemo } from 'react';
import { Search, X, ChevronDown, Info, User, Calendar, BookOpen } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { Button } from '@/components/ui/Button';
import { aboutData, type AboutItem } from '@/data/about';
import { useSearchAndFilter } from '@/hooks/useSearchAndFilter';

/**
 * About Page with filtering by author, date, and category.
 */
export default function AboutPage() {
  // Use the reusable search and filter hook
  const {
    searchTerm,
    setSearchTerm,
    isLoading,
    filteredData: filteredAbout,
    updateFilters,
    resetFilters,
    searchParams,
  } = useSearchAndFilter<AboutItem>({
    data: aboutData,
    searchFields: ['title', 'content'],
    filterFields: { 
      category: 'category',
      author: 'author',
      year: 'publicationDate' // We'll use custom filter for this
    },
    customFilters: {
      year: (item, value) => item.publicationDate.startsWith(value)
    }
  });

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'All';
  const author = searchParams.get('author') || 'All';
  const year = searchParams.get('year') || 'All';

  // Derived filter options
  const categories = useMemo(() => ['All', ...Array.from(new Set(aboutData.map(i => i.category)))], []);
  const authors = useMemo(() => ['All', ...Array.from(new Set(aboutData.map(i => i.author)))], []);
  const years = useMemo(() => ['All', ...Array.from(new Set(aboutData.map(i => i.publicationDate.substring(0, 4))))].sort().reverse(), []);

  return (
    <DashboardShell>
      <div className="max-w-6xl mx-auto px-4 mb-24">
        {/* Header */}
        <header className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-3 mb-2">
            <Info className="w-8 h-8 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              About Smart CV
            </h1>
          </div>
          <p className="text-lg text-gray-500 font-medium">
            Learn more about our mission, our team, and our engineering philosophy.
          </p>
        </header>

        {/* Filter Section */}
        <section className="bg-white border border-gray-200 rounded-[32px] p-6 mb-12 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
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

            {/* Category */}
            <div className="md:col-span-2 relative">
              <select
                value={category}
                onChange={(e) => updateFilters({ category: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-medium appearance-none cursor-pointer text-sm"
              >
                {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Author */}
            <div className="md:col-span-3 relative">
              <select
                value={author}
                onChange={(e) => updateFilters({ author: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-medium appearance-none cursor-pointer text-sm"
              >
                {authors.map(a => <option key={a} value={a}>{a === 'All' ? 'All Authors' : a}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Year */}
            <div className="md:col-span-2 relative">
              <select
                value={year}
                onChange={(e) => updateFilters({ year: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all font-medium appearance-none cursor-pointer text-sm"
              >
                {years.map(y => <option key={y} value={y}>{y === 'All' ? 'All Years' : y}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Active Filter Tags */}
          {(query || category !== 'All' || author !== 'All' || year !== 'All') && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-400 uppercase mr-2">Filters:</span>
              {query && <FilterTag label={`"${query}"`} onRemove={() => updateFilters({ q: null })} />}
              {category !== 'All' && <FilterTag label={category} onRemove={() => updateFilters({ category: null })} />}
              {author !== 'All' && <FilterTag label={author} onRemove={() => updateFilters({ author: null })} />}
              {year !== 'All' && <FilterTag label={year} onRemove={() => updateFilters({ year: null })} />}
              <button 
                onClick={resetFilters}
                className="text-xs font-bold text-primary hover:underline ml-2"
              >
                Clear All
              </button>
            </div>
          )}
        </section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 bg-gray-50 rounded-[40px] animate-pulse" />
            ))
          ) : filteredAbout.length > 0 ? (
            filteredAbout.map((item) => (
              <article 
                key={item.id}
                className="bg-white border border-gray-100 rounded-[40px] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
              >
                <div className="flex items-center gap-2 mb-6">
                  <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold">
                    {item.category}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-500 leading-relaxed mb-8 flex-1 line-clamp-4">
                  {item.content}
                </p>

                <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-bold">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-400" />
                    </div>
                    {item.author}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-medium ml-10">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(item.publicationDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-24 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900">No articles found</h3>
              <p className="text-gray-500 mt-2">Try different search terms or categories.</p>
              <Button variant="outline" className="mt-6 rounded-2xl" onClick={resetFilters}>
                View all content
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

function FilterTag({ label, onRemove }: { label: string, onRemove: () => void }) {
  return (
    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 group">
      {label}
      <X className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors" onClick={onRemove} />
    </span>
  );
}
