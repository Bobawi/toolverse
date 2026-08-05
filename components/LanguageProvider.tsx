"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/site";
import { translate } from "@/lib/i18n";

interface LanguageContextType {
    locale: Locale;
    setLocale: (l: Locale) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
    locale: DEFAULT_LOCALE,
    setLocale: () => { },
    t: (key) => key,
});

export function useLanguage() {
    return useContext(LanguageContext);
}

function getInitialLocale(): Locale {
    if (typeof window !== "undefined") {
        const stored = localStorage.getItem("locale") as Locale | null;
        if (stored && LOCALES.some((l) => l.code === stored)) return stored;

        // Try the browser's preferred language (French/Arabic for Moroccan audience)
        const nav = navigator.language?.toLowerCase() ?? "en";
        if (nav.startsWith("ar")) return "ar";
        if (nav.startsWith("fr")) return "fr";
    }
    return DEFAULT_LOCALE;
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>(getInitialLocale);

    useEffect(() => {
        localStorage.setItem("locale", locale);
        // Set html lang + dir for proper RTL handling in Arabic
        document.documentElement.lang = locale;
        document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    }, [locale]);

    const t = useCallback((key: string) => translate(locale, key), [locale]);

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}
