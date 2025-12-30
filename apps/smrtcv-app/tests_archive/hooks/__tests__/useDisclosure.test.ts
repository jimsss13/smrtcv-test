// @ts-nocheck
import { renderHook, act } from '@testing-library/react';
import { useDisclosure } from '../useDisclosure';

describe('useDisclosure', () => {
  it('should initialize with default state (false)', () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.isOpen).toBe(false);
  });

  it('should initialize with provided state', () => {
    const { result } = renderHook(() => useDisclosure(true));
    expect(result.current.isOpen).toBe(true);
  });

  it('should open correctly', () => {
    const { result } = renderHook(() => useDisclosure(false));
    act(() => {
      result.current.onOpen();
    });
    expect(result.current.isOpen).toBe(true);
  });

  it('should close correctly', () => {
    const { result } = renderHook(() => useDisclosure(true));
    act(() => {
      result.current.onClose();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('should toggle correctly', () => {
    const { result } = renderHook(() => useDisclosure(false));
    
    act(() => {
      result.current.onToggle();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.onToggle();
    });
    expect(result.current.isOpen).toBe(false);
  });
});
