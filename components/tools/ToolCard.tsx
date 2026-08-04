import Link from "next/link";
import { Tool } from "@/types";

const badgeConfig: Record<string, { label: string; className: string }> = {
    popular: { label: "⭐ Most Popular", className: "bg-amber-500/15 text-amber-600 border-amber-500/30" },
    new: { label: "🆕 New", className: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30" },
    trending: { label: "🔥 Trending", className: "bg-rose-500/15 text-rose-600 border-rose-500/30" },
};

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
    const badge = badgeConfig[tool.badge || ""];

    return (
        <Link
            href={`/tools/${tool.slug}`}
            prefetch={false}
            className="card-glow card-shimmer group relative overflow-hidden rounded-xl border border-border bg-background p-5 transition-all hover:-translate-y-0.5"
        >
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

            <div className="relative flex items-start gap-4">
                <div
                    className={`wiggle-target flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-xl transition-transform duration-300 group-hover:scale-110 ${tool.bgColor}`}
                >
                    {tool.icon}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-foreground">
                            {tool.name}
                        </h3>
                        {badge && (
                            <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${badge.className}`}>
                                {badge.label}
                            </span>
                        )}
                    </div>
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

            {/* Info tags */}
            <div className="relative mt-4 flex flex-wrap gap-1.5">
                <span className="rounded-md border border-border bg-muted/10 px-2 py-0.5 text-[10px] font-medium text-muted">
                    🖥 Browser-based
                </span>
                <span className="rounded-md border border-border bg-muted/10 px-2 py-0.5 text-[10px] font-medium text-muted">
                    🆓 Free
                </span>
                <span className="rounded-md border border-border bg-muted/10 px-2 py-0.5 text-[10px] font-medium text-muted">
                    ⚡ Instant
                </span>
            </div>
        </Link>
    );
}

