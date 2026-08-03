"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
    end: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
    /** Smooth the animation when value doesn't fit a standard ease */
    decimals?: number;
}

export default function AnimatedCounter({
    end,
    duration = 1500,
    prefix = "",
    suffix = "",
    className = "",
    decimals = 0,
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [value, setValue] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;

        let animationFrame: number;
        const startTime = performance.now();

        const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(end * eased);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(tick);
            }
        };

        animationFrame = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(animationFrame);
    }, [started, end, duration]);

    const formatted = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

    return (
        <span ref={ref} className={`stat-number ${className}`}>
            {prefix}
            {formatted}
            {suffix}
        </span>
    );
}
