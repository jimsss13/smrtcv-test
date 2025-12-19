'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:4001';

export default function PricingPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-white py-12 md:py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header Section */}
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
          Subscription Plan
        </h1>
        <p className="text-lg md:text-xl text-foreground-secondary mb-12 md:mb-16">
          Avail our service for a very affordable price!
        </p>

        {/* Pricing Display */}
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <span className="text-xl md:text-2xl font-medium text-foreground mb-4">pay</span>
          <div className="text-[80px] sm:text-[100px] md:text-[140px] leading-none font-bold text-[#0070f3] mb-6">
            €2.99
          </div>
          <span className="text-xl md:text-3xl font-medium text-foreground mb-4 px-4">
            and use unlimited templates for
          </span>
          <div className="text-[60px] sm:text-[80px] md:text-[110px] leading-none font-bold text-[#0070f3] mb-10 md:mb-12">
            14 days!
          </div>

          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full border-[3px] border-[#0070f3] text-[#0070f3] hover:bg-blue-50 text-xl md:text-2xl font-bold px-12 md:px-16 h-14 md:h-16 transition-all duration-300"
            asChild
          >
            <a href={`${AUTH_URL}/signin`}>Start today!</a>
          </Button>
        </div>

        {/* Features Section */}
        <div className="max-w-2xl mx-auto text-left mt-16 md:mt-24 relative pl-8 md:pl-12">
          {/* Vertical Line with Dots */}
          <div className="absolute left-0 top-[10px] bottom-[180px] md:bottom-[210px] w-[3px] bg-[#0070f3] rounded-full">
            <div className="absolute -top-1.5 -left-[6px] w-3.5 h-3.5 md:w-4 md:h-4 bg-[#0070f3] rounded-full" />
            <div className="absolute -bottom-1.5 -left-[6px] w-3.5 h-3.5 md:w-4 md:h-4 bg-[#0070f3] rounded-full" />
          </div>

          {/* What's Included */}
          <section className="mb-10 md:mb-14">
            <h2 className="text-xl md:text-2xl font-bold text-[#0070f3] mb-4">What&apos;s Included</h2>
            <ul className="space-y-2">
              {[
                'Access to professional CV and cover letter builder',
                'Choose from modern, recruiter-approved templates',
                'Unlimited editing and formatting',
                'Download in PDF and Word formats',
                'Customer support via email',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start text-[#0070f3] text-base md:text-lg font-medium">
                  <span className="mr-3 text-lg md:text-xl leading-tight">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Why Choose Us */}
          <section className="mb-10 md:mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-[#0070f3] mb-4">Why Choose Us</h2>
            <ul className="space-y-2">
              {[
                'Quick setup — create your CV in minutes',
                'Tailored templates for every industry',
                'Affordable short-term access for job seekers',
                'No hidden fees or auto-renewals (you control renewal)',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start text-[#0070f3] text-base md:text-lg font-medium">
                  <span className="mr-3 text-lg md:text-xl leading-tight">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Terms Link */}
          <div className="mt-8 md:mt-12">
            <Link 
              href="/faq" 
              className="text-[#0070f3] text-base md:text-lg font-bold underline decoration-2 underline-offset-8 hover:opacity-80 transition-opacity"
            >
              View FAQs for more information.
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
