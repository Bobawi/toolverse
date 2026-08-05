"use client";

import Link from "next/link";
import SearchToolsLazy from "@/components/home/SearchToolsLazy";
import ToolCard from "@/components/tools/ToolCard";
import { tools } from "@/data/tools";
import { useLanguage } from "@/components/LanguageProvider";
import { localizeToolName } from "@/lib/localize";
import { getToolBySlug } from "@/data/tools";

export default function Home() {
  const { t, locale } = useLanguage();

  // Real, verifiable stats
  const stats = [
    { label: t("tb.stat.tools"), value: tools.length, suffix: "+" },
    { label: t("tb.stat.categories"), value: 4, suffix: "" },
    { label: t("tb.stat.fast"), value: "⚡", suffix: "" },
    { label: t("tb.stat.noWall"), value: "0", suffix: "" },
  ];

  // Featured tools — real slugs from data/tools.ts
  const featuredSlugs = [
    "date-calculator",
    "currency-converter",
    "image-compressor",
    "bmi-calculator",
  ];
  const featuredTools = featuredSlugs
    .map((s) => getToolBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getToolBySlug>>[];

  // Trending tools — real slugs
  const trendingSlugs = [
    "date-calculator",
    "vat-calculator",
    "stopwatch",
    "bmi-calculator",
    "currency-converter",
  ];
  const trendingTools = trendingSlugs
    .map((s) => getToolBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getToolBySlug>>[];

  // Category tool groups
  const dateTimeTools = ["date-calculator", "stopwatch", "countdown-timer", "age-calculator"]
    .map((s) => getToolBySlug(s)).filter(Boolean) as ReturnType<typeof getToolBySlug>[];
  const financeTools = ["currency-converter", "loan-calculator", "tip-calculator", "vat-calculator"]
    .map((s) => getToolBySlug(s)).filter(Boolean) as ReturnType<typeof getToolBySlug>[];
  const imageContentTools = ["image-compressor", "qr-generator", "json-formatter", "markdown-editor"]
    .map((s) => getToolBySlug(s)).filter(Boolean) as ReturnType<typeof getToolBySlug>[];

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10" />
        <div className="absolute top-1/2 left-1/4 h-56 w-56 rounded-full bg-accent/10" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary badge-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t("tb.hero.badge")}
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("tb.hero.title")}
            </h1>

            <p className="mt-6 text-lg text-muted sm:text-xl">
              {t("tb.hero.subtitle")}
            </p>

            {/* Search */}
            <div className="mt-8 flex justify-center">
              <SearchToolsLazy />
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border/50 bg-background/50 p-4 card-glow"
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

      {/* ============ FEATURED ============ */}
      <section className="border-t border-border bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t("tb.featured.label")}
            </div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {t("tb.featured.title")}
            </h2>
            <p className="mt-2 text-sm text-muted max-w-2xl mx-auto">
              {t("tb.featured.subtitle")}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="card-glow group flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-6 text-center transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
              >
                <span className="text-3xl">{tool.icon}</span>
                <span className="text-sm font-semibold text-foreground">
                  {localizeToolName(tool, locale)}
                </span>
              </Link>
            ))}
          </div>

          {/* Value bullets */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {["tb.value.1", "tb.value.2", "tb.value.3"].map((key) => (
              <div
                key={key}
                className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <p className="text-sm font-medium text-foreground">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES (ToolBurst-style) ============ */}
      <section className="relative overflow-hidden border-t border-border bg-background py-16 sm:py-20">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              {t("tb.cat.badge")}
            </div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {t("tb.cat.title")}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {/* Date & Time */}
            <div className="card-glow rounded-xl border border-border bg-background p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-2xl">📅</span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{t("tb.cat.dateTitle")}</h3>
                  <p className="text-xs text-muted">{t("tb.cat.dateDesc")}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {dateTimeTools.map((tool) => tool && (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:text-primary"
                  >
                    {localizeToolName(tool, locale)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Finance & Crypto */}
            <div className="card-glow rounded-xl border border-border bg-background p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-2xl">💰</span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{t("tb.cat.financeTitle")}</h3>
                  <p className="text-xs text-muted">{t("tb.cat.financeDesc")}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {financeTools.map((tool) => tool && (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:text-primary"
                  >
                    {localizeToolName(tool, locale)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Image & Content */}
            <div className="card-glow rounded-xl border border-border bg-background p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-2xl">🖼️</span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{t("tb.cat.imageTitle")}</h3>
                  <p className="text-xs text-muted">{t("tb.cat.imageDesc")}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {imageContentTools.map((tool) => tool && (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:text-primary"
                  >
                    {localizeToolName(tool, locale)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MOST POPULAR ============ */}
      <section className="border-t border-border bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t("tb.popular.badge")}
            </div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {t("tb.start.title")}
            </h2>
            <p className="mt-2 text-sm text-muted max-w-2xl mx-auto">
              {t("tb.popular.title")}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="card-glow rounded-xl border border-border bg-background p-6">
              <h3 className="mb-2 text-base font-semibold text-primary">{t("tb.popular.dateTitle")}</h3>
              <p className="text-sm text-muted leading-relaxed">{t("tb.popular.dateDesc")}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {dateTimeTools.map((tool) => tool && (
                  <Link key={tool.slug} href={`/tools/${tool.slug}`} className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:text-primary">
                    {localizeToolName(tool, locale)}
                  </Link>
                ))}
              </div>
            </div>
            <div className="card-glow rounded-xl border border-border bg-background p-6">
              <h3 className="mb-2 text-base font-semibold text-primary">{t("tb.popular.financeTitle")}</h3>
              <p className="text-sm text-muted leading-relaxed">{t("tb.popular.financeDesc")}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {financeTools.map((tool) => tool && (
                  <Link key={tool.slug} href={`/tools/${tool.slug}`} className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:text-primary">
                    {localizeToolName(tool, locale)}
                  </Link>
                ))}
              </div>
            </div>
            <div className="card-glow rounded-xl border border-border bg-background p-6">
              <h3 className="mb-2 text-base font-semibold text-primary">{t("tb.popular.dailyTitle")}</h3>
              <p className="text-sm text-muted leading-relaxed">{t("tb.popular.dailyDesc")}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["bmi-calculator", "age-calculator", "character-counter"].map((s) => {
                  const tool = getToolBySlug(s);
                  return tool ? (
                    <Link key={tool.slug} href={`/tools/${tool.slug}`} className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:text-primary">
                      {localizeToolName(tool, locale)}
                    </Link>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY IT WORKS ============ */}
      <section className="relative overflow-hidden border-t border-border bg-background py-16 sm:py-20">
        <div className="absolute inset-0 dots-pattern opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t("tb.why.badge")}
            </div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {t("tb.why.title")}
            </h2>
            <p className="mt-3 text-muted max-w-2xl mx-auto">
              {t("tb.why.desc")}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {["tb.why.1", "tb.why.2", "tb.why.3"].map((key) => (
              <div key={key} className="card-glow flex items-center gap-3 rounded-xl border border-border bg-background p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                <p className="text-sm font-medium text-foreground">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRENDING ============ */}
      <section className="border-t border-border bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              {t("tb.trending.badge")}
            </div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {t("tb.trending.title")}
            </h2>
          </div>
          <div className="mx-auto max-w-3xl space-y-3">
            {trendingTools.map((tool, idx) => tool && (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="flex items-center gap-4 rounded-xl border border-border bg-background/60 p-4 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                  {idx + 1}
                </span>
                <span className="text-2xl">{tool.icon}</span>
                <span className="flex-1 text-sm font-semibold text-foreground">
                  {localizeToolName(tool, locale)}
                </span>
                <svg className="h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ENTRY POINTS ============ */}
      <section className="border-t border-border bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {t("tb.entry.title")}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {t("tb.entry.subtitle")}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/tools?category=calculators", label: t("tb.entry.finance"), icon: "💰" },
              { href: "/tools", label: t("tb.entry.all"), icon: "🧰" },
              { href: "/tools/currency-converter", label: t("tb.entry.currency"), icon: "💱" },
              { href: "/tools/image-compressor", label: t("tb.entry.images"), icon: "🖼️" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="card-glow flex items-center justify-center gap-3 rounded-xl border border-border bg-background p-5 text-sm font-semibold text-foreground transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
              >
                <span className="text-2xl">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ REQUEST TOOL CTA ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-16 sm:py-20">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute -top-20 right-1/4 h-56 w-56 rounded-full bg-primary/10" />
        <div className="absolute -bottom-20 left-1/4 h-48 w-48 rounded-full bg-secondary/10" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            {t("tb.request.title")}
          </h2>
          <p className="mt-3 text-muted max-w-2xl mx-auto">
            {t("tb.request.desc")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="btn-shimmer inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30"
            >
              {t("tb.request.cta")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
