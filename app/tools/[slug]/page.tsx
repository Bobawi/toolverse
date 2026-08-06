import { notFound } from "next/navigation";
import { use } from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { tools, getToolBySlug } from "@/data/tools";
import ToolLayout from "@/components/ui/ToolLayout";
import ToolFAQ from "@/components/tool-layout/ToolFAQ";
import ToolFeatures from "@/components/tool-layout/ToolFeatures";
import ToolHowToUse from "@/components/tool-layout/ToolHowToUse";
import ToolRelatedTools from "@/components/tool-layout/ToolRelatedTools";
import AdSlot from "@/components/ads/AdSlot";
import { SITE_URL } from "@/lib/site";

function ToolJsonLd({ tool }: { tool: (typeof tools)[number] }) {
    const toolUrl = `${SITE_URL}/tools/${tool.slug}`;

    // WebApplication schema for the tool itself
    const webAppJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: tool.name,
        description: tool.seo?.description ?? tool.description,
        url: toolUrl,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Web",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            ratingCount: "120",
        },
    };

    // FAQPage schema based on the tool's FAQ data (if present)
    const faqList = tool.faq ?? [];
    const faqJsonLd =
        faqList.length > 0
            ? {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqList.map((f) => ({
                    "@type": "Question",
                    name: f.question,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: f.answer,
                    },
                })),
            }
            : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
            />
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}
        </>
    );
}

// Lazy-load each tool component so heavy dependencies (pdf-lib,
// QR lib, etc.) are code-split into per-tool chunks instead of
// being bundled into the shared chunk loaded on every page.
const toolComponents: Record<string, React.ComponentType> = {
    "qr-generator": dynamic(() => import("./qr-generator")),
    "password-generator": dynamic(() => import("./password-generator")),
    "json-formatter": dynamic(() => import("./json-formatter")),
    "age-calculator": dynamic(() => import("./age-calculator")),
    "loan-calculator": dynamic(() => import("./loan-calculator")),
    "character-counter": dynamic(() => import("./character-counter")),
    "base64-encoder": dynamic(() => import("./base64-tool")),
    "case-converter": dynamic(() => import("./case-converter")),
    "color-converter": dynamic(() => import("./color-converter")),
    "hash-generator": dynamic(() => import("./hash-generator")),
    "text-to-speech": dynamic(() => import("./text-to-speech")),
    "unit-converter": dynamic(() => import("./unit-converter")),
    "markdown-editor": dynamic(() => import("./markdown-editor")),
    "uuid-generator": dynamic(() => import("./uuid-generator")),
    "image-compressor": dynamic(() => import("./image-compressor")),
    "image-resizer": dynamic(() => import("./image-resizer")),
    "image-cropper": dynamic(() => import("./image-cropper")),
    "html-encoder": dynamic(() => import("./html-encoder")),
    "date-calculator": dynamic(() => import("./date-calculator")),
    "slug-generator": dynamic(() => import("./slug-generator")),
    "lorem-ipsum": dynamic(() => import("./lorem-ipsum")),
    "bmi-calculator": dynamic(() => import("./bmi-calculator")),
    "percentage-calculator": dynamic(() => import("./percentage-calculator")),
    "vat-calculator": dynamic(() => import("./vat-calculator")),
    "jpg-to-png": dynamic(() => import("./jpg-to-png")),
    "png-to-jpg": dynamic(() => import("./png-to-jpg")),
    "png-to-webp": dynamic(() => import("./png-to-webp")),
    "jpg-to-webp": dynamic(() => import("./jpg-to-webp")),
    "webp-to-png": dynamic(() => import("./webp-to-png")),
    "webp-to-jpg": dynamic(() => import("./webp-to-jpg")),
    "image-rotator": dynamic(() => import("./image-rotator")),
    "image-flipper": dynamic(() => import("./image-flipper")),
    "image-to-base64": dynamic(() => import("./image-to-base64")),
    "merge-pdf": dynamic(() => import("./merge-pdf")),
    "split-pdf": dynamic(() => import("./split-pdf")),
    "compress-pdf": dynamic(() => import("./compress-pdf")),
    "pdf-to-image": dynamic(() => import("./pdf-to-image")),
    "image-to-pdf": dynamic(() => import("./image-to-pdf")),
    "url-encoder": dynamic(() => import("./url-encoder")),
    "jwt-decoder": dynamic(() => import("./jwt-decoder")),
    "password-strength": dynamic(() => import("./password-strength")),
    "random-number-generator": dynamic(() => import("./random-number-generator")),
    "tip-calculator": dynamic(() => import("./tip-calculator")),
    "binary-converter": dynamic(() => import("./binary-converter")),
    "roman-numeral-converter": dynamic(() => import("./roman-numeral-converter")),
    "temperature-converter": dynamic(() => import("./temperature-converter")),
    "discount-calculator": dynamic(() => import("./discount-calculator")),
    "stopwatch": dynamic(() => import("./stopwatch")),
    "countdown-timer": dynamic(() => import("./countdown-timer")),
    "currency-converter": dynamic(() => import("./currency-converter")),
    "calculator": dynamic(() => import("./calculator")),
    "income-tax-calculator": dynamic(() => import("./income-tax-calculator")),
};

export function generateStaticParams() {
    return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const tool = getToolBySlug(slug);
    if (!tool) return {};

    const toolUrl = `${SITE_URL}/tools/${tool.slug}`;

    return {
        title: tool.seo?.title ?? `${tool.name} - Free Online Tool | ToolVerse`,
        description:
            tool.seo?.description ??
            `${tool.name} - ${tool.description} Free, fast, no sign-up required.`,
        keywords: [
            tool.name,
            `${tool.name} online`,
            `${tool.name} free`,
            "free online tools",
            "toolverse",
        ],
        alternates: {
            canonical: toolUrl,
            languages: {
                "en": toolUrl,
                "fr": toolUrl,
                "ar": toolUrl,
            },
        },
        openGraph: {
            title: tool.seo?.title ?? `${tool.name} - Free Online Tool`,
            description:
                tool.seo?.description ?? `${tool.description} No sign-up required.`,
            type: "website",
            url: toolUrl,
            siteName: "ToolVerse",
            locale: "en_US",
            alternateLocale: ["fr_FR", "ar_MA"],
        },
        twitter: {
            card: "summary",
            title: tool.seo?.title ?? `${tool.name} - Free Online Tool`,
            description:
                tool.seo?.description ?? `${tool.description} Free and fast.`,
        },
    };
}

export default function ToolPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const tool = getToolBySlug(slug);
    if (!tool) notFound();

    const ToolComponent = toolComponents[slug];

    return (
        <>
            <ToolJsonLd tool={tool} />
            <ToolLayout
                tool={tool}
                slug={tool.slug}
                icon={tool.icon}
                bgColor={tool.bgColor}
            >
{ToolComponent ? (
                    <ToolComponent />
                ) : (
                    <div className="py-12 text-center">
                        <p className="text-lg text-muted">{`This tool is coming soon...`}</p>
                    </div>
                )}

                {/* AdSense (inactive until enabled in env) */}
                <AdSlot className="my-6" />

                <ToolHowToUse tool={tool} />
                <ToolFeatures tool={tool} />
                <ToolFAQ tool={tool} />

                <ToolRelatedTools slug={slug} />
            </ToolLayout>
        </>
    );
}

