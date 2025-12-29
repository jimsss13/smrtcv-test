import { useEffect, useState, useRef } from 'react';
import { useResumeStore } from '@/stores/resumeStore';

/**
 * A hook that safely accesses the resume store on the client side,
 * avoiding hydration mismatches by returning the server-side state
 * until the component has mounted.
 * 
 * It uses a manual subscription to avoid 'getServerSnapshot' infinite loop errors
 * which occur when using useSyncExternalStore with selectors that return new objects.
 */
export const useClientResumeStore = <T,>(
  selector: (state: any) => T,
  equalityFn: (a: T, b: T) => boolean = (a, b) => a === b
) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [state, setState] = useState<T>(() => selector(useResumeStore.getState()));
  
  const selectorRef = useRef(selector);
  const equalityFnRef = useRef(equalityFn);
  
  // Keep refs up to date without triggering effects
  selectorRef.current = selector;
  equalityFnRef.current = equalityFn;

  useEffect(() => {
    setIsHydrated(true);
    
    // Sync with store state on mount (catches data from localStorage)
    const currentSelectedState = selectorRef.current(useResumeStore.getState());
    setState(currentSelectedState);

    // Subscribe to store updates
    const unsubscribe = useResumeStore.subscribe((newState) => {
      const nextSelectedState = selectorRef.current(newState);
      setState((prev) => {
        if (equalityFnRef.current(prev, nextSelectedState)) {
          return prev;
        }
        return nextSelectedState;
      });
    });

    return unsubscribe;
  }, []);

  return state;
};