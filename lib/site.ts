/**
 * Central site configuration.
 * The canonical domain is toolverse.app — used for SEO, sitemap, robots,
 * Open Graph, and canonical tags. The Vercel deployment URL
 * (toolverse-steel.vercel.app) is only for preview/shared links and is
 * *not* used anywhere in the metadata or canonical URLs.
 */
export const SITE_URL = "https://toolverse.app";

export const SITE_NAME = "ToolVerse";

export const SITE_DESCRIPTION =
    "Free online tools for images, PDFs, developers, text, AI, and everyday tasks. Fast, secure, and privacy-friendly. No sign-up required.";

/** Supported UI localizations. Used for the language switcher + hreflang. */
export const LOCALES = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "ar", label: "العربية", flag: "🇲🇦" },
] as const;

export type Locale = (typeof LOCALES)[number]["code"];

export const DEFAULT_LOCALE: Locale = "en";

