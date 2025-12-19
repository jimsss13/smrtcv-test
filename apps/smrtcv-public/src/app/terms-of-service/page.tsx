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
            src="/tos.png"
            alt="Terms of Service Illustration"
            width={620}
            height={480}
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl font-bold text-blue-600" style={{fontFamily: 'Poppins, Sans-serif'}}>
          TERMS OF SERVICE
        </h1>

        {/* Effective Date */}
        <p className="mt-2 text-center text-sm text-gray-500" style={{fontFamily: 'Poppins, Sans-serif'}}>
          Effective Date: <span className="font-medium">[Get Date]</span>
        </p>

        {/* Content */}
        <section className="mt-8 space-y-6 text-sm leading-relaxed text-gray-700" style={{fontFamily: 'Poppins, Sans-serif'}}>
          <p>
            Welcome to SmrtCV (&#34;we,&#34; &#34;our,&#34; &#34;us&#34;). These
            Terms of Service explain the rules and conditions for accessing and
            using our online platform, tools, and services for creating, editing,
            customizing, and managing CVs, resumes, and related documents
            (&#34;Services&#34;). By using our Services, you agree to these Terms.
          </p>

          {/* Use of Service */}
          <div>
            <h2 className="font-semibold text-blue-600" style={{fontFamily: 'Poppins, Sans-serif'}}>Use of Service</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5" style={{fontFamily: 'Poppins, Sans-serif'}}>
              <li>You must be at least 16 years old to use the platform.</li>
              <li>
                You agree to use the Service only for lawful and personal
                purposes, specifically for creating and managing professional
                documents.
              </li>
              <li>
                You must not upload or create content that is false, misleading,
                offensive, harmful, or violates any laws or third-party rights.
              </li>
            </ul>
          </div>

          {/* Accounts */}
          <div>
            <h2 className="font-semibold text-blue-600" style={{fontFamily: 'Poppins, Sans-serif'}}>Accounts</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                You are responsible for keeping your account login details
                secure.
              </li>
              <li>
                You agree to notify us immediately of any unauthorized access to
                your account.
              </li>
              <li>
                We reserve the right to suspend or terminate accounts that
                violate these Terms.
              </li>
            </ul>
          </div>

          {/* Intellectual Property */}
          <div>
            <h2 className="font-semibold text-blue-600" style={{fontFamily: 'Poppins, Sans-serif'}}>
              Intellectual Property
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5" style={{fontFamily: 'Poppins, Sans-serif'}}>
              <li>
                All templates, design layouts, features, code, graphics, and
                tools on the platform are owned by Smart CV or its licensors.
              </li>
              <li>
                You retain ownership of the content you create, including your
                CV, resume, cover letter, or any uploaded information.
              </li>
              <li>
                By using the platform, you grant Smart CV a limited license to
                store and process your content solely for providing the
                Services.
              </li>
            </ul>
          </div>

          {/* Data & Privacy */}
          <div>
            <h2 className="font-semibold text-blue-600" style={{fontFamily: 'Poppins, Sans-serif'}}>Data & Privacy</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5" style={{fontFamily: 'Poppins, Sans-serif'}}>
              <li>
                We handle your personal information in accordance with our
                Privacy Policy.
              </li>
              <li>
                You agree that your data may be used to operate, improve, and
                personalize the platform.
              </li>
            </ul>
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 className="font-semibold text-blue-600" style={{fontFamily: 'Poppins, Sans-serif'}}>
              Limitation of Liability
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5" style={{fontFamily: 'Poppins, Sans-serif'}}>
              <li>
                The Service is provided &#34;as is&#34; without warranties of any
                kind.
              </li>
              <li>
                We do not guarantee employment results, job interview outcomes,
                or any specific career success.
              </li>
              <li>
                Smart CV will not be liable for losses, damages, or delays
                arising from your use of the platform.
              </li>
            </ul>
          </div>

          {/* Changes */}
          <div>
            <h2 className="font-semibold text-blue-600" style={{fontFamily: 'Poppins, Sans-serif'}}>Changes to the Terms</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5" style={{fontFamily: 'Poppins, Sans-serif'}}>
              <li>
                Smart CV may update these Terms from time to time.
              </li>
              <li>
                Any updates will be posted on our website with a revised
                &#34;Effective Date.&#34;
              </li>
              <li>
                Continued use of the Service after changes means you accept the
                updated Terms.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
