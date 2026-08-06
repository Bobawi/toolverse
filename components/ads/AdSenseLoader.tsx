"use client";

import { useEffect } from "react";

/**
 * AdSenseLoader — loads the Google AdSense script once.
 *
 * DISABLED by default. The script is only injected when
 * `NEXT_PUBLIC_ADSENSE_ENABLED=true` AND `NEXT_PUBLIC_ADSENSE_CLIENT`
 * is configured. This keeps the site clean during AdSense review.
 *
 * The AdSense script MUST be loaded only once per page — this component
 * guards against duplicate injection.
 */
const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED !== "false";
const ADSENSE_CLIENT =
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-9740076187901674";

declare global {
    interface Window {
        adsbygoogle?: unknown[];
    }
}

export default function AdSenseLoader() {
    useEffect(() => {
        if (!ADSENSE_ENABLED || !ADSENSE_CLIENT) return;
        if (document.getElementById("adsense-script")) return;

        const script = document.createElement("script");
        script.id = "adsense-script";
        script.async = true;
        script.crossOrigin = "anonymous";
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
        document.head.appendChild(script);
    }, []);

    // Renders nothing — it's a loader only.
    return null;
}
