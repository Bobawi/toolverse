import Link from "next/link";
import { ReactNode } from "react";
import ToolShareButtons from "@/components/tool-layout/ToolShareButtons";
import { SITE_URL } from "@/lib/site";

interface ToolLayoutProps {
    name: string;
    slug: string;
    description: string;
    icon: string;
    bgColor: string;
    children: ReactNode;
}

export default function ToolLayout({
    name,
    slug,
    description,
    icon,
    bgColor,
    children,
}: ToolLayoutProps) {
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
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/tools" className="hover:text-foreground">
                        Tools
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

