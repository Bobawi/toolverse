import Link from "next/link";
import { Tool } from "@/types";

export default function ToolCard({ tool }: { tool: Tool }) {
    return (
        <Link
            href={`/tools/${tool.slug}`}
            className="group relative overflow-hidden rounded-xl border border-border bg-background p-5 transition-all hover:border-primary/30 hover:shadow-md"
        >
            <div className="flex items-start gap-4">
                <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-xl ${tool.bgColor}`}
                >
                    {tool.icon}
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-foreground">
                        {tool.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted line-clamp-2">
                        {tool.description}
                    </p>
                </div>
                {/* Arrow */}
                <svg
                    className="absolute right-4 top-5 h-5 w-5 text-muted transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
            </div>
        </Link>
    );
}
