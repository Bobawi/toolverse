import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with the ToolVerse team. Send us your feedback, feature requests, or questions about our free online tools.",
};

const contactData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact ToolVerse",
    url: "https://toolverse-steel.vercel.app/contact",
    description:
        "Contact the ToolVerse team for feedback, feature requests, or questions.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactData) }}
            />
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
                        Contact
                    </span>
                </nav>

                <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                    Contact Us
                </h1>
                <p className="mt-4 text-muted">
                    Have a question, feature request, or feedback? We&apos;d love to hear
                    from you. Fill out the form below and we&apos;ll get back to you as soon
                    as possible.
                </p>

                <div className="mt-10 rounded-xl border border-border bg-background p-6 sm:p-8">
                    <ContactForm />
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-border bg-muted/5 p-5">
                        <h2 className="font-semibold text-foreground">📧 Email</h2>
                        <p className="mt-1 text-sm text-muted">
                            For business inquiries, partnerships, or advertising:
                        </p>
                        <p className="mt-2 text-sm font-medium text-primary">
                            contact@toolverse.app
                        </p>
                    </div>
                    <div className="rounded-xl border border-border bg-muted/5 p-5">
                        <h2 className="font-semibold text-foreground">🐛 Report a Bug</h2>
                        <p className="mt-1 text-sm text-muted">
                            Found a bug in one of our tools? Let us know so we can fix it
                            quickly.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

