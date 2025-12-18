import { useEffect, useState } from 'react';
import { useResumeStore } from '@/stores/resumeStore';

export const useClientResumeStore = <T,>(selector: (state: any) => T) => {
  const [state, setState] = useState<T>(() => selector(useResumeStore.getState()));

  useEffect(() => {
    setState(selector(useResumeStore.getState()));
    const unsubscribe = useResumeStore.subscribe((s) => setState(selector(s)));
    return () => unsubscribe();
  }, [selector]);

  return state;
};