"use client";

import Link from "next/link";
import Image from "next/image";

const policies = [
  {
    title: "Terms of Service",
    href: "/terms-of-service",
    image: "/terms-of-service.png",
  },
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
    image: "/privacy-policy.png",
  },
  {
    title: "Refund Policy",
    href: "/refund",
    image: "/refund-policy.png",
  },
  {
    title: "Cookies Policy",
    href: "/cookies",
    image: "/cookies-policy.png",
  },
  {
    title: "Data Retention Policy",
    href: "/data-retention",
    image: "/data-retention-policy.png",
  },
];

function PolicyItem({ policy }: { policy: any }) {
  return (
    <div className="flex flex-col items-center space-y-4" style={{fontFamily: 'Poppins, Sans-serif'}}>
      <Link href={policy.href} className="group">
        <div className="relative w-64 h-64 rounded-full overflow-hidden cursor-pointer transition-transform group-hover:scale-105">
          <Image
            src={policy.image}
            alt={policy.title}
            fill
            className="object-cover"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-blue-500/40 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>

      <Link
        href={policy.href}
        className="text-blue-600 font-medium hover:underline text-center"
      >
        {policy.title}
      </Link>
    </div>
  );
}

export default function TermsAndPoliciesPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-3xl font-semibold" style={{fontFamily: 'Poppins, Sans-serif'}}>Terms and Policies</h1>
          <p className="text-muted-foreground mt-2" style={{fontFamily: 'Poppins, Sans-serif'}}>
            The guidelines you should know.
          </p>
        </div>

        {/* Centered Layout */}
        <div className="flex flex-col items-center gap-20">
          {/* Top Row (3) */}
          <div className="flex justify-center gap-16 flex-wrap">
            {policies.slice(0, 3).map((policy) => (
              <PolicyItem key={policy.title} policy={policy} />
            ))}
          </div>

          {/* Bottom Row (2) */}
          <div className="flex justify-center gap-16 flex-wrap">
            {policies.slice(3).map((policy) => (
              <PolicyItem key={policy.title} policy={policy} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
