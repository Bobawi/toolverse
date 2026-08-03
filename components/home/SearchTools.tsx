"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { searchIndex } from "@/data/search-index";

interface SearchResult {
    slug: string;
    name: string;
    description: string;
    category: string;
    icon: string;
}

function highlightMatch(text: string, query: string): React.ReactNode {
    if (!query.trim()) return text;
    const lower = text.toLowerCase();
    const q = query.toLowerCase();
    const idx = lower.indexOf(q);
    if (idx === -1) return text;
    return (
        <>
            {text.slice(0, idx)}
            <mark className="rounded bg-primary/20 px-0.5 text-primary">
                {text.slice(idx, idx + q.length)}
            </mark>
            {text.slice(idx + q.length)}
        </>
    );
}

export default function SearchTools() {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const results = useMemo<SearchResult[]>(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        return searchIndex
            .filter(
                (t) =>
                    t.name.toLowerCase().includes(q) ||
                    t.description.toLowerCase().includes(q) ||
                    t.category.toLowerCase().includes(q)
            )
            .slice(0, 8);
    }, [query]);

    const totalMatches = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return 0;
        return searchIndex.filter(
            (t) =>
                t.name.toLowerCase().includes(q) ||
                t.description.toLowerCase().includes(q) ||
                t.category.toLowerCase().includes(q)
        ).length;
    }, [query]);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Scroll active item into view
    useEffect(() => {
        if (activeIndex >= 0 && listRef.current) {
            const items = listRef.current.querySelectorAll<HTMLElement>("[data-result-index]");
            const active = items[activeIndex];
            if (active) {
                active.scrollIntoView({ block: "nearest" });
            }
        }
    }, [activeIndex]);

    const closeAndReset = useCallback(() => {
        setIsOpen(false);
        setQuery("");
        setActiveIndex(-1);
    }, []);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (!isOpen || results.length === 0) {
                if (e.key === "Escape") {
                    setIsOpen(false);
                }
                return;
            }

            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    setActiveIndex((prev) => (prev + 1) % results.length);
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setActiveIndex((prev) =>
                        prev <= 0 ? results.length - 1 : prev - 1
                    );
                    break;
                case "Enter":
                    e.preventDefault();
                    if (activeIndex >= 0 && results[activeIndex]) {
                        window.location.href = `/tools/${results[activeIndex].slug}`;
                        closeAndReset();
                    }
                    break;
                case "Escape":
                    e.preventDefault();
                    closeAndReset();
                    break;
                default:
                    break;
            }
        },
        [isOpen, results, activeIndex, closeAndReset]
    );

    return (
        <div ref={wrapperRef} className="relative w-full max-w-xl">
            {/* Search input */}
            <div className="relative">
                <svg
                    className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setActiveIndex(-1);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search tools..."
                    aria-label="Search tools"
                    aria-expanded={isOpen}
                    role="combobox"
                    aria-autocomplete="list"
                    className="h-12 w-full rounded-xl border border-border bg-background pl-12 pr-10 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery("");
                            setIsOpen(false);
                            setActiveIndex(-1);
                            inputRef.current?.focus();
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                        aria-label="Clear search"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Results dropdown */}
            {isOpen && query.trim() && (
                <div className="absolute top-full mt-2 w-full overflow-hidden rounded-xl border border-border bg-background shadow-lg">
                    {results.length > 0 ? (
                        <>
                            <div
                                ref={listRef}
                                className="max-h-80 overflow-y-auto py-2"
                                role="listbox"
                            >
                                {results.map((tool, index) => (
                                    <Link
                                        key={tool.slug}
                                        href={`/tools/${tool.slug}`}
                                        prefetch={false}
                                        onClick={closeAndReset}
                                        onMouseEnter={() => setActiveIndex(index)}
                                        data-result-index={index}
                                        role="option"
                                        aria-selected={activeIndex === index}
                                        className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${activeIndex === index
                                            ? "bg-primary/10"
                                            : "hover:bg-muted/10"
                                            }`}
                                    >
                                        <span className="text-lg">{tool.icon}</span>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-foreground">
                                                {highlightMatch(tool.name, query)}
                                            </p>
                                            <p className="truncate text-xs capitalize text-muted">
                                                {tool.category}
                                            </p>
                                        </div>
                                        {activeIndex === index && (
                                            <span className="shrink-0 text-xs text-muted">
                                                ↵
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                            {totalMatches > results.length && (
                                <Link
                                    href="/tools"
                                    onClick={closeAndReset}
                                    className="block border-t border-border px-4 py-2.5 text-center text-xs font-medium text-primary transition-colors hover:bg-muted/10"
                                >
                                    View all {totalMatches} results &rarr;
                                </Link>
                            )}
                        </>
                    ) : (
                        <div className="px-4 py-8 text-center text-sm text-muted">
                            No tools found for &ldquo;{query}&rdquo;
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
