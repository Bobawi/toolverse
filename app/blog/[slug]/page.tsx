import { notFound } from "next/navigation";
import { use } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts, getBlogPostBySlug, getRelatedBlogPosts } from "@/data/blog";
import BlogArticle from "@/components/blog/BlogArticle";
import BlogCard from "@/components/blog/BlogCard";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);
    if (!post) return {};

    return {
        title: post.seo?.title ?? `${post.title} | ToolVerse Blog`,
        description: post.seo?.description ?? post.description,
        alternates: {
            canonical: `${SITE_URL}/blog/${post.slug}`,
        },
        openGraph: {
            title: post.seo?.title ?? post.title,
            description: post.seo?.description ?? post.description,
            type: "article",
            url: `${SITE_URL}/blog/${post.slug}`,
            publishedTime: post.date,
            tags: post.tags,
        },
        twitter: {
            card: "summary_large_image",
            title: post.seo?.title ?? post.title,
            description: post.seo?.description ?? post.description,
        },
    };
}

export default function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const post = getBlogPostBySlug(slug);
    if (!post) notFound();

    const related = getRelatedBlogPosts(slug);

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        author: {
            "@type": "Organization",
            name: "ToolVerse",
            url: SITE_URL,
        },
        publisher: {
            "@type": "Organization",
            name: "ToolVerse",
            url: SITE_URL,
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/blog/${post.slug}`,
        },
        keywords: post.tags.join(", "),
    };

    return (
        <div className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
                {/* Breadcrumb */}
                <nav
                    aria-label="Breadcrumb"
                    className="mb-8 flex items-center gap-2 text-sm text-muted"
                >
                    <Link href="/" className="hover:text-foreground">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-foreground">
                        Blog
                    </Link>
                    <span>/</span>
                    <span className="text-foreground" aria-current="page">
                        {post.title}
                    </span>
                </nav>

                {/* Article header */}
                <header className="mb-10">
                    <div className="mb-4 flex items-center gap-2">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-xl">
                            {post.icon}
                        </span>
                        <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
                            {post.category}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
                        {post.title}
                    </h1>
                    <p className="mt-4 text-lg text-muted">{post.description}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted">
                        <span>{post.date}</span>
                        <span aria-hidden="true">•</span>
                        <span>{post.readTime}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </header>

                {/* Article body */}
                <div className="rounded-xl border border-border bg-background p-6 sm:p-8">
                    <BlogArticle post={post} />
                </div>

                {/* Related posts */}
                {related.length > 0 && (
                    <div className="mt-12">
                        <h2 className="mb-5 text-xl font-bold text-foreground">
                            Related Articles
                        </h2>
                        <div className="grid gap-5 sm:grid-cols-2">
                            {related.map((p) => (
                                <BlogCard key={p.slug} post={p} />
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="mt-12 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-8 text-center">
                    <h2 className="text-lg font-bold text-foreground sm:text-xl">
                        Try it yourself — it&apos;s free!
                    </h2>
                    <p className="mx-auto mt-2 max-w-lg text-sm text-muted">
                        Put these tips into practice with our free online tools. No sign-up required.
                    </p>
                    <Link
                        href="/tools"
                        className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                    >
                        Browse All Tools &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
}

