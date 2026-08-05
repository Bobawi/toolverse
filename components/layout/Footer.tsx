"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { getToolBySlug } from "@/data/tools";
import { localizeToolName } from "@/lib/localize";
import type { Tool } from "@/types";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const { t, locale } = useLanguage();
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

// ToolBurst-style footer columns, mapped to real tool slugs
    const financeTools = ["loan-calculator", "tip-calculator", "vat-calculator", "currency-converter"]
        .map((s): Tool | null => getToolBySlug(s) ?? null)
        .filter((t): t is Tool => t !== null);
    const timeTools = ["date-calculator", "stopwatch", "countdown-timer", "age-calculator"]
        .map((s): Tool | null => getToolBySlug(s) ?? null)
        .filter((t): t is Tool => t !== null);
    const imageTools = ["image-compressor", "image-to-pdf", "webp-to-png", "qr-generator"]
        .map((s): Tool | null => getToolBySlug(s) ?? null)
        .filter((t): t is Tool => t !== null);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail("");
        }
    };

    return (
        <footer className="border-t border-border bg-background">
            {/* Newsletter */}
            <div className="border-b border-border bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
                <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground">
                                {t("footer.newsletter.title")}
                            </h3>
                            <p className="mt-1 text-sm text-muted">
                                {t("footer.newsletter.desc")}
                            </p>
                        </div>
                        <div className="w-full sm:w-auto sm:shrink-0">
                            {subscribed ? (
                                <p className="text-sm font-medium text-emerald-600">
                                    {t("footer.newsletter.success")}
                                </p>
                            ) : (
                                <form onSubmit={handleSubscribe} className="flex w-full gap-2 sm:w-80">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={t("footer.newsletter.placeholder")}
                                        className="h-10 flex-1 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition-all focus:border-primary/50"
                                    />
                                    <button
                                        type="submit"
                                        className="shrink-0 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-all hover:bg-primary-dark"
                                    >
                                        {t("footer.newsletter.button")}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

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
                            {t("footer.finance")}
                        </h3>
                        <ul className="space-y-2">
                            {financeTools.map((tool) => tool && (
                                <li key={tool.slug}>
                                    <Link
                                        href={`/tools/${tool.slug}`}
                                        className="text-sm text-muted transition-colors hover:text-foreground"
                                    >
                                        {localizeToolName(tool, locale)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-foreground">
                            {t("footer.time")}
                        </h3>
                        <ul className="space-y-2">
                            {timeTools.map((tool) => tool && (
                                <li key={tool.slug}>
                                    <Link
                                        href={`/tools/${tool.slug}`}
                                        className="text-sm text-muted transition-colors hover:text-foreground"
                                    >
                                        {localizeToolName(tool, locale)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-foreground">
                            {t("footer.image")}
                        </h3>
                        <ul className="space-y-2">
                            {imageTools.map((tool) => tool && (
                                <li key={tool.slug}>
                                    <Link
                                        href={`/tools/${tool.slug}`}
                                        className="text-sm text-muted transition-colors hover:text-foreground"
                                    >
                                        {localizeToolName(tool, locale)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-3 border-t border-border pt-5 text-center text-sm text-muted sm:flex-row sm:justify-between sm:text-left">
                    <p>
                        &copy; {currentYear} ToolVerse. {t("footer.rights")}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                        {[
                            { label: t("footer.privacy"), href: "/privacy" },
                            { label: t("footer.terms"), href: "/terms" },
                            { label: t("footer.about"), href: "/about" },
                            { label: t("footer.contact"), href: "/contact" },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="transition-colors hover:text-foreground"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
