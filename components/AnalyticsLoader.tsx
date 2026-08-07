"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        dataLayer: unknown[];
        gtag: (...args: unknown[]) => void;
        clarity?: {
            (command: string, ...args: unknown[]): void;
            q?: unknown[];
        };
    }
}

/**
 * AnalyticsLoader — interaction-gated GA4 + Clarity.
 *
 * Third-party analytics scripts (gtag.js ~167KB, Clarity ~74KB) are heavy
 * main-thread blockers. Instead of loading them on "load" (which still costs
 * TBT), we wait for the FIRST USER INTERACTION (pointerdown, keydown, scroll,
 * etc.). This keeps the initial render and hydration fast (Lighthouse clean)
 * while still tracking real engaged users.
 *
 * Fallback: if the user never interacts, analytics fire on `pagehide` so the
 * pageview is still recorded when they leave.
 */
export default function AnalyticsLoader() {
    useEffect(() => {
        // Skip entirely on localhost to avoid noise in dev.
        if (typeof window === "undefined") return;
        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") return;

        const GA_ID = "G-3YK7WEL3MG";
        const CLARITY_ID = "xvu8nfhcfq";

        let loaded = false;

        const loadAnalytics = () => {
            if (loaded) return;
            loaded = true;

            // ---- GA4 ----
            window.dataLayer = window.dataLayer || [];
            window.gtag = (...args: unknown[]) => {
                window.dataLayer.push(args);
            };
            window.gtag("js", new Date());
            window.gtag("config", GA_ID, { transport_type: "beacon" });

            const gaScript = document.createElement("script");
            gaScript.async = true;
            gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
            document.head.appendChild(gaScript);

            // ---- Microsoft Clarity ----
            try {
                window.clarity =
                    window.clarity ||
                    function (command: string, ...args: unknown[]) {
                        (window.clarity!.q = window.clarity!.q || []).push([command, ...args]);
                    };
                const t = document.createElement("script");
                t.async = true;
                t.defer = true;
                t.src = "https://www.clarity.ms/tag/" + CLARITY_ID;
                const firstScript = document.getElementsByTagName("script")[0];
                firstScript?.parentNode?.insertBefore(t, firstScript);
            } catch {
                // Ignore — analytics should never break the app.
            }
        };

        const events = ["pointerdown", "keydown", "scroll", "touchstart", "mousemove"] as const;

        const onInteraction = () => {
            loadAnalytics();
            cleanup();
        };

        const onPageHide = () => {
            // Flush analytics when the user leaves the page.
            loadAnalytics();
        };

        const cleanup = () => {
            events.forEach((e) => window.removeEventListener(e, onInteraction, { passive: true } as EventListenerOptions));
            window.removeEventListener("pagehide", onPageHide);
        };

        events.forEach((e) =>
            window.addEventListener(e, onInteraction, { passive: true, once: true } as AddEventListenerOptions)
        );
        window.addEventListener("pagehide", onPageHide);

        return cleanup;
    }, []);

    return null;
}

