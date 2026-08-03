import Link from "next/link";
import { BlogPost } from "@/types";

export default function BlogCard({ post }: { post: BlogPost }) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="card-glow group flex flex-col rounded-xl border border-border bg-background p-6 transition-all hover:-translate-y-0.5"
        >
            <div className="mb-4 flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 text-lg">
                    {post.icon}
                </span>
                <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted">
                    {post.category}
                </span>
            </div>
            <h3 className="text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                {post.title}
            </h3>
            <p className="mt-2 flex-1 text-sm text-muted line-clamp-3">{post.description}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted">
                <span>{post.date}</span>
                <span aria-hidden="true">•</span>
                <span>{post.readTime}</span>
                <span
                    aria-hidden="true"
                    className="ml-auto text-primary transition-all duration-300 group-hover:translate-x-1"
                >
                    &rarr;
                </span>
            </div>
        </Link>
    );
}

