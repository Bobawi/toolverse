"use client";

import { useEffect, useRef } from "react";

/**
 * AdSlot — Google AdSense ad unit placeholder.
 *
 * IMPORTANT: Ads are DISABLED by default. The component renders nothing
 * unless `NEXT_PUBLIC_ADSENSE_ENABLED=true` is set in the environment.
 *
 * This ensures the site stays "clean" during the AdSense application review
 * (Google rejects sites that show ads before approval). Once approved, add
 * `NEXT_PUBLIC_ADSENSE_ENABLED=true` to your .env / Vercel env vars and the
 * ads will appear automatically.
 */
interface AdSlotProps {
    /** Ad slot ID from AdSense */
    slot?: string;
    /** Ad format */
    format?: "auto" | "rectangle" | "horizontal" | "vertical";
    className?: string;
}

const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";

// Minimal global type so we avoid `any`.
declare global {
    interface Window {
        adsbygoogle?: unknown[];
    }
}

export default function AdSlot({
    slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT ?? "",
    format = "auto",
    className = "",
}: AdSlotProps) {
    const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";
    const ref = useRef<HTMLModElement>(null);

    // Always call the hook (before any conditional return) to satisfy React rules.
    useEffect(() => {
        if (!ADSENSE_ENABLED || !client) return;
        try {
            window.adsbygoogle = window.adsbygoogle || [];
            window.adsbygoogle.push({});
        } catch (e) {
            // Silently ignore ad errors — never break the page.
            console.warn("AdSense error:", e);
        }
    }, [client]);

    // If ads are not enabled, render nothing (clean site during review).
    if (!ADSENSE_ENABLED || !client) {
        return null;
    }

    return (
        <div className={`flex w-full justify-center ${className}`}>
            <ins
                ref={ref}
                className="adsbygoogle"
                style={{ display: "block", width: "100%" }}
                data-ad-client={client}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive="true"
            />
        </div>
    );
}
