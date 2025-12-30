/**
 * The master blueprint for a resume, containing all possible sections.
 * This structure is compatible with all templates, including 'Classic' and 'Traditional'.
 */
export interface Resume {
  /** Personal information and contact details. */
  basics: Basics;
  /** Professional work history. */
  work: Work[];
  /** Educational background. */
  education: Education[];
  /** Professional certifications and licenses. */
  certificates?: Certificate[];
  /** Published works, articles, or research. */
  publications?: Publication[];
  /** Technical and soft skills. */
  skills: Skill[];
  /** Honors, awards, and recognitions. */
  awards?: Award[];
  /** Spoken and written languages. */
  languages: Language[];
  /** Personal hobbies and areas of interest. */
  interests: Interest[];
  /** Notable projects or case studies. */
  projects?: Project[];
  /** Professional or personal references. */
  references?: Reference[];
  /** Volunteer experience and community service. */
  volunteer?: Volunteer[];
  /** Advisory roles or board memberships (Specific to 'Traditional' template). */
  advisory?: Advisory[];
}

/**
 * Basic personal information and contact details.
 */
export interface Basics {
  /** Full legal name. */
  name: string;
  /** Professional title or headline (e.g., 'Senior Frontend Engineer'). */
  label: string;
  /** URL to a profile picture or headshot. */
  image: string;
  /** Primary contact email address. */
  email: string;
  /** Primary contact phone number. */
  phone: string;
  /** Personal website or portfolio URL. */
  url: string;
  /** Professional summary or objective statement. */
  summary: string;
  /** Physical location details. */
  location: Location;
  /** Social media and professional networking profiles. */
  profiles: Profile[];
  /** Citizenship or nationality (Optional, primarily for international contexts). */
  nationality?: string;
}

/**
 * Physical address and geographic information.
 */
export interface Location {
  /** Street address or residential line. */
  address?: string;
  /** Zip or postal code. */
  postalCode?: string;
  /** City name. */
  city: string;
  /** State, province, or region. */
  region: string;
  /** ISO 3166-1 alpha-2 country code (e.g., 'US', 'GB'). */
  countryCode: string;
}

/**
 * Social media or professional networking profile details.
 */
export interface Profile {
  /** The name of the network (e.g., 'LinkedIn', 'GitHub'). */
  network: string;
  /** The handle or identifier on the network. */
  username: string;
  /** Full URL to the profile. */
  url: string;
}

/**
 * Details of professional work experience.
 */
export interface Work {
  /** Name of the company or organization. */
  name: string;
  /** Job title or role held. */
  position: string;
  /** Company website URL. */
  url?: string;
  /** Start date of the employment (e.g., '2020-01-01'). */
  startDate: string;
  /** End date of the employment, or undefined if currently employed. */
  endDate?: string;
  /** Brief overview of responsibilities and achievements. */
  summary: string;
  /** Specific bullet-point highlights of achievements. */
  highlights: string[];
}

/**
 * Details of educational background.
 */
export interface Education {
  /** Name of the school, university, or institution. */
  institution: string;
  /** Institution website URL. */
  url?: string;
  /** Major, area of study, or specialization. */
  area: string;
  /** Type of degree or qualification (e.g., 'Bachelor of Science'). */
  studyType: string;
  /** Start date of the program. */
  startDate: string;
  /** End date of the program, or expected graduation date. */
  endDate: string;
  /** GPA, grade, or honors received. */
  score?: string;
  /** Physical location of the institution. */
  location?: string;
}

/**
 * Details of a professional certification or license.
 */
export interface Certificate {
  /** Name of the certificate or award. */
  name: string;
  /** Organization that issued the certificate. */
  issuer: string;
  /** Date the certificate was issued or earned. */
  date: string;
  /** URL to verify the certificate online. */
  url: string;
}

/**
 * Details of a published work, article, or research paper.
 */
export interface Publication {
  /** Title of the publication. */
  name: string;
  /** Name of the publisher, journal, or platform. */
  publisher: string;
  /** Date the work was released or published. */
  releaseDate: string;
  /** URL to the published work. */
  url: string;
  /** Brief summary or abstract of the publication. */
  summary: string;
}

/**
 * Details of a professional or technical skill.
 */
export interface Skill {
  /** Name of the skill (e.g., 'TypeScript', 'Project Management'). */
  name: string;
  /** Proficiency level (e.g., 'Expert', 'Intermediate'). */
  level: string;
  /** Specific keywords or sub-skills related to this category. */
  keywords: string[];
}

/**
 * Details of an award, honor, or recognition.
 */
export interface Award {
  /** Title of the award or honor. */
  title: string;
  /** Date the award was received. */
  date: string;
  /** Name of the organization that granted the award. */
  awarder: string;
  /** Brief description of why the award was granted. */
  summary: string;
}

/**
 * Details of a spoken or written language.
 */
export interface Language {
  /** Name of the language (e.g., 'English', 'Spanish'). */
  language: string;
  /** Proficiency or fluency level (e.g., 'Native', 'Fluent', 'Bilingual'). */
  fluency: string;
}

/**
 * Details of a personal hobby or area of interest.
 */
export interface Interest {
  /** Name of the interest or hobby. */
  name: string;
  /** Specific keywords or activities related to this interest. */
  keywords: string[];
}

/**
 * Details of a notable project or case study.
 */
export interface Project {
  /** Title or name of the project. */
  name: string;
  /** Start date of the project. */
  startDate: string;
  /** End date of the project, or current if ongoing. */
  endDate: string;
  /** Detailed description of the project and your role. */
  description: string;
  /** Specific bullet-point highlights of project achievements. */
  highlights: string[];
  /** URL to the project repository, live site, or case study. */
  url: string;
}

/**
 * Details of a professional or personal reference.
 */
export interface Reference {
  /** Name of the person providing the reference. */
  name: string;
  /** The reference statement or testimonial. */
  reference: string;
}

/**
 * Details of volunteer experience or community service.
 */
export interface Volunteer {
  /** Name of the organization or charity. */
  organization: string;
  /** Title or role during the volunteer period. */
  position: string;
  /** Organization website URL. */
  url: string;
  /** Start date of the volunteer work. */
  startDate: string;
  /** End date of the volunteer work. */
  endDate: string;
  /** Brief summary of the volunteer contributions. */
  summary: string;
  /** Specific bullet-point highlights of volunteer work. */
  highlights: string[];
}

/**
 * Details of an advisory role or board membership.
 * Primarily used in the 'Traditional' resume template.
 */
export interface Advisory {
  /** Name of the organization or board. */
  organization: string;
  /** Title or advisory role held. */
  position: string;
}