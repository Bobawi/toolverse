import type { MetadataRoute } from "next";

const BASE_URL = "https://toolverse-steel.vercel.app";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/_next/"],
            },
            {
                userAgent: "GPTBot",
                disallow: "/",
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}

