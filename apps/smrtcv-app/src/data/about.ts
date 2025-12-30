/**
 * Represents an article or item in the About section.
 */
export interface AboutItem {
  /** Unique identifier for the item */
  id: string;
  /** Title of the about item */
  title: string;
  /** Main content/body text */
  content: string;
  /** Author of the content */
  author: string;
  /** Date of publication in YYYY-MM-DD format */
  publicationDate: string;
  /** Categorization for filtering */
  category: 'Company' | 'Mission' | 'Team' | 'Product' | 'Engineering';
}

/**
 * Static data for the About page.
 * Contains company mission, history, and team information.
 */
export const aboutData: AboutItem[] = [
  {
    id: 'about-1',
    title: 'Our Mission to Bridge the Talent Gap',
    content: 'At Smart CV, we are committed to building digital solutions that bridge the gap between talent and opportunity. One of our proudest innovations is Smart CV, a modern resume builder created to simplify and enhance the job application process for everyone. By making technology simple, accessible, and impactful, we designed Smart CV to empower both seasoned professionals and new graduates with user-friendly design.',
    author: 'Jane Doe',
    publicationDate: '2025-11-10',
    category: 'Mission',
  },
  {
    id: 'about-2',
    title: 'The Story Behind Smart CV',
    content: 'Smart CV was born out of a simple observation: writing resumes is stressful and time-consuming. Our team of engineers and designers set out to create a tool that would turn this experience into a smooth, simple process. We believe every job seeker deserves a tool that truly understands their potential.',
    author: 'John Smith',
    publicationDate: '2025-12-05',
    category: 'Company',
  },
  {
    id: 'about-3',
    title: 'Engineering the Future of Resumes',
    content: 'Our engineering team uses cutting-edge AI and cloud technologies to ensure your data is secure and your resumes are perfectly formatted. We focus on performance, accessibility, and modern web standards to provide the best possible experience.',
    author: 'Alice Johnson',
    publicationDate: '2025-12-15',
    category: 'Engineering',
  },
  {
    id: 'about-4',
    title: 'Product Design Philosophy',
    content: 'We prioritize clarity, simplicity, and effectiveness in our design. Every feature we add is carefully considered to ensure it provides real value to our users without adding unnecessary complexity.',
    author: 'Bob Wilson',
    publicationDate: '2025-10-25',
    category: 'Product',
  },
  {
    id: 'about-5',
    title: 'Meet the Team',
    content: 'Our diverse team comes from all over the world, bringing unique perspectives and expertise to the table. We are united by our passion for building tools that help people succeed in their careers.',
    author: 'Sarah Brown',
    publicationDate: '2025-09-30',
    category: 'Team',
  },
];
