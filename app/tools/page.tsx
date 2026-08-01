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
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            All Tools
          </h1>
          <p className="mt-2 text-muted">
            {filteredTools.length} tool{filteredTools.length !== 1 && "s"}{" "}
            available
            {activeCategory && ` in ${activeCategory}`}
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${!activeCategory
                ? "bg-primary text-white"
                : "border border-border bg-background text-muted hover:text-foreground"
              }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${activeCategory === cat.slug
                  ? "bg-primary text-white"
                  : "border border-border bg-background text-muted hover:text-foreground"
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
