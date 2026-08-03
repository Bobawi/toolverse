import type { Metadata } from "next";
import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
    title: "Blog - Free Online Tools Guides | ToolVerse",
    description:
        "Learn how to compress images, convert formats, and use online tools effectively. Expert guides, tutorials, and tips from ToolVerse.",
};

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <section className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
                <div className="absolute inset-0 grid-pattern opacity-50" />
                <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                            Guides &amp; Tutorials
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            ToolVerse Blog
                        </h1>
                        <p className="mx-auto mt-3 max-w-2xl text-muted">
                            Practical guides to compress, convert, and optimize your images and files.
                            Learn the best practices used by professional developers and designers.
                        </p>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
                {/* Posts grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {blogPosts.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-14 rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent p-8 text-center">
                    <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                        Ready to optimize your images?
                    </h2>
                    <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
                        Use our free online tools to compress, convert, and resize images instantly — no sign-up required.
                    </p>
                    <Link
                        href="/tools"
                        className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl"
                    >
                        Browse All Tools &rarr;
                    </Link>
                </div>
            </div>
        </div>
    );
}

