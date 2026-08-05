"use client";

import { useEffect, useRef, useState } from "react";
import { LOCALES, type Locale } from "@/lib/site";
import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageSwitcher() {
    const { locale, setLocale } = useLanguage();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex h-9 items-center gap-1.5 rounded-lg border border-border px-2.5 text-sm font-medium text-muted transition-all hover:border-primary/30 hover:text-foreground"
                aria-label="Change language"
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className="text-base leading-none">{current.flag}</span>
                <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
                <svg className="h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <div
                    role="listbox"
                    className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border border-border bg-background py-1 shadow-xl"
                >
                    {LOCALES.map((l) => (
                        <button
                            key={l.code}
                            role="option"
                            aria-selected={l.code === locale}
                            onClick={() => {
                                setLocale(l.code as Locale);
                                setOpen(false);
                            }}
                            className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors ${l.code === locale
                                ? "bg-primary/10 font-semibold text-primary"
                                : "text-foreground hover:bg-muted/10"
                                }`}
                        >
                            <span className="text-base leading-none">{l.flag}</span>
                            {l.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
