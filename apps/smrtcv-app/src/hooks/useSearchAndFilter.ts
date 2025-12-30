'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

/**
 * Configuration for the useSearchAndFilter hook.
 */
interface FilterConfig<T> {
  /** The initial array of data to be filtered and sorted. */
  data: T[];
  /** The fields of the data object that should be searched against. */
  searchFields: (keyof T)[];
  /** Mapping of URL parameter names to data object fields for filtering. */
  filterFields: Record<string, keyof T>;
  /** Optional custom filter functions for specific URL parameters. */
  customFilters?: Record<string, (item: T, value: string) => boolean>;
  /** The default field to sort by if no 'sortBy' parameter is present in the URL. */
  defaultSortBy?: string;
  /** Optional custom sorting logic. */
  sortLogic?: (data: T[], sortBy: string) => T[];
}

/**
 * Custom hook for managing search, multi-field filtering, and sorting via URL search parameters.
 * 
 * Features:
 * - Synchronizes search and filter state with the URL.
 * - Supports custom filtering logic for complex scenarios.
 * - Provides a debounced search experience.
 * - Standardizes sorting across different data types.
 * 
 * @template T - The type of data items being processed.
 * @param {FilterConfig<T>} config - Configuration object for the hook.
 * @returns {Object} State and handler methods for searching and filtering.
 */
export function useSearchAndFilter<T>({
  data,
  searchFields,
  filterFields,
  customFilters,
  defaultSortBy = 'popularity',
  sortLogic,
}: FilterConfig<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL state
  const query = searchParams.get('q') || '';
  const sortBy = searchParams.get('sortBy') || defaultSortBy;

  // Local state for search input
  const [searchTerm, setSearchTerm] = useState(query);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Updates the URL with new filter or search values.
   * Merges updates with existing search parameters.
   * 
   * @param {Record<string, string | null>} updates - Key-value pairs of parameters to update.
   */
  const updateFilters = useCallback((updates: Record<string, string | null>) => {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === 'All' || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Reset to first page if pagination exists (conceptually)
    if (params.has('page') && !updates.page) {
      params.delete('page');
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    
    // Simulate slight delay for transition feel and to prevent flickering
    const loadingTimer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(loadingTimer);
  }, [pathname, router, searchParams]);

  // Sync local search term with URL when it changes externally
  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  // Debounced search effect: Update URL after a delay when searchTerm changes
  useEffect(() => {
    if (searchTerm === query) return;

    const timer = setTimeout(() => {
      updateFilters({ q: searchTerm });
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, query, updateFilters]);

  /**
   * Resets all filters to their default values.
   */
  const resetFilters = useCallback(() => {
    setSearchTerm('');
    router.push(pathname);
  }, [pathname, router]);

  /**
   * Memoized filtered and sorted data.
   */
  const filteredData = useMemo(() => {
    let result = [...data];

    // 1. Search filter
    if (query) {
      const lowQuery = query.toLowerCase();
      result = result.filter(item => 
        searchFields.some(field => {
          const value = item[field];
          return typeof value === 'string' && value.toLowerCase().includes(lowQuery);
        })
      );
    }

    // 2. Field filters
    Object.entries(filterFields).forEach(([paramName, fieldName]) => {
      const paramValue = searchParams.get(paramName);
      if (paramValue && paramValue !== 'All') {
        // Use custom filter if provided for this parameter
        if (customFilters?.[paramName]) {
          result = result.filter(item => customFilters[paramName](item, paramValue));
        } else {
          // Default equality filter
          result = result.filter(item => String(item[fieldName]) === paramValue);
        }
      }
    });

    // 3. Sorting
    if (sortLogic) {
      result = sortLogic(result, sortBy);
    }

    return result;
  }, [data, query, searchParams, searchFields, filterFields, customFilters, sortBy, sortLogic]);

  return {
    searchTerm,
    setSearchTerm,
    isLoading,
    filteredData,
    updateFilters,
    resetFilters,
    sortBy,
    searchParams,
  };
}
