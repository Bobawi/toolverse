import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms of Service",
    description:
        "ToolVerse terms of service — free tools, no warranty, fair use. Read our terms before using our online tools.",
};

export default function TermsPage() {
    const sections = [
        {
            title: "1. Acceptance of Terms",
            content:
                "By accessing or using ToolVerse, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.",
        },
        {
            title: "2. Use of Services",
            content:
                "ToolVerse provides free online tools for personal and commercial use. You agree to use these tools for lawful purposes only and not to misuse, abuse, or attempt to harm the service in any way.",
        },
        {
            title: "3. No Warranty",
            content:
                "All tools are provided 'as is' without warranties of any kind, either express or implied. While we strive for accuracy, we do not warrant that the tools will be error-free, secure, or produce results that are completely accurate for all use cases.",
        },
        {
            title: "4. Limitation of Liability",
            content:
                "ToolVerse and its team shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of, or inability to use, our website or tools.",
        },
        {
            title: "5. Intellectual Property",
            content:
                "The ToolVerse name, logo, design, and website content are protected by intellectual property laws. You may not copy, reproduce, or redistribute them without prior written consent.",
        },
        {
            title: "6. User Content",
            content:
                "All processing happens locally in your browser. We do not store, transmit, or have access to any files or data you process through our tools.",
        },
        {
            title: "7. Third-Party Links",
            content:
                "Our website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of any third-party sites.",
        },
        {
            title: "8. Advertising",
            content:
                "Our website may display advertisements through third-party ad networks such as Google AdSense. Advertisers may use cookies to serve ads based on your prior visits to our website or other websites.",
        },
        {
            title: "9. Changes to Terms",
            content:
                "We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the revised terms.",
        },
        {
            title: "10. Governing Law",
            content:
                "These terms shall be governed by and construed in accordance with the laws of Morocco, without regard to its conflict of law provisions.",
        },
        {
            title: "11. Contact",
            content:
                "For any questions about these Terms of Service, please contact us at contact@toolverse.app.",
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
                <nav
                    aria-label="Breadcrumb"
                    className="mb-8 flex items-center gap-2 text-sm text-muted"
                >
                    <Link href="/" className="hover:text-foreground">
                        Home
                    </Link>
                    <span>/</span>
                    <span className="text-foreground" aria-current="page">
                        Terms of Service
                    </span>
                </nav>

                <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                    Terms of Service
                </h1>
                <p className="mt-2 text-sm text-muted">
                    Last updated: January 2025
                </p>

                <div className="mt-8 space-y-8">
                    {sections.map((s) => (
                        <section key={s.title}>
                            <h2 className="text-xl font-semibold text-foreground">
                                {s.title}
                            </h2>
                            <p className="mt-2 leading-relaxed text-muted">
                                {s.content}
                            </p>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}

