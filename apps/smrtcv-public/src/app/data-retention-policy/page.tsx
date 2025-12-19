    import Image from "next/image";
    import Link from "next/link";

    export default function DataRetentionPolicyPage() {
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
                src="/drp.png"
                alt="Cookies Policy Illustration"
                width={620}
                height={480}
                priority
            />
            </div>

            {/* Title */}
            <h1 className="text-center text-2xl font-bold text-blue-600" style={{ fontFamily: "Poppins, Sans-serif", color: "#0068BB" }}>
                DATA RETENTION POLICY
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

                <p>
                   We value your privacy and store your data only for as long as necessary to provide our services.
                 </p>

            {/* Account Document and Data */}
            <div>
                <h2
                className="font-semibold text-blue-600"
                style={{ color: "#0068BB" }}
                >
                Account Document and Data
                </h2>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                    Your CVs, cover letters, and related content are stored securely during
                your 14-day access period.
                </li>
                <li>
                    After 14 days, your account and all uploaded or generated content are
                automatically deleted from our servers.
                </li>
                </ul>

            </div>

            {/* Payment Data */}
            <div>
                <h2
                className="font-semibold text-blue-600"
                style={{ color: "#0068BB" }}
                >
                Payment Data
                </h2>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                    We do not store any bank details, credit/debit card numbers, or payment
                credentials.
                </li>
                <li>
                    All transactions are handled by a secure third-party payment gateway.
                </li>
                <li>
                    Once the payment is complete, we receive only a confirmation (no card
                details).
                </li>
                </ul>

            </div>

            {/* Analytics Data */}
            <div>
                <h2
                className="font-semibold text-blue-600"
                style={{ color: "#0068BB" }}
                >
                Analytics Data
                </h2>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                   Minimal anonymized analytics (e.g., site visits, template popularity) may
                be retained for service improvement.
                </li>
                <li>
                   These records contain no personal or identifiable information.
                </li>
                </ul>
            </div>

            {/* User Rights */}
            <div>
                <h2
                className="font-semibold text-blue-600"
                style={{ color: "#0068BB" }}
                >
                User Rights
                </h2>
                <p className="mt-2" style={{ color: "#0068BB" }}>
                You can contact <strong>Email ID</strong> at any time to:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Request manual deletion before your 14-day period ends</li>
                <li>
                    Ask for confirmation that your data has been fully erased
                </li>
                </ul>
                
                <p className="pt-2 italic text-blue-600" style={{ fontFamily: "Poppins, Sans-serif", color: "#0068BB" }}>
                All verified deletion requests are processed within 5 business days.
            </p>
            </div>
            </section>


        </div>
        </main>
    );
    }
