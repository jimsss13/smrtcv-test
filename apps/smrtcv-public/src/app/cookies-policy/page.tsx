    import Image from "next/image";
    import Link from "next/link";

    export default function CookiesPolicyPage() {
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
                src="/cp.png"
                alt="Cookies Policy Illustration"
                width={620}
                height={480}
                priority
            />
            </div>

            {/* Title */}
            <h1 className="text-center text-2xl font-bold text-blue-600" style={{ fontFamily: "Poppins, Sans-serif", color: "#0068BB" }}>
                COOKIES POLICY
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
                    {/* Types of Cookies */}
                    <div>
                        <h2
                        className="font-semibold text-blue-600"
                        style={{ color: "#0068BB" }}
                        >
                        Types of Cookies We Use
                        </h2>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                        <li>
                            <strong style={{ color: "#0068BB" }}>Essential Cookies:</strong> Required for login and secure access.
                        </li>
                        <li>
                            <strong style={{ color: "#0068BB" }}>Performance Cookies:</strong> Track site usage to improve performance.
                        </li>
                        <li>
                            <strong style={{ color: "#0068BB" }}>Preference Cookies:</strong> Save your design and template choices.
                        </li>
                        <li>
                            <strong style={{ color: "#0068BB" }}>Advertising Cookies:</strong> Used (if applicable) to show relevant offers.
                        </li>
                        </ul>
                    </div>

                    {/* Managing Cookies */}
                    <div>
                        <h2
                        className="font-semibold text-blue-600"
                        style={{ color: "#0068BB" }}
                        >
                        Managing Cookies
                        </h2>
                        <p className="mt-2">
                        You can disable cookies via your browser settings, but some features may not
                        function properly without them.
                        </p>
                    </div>
                    </section>


        </div>
        </main>
    );
    }
