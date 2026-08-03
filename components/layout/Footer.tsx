import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-background">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-3">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white">
                                T
                            </div>
                            <span className="text-base font-semibold text-foreground">
                                ToolVerse
                            </span>
                        </Link>
                        <p className="text-sm text-muted leading-relaxed">
                            Free online tools for images, PDFs, developers, text, AI, and everyday tasks. Fast, secure, and privacy-friendly.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-foreground">
                            Navigation
                        </h3>
                        <ul className="space-y-2">
                            {[
                                { label: "Home", href: "/" },
                                { label: "Tools", href: "/tools" },
                                { label: "Blog", href: "/blog" },
                                { label: "About", href: "/about" },
                                { label: "Contact", href: "/contact" },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-muted transition-colors hover:text-foreground"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-foreground">
                            Categories
                        </h3>
                        <ul className="space-y-2">
                            {[
                                { label: "Image", href: "/categories/image" },
                                { label: "PDF", href: "/categories/pdf" },
                                { label: "Developer", href: "/categories/developer" },
                                { label: "Calculators", href: "/categories/calculators" },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-muted transition-colors hover:text-foreground"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-foreground">
                            Legal
                        </h3>
                        <ul className="space-y-2">
                            {[
                                { label: "Privacy Policy", href: "/privacy" },
                                { label: "Terms of Service", href: "/terms" },
                                { label: "About Us", href: "/about" },
                                { label: "Contact", href: "/contact" },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-muted transition-colors hover:text-foreground"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t border-border pt-5 text-center text-sm text-muted">
                    &copy; {currentYear} ToolVerse. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

