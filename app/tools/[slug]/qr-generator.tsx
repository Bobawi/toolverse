"use client";

import { useState } from "react";
import QRCode from "qrcode";

const SIZE_OPTIONS = [
    { label: "Small (200px)", value: 200 },
    { label: "Medium (400px)", value: 400 },
    { label: "Large (800px)", value: 800 },
];

const EC_OPTIONS = [
    { label: "L — Low (7%)", value: "L" },
    { label: "M — Medium (15%)", value: "M" },
    { label: "Q — Quartile (25%)", value: "Q" },
    { label: "H — High (30%)", value: "H" },
] as const;

export default function QRGenerator() {
    const [text, setText] = useState("");
    const [qrUrl, setQrUrl] = useState("");
    const [error, setError] = useState("");
    const [size, setSize] = useState(400);
    const [ecLevel, setEcLevel] = useState<"L" | "M" | "Q" | "H">("M");
    const [fgColor, setFgColor] = useState("#0f172a");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [copied, setCopied] = useState(false);

    const generate = async () => {
        if (!text.trim()) {
            setError("Please enter text or URL");
            return;
        }
        setError("");
        try {
            const url = await QRCode.toDataURL(text, {
                width: size,
                margin: 2,
                errorCorrectionLevel: ecLevel,
                color: { dark: fgColor, light: bgColor },
            });
            setQrUrl(url);
        } catch {
            setError("Failed to generate QR code");
        }
    };

    const download = () => {
        if (!qrUrl) return;
        const link = document.createElement("a");
        link.download = "qrcode.png";
        link.href = qrUrl;
        link.click();
    };

    const copyQr = async () => {
        if (!qrUrl) return;
        try {
            const blob = await (await fetch(qrUrl)).blob();
            await navigator.clipboard.write([
                new ClipboardItem({ "image/png": blob }),
            ]);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback: copy the data URL text
            await navigator.clipboard.writeText(qrUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                    Enter text or URL
                </label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="https://example.com"
                    rows={3}
                    className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                />
            </div>

            {/* Options */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Size
                    </label>
                    <select
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                    >
                        {SIZE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Error Correction
                    </label>
                    <select
                        value={ecLevel}
                        onChange={(e) =>
                            setEcLevel(e.target.value as "L" | "M" | "Q" | "H")
                        }
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                    >
                        {EC_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Foreground Color
                    </label>
                    <input
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="h-10 w-full cursor-pointer rounded-lg border border-border bg-background"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Background Color
                    </label>
                    <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="h-10 w-full cursor-pointer rounded-lg border border-border bg-background"
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-3">
                <button
                    onClick={generate}
                    className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                >
                    Generate QR Code
                </button>
                {qrUrl && (
                    <>
                        <button
                            onClick={download}
                            className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted/10"
                        >
                            ⬇ Download PNG
                        </button>
                        <button
                            onClick={copyQr}
                            className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted/10"
                        >
                            {copied ? "✓ Copied" : "📋 Copy Image"}
                        </button>
                    </>
                )}
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            {qrUrl && (
                <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-white p-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={qrUrl}
                        alt="QR Code"
                        style={{ width: Math.min(size, 400) }}
                        className="h-auto"
                    />
<p className="text-xs text-muted">
                        Tolerance: {EC_OPTIONS.find(o => o.value === ecLevel)?.label} • {size}px
                    </p>
                </div>
            )}
        </div>
    );
}

