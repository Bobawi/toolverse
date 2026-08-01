import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "ToolVerse privacy policy — we process everything in your browser. No uploads, no accounts, no tracking of your files. Learn how we protect your privacy.",
};

export default function PrivacyPage() {
    const sections = [
        {
            title: "1. Introduction",
            content:
                "At ToolVerse, we take your privacy seriously. This Privacy Policy explains how our website handles your information when you use our free online tools.",
        },
        {
            title: "2. No File Uploads — 100% Browser-Based",
            content:
                "All of our tools process your files and data directly in your web browser using modern web technologies (Canvas API, Web APIs). Your files, images, text, and documents NEVER leave your device. We have no servers that receive or store your content.",
        },
        {
            title: "3. No Accounts, No Sign-ups",
            content:
                "ToolVerse does not require you to create an account, register, or provide any personal information to use our tools. We cannot identify you or your activity on our tools.",
        },
        {
            title: "4. Data We Do Not Collect",
            content:
                "We do not collect, store, or process: your uploaded files, your tool inputs, your search queries within tools, or any personal data tied to your identity.",
        },
        {
            title: "5. Cookies and Analytics",
            content:
                "Our website may use basic cookies and privacy-friendly analytics to understand general site usage (like which pages are visited). This helps us improve our services. We do not use cookies to track you across other websites for advertising purposes without consent.",
        },
        {
            title: "6. Third-Party Services",
            content:
                "We may use third-party services such as hosting providers and privacy-focused analytics. These services may process anonymous, aggregated data to help us operate and improve the site.",
        },
        {
            title: "7. Advertising (AdSense)",
            content:
                "We may display ads through Google AdSense. Google may use cookies (like the DART cookie) to serve ads based on your visits to this and other sites. You can opt out of personalized advertising by visiting Google Ads Settings.",
        },
        {
            title: "8. Children's Privacy",
            content:
                "ToolVerse is a general audience website and does not knowingly collect any personal information from children under 13 years of age.",
        },
        {
            title: "9. Changes to This Policy",
            content:
                "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.",
        },
        {
            title: "10. Contact Us",
            content:
                "If you have any questions about this Privacy Policy, please contact us at contact@toolverse.app.",
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
                        Privacy Policy
                    </span>
                </nav>

                <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                    Privacy Policy
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

