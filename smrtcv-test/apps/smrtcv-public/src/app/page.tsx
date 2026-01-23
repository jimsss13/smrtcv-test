import { HeroSection } from '@/components/landing/HeroSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { TemplatesSection } from '@/components/landing/TemplatesSection';
import { testimonialData } from '@/contexts/testimonials';

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <TestimonialsSection testimonials={testimonialData} />
      <HowItWorksSection />
      <TemplatesSection />
    </>
  );
}