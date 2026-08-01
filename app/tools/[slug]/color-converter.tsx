"use client";

import { useState } from "react";

function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}

function rgbToHsl(r: number, g: number, b: number) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0; const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    };
}

function rgbToCmyk(r: number, g: number, b: number) {
    const cr = 1 - r / 255;
    const cg = 1 - g / 255;
    const cb = 1 - b / 255;
    const k = Math.min(cr, cg, cb);
    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
    return {
        c: Math.round(((cr - k) / (1 - k)) * 100),
        m: Math.round(((cg - k) / (1 - k)) * 100),
        y: Math.round(((cb - k) / (1 - k)) * 100),
        k: Math.round(k * 100),
    };
}

export default function ColorConverter() {
    const [hex, setHex] = useState("#6366f1");

    const rgb = hexToRgb(hex);
    const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
    const cmyk = rgb ? rgbToCmyk(rgb.r, rgb.g, rgb.b) : null;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <input
                    type="color"
                    value={hex}
                    onChange={(e) => setHex(e.target.value)}
                    className="h-16 w-16 cursor-pointer rounded-lg border border-border"
                />
                <input
                    type="text"
                    value={hex}
                    onChange={(e) => setHex(e.target.value)}
                    className="flex-1 rounded-lg border border-border bg-background p-3 text-sm text-foreground font-mono focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
                {[
                    {
                        label: "RGB",
                        value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "Invalid",
                    },
                    {
                        label: "HSL",
                        value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "Invalid",
                    },
                    {
                        label: "CMYK",
                        value: cmyk
                            ? `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`
                            : "Invalid",
                    },
                ].map(({ label, value }) => (
                    <div
                        key={label}
                        className="rounded-lg border border-border bg-muted/10 p-4"
                    >
                        <p className="mb-1 text-xs font-medium text-muted">{label}</p>
                        <p className="font-mono text-sm text-foreground">{value}</p>
                    </div>
                ))}
            </div>

            {/* Preview */}
            <div className="grid gap-2 sm:grid-cols-5">
                {[100, 75, 50, 25, 10].map((opacity) => (
                    <div
                        key={opacity}
                        className="h-12 rounded-lg"
                        style={{ backgroundColor: hex, opacity: opacity / 100 }}
                    />
                ))}
            </div>
        </div>
    );
}

