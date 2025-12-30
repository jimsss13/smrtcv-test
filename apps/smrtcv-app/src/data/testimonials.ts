import { Testimonial } from '@/types';

/**
 * Static data for user testimonials.
 * Used on the landing page and about page to showcase user feedback.
 */
export const testimonialData: Testimonial[] = [
  {
    id: 'testimonial-1',
    rating: 5,
    text: "Smart CV made my job hunt so much easier. The templates are professionally designed and ATS-friendly. I landed three interviews in just one week after updating my resume!",
    author: "Martha S.",
    date: "2 days ago",
  },
  {
    id: 'testimonial-2',
    rating: 5,
    text: "As a career changer, I was struggling to highlight my transferable skills. The AI suggestions were a game-changer for me. Highly recommended!",
    author: "James L.",
    date: "1 week ago",
  },
  {
    id: 'testimonial-3',
    rating: 4,
    text: "The best resume builder I've used so far. It's intuitive, fast, and the results look amazing. Great value for the price.",
    author: "Sarah K.",
    date: "3 weeks ago",
  },
];
