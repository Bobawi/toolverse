import Link from "next/link";
import SearchTools from "@/components/home/SearchTools";
import ToolCard from "@/components/tools/ToolCard";
import { getPopularTools } from "@/data/tools";
import { categories } from "@/data/categories";

export default function Home() {
  const popularTools = getPopularTools();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-medium text-muted backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              18+ Free Online Tools
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Free Online{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Tools
              </span>{" "}
              That Actually Work
            </h1>
            <p className="mt-6 text-lg text-muted sm:text-xl">
              No ads. No sign-ups. Just fast, reliable tools for developers, designers, and everyone.
            </p>
            <div className="mt-10 flex justify-center">
              <SearchTools />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                🔥 Popular Tools
              </h2>
              <p className="mt-1 text-sm text-muted">
                Most used tools by our community
              </p>
            </div>
            <Link
              href="/tools"
              className="hidden text-sm font-medium text-primary transition-colors hover:text-primary-dark sm:inline"
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
              className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-5 text-sm font-medium text-foreground"
            >
              View all tools &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Browse Categories */}
      <section className="border-t border-border bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
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
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-medium text-foreground">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
