import Link from "next/link";
import { Tool } from "@/types";

export default function ToolCard({ tool }: { tool: Tool }) {
    const categoryColors: Record<string, string> = {
        image: "from-blue-500/20 to-blue-600/10",
        pdf: "from-red-500/20 to-red-600/10",
        developer: "from-purple-500/20 to-purple-600/10",
        calculators: "from-amber-500/20 to-amber-600/10",
        ai: "from-emerald-500/20 to-emerald-600/10",
        text: "from-cyan-500/20 to-cyan-600/10",
        security: "from-rose-500/20 to-rose-600/10",
        converter: "from-indigo-500/20 to-indigo-600/10",
    };

    const gradient = categoryColors[tool.category] || "from-primary/20 to-primary/10";

    return (
        <Link
            href={`/tools/${tool.slug}`}
            prefetch={false}
            className="card-glow group relative overflow-hidden rounded-xl border border-border bg-background p-5 transition-all hover:-translate-y-0.5"
        >
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

            <div className="relative flex items-start gap-4">
                <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-xl transition-transform duration-300 group-hover:scale-110 ${tool.bgColor}`}
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
                    className="absolute right-4 top-5 h-5 w-5 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary"
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

