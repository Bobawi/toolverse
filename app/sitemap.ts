import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { blogPosts } from "@/data/blog";

const BASE_URL = "https://toolverse-steel.vercel.app";

/**
 * Stable site-wide lastmod date (site launch date).
 * Using a fixed date (instead of `new Date()`) makes the sitemap
 * deterministic, so its content doesn't change on every request.
 * This avoids unnecessary re-fetches and lets Google cache it reliably.
 */
const SITE_LAUNCH_DATE = new Date("2026-07-01");

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: SITE_LAUNCH_DATE,
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${BASE_URL}/tools`,
            lastModified: SITE_LAUNCH_DATE,
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: SITE_LAUNCH_DATE,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: SITE_LAUNCH_DATE,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: SITE_LAUNCH_DATE,
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/privacy`,
            lastModified: SITE_LAUNCH_DATE,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/terms`,
            lastModified: SITE_LAUNCH_DATE,
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
        url: `${BASE_URL}/categories/${cat.slug}`,
        lastModified: SITE_LAUNCH_DATE,
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
        url: `${BASE_URL}/tools/${tool.slug}`,
        lastModified: SITE_LAUNCH_DATE,
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    return [...staticRoutes, ...categoryRoutes, ...toolRoutes, ...blogRoutes];
}

