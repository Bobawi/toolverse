"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type RevealType = "up" | "left" | "right" | "scale";

interface ScrollRevealProps {
    children: ReactNode;
    type?: RevealType;
    delay?: number;
    className?: string;
    /** Stagger delay between multiple items using this index */
    index?: number;
    /** Base stagger delay per item (ms) */
    stagger?: number;
}

const revealClassMap: Record<RevealType, string> = {
    up: "reveal",
    left: "reveal-left",
    right: "reveal-right",
    scale: "reveal-scale",
};

/**
 * ScrollReveal — progressive enhancement pattern.
 *
 * SSR/first paint renders the content FULLY VISIBLE (no opacity:0) so
 * Lighthouse LCP is not blocked by hidden above-the-fold elements.
 * Only after hydration does the component hide below-fold items and
 * animate them in as they enter the viewport. Elements already visible
 * on mount are revealed immediately (no flash).
 */
export default function ScrollReveal({
    children,
    type = "up",
    delay = 0,
    className = "",
    index = 0,
    stagger = 0,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [started, setStarted] = useState(false);
    const [revealed, setRevealed] = useState(true);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Respect reduced-motion: keep content visible immediately.
        const prefersReduced =
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

        if (prefersReduced) return;

        // Already in viewport on mount? Reveal immediately (no flash).
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            setRevealed(true);
            return;
        }

        const actualDelay = delay + index * stagger;
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (actualDelay > 0) {
                        timeoutId = setTimeout(() => setRevealed(true), actualDelay);
                    } else {
                        setRevealed(true);
                    }
                    observer.unobserve(el);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        setStarted(true);
        setRevealed(false);
        observer.observe(el);

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            observer.disconnect();
        };
    }, [delay, index, stagger]);

    const baseClass = revealClassMap[type];
    const revealState =
        started && !revealed
            ? baseClass
            : started && revealed
                ? `${baseClass} revealed`
                : "";

    return (
        <div
            ref={ref}
            className={`${revealState} ${className}`.trim()}
            style={
                started && revealed
                    ? { transitionDelay: `${delay + index * stagger}ms` }
                    : undefined
            }
        >
            {children}
        </div>
    );
}

