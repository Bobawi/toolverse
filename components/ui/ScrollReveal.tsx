"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type RevealType = "up" | "left" | "right" | "scale";

interface ScrollRevealProps {
    children: ReactNode;
    type?: RevealType;
    delay?: number; // ms
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

export default function ScrollReveal({
    children,
    type = "up",
    delay = 0,
    className = "",
    index = 0,
    stagger = 0,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const actualDelay = delay + index * stagger;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setRevealed(true);
                    }, actualDelay);
                    observer.unobserve(el);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, [delay, index, stagger]);

    const baseClass = revealClassMap[type];

    return (
        <div
            ref={ref}
            className={`${baseClass} ${revealed ? "revealed" : ""} ${className}`}
            style={{ transitionDelay: revealed ? `${delay + index * stagger}ms` : "0ms" }}
        >
            {children}
        </div>
    );
}
