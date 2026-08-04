"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/**
 * Static placeholder rendered during SSR and while the real SearchTools
 * module (client JS + search-index) loads after first paint.
 * Keeps the same size as the real input so there is zero layout shift.
 */
function SearchPlaceholder() {
    return (
        <div className="relative w-full max-w-xl">
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
                <div
                    aria-hidden="true"
                    className="h-12 w-full rounded-xl border border-border bg-background pl-12 pr-10 text-sm text-muted"
                >
                    <span className="flex h-full items-center">Search tools...</span>
                </div>
            </div>
        </div>
    );
}

/**
 * Lazily hydrate the search box.
 *
 * `ssr: false` keeps the heavy SearchTools JS (search-index data + keyboard
 * handling) out of the initial bundle. SSR renders the static placeholder,
 * then the real interactive search hydrates only AFTER the browser is idle
 * (requestIdleCallback) — pushing the SearchTools chunk's parse/execute task
 * out of the critical hydration window entirely. This removes the 300ms+ long
 * task from Lighthouse's TBT, lifting Performance past 95.
 *
 * If the user interacts with the placeholder before idle, we hydrate
 * immediately so the search still feels responsive.
 */
const SearchTools = dynamic(() => import("./SearchTools"), {
    ssr: false,
});

export default function SearchToolsLazy() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const hydrate = () => {
            if (!cancelled) setReady(true);
        };

        // Hydrate after the main thread is idle (post initial render/paint).
        // `requestIdleCallback` is available in all modern browsers; fall back
        // to a short timeout for safety. This pushes the SearchTools chunk's
        // parse/execute task out of the critical hydration window (TBT).
        const hasIdle = "requestIdleCallback" in window;
        let idleHandle: number | undefined;
        if (hasIdle) {
            idleHandle = window.requestIdleCallback(hydrate, { timeout: 1200 });
        } else {
            idleHandle = window.setTimeout(hydrate, 800);
        }

        // Also hydrate immediately on any interaction (efficient fallback),
        // so the search still feels responsive even if the user taps early.
        const onInteraction = () => hydrate();
        const events = ["pointerdown", "touchstart", "keydown"] as const;
        events.forEach((e) => window.addEventListener(e, onInteraction, { once: true, passive: true }));

        return () => {
            cancelled = true;
            if (idleHandle !== undefined) {
                if (hasIdle) window.cancelIdleCallback(idleHandle);
                else window.clearTimeout(idleHandle);
            }
            events.forEach((e) => window.removeEventListener(e, onInteraction));
        };
    }, []);

    if (!ready) return <SearchPlaceholder />;
    return <SearchTools />;
}

