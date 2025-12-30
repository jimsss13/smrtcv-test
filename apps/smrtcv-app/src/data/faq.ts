/**
 * Represents a single frequently asked question and its answer.
 */
export interface FAQItem {
  /** Unique identifier for the FAQ entry */
  id: string;
  /** The question text */
  question: string;
  /** The answer text */
  answer: string;
  /** Categorization for filtering */
  topic: 'General' | 'Builder' | 'Account' | 'Templates' | 'Billing';
  /** Popularity score from 1-100 for sorting */
  popularity: number;
  /** Date of last update in YYYY-MM-DD format */
  lastUpdated: string;
}

/**
 * Static data for the Frequently Asked Questions (FAQ) page.
 */
export const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    topic: 'Builder',
    popularity: 95,
    lastUpdated: '2025-12-01',
    question: 'How does the AI resume builder work?',
    answer:
      'Our AI analyzes your input, suggests improvements, and formats your resume using industry-approved templates. It ensures your resume is polished, ATS-friendly, and tailored to your career goals.',
  },
  {
    id: 'faq-2',
    topic: 'Templates',
    popularity: 88,
    lastUpdated: '2025-11-15',
    question: 'Can I customize the templates?',
    answer:
      'Yes! All templates are fully customizable. You can change fonts, colors, spacing, and rearrange sections to fit your personal brand and the job you are applying for.',
  },
  {
    id: 'faq-3',
    topic: 'General',
    popularity: 92,
    lastUpdated: '2025-12-10',
    question: 'Will my resume be ATS-friendly?',
    answer:
      'Absolutely. Our templates are designed and tested to be fully compatible with modern Applicant Tracking Systems (ATS). The AI also helps you include relevant keywords to pass ATS scans.',
  },
  {
    id: 'faq-4',
    topic: 'Builder',
    popularity: 75,
    lastUpdated: '2025-10-20',
    question: 'Do I need design skills to use the builder?',
    answer:
      'Not at all. The builder is designed for everyone. Our professional templates and AI suggestions handle all the design work for you, ensuring a beautiful and effective resume every time.',
  },
  {
    id: 'faq-6',
    topic: 'General',
    popularity: 85,
    lastUpdated: '2025-12-05',
    question: 'Can I download my resume?',
    answer:
      'Yes, you can download your resume in multiple formats, including PDF, DOCX, and TXT, as many times as you like. You can also share a unique web link to your resume.',
  },
  {
    id: 'faq-7',
    topic: 'Billing',
    popularity: 60,
    lastUpdated: '2025-11-20',
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, including Visa, Mastercard, and American Express. We also support PayPal for your convenience.',
  },
  {
    id: 'faq-8',
    topic: 'Account',
    popularity: 45,
    lastUpdated: '2025-09-15',
    question: 'How do I delete my account?',
    answer:
      'You can delete your account from the Account Settings page. Please note that this action is permanent and will delete all your saved resumes and data.',
  },
];
