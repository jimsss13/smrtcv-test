// @ts-nocheck
import { renderHook, act } from '@testing-library/react';
import { useBuilderTemplate } from '../useBuilderTemplate';
import { STORAGE_KEY_SELECTED_TEMPLATE } from '@/constants/storage';

describe('useBuilderTemplate', () => {
  beforeEach(() => {
    localStorage.clear();
    // @ts-ignore - Mocking window.location for tests
    delete window.location;
    // @ts-ignore - Mocking window.location for tests
    window.location = { search: '' };
  });

  it('should initialize with default template if no storage or query param', () => {
    const { result } = renderHook(() => useBuilderTemplate(true));
    expect(result.current[0]).toBe('classic');
  });

  it('should initialize from localStorage if available', () => {
    localStorage.setItem(STORAGE_KEY_SELECTED_TEMPLATE, 'traditional');
    const { result } = renderHook(() => useBuilderTemplate(true));
    expect(result.current[0]).toBe('traditional');
  });

  it('should initialize from query param and override localStorage', () => {
    localStorage.setItem(STORAGE_KEY_SELECTED_TEMPLATE, 'traditional');
    // @ts-ignore - Mocking window.location for tests
    window.location.search = '?template=classic';
    
    const { result } = renderHook(() => useBuilderTemplate(true));
    expect(result.current[0]).toBe('classic');
  });

  it('should update localStorage when template changes', () => {
    const { result } = renderHook(() => useBuilderTemplate(true));
    
    act(() => {
      result.current[1]('traditional');
    });
    
    expect(result.current[0]).toBe('traditional');
    expect(localStorage.getItem(STORAGE_KEY_SELECTED_TEMPLATE)).toBe('traditional');
  });
});
