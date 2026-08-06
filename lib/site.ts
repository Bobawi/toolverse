/**
 * Central site configuration.
 * The canonical domain is the Vercel deployment URL currently in use:
 * toolverse-steel.vercel.app. Used for SEO, sitemap, robots, Open Graph,
 * canonical tags, and hreflang. If a custom domain is added later, update
 * this single constant.
 */
export const SITE_URL = "https://toolverse-steel.vercel.app";

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

