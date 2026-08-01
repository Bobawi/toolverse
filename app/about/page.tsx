import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Learn about ToolVerse — a collection of free, fast, and privacy-friendly online tools for images, PDFs, developers, text, and everyday tasks.",
};

const aboutData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About ToolVerse",
    url: "https://toolverse.app/about",
    description:
        "ToolVerse provides free, fast, and privacy-friendly online tools for images, PDFs, developers, text, AI, and everyday tasks.",
};

const stats = [
    { value: "30+", label: "Free Tools" },
    { value: "100%", label: "Browser-based" },
    { value: "0", label: "Sign-ups required" },
    { value: "🔒", label: "Privacy-first" },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutData) }}
            />
            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
                <nav
                    aria-label="Breadcrumb"
                    className="mb-8 flex items-center gap-2 text-sm text-muted"
                >
                    <Link href="/" className="hover:text-foreground">
                        Home
                    </Link>
                    <span>/</span>
                    <span className="text-foreground" aria-current="page">
                        About
                    </span>
                </nav>

                <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                    About ToolVerse
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-muted">
                    ToolVerse is a collection of free, fast, and privacy-friendly online
                    tools designed to help you get things done without the hassle of
                    installs, sign-ups, or uploads.
                </p>

                {/* Stats */}
                <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {stats.map((s) => (
                        <div
                            key={s.label}
                            className="rounded-xl border border-border bg-muted/5 p-4 text-center"
                        >
                            <p className="text-2xl font-bold text-primary">{s.value}</p>
                            <p className="mt-1 text-xs text-muted">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Mission */}
                <div className="mt-12 space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
                    <p className="leading-relaxed text-muted">
                        We believe everyday tools should be fast, free, and private. That&apos;s
                        why every ToolVerse tool runs directly in your browser — your files
                        and data never leave your device.
                    </p>
                    <p className="leading-relaxed text-muted">
                        No accounts. No uploads. No waiting. Just open a tool, get your
                        result, and go on with your day.
                    </p>
                </div>

                {/* Features */}
                <div className="mt-12 space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">
                        Why Choose ToolVerse?
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            { icon: "⚡", title: "Fast", desc: "Tools run instantly in your browser with no server round-trips." },
                            { icon: "🔒", title: "Private", desc: "Files are processed locally. Nothing is uploaded to any server." },
                            { icon: "🆓", title: "Free", desc: "Every tool is 100% free with no hidden charges or limits." },
                            { icon: "📱", title: "Works everywhere", desc: "All tools work on desktop, tablet, and mobile browsers." },
                        ].map((f) => (
                            <div
                                key={f.title}
                                className="rounded-xl border border-border bg-background p-5"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-xl">
                                    {f.icon}
                                </div>
                                <h3 className="mt-3 font-semibold text-foreground">
                                    {f.title}
                                </h3>
                                <p className="mt-1 text-sm text-muted">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
                    <h2 className="text-xl font-bold text-foreground">
                        Ready to get started?
                    </h2>
                    <p className="mt-2 text-muted">
                        Explore all the free tools we have to offer.
                    </p>
                    <Link
                        href="/tools"
                        className="mt-4 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                    >
                        Browse All Tools →
                    </Link>
                </div>
            </div>
        </div>
    );
}

