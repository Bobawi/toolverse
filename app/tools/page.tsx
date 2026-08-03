"use client";

import { useState } from "react";
import ToolCard from "@/components/tools/ToolCard";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredTools = activeCategory
    ? tools.filter((t) => t.category === activeCategory)
    : tools;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {filteredTools.length} Tools Available
          </div>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            All Tools
          </h1>
          <p className="mt-2 text-muted max-w-2xl">
            Free online tools for images, PDFs, developers, text, AI, and everyday tasks. Fast, secure, and privacy-friendly.
          </p>
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
            All
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
              {cat.name}
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
            <p className="text-lg text-muted">No tools found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
