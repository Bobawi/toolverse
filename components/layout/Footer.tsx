"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { t } = useLanguage();

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
                            {t("footer.tagline")}
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-foreground">
                            {t("footer.nav")}
                        </h3>
                        <ul className="space-y-2">
                            {[
                                { label: t("nav.home"), href: "/" },
                                { label: t("nav.tools"), href: "/tools" },
                                { label: t("nav.blog"), href: "/blog" },
                                { label: t("nav.about"), href: "/about" },
                                { label: t("nav.contact"), href: "/contact" },
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
                            {t("footer.categories")}
                        </h3>
                        <ul className="space-y-2">
                            {[
                                { label: t("cat.image"), href: "/categories/image" },
                                { label: t("cat.pdf"), href: "/categories/pdf" },
                                { label: t("cat.developer"), href: "/categories/developer" },
                                { label: t("cat.calculators"), href: "/categories/calculators" },
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
                            {t("footer.legal")}
                        </h3>
                        <ul className="space-y-2">
                            {[
                                { label: t("footer.privacy"), href: "/privacy" },
                                { label: t("footer.terms"), href: "/terms" },
                                { label: t("footer.about"), href: "/about" },
                                { label: t("footer.contact"), href: "/contact" },
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
                    &copy; {currentYear} ToolVerse. {t("footer.rights")}
                </div>
            </div>
        </footer>
    );
}
