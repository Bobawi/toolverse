"use client";

import { useMemo, useState } from "react";
import ToolCard from "@/components/tools/ToolCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { useLanguage } from "@/components/LanguageProvider";
import { localizeToolName, localizeToolDescription, localizeCategory } from "@/lib/localize";

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const { t, locale } = useLanguage();

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesCategory = activeCategory ? tool.category === activeCategory : true;
      if (!q) return matchesCategory;
      const matchesQuery =
        localizeToolName(tool, locale).toLowerCase().includes(q) ||
        localizeToolDescription(tool, locale).toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query, locale]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <ScrollReveal type="scale">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary badge-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {filteredTools.length} {t("tools.available")}
            </div>
          </ScrollReveal>
          <ScrollReveal type="up" delay={100}>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              {t("tools.title")}
            </h1>
          </ScrollReveal>
          <ScrollReveal type="up" delay={200}>
            <p className="mt-2 text-muted max-w-2xl">
              {t("tools.subtitle")}
            </p>
          </ScrollReveal>

          {/* Search box */}
          <ScrollReveal type="up" delay={300}>
            <div className="relative mt-6 max-w-xl">
              <svg
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("tools.search")}
                aria-label="Search tools"
                className="h-12 w-full rounded-xl border border-border bg-background pl-12 pr-10 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                  aria-label="Clear search"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Category filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${!activeCategory
              ? "bg-primary text-white shadow-sm"
              : "border border-border bg-background text-muted hover:text-foreground hover:border-primary/30"
              }`}
          >
            {t("tools.all")}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${activeCategory === cat.slug
                ? "bg-primary text-white shadow-sm"
                : "border border-border bg-background text-muted hover:text-foreground hover:border-primary/30"
                }`}
            >
              <span>{cat.icon}</span>
              {localizeCategory(cat, locale)}
            </button>
          ))}
        </div>

        {/* Tools grid */}
        {filteredTools.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-muted">
              {query ? t("tools.noResults") : t("tools.noCategory")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
