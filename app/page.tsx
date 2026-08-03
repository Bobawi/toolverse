import Link from "next/link";
import SearchTools from "@/components/home/SearchTools";
import ToolCard from "@/components/tools/ToolCard";
import { getPopularTools } from "@/data/tools";
import { categories } from "@/data/categories";

export default function Home() {
  const popularTools = getPopularTools();

  const stats = [
    { label: "Free Tools", value: 41, suffix: "+" },
    { label: "Blog Articles", value: 30, suffix: "+" },
    { label: "Categories", value: 8, suffix: "" },
    { label: "100% Free", value: 100, suffix: "%" },
  ];

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        {/* Gradient background (static — no repaint animation) */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
        <div className="absolute inset-0 grid-pattern" />

        {/* Floating orbs */}
        <div className="orb-1 absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="orb-2 absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
        <div className="orb-3 absolute top-1/2 left-1/4 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

        {/* Decorative spinning ring */}
        <div className="border-spin absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full border border-primary/10" />
        <div className="border-spin absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full border border-secondary/10" style={{ animationDirection: "reverse" }} />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-sm badge-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              41+ Free Online Tools — No Sign-up Required
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Free Online{" "}
              <span className="gradient-text">
                Tools
              </span>{" "}
              <br className="hidden sm:inline" />
              That Actually Work
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg text-muted sm:text-xl">
              No ads. No sign-ups. Just fast, reliable tools for developers, designers, and everyone.
            </p>

            {/* Search */}
            <div className="mt-8 flex justify-center">
              <SearchTools />
            </div>

            {/* Stats — static (no JS counter, faster LCP) */}
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm p-4 card-glow"
                >
                  <p className="text-xl font-bold text-foreground stat-number">
                    {stat.value}
                    {stat.suffix}
                  </p>
                  <p className="text-xs text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ POPULAR TOOLS ============ */}
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Most Used
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                🔥 Popular Tools
              </h2>
              <p className="mt-1 text-sm text-muted">
                Most used tools by our community
              </p>
            </div>
            <Link
              href="/tools"
              className="hidden text-sm font-medium text-primary transition-all hover:text-primary-dark hover:underline sm:inline"
            >
              View all tools &rarr;
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/tools"
              className="btn-shimmer inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white transition-all hover:bg-primary-dark"
            >
              View all tools &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="relative overflow-hidden border-t border-border bg-background py-16 sm:py-20">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Categories
            </div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Browse Categories
            </h2>
            <p className="mt-1 text-sm text-muted">
              Find the right tool for your task
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group-wiggle card-glow card-shimmer flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-5 transition-all hover:-translate-y-1"
              >
                <span className="wiggle-target text-3xl">{cat.icon}</span>
                <span className="text-xs font-semibold text-foreground">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-16 sm:py-20">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        {/* Floating orbs */}
        <div className="orb-2 absolute -top-20 right-1/4 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="orb-3 absolute -bottom-20 left-1/4 h-48 w-48 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Ready to Get Started?
          </h2>
          <p className="mt-3 text-muted max-w-2xl mx-auto">
            All our tools are free, fast, and private. No sign-up, no uploads to servers — everything runs in your browser.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/tools"
              className="btn-shimmer inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30"
            >
              Browse All Tools &rarr;
            </Link>
            <Link
              href="/blog"
              className="btn-shimmer inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-8 text-base font-semibold text-foreground transition-all hover:border-primary/30 hover:shadow-md"
            >
              Read Our Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

