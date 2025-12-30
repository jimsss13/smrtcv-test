import { Resume } from '@/types/resume';

/**
 * Blank work experience entry template.
 */
export const blankWorkEntry = {
  name: "", position: "", url: "", startDate: "", endDate: "", summary: "", highlights: []
};

/**
 * Blank education entry template.
 */
export const blankEducationEntry = {
  institution: "", url: "", area: "", studyType: "", startDate: "", endDate: "", score: "", location: ""
};

/**
 * Blank certificate entry template.
 */
export const blankCertificateEntry = { name: "", issuer: "", date: "", url: "" };

/**
 * Blank publication entry template.
 */
export const blankPublicationEntry = { name: "", publisher: "", releaseDate: "", url: "", summary: "" };

/**
 * Blank skill entry template.
 */
export const blankSkillEntry = { name: "", level: "", keywords: [] };

/**
 * Blank award entry template.
 */
export const blankAwardEntry = { title: "", date: "", awarder: "", summary: "" };

/**
 * Blank language entry template.
 */
export const blankLanguageEntry = { language: "", fluency: "" };

/**
 * Blank interest entry template.
 */
export const blankInterestEntry = { name: "", keywords: [] };

/**
 * Blank project entry template.
 */
export const blankProjectEntry = { name: "", startDate: "", endDate: "", description: "", highlights: [], url: "" };

/**
 * Blank reference entry template.
 */
export const blankReferenceEntry = { name: "", reference: "" };

/**
 * Blank volunteer entry template.
 */
export const blankVolunteerEntry = { organization: "", position: "", url: "", startDate: "", endDate: "", summary: "", highlights: [] };

/**
 * Blank advisory entry template.
 */
export const blankAdvisoryEntry = { organization: "", position: "" };

/**
 * Initial empty resume state with blank entries for each section.
 */
export const blankResume: Resume = {
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

/**
 * Default order of sections in the resume.
 */
export const defaultSectionOrder: (keyof Resume)[] = [
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

/**
 * Mapping of resume sections to their respective blank entry templates.
 */
export const blankEntryMap: Record<keyof Omit<Resume, 'basics'>, unknown> = {
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
