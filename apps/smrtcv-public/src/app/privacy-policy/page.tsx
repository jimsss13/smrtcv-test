import Image from "next/image";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-3xl">
        
        <Link
          href="/legal-pages"
          className="mb-6 inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
        >
          ← Return
        </Link>

        {/* Illustration */}
        <div className="my-8 flex justify-center">
          <Image
            src="/pp.png"
            alt="Privacy Policy Illustration"
            width={620}
            height={480}
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl font-bold text-blue-600" style={{ fontFamily: "Poppins, Sans-serif", color: "#0068BB" }}>
            PRIVACY POLICY
        </h1>

        {/* Effective Date */}
        <p className="mt-2 text-center text-sm text-gray-500" style={{fontFamily: 'Poppins, Sans-serif'}}>
          Effective Date: <span className="font-medium">[Get Date]</span>
        </p>

        {/* Content */}
                <section
        className="mt-8 space-y-6 text-sm leading-relaxed text-gray-700"
        style={{ fontFamily: "Poppins, Sans-serif"}}
        >
        <div>
            <h2 className="font-semibold text-blue-600" style={{ fontFamily: "Poppins, Sans-serif", color: "#0068BB" }}>Information We Collect</h2>

            <h3 className="mt-3 font-medium text-gray-800" style={{ fontFamily: "Poppins, Sans-serif", color: "#0068BB" }}>
            1. Personal Information
            </h3>
            <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Name, email address, and account details</li>
            <li>
                Payment information for premium plans (processed securely through
                third-party providers)
            </li>
            </ul>

            <h3 className="mt-3 font-medium text-gray-800" style={{ fontFamily: "Poppins, Sans-serif", color: "#0068BB" }}>2. Content Data</h3>
            <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>
                Information you input into your CVs, resumes, cover letters, and
                profile
            </li>
            <li>Uploaded documents or files</li>
            </ul>

            <h3 className="mt-3 font-medium text-gray-800" style={{ fontFamily: "Poppins, Sans-serif", color: "#0068BB" }}>3. Usage Data</h3>
            <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>
                Device type, browser type, IP address, session duration, and
                interactions with the platform
            </li>
            <li>
                Analytics data to help improve functionality and user experience
            </li>
            </ul>
        </div>

        <div>
            <h2 className="font-semibold text-blue-600" style={{ fontFamily: "Poppins, Sans-serif", color: "#0068BB" }}>How We Use Your Data</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Provide, operate, and improve our Services</li>
            <li>Personalize templates and generate CV/resume content</li>
            <li>Process payments and manage subscriptions</li>
            <li>
                Communicate updates, security alerts, or support messages
            </li>
            <li>
                Comply with legal, security, and regulatory requirements
            </li>
            </ul>
        </div>

        <div>
            <h2 className="font-semibold text-blue-600" style={{ fontFamily: "Poppins, Sans-serif", color: "#0068BB" }}>Data Protection</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
                Sensitive payment information is handled only by trusted third-party
                payment gateways; we do not store full credit card or payment details.
            </li>
            <li>
                We use standard industry security measures to protect your data from
                unauthorized access, loss, or misuse.
            </li>
            </ul>
        </div>

        <div>
            <h2 className="font-semibold text-blue-600" style={{ fontFamily: "Poppins, Sans-serif", color: "#0068BB" }}>Your Rights</h2>
            <p className="mt-1" style={{ fontFamily: "Poppins, Sans-serif", color: "#0068BB" }}>You have the right to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Access your personal information</li>
            <li>Modify or update your data</li>
            <li>
                Delete your account and associated data (unless required to be retained
                by law)
            </li>
            <li>
                Manage your preferences through account settings
            </li>
            </ul>
        </div>

        <p className="pt-2 italic text-blue-600" style={{ fontFamily: "Poppins, Sans-serif", color: "#0068BB" }}>
            If needed, you can also contact our support team for assistance with any
            data-related requests.
        </p>
        </section>

      </div>
    </main>
  );
}
