import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "ToolVerse - Free Online Tools",
        short_name: "ToolVerse",
        description:
            "Free online tools for images, PDFs, developers, text, AI, and everyday tasks. Fast, secure, and privacy-friendly. No sign-up required.",
        start_url: "/",
        display: "standalone",
        background_color: "#0f172a",
        theme_color: "#0f172a",
        icons: [
            {
                src: "/favicon.svg",
                sizes: "any",
                type: "image/svg+xml",
                purpose: "any",
            },
        ],
    };
}

