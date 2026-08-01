import Link from "next/link";
import { tools } from "@/data/tools";

interface ToolRelatedToolsProps {
    slug: string;
    limit?: number;
}

export default function ToolRelatedTools({
    slug,
    limit = 4,
}: ToolRelatedToolsProps) {
    const currentTool = tools.find((tool) => tool.slug === slug);
    if (!currentTool) return null;

    const relatedTools = tools.filter(
        (tool) => tool.slug !== slug && tool.category === currentTool.category
    );

    if (relatedTools.length === 0) return null;

    const displayedTools = relatedTools.slice(0, limit);

    return (
        <section className="mt-10 border-t border-border pt-8">
            <h2 className="text-lg font-bold text-foreground sm:text-xl">
                Related Tools
            </h2>
            <p className="mt-1 text-sm text-muted">
                More useful tools in the {currentTool.category} category
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {displayedTools.map((tool) => (
                    <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}`}
                        className="group flex items-center gap-3 rounded-xl border border-border bg-background p-4 transition-all hover:border-primary/30 hover:shadow-md"
                    >
                        <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg ${tool.bgColor}`}
                        >
                            {tool.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-foreground">
                                {tool.name}
                            </p>
                            <p className="truncate text-xs text-muted">
                                {tool.description}
                            </p>
                        </div>
                        <svg
                            className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                        </svg>
                    </Link>
                ))}
            </div>
        </section>
    );
}

