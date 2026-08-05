import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { blogPosts } from "@/data/blog";
import { SITE_URL } from "@/lib/site";

/**
 * Stable site-wide lastmod date (site launch date).
 * Using a fixed date (instead of `new Date()`) makes the sitemap
 * deterministic, so its content doesn't change on every request.
 * This avoids unnecessary re-fetches and lets Google cache it reliably.
 */
const SITE_LAUNCH_DATE = new Date("2025-10-01");

/**
 * Normalize a date to a stable YYYY-MM-DD string.
 * This produces a clean, deterministic date for <lastmod> nodes.
 */
const toIsoDate = (date: Date | string): string => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toISOString().split("T")[0];
};

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
            lastModified: SITE_LAUNCH_DATE,
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${SITE_URL}/tools`,
            lastModified: SITE_LAUNCH_DATE,
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/blog`,
            lastModified: SITE_LAUNCH_DATE,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/about`,
            lastModified: SITE_LAUNCH_DATE,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${SITE_URL}/contact`,
            lastModified: SITE_LAUNCH_DATE,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${SITE_URL}/privacy`,
            lastModified: SITE_LAUNCH_DATE,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${SITE_URL}/terms`,
            lastModified: SITE_LAUNCH_DATE,
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
        url: `${SITE_URL}/categories/${cat.slug}`,
        lastModified: SITE_LAUNCH_DATE,
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
        url: `${SITE_URL}/tools/${tool.slug}`,
        lastModified: SITE_LAUNCH_DATE,
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: toIsoDate(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    return [...staticRoutes, ...categoryRoutes, ...toolRoutes, ...blogRoutes];
}
