"use client";

import Link from "next/link";
import SearchToolsLazy from "@/components/home/SearchToolsLazy";
import ToolCard from "@/components/tools/ToolCard";
import { getPopularTools, tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { blogPosts } from "@/data/blog";
import { useLanguage } from "@/components/LanguageProvider";
import { getCategoryBySlug } from "@/data/categories";
import { localizeToolName } from "@/lib/localize";
import { getToolBySlug } from "@/data/tools";

export default function Home() {
  const { t, locale } = useLanguage();
  const popularTools = getPopularTools();

  // Compute tool count per category for badges
  const categoryCounts = categories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat.slug] = tools.filter((t) => t.category === cat.slug).length;
    return acc;
  }, {});

  // Real, verifiable stats — no fake numbers. All values reflect actual
  // tool/category counts or factual claims (100% free, no sign-up).
  const stats = [
    { label: t("stat.freeTools"), value: tools.length, suffix: "+" },
    { label: t("stat.categories"), value: categories.length, suffix: "" },
    { label: t("stat.100free"), value: 100, suffix: "%" },
    { label: t("stat.noSignup"), value: 100, suffix: "%" },
  ];

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        {/* Gradient background (static — no repaint animation) */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
        <div className="absolute inset-0 grid-pattern" />

        {/* Static decorative orbs — no blur filter (blur is paint-heavy and delays LCP), no animation */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10" />
        <div className="absolute top-1/2 left-1/4 h-56 w-56 rounded-full bg-accent/10" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary badge-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {tools.length}+ {t("hero.badge")} — {t("stat.noSignup")}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("hero.title1")}{" "}
              <span className="gradient-text">
                {t("hero.title2")}
              </span>{" "}
              <br className="hidden sm:inline" />
              {t("hero.title3")}
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg text-muted sm:text-xl">
              {t("hero.subtitle")}
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/tools"
                prefetch={false}
                className="btn-shimmer inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30"
              >
                {t("hero.ctaPrimary")}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/tools"
                prefetch={false}
                className="btn-shimmer inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-background px-8 text-base font-semibold text-foreground transition-all hover:border-primary/30 hover:shadow-md"
              >
                {t("hero.ctaSecondary")}
              </Link>
            </div>

            {/* Popular quick links */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              <span className="text-xs font-medium text-muted">{t("hero.popular")}</span>
              {[
                "image-compressor",
                "qr-generator",
                "password-generator",
                "merge-pdf",
              ].map((slug) => {
                const tool = getToolBySlug(slug);
                if (!tool) return null;
                return (
                  <Link
                    key={slug}
                    href={`/tools/${slug}`}
                    prefetch={false}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:text-primary hover:shadow-sm"
                  >
                    {localizeToolName(tool, locale)}
                    <svg className="h-3 w-3 text-muted transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                );
              })}
            </div>

            {/* Search — lazy hydrated after first paint */}
            <div className="mt-8 flex justify-center">
              <SearchToolsLazy />
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {[
                t("hero.trust.free"),
                t("hero.trust.noAds"),
                t("hero.trust.private"),
                t("hero.trust.noSignup"),
              ].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Stats — static (no JS counter, faster LCP) */}
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

      {/* ============ HOW IT WORKS ============ */}
      <section className="relative overflow-hidden border-t border-border bg-background py-16 sm:py-20">
        <div className="absolute inset-0 dots-pattern opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              {t("how.subtitle")}
            </div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {t("how.title")}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: "🔍", titleKey: "how.step1.title", descKey: "how.step1.desc", num: "1" },
              { icon: "⚡", titleKey: "how.step2.title", descKey: "how.step2.desc", num: "2" },
              { icon: "🎉", titleKey: "how.step3.title", descKey: "how.step3.desc", num: "3" },
            ].map((step) => (
              <div
                key={step.num}
                className="card-glow relative rounded-xl border border-border bg-background p-6 text-center"
              >
                <div className="absolute -top-3 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white">
                  {step.num}
                </div>
                <div className="mx-auto mb-3 mt-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
                  {step.icon}
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {t(step.titleKey)}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {t(step.descKey)}
                </p>
              </div>
            ))}
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
                {t("home.popularBadge")}
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                {t("home.popularTitle")}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {t("home.popularSubtitle")}
              </p>
            </div>
            <Link
              href="/tools"
              className="hidden text-sm font-medium text-primary transition-all hover:text-primary-dark hover:underline sm:inline"
            >
              {t("home.viewAll")}
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
              {t("home.viewAll")}
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
              {t("home.categoriesBadge")}
            </div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {t("home.categoriesTitle")}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {t("home.categoriesSubtitle")}
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
                  {t(`cat.${cat.slug}`)}
                </span>
                <span className="rounded-full border border-border bg-muted/10 px-2 py-0.5 text-[10px] font-medium text-muted">
                  {categoryCounts[cat.slug] || 0} {t("tools.available")}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="relative overflow-hidden border-t border-border bg-background py-16 sm:py-20">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {t("testi.subtitle")}
            </div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {t("testi.title")}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="card-glow flex flex-col rounded-xl border border-border bg-background p-6"
              >
                <div className="mb-4 flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="flex-1 text-sm text-foreground leading-relaxed">
                  &ldquo;{t(`testi.${i}.quote`)}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-sm font-bold text-primary">
                    {t(`testi.${i}.name`).charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t(`testi.${i}.name`)}
                    </p>
                    <p className="text-xs text-muted">
                      {t(`testi.${i}.role`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-16 sm:py-20">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        {/* Static decorative orbs — no blur, no animation */}
        <div className="absolute -top-20 right-1/4 h-56 w-56 rounded-full bg-primary/10" />
        <div className="absolute -bottom-20 left-1/4 h-48 w-48 rounded-full bg-secondary/10" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            {t("home.ctaTitle")}
          </h2>
          <p className="mt-3 text-muted max-w-2xl mx-auto">
            {t("home.ctaSubtitle")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/tools"
              className="btn-shimmer inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30"
            >
              {t("home.ctaBrowse")}
            </Link>
            <Link
              href="/blog"
              className="btn-shimmer inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-8 text-base font-semibold text-foreground transition-all hover:border-primary/30 hover:shadow-md"
            >
              {t("home.ctaBlog")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

