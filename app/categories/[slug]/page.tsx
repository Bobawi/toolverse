import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import ToolCard from "@/components/tools/ToolCard";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
    return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const category = getCategoryBySlug(slug);
    if (!category) return {};
    return {
        title: `${category.name} Tools - Free Online ${category.name} Tools | ToolVerse`,
        description: `Browse our collection of free online ${category.name.toLowerCase()} tools. Compress, resize, convert, and more. No sign-up required.`,
        openGraph: {
            title: `${category.name} Tools - ToolVerse`,
            description: `Free online ${category.name.toLowerCase()} tools for everyone.`,
        },
    };
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const category = getCategoryBySlug(slug);
    if (!category) notFound();

    const tools = getToolsByCategory(slug);

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${category.name} Tools`,
        description: `Free online ${category.name.toLowerCase()} tools collection.`,
        url: `${SITE_URL}/categories/${slug}`,
        mainEntity: {
            "@type": "ItemList",
            itemListElement: tools.map((tool, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `${SITE_URL}/tools/${tool.slug}`,
            })),
        },
    };

    return (
        <div className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-muted">
                    <Link href="/" className="hover:text-foreground">Home</Link>
                    <span>/</span>
                    <Link href="/tools" className="hover:text-foreground">Tools</Link>
                    <span>/</span>
                    <span className="text-foreground" aria-current="page">{category.name}</span>
                </nav>

                {/* Category Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4">
                        <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl ${category.bgColor}`}>
                            {category.icon}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                                {category.name} Tools
                            </h1>
                            <p className="mt-2 text-muted">
                                {tools.length} tool{tools.length !== 1 && "s"} available
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tools Grid */}
                {tools.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {tools.map((tool) => (
                            <ToolCard key={tool.slug} tool={tool} />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <p className="text-lg text-muted">
                            No tools available in this category yet. They&apos;re coming soon!
                        </p>
                        <Link
                            href="/tools"
                            className="mt-4 inline-flex h-10 items-center justify-center rounded-lg border border-border px-5 text-sm font-medium text-foreground hover:bg-muted/10"
                        >
                            Browse all tools &rarr;
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

