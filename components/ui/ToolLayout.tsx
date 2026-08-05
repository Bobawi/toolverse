"use client";

import Link from "next/link";
import { Tool } from "@/types";
import { useLanguage } from "@/components/LanguageProvider";
import { localizeToolName, localizeToolDescription } from "@/lib/localize";
import ToolShareButtons from "@/components/tool-layout/ToolShareButtons";
import { SITE_URL } from "@/lib/site";

interface ToolLayoutProps {
    tool: Tool;
    slug: string;
    icon: string;
    bgColor: string;
    children: React.ReactNode;
}

export default function ToolLayout({
    tool,
    slug,
    icon,
    bgColor,
    children,
}: ToolLayoutProps) {
    const { t, locale } = useLanguage();
    const name = localizeToolName(tool, locale);
    const description = localizeToolDescription(tool, locale);

    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${SITE_URL}/`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Tools",
                item: `${SITE_URL}/tools`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: name,
                item: `${SITE_URL}/tools/${slug}`,
            },
        ],
    };

    const appData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: name,
        description: description,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
    };

    return (
        <div className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(appData) }}
            />
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
                {/* Breadcrumb */}
                <nav
                    aria-label="Breadcrumb"
                    className="mb-6 flex items-center gap-2 text-sm text-muted"
                >
                    <Link href="/" className="hover:text-foreground">
                        {t("nav.home")}
                    </Link>
                    <span>/</span>
                    <Link href="/tools" className="hover:text-foreground">
                        {t("nav.tools")}
                    </Link>
                    <span>/</span>
                    <span className="text-foreground" aria-current="page">
                        {name}
                    </span>
                </nav>

                {/* Tool header */}
                <div className="mb-8 flex items-start gap-4">
                    <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl ${bgColor}`}
                    >
                        {icon}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                            {name}
                        </h1>
                        <p className="mt-1 text-muted">{description}</p>
                    </div>
                </div>

                {/* Tool content */}
                <div className="rounded-xl border border-border bg-background p-6 sm:p-8">
                    {children}
                </div>

                {/* Share buttons */}
                <ToolShareButtons title={name} slug={slug} />
            </div>
        </div>
    );
}

