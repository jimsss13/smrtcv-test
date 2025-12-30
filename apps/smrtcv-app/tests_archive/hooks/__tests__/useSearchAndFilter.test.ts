// @ts-nocheck
import { renderHook, act } from '@testing-library/react';
import { useSearchAndFilter } from '../useSearchAndFilter';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('useSearchAndFilter', () => {
  interface MockItem {
    id: number;
    name: string;
    category: string;
  }

  const mockData: MockItem[] = [
    { id: 1, name: 'Apple', category: 'Fruit' },
    { id: 2, name: 'Banana', category: 'Fruit' },
    { id: 3, name: 'Carrot', category: 'Vegetable' },
  ];

  const config = {
    data: mockData,
    searchFields: ['name'] as (keyof MockItem)[],
    filterFields: { category: 'category' } as Record<string, keyof MockItem>,
  };

  const mockRouter = { push: jest.fn() };
  const mockPathname = '/test';
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    jest.clearAllMocks();
  });

  it('should return initial data when no filters are applied', () => {
    const { result } = renderHook(() => useSearchAndFilter(config));
    expect(result.current.filteredData).toEqual(mockData);
  });

  it('should filter data based on search query', () => {
    mockSearchParams.set('q', 'apple');
    const { result } = renderHook(() => useSearchAndFilter(config));
    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('Apple');
  });

  it('should filter data based on field filters', () => {
    mockSearchParams.set('category', 'Vegetable');
    const { result } = renderHook(() => useSearchAndFilter(config));
    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].name).toBe('Carrot');
  });

  it('should update filters and call router.push', () => {
    const { result } = renderHook(() => useSearchAndFilter(config));
    
    act(() => {
      result.current.updateFilters({ category: 'Fruit' });
    });

    expect(mockRouter.push).toHaveBeenCalledWith('/test?category=Fruit', { scroll: false });
  });

  it('should reset filters correctly', () => {
    const { result } = renderHook(() => useSearchAndFilter(config));
    
    act(() => {
      result.current.resetFilters();
    });

    expect(mockRouter.push).toHaveBeenCalledWith('/test');
    expect(result.current.searchTerm).toBe('');
  });
});
