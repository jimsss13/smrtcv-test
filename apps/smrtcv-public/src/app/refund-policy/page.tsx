import Image from "next/image";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-3xl">
        
        <Link
          href="/legal-pages"
          className="mb-6 inline-flex items-center text-sm font-medium text-blue-600 hover:underline" style={{ fontFamily: "Poppins, Sans-serif", color: "#0068BB" }} 
        >
          ← Return
        </Link>

        {/* Illustration */}
        <div className="my-8 flex justify-center">
          <Image
            src="/rp.png"
            alt="Terms of Service Illustration"
            width={620}
            height={480}
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl font-bold text-blue-600" style={{ fontFamily: "Poppins, Sans-serif", color: "#0068BB" }}>
          REFUND POLICY
        </h1>

        {/* Effective Date */}
        <p className="mt-2 text-center text-sm text-gray-500" style={{fontFamily: 'Poppins, Sans-serif'}}>
          Effective Date: <span className="font-medium">[Get Date]</span>
        </p>

        {/* Content */}
       <section
            className="mt-8 space-y-6 text-sm leading-relaxed text-gray-700"
            style={{ fontFamily: "Poppins, Sans-serif" }}
            >
            {/* Intro */}
            <p>
                At SmrtCV, we aim to offer transparent pricing and satisfaction through our
                CV and cover letter creation tools.
            </p>

            {/* One-Time Payment Policy */}
            <div>
                <h2 className="font-semibold text-blue-600" style={{ color: "#0068BB" }}>
                One-Time Payment Policy
                </h2>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                    Our service operates on a single €2.99 payment for 2 weeks (14 days) of
                    full access.
                </li>
                <li>
                    There are no automatic renewals, subscriptions, or recurring charges.
                </li>
                </ul>
            </div>

            {/* Refund Eligibility */}
            <div>
                <h2 className="font-semibold text-blue-600" style={{ color: "#0068BB" }}>
                Refund Eligibility
                </h2>
                <p className="mt-2" style={{ color: "#0068BB" }}>
                Refunds may be granted only under the following conditions:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                    The payment was made in error (e.g., duplicate transaction).
                </li>
                <li>
                    The service was completely inaccessible due to a verified technical
                    issue on our side.
                </li>
                </ul>

                <p className="mt-2" style={{ color: "#0068BB" }}>To qualify:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>You must submit a refund request within 3 days of purchase.</li>
                <li>
                    You must not have significantly used the platform (e.g., exported
                    multiple CVs or cover letters).
                </li>
                </ul>
            </div>

            {/* Non-Refundable Situations */}
            <div>
                <h2 className="font-semibold text-blue-600" style={{ color: "#0068BB" }}>
                Non-Refundable Situations
                </h2>
                <p className="mt-2" style={{ color: "#0068BB" }}>Refunds are not available if:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                    You have successfully created or downloaded your CV or cover letter.
                </li>
                <li>The 14-day access period has already expired.</li>
                <li>
                    The issue results from third-party services (e.g., payment gateway
                    delays).
                </li>
                </ul>
            </div>

            {/* How to Request a Refund */}
            <div>
                <h2 className="font-semibold text-blue-600" style={{ color: "#0068BB" }}>
                How to Request a Refund
                </h2>
                <p className="mt-2" style={{ color: "#0068BB" }}>
                To request a refund, email us at <strong>Email ID</strong> with:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Your payment confirmation</li>
                <li>The email address used for the purchase</li>
                <li>A short explanation of the issue</li>
                </ul>
            </div>

            {/* Closing */}
            <p
                className="pt-2 italic text-blue-600"
                style={{ color: "#0068BB" }}
            >
                We review requests within 5 business days, and approved refunds are
                processed within 7–10 business days.
            </p>
            </section>



      </div>
    </main>
  );
}
