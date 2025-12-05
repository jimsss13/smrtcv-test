import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { Resume } from '@/types/resume';

// --- 1. Type Safety Utilities ---
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends any[]
    ? `${TKey}` | `${TKey}.${number}` | `${TKey}.${number}.${RecursiveKeyOf<TObj[TKey][number]>}`
    : TObj[TKey] extends object
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & (string | number)];

type PathValue<T, P extends string> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? PathValue<T[Key], Rest>
    : T extends any[]
    ? PathValue<T[number], Rest>
    : never
  : P extends keyof T
  ? T[P]
  : T extends any[]
  ? T[number]
  : never;

// --- 2. Blank "Template" Objects ---
const blankWorkEntry = {
  name: "", position: "", url: "", startDate: "", endDate: "", summary: "", highlights: []
};
const blankEducationEntry = {
  institution: "", url: "", area: "", studyType: "", startDate: "", endDate: "", score: "", location: ""
};
const blankCertificateEntry = { name: "", issuer: "", date: "", url: "" };
const blankPublicationEntry = { name: "", publisher: "", releaseDate: "", url: "", summary: "" };
const blankSkillEntry = { name: "", level: "", keywords: [] };
const blankAwardEntry = { title: "", date: "", awarder: "", summary: "" };
const blankLanguageEntry = { language: "", fluency: "" };
const blankInterestEntry = { name: "", keywords: [] };
const blankProjectEntry = { name: "", startDate: "", endDate: "", description: "", highlights: [], url: "" };
const blankReferenceEntry = { name: "", reference: "" };
const blankVolunteerEntry = { organization: "", position: "", url: "", startDate: "", endDate: "", summary: "", highlights: [] };
const blankAdvisoryEntry = { organization: "", position: "" };

const blankResume: Resume = {
  basics: {
    name: "", label: "", image: "", email: "", phone: "", url: "", summary: "",
    location: { address: "", postalCode: "", city: "", region: "", countryCode: "" },
    profiles: [],
    nationality: "",
  },
  work: [blankWorkEntry],
  education: [blankEducationEntry],
  certificates: [blankCertificateEntry],
  publications: [blankPublicationEntry],
  skills: [blankSkillEntry],
  awards: [blankAwardEntry],
  languages: [blankLanguageEntry],
  interests: [blankInterestEntry],
  projects: [blankProjectEntry],
  references: [blankReferenceEntry],
  volunteer: [blankVolunteerEntry],
  advisory: [blankAdvisoryEntry],
};

const LOCAL_STORAGE_KEY = 'dynamicResumeData';

const defaultSectionOrder: (keyof Resume)[] = [
  'basics',
  'work',
  'education',
  'skills',
  'projects',
  'awards',
  'certificates',
  'publications',
  'languages',
  'interests',
  'volunteer',
  'references',
  'advisory'
];

const blankEntryMap: Record<keyof Resume, any> = {
  basics: {},
  work: blankWorkEntry,
  education: blankEducationEntry,
  certificates: blankCertificateEntry,
  publications: blankPublicationEntry,
  skills: blankSkillEntry,
  awards: blankAwardEntry,
  languages: blankLanguageEntry,
  interests: blankInterestEntry,
  projects: blankProjectEntry,
  references: blankReferenceEntry,
  volunteer: blankVolunteerEntry,
  advisory: blankAdvisoryEntry,
};

// --- 3. Typed State & Actions ---

interface ResumeState {
  resume: Resume;
  sectionOrder: (keyof Resume)[];

  updateField: <P extends RecursiveKeyOf<Resume>>(
    path: P, 
    value: PathValue<Resume, P>
  ) => void;

  addSection: (section: keyof Resume, template: any) => void;
  
  // NEW: Remove Action
  removeSection: (section: keyof Resume, index: number) => void;

  updateStringArray: (path: RecursiveKeyOf<Resume>, value: string) => void;
  reorderSections: (newOrder: (keyof Resume)[]) => void;
}

export const useResumeStore = create(
  persist(
    immer<ResumeState>((set) => ({
      resume: blankResume,
      sectionOrder: defaultSectionOrder,

      updateField: (path, value) => {
        set((state) => {
          const keys = path.split(".");
          let current = state.resume as any;
          for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (current[key] === undefined || current[key] === null) {
              current[key] = isNaN(Number(keys[i + 1])) ? {} : [];
            }
            current = current[key];
          }
          current[keys[keys.length - 1]] = value;
        });
      },

      addSection: (section, template) => {
        set((state) => {
          const sectionArray = state.resume[section] as any[] | undefined;
          if (Array.isArray(sectionArray)) {
            sectionArray.push(template);
          } else {
            (state.resume[section] as any) = [template];
          }
        });
      },

      // --- NEW: Remove Implementation ---
      removeSection: (section, index) => {
        set((state) => {
          const sectionArray = state.resume[section] as any[] | undefined;
          if (Array.isArray(sectionArray)) {
            sectionArray.splice(index, 1);
          }
        });
      },

      updateStringArray: (path, value) => {
        const arr = value.split(',').map(s => s.trim()).filter(Boolean);
        set((state) => {
          const keys = path.split(".");
          let current = state.resume as any;
          for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
          }
          current[keys[keys.length - 1]] = arr;
        });
      },

      reorderSections: (newOrder) => {
        set((state) => {
          state.sectionOrder = newOrder;
        });
      },
    })),
    {
      name: LOCAL_STORAGE_KEY,
      merge: (persistedState, currentState) => {
        const mergedState = {
          ...currentState,
          ...(persistedState as ResumeState),
          resume: {
            ...currentState.resume,
            ...((persistedState as ResumeState)?.resume || {}),
          },
          sectionOrder: (persistedState as ResumeState)?.sectionOrder || currentState.sectionOrder,
        };

        const mergedResume = mergedState.resume;

        Object.keys(blankEntryMap).forEach((key) => {
          const resumeKey = key as keyof Resume;
          if (resumeKey === 'basics') return;

          const sectionArray = mergedResume[resumeKey] as any[] | undefined;
          if (!sectionArray || sectionArray.length === 0) {
            (mergedResume[resumeKey] as any) = [blankEntryMap[resumeKey]];
          }
        });
        
        return mergedState;
      }
    }
  )
);