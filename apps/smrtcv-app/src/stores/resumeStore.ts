import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { Resume } from '@/types/resume';
import { STORAGE_KEY_RESUME_STORE } from '@/constants/storage';
import { setNestedValue } from '@/lib/utils';
import { 
  blankResume, 
  defaultSectionOrder, 
  blankEntryMap 
} from '@/data/resume';

/**
 * Interface representing the resume store state and actions.
 */
export interface ResumeState {
  /** The current resume data. */
  resume: Resume;
  /** The order in which resume sections should be displayed. */
  sectionOrder: (keyof Resume)[];

  /**
   * Updates a specific field in the resume using a dot-notation path.
   * 
   * @param path - Dot-notation path to the field (e.g., 'basics.name' or 'work.0.position')
   * @param value - The new value for the field
   */
  updateField: (path: string, value: unknown) => void;

  /**
   * Adds a new entry to a specific resume section.
   * 
   * @param section - The resume section to add an entry to
   * @param template - Optional template for the new entry. If not provided, the default blank entry for the section is used.
   */
  addSection: (section: keyof Resume, template?: unknown) => void;
  
  /**
   * Removes an entry from a specific resume section by its index.
   * 
   * @param section - The resume section to remove an entry from
   * @param index - The index of the entry to remove
   */
  removeSection: (section: keyof Resume, index: number) => void;

  /**
   * Updates a string array field (e.g., keywords) from a comma-separated string.
   * 
   * @param path - Dot-notation path to the array field
   * @param value - Comma-separated string of values
   */
  updateStringArray: (path: string, value: string) => void;

  /**
   * Reorders the resume sections.
   * 
   * @param newOrder - The new array of section keys in the desired order
   */
  reorderSections: (newOrder: (keyof Resume)[]) => void;
}

/**
 * Zustand store for managing the global resume state.
 * 
 * This store handles the current resume data, section ordering, 
 * and persistent storage using local storage. It uses the 'immer' 
 * middleware for safe state mutations.
 * 
 * @example
 * const resume = useResumeStore((state) => state.resume);
 * const updateField = useResumeStore((state) => state.updateField);
 */
export const useResumeStore = create<ResumeState>()(
  persist(
    immer((set) => ({
      resume: blankResume,
      sectionOrder: defaultSectionOrder,

      updateField: (path, value) => {
        set((state) => {
          setNestedValue(state.resume, path, value);
        });
      },

      addSection: (section, template) => {
        set((state) => {
          const sectionArray = state.resume[section];
          const newEntry = template || (blankEntryMap as Record<string, unknown>)[section as string];
          
          if (!newEntry) return;

          if (Array.isArray(sectionArray)) {
            (sectionArray as unknown[]).push(newEntry);
          } else {
            (state.resume[section] as unknown) = [newEntry];
          }
        });
      },

      removeSection: (section, index) => {
        set((state) => {
          const sectionArray = state.resume[section];
          if (Array.isArray(sectionArray)) {
            sectionArray.splice(index, 1);
          }
        });
      },

      updateStringArray: (path, value) => {
        const arr = value.split(',').map(s => s.trim()).filter(Boolean);
        set((state) => {
          setNestedValue(state.resume, path, arr);
        });
      },

      reorderSections: (newOrder) => {
        set((state) => {
          state.sectionOrder = newOrder;
        });
      },
    })),
    {
      name: STORAGE_KEY_RESUME_STORE,
      /**
       * Custom merge logic for hydrated state.
       * Ensures that the hydrated resume data matches the expected structure
       * and that empty sections are initialized with at least one blank entry.
       */
      merge: (persistedState, currentState) => {
        const persisted = persistedState as ResumeState | undefined;
        
        const mergedState: ResumeState = {
          ...currentState,
          ...persisted,
          resume: {
            ...currentState.resume,
            ...(persisted?.resume || {}),
          },
          sectionOrder: persisted?.sectionOrder || currentState.sectionOrder,
        };

        const { resume } = mergedState;

        // Ensure each editable section has at least one entry if it's empty
        Object.entries(blankEntryMap).forEach(([key, blankEntry]) => {
          const sectionKey = key as keyof Resume;
          if (sectionKey === 'basics') return;

          const sectionData = resume[sectionKey];
          if (Array.isArray(sectionData) && sectionData.length === 0) {
            (resume[sectionKey] as unknown[]) = [blankEntry];
          }
        });

        return mergedState;
      },
    }
  )
);