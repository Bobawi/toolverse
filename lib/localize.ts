import type { Locale } from "@/lib/i18n";
import type { Tool, Category, FaqItem, HowToStep } from "@/types";
import { toolTranslations, ToolTranslation } from "@/data/tool-translations";

/**
 * Returns the localized name of a tool for the given locale.
 * Falls back to the English name in tools.ts.
 */
export function localizeToolName(tool: Tool, locale: Locale): string {
    const tr = toolTranslations[tool.slug];
    if (locale === "ar" && tr?.name) return tr.name;
    if (locale === "fr" && tr?.nameFr) return tr.nameFr;
    return tool.name;
}

/**
 * Returns the localized description of a tool.
 */
export function localizeToolDescription(tool: Tool, locale: Locale): string {
    const tr = toolTranslations[tool.slug];
    if (locale === "ar" && tr?.description) return tr.description;
    if (locale === "fr" && tr?.descriptionFr) return tr.descriptionFr;
    return tool.description;
}

/**
 * Returns the localized features array of a tool.
 */
export function localizeToolFeatures(tool: Tool, locale: Locale): string[] {
    const tr = toolTranslations[tool.slug];
    if (locale === "ar" && tr?.features && tr.features.length) return tr.features;
    if (locale === "fr" && tr?.featuresFr && tr.featuresFr.length) return tr.featuresFr;
    return tool.features ?? [];
}

/**
 * Returns the localized FAQ items of a tool.
 */
export function localizeToolFaq(tool: Tool, locale: Locale): FaqItem[] {
    const tr = toolTranslations[tool.slug];
    if (locale === "ar" && tr?.faq && tr.faq.length) return tr.faq;
    if (locale === "fr" && tr?.faqFr && tr.faqFr.length) return tr.faqFr;
    return tool.faq ?? [];
}

/**
 * Returns the localized "how to use" steps of a tool.
 */
export function localizeToolHowToUse(tool: Tool, locale: Locale): HowToStep[] {
    const tr = toolTranslations[tool.slug];
    if (locale === "ar" && tr?.howToUse && tr.howToUse.length) {
        return tr.howToUse.map((h, i) => ({ step: i + 1, title: h.title, description: h.description }));
    }
    if (locale === "fr" && tr?.howToUseFr && tr.howToUseFr.length) {
        return tr.howToUseFr.map((h, i) => ({ step: i + 1, title: h.title, description: h.description }));
    }
    return tool.howToUse ?? [];
}

/**
 * Returns a fully localized copy of a Tool object for display purposes.
 * SEO/structured-data fields stay in English on purpose (server-rendered for SEO).
 */
export function localizeTool(tool: Tool, locale: Locale): Tool {
    return {
        ...tool,
        name: localizeToolName(tool, locale),
        description: localizeToolDescription(tool, locale),
        features: localizeToolFeatures(tool, locale),
        faq: localizeToolFaq(tool, locale),
        howToUse: localizeToolHowToUse(tool, locale),
    };
}

/**
 * Returns the localized name of a category.
 */
export function localizeCategory(cat: Pick<Category, "slug" | "name">, locale: Locale): string {
    if (locale === "ar") {
        const map: Record<string, string> = {
            image: "الصور",
            pdf: "PDF",
            developer: "المطورون",
            calculators: "الآلات الحاسبة",
            ai: "الذكاء الاصطناعي",
            text: "النصوص",
            security: "الأمان",
            converter: "المحول",
        };
        return map[cat.slug] ?? cat.name;
    }
    if (locale === "fr") {
        const map: Record<string, string> = {
            image: "Image",
            pdf: "PDF",
            developer: "Développeur",
            calculators: "Calculatrices",
            ai: "IA",
            text: "Texte",
            security: "Sécurité",
            converter: "Convertisseur",
        };
        return map[cat.slug] ?? cat.name;
    }
    return cat.name;
}
