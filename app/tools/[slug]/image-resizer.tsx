"use client";

import { useState, useCallback } from "react";
import UploadArea from "@/components/ui/UploadArea";
import Button from "@/components/ui/Button";
import ToolImagePreview from "@/components/tool-layout/ToolImagePreview";
import ToolFileInfo from "@/components/tool-layout/ToolFileInfo";
import ToolSuccessMessage from "@/components/tool-layout/ToolSuccessMessage";

interface ResizeResult {
    originalName: string;
    originalSize: number;
    resizedSize: number;
    originalDataUrl: string;
    resizedDataUrl: string;
    originalDimensions: { width: number; height: number };
    newDimensions: { width: number; height: number };
    type: string;
}

export default function ImageResizer() {
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<ResizeResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(600);
    const [maintainAspect, setMaintainAspect] = useState(true);
    const [format, setFormat] = useState<"jpeg" | "png" | "webp">("jpeg");
    const [quality, setQuality] = useState(90);
    const [successMessage, setSuccessMessage] = useState(false);

    const resize = useCallback(async () => {
        if (!file) return;
        setLoading(true);
        setSuccessMessage(false);

        try {
            const img = new Image();
            const originalDataUrl = URL.createObjectURL(file);

            const resizedDataUrl = await new Promise<string>((resolve, reject) => {
                img.onload = () => {
                    let newW = width;
                    let newH = height;

                    if (maintainAspect) {
                        const aspect = img.width / img.height;
                        if (width / height > aspect) {
                            newW = Math.round(height * aspect);
                        } else {
                            newH = Math.round(width / aspect);
                        }
                    }

                    const canvas = document.createElement("canvas");
                    canvas.width = newW;
                    canvas.height = newH;
                    const ctx = canvas.getContext("2d")!;
                    ctx.drawImage(img, 0, 0, newW, newH);

                    const mimeType =
                        format === "jpeg"
                            ? "image/jpeg"
                            : format === "png"
                                ? "image/png"
                                : "image/webp";

                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                reject(new Error("Resize failed"));
                                return;
                            }
                            const reader = new FileReader();
                            reader.onload = () => resolve(reader.result as string);
                            reader.readAsDataURL(blob);
                        },
                        mimeType,
                        quality / 100
                    );
                };
                img.onerror = () => reject(new Error("Failed to load image"));
                img.src = URL.createObjectURL(file);
            });

            const resizedSize = Math.round(
                (resizedDataUrl.length * 3) / 4 -
                (resizedDataUrl.endsWith("==") ? 2 : resizedDataUrl.endsWith("=") ? 1 : 0)
            );

            let newW = width;
            let newH = height;
            if (maintainAspect) {
                const aspect = img.width / img.height;
                if (width / height > aspect) {
                    newW = Math.round(height * aspect);
                } else {
                    newH = Math.round(width / aspect);
                }
            }

            setResult({
                originalName: file.name,
                originalSize: file.size,
                resizedSize,
                originalDataUrl,
                resizedDataUrl,
                originalDimensions: { width: img.width, height: img.height },
                newDimensions: { width: newW, height: newH },
                type: `image/${format}`,
            });

            setSuccessMessage(true);
            setTimeout(() => setSuccessMessage(false), 3000);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [file, width, height, maintainAspect, format, quality]);

    const download = () => {
        if (!result) return;
        const link = document.createElement("a");
        const ext = format === "jpeg" ? "jpg" : format;
        const name = result.originalName.replace(/\.[^.]+$/, "") + `-${result.newDimensions.width}x${result.newDimensions.height}.${ext}`;
        link.download = name;
        link.href = result.resizedDataUrl;
        link.click();
    };

    const formatBytes = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const commonSizes = [
        { label: "Instagram (1080×1080)", w: 1080, h: 1080 },
        { label: "Twitter (1200×675)", w: 1200, h: 675 },
        { label: "YouTube (1280×720)", w: 1280, h: 720 },
        { label: "Facebook (1200×630)", w: 1200, h: 630 },
        { label: "HD (1920×1080)", w: 1920, h: 1080 },
    ];

    return (
        <div className="space-y-6">
            {!file ? (
                <UploadArea
                    onFile={setFile}
                    accept="image/*"
                    maxSizeMB={10}
                    label="Drop an image here or click to browse"
                />
            ) : (
                <>
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/10 p-4">
                        <span className="text-2xl">🖼</span>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                            <p className="text-xs text-muted">{formatBytes(file.size)}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => { setFile(null); setResult(null); setSuccessMessage(false); }}>
                            Change
                        </Button>
                    </div>

                    {/* Common sizes */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">Quick presets</label>
                        <div className="flex flex-wrap gap-2">
                            {commonSizes.map((s) => (
                                <button
                                    key={s.label}
                                    onClick={() => { setWidth(s.w); setHeight(s.h); }}
                                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${width === s.w && height === s.h
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-border text-muted hover:text-foreground"
                                        }`}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Dimensions */}
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">Width (px)</label>
                            <input
                                type="number"
                                value={width}
                                onChange={(e) => setWidth(Number(e.target.value))}
                                min={1}
                                max={10000}
                                className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">Height (px)</label>
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(Number(e.target.value))}
                                min={1}
                                max={10000}
                                className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-end">
                            <label className="flex items-center gap-2 rounded-lg border border-border p-2.5 cursor-pointer hover:bg-muted/5">
                                <input
                                    type="checkbox"
                                    checked={maintainAspect}
                                    onChange={(e) => setMaintainAspect(e.target.checked)}
                                    className="accent-primary"
                                />
                                <span className="text-sm text-foreground">Maintain aspect ratio</span>
                            </label>
                        </div>
                    </div>

                    {/* Format & Quality */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">Output Format</label>
                            <select
                                value={format}
                                onChange={(e) => setFormat(e.target.value as typeof format)}
                                className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                            >
                                <option value="jpeg">JPEG</option>
                                <option value="png">PNG</option>
                                <option value="webp">WebP</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">Quality: {quality}%</label>
                            <input
                                type="range"
                                min={1}
                                max={100}
                                value={quality}
                                onChange={(e) => setQuality(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                        </div>
                    </div>

                    <Button onClick={resize} disabled={loading} size="lg">
                        {loading ? "⏳ Resizing..." : "📐 Resize Image"}
                    </Button>

                    {successMessage && <ToolSuccessMessage message="Image resized successfully!" />}

                    {result && (
                        <div className="space-y-6 rounded-lg border border-border bg-muted/10 p-6">
                            <ToolImagePreview
                                beforeUrl={result.originalDataUrl}
                                afterUrl={result.resizedDataUrl}
                                beforeLabel={`Original (${result.originalDimensions.width}×${result.originalDimensions.height})`}
                                afterLabel={`Resized (${result.newDimensions.width}×${result.newDimensions.height})`}
                                beforeSize={formatBytes(result.originalSize)}
                                afterSize={formatBytes(result.resizedSize)}
                            />

                            <ToolFileInfo
                                dimensions={`${result.newDimensions.width} × ${result.newDimensions.height}`}
                                fileType={result.type.toUpperCase()}
                                originalSize={formatBytes(result.originalSize)}
                                compressedSize={formatBytes(result.resizedSize)}
                            />

                            <div className="flex justify-center">
                                <Button onClick={download} variant="outline" size="lg">
                                    ⬇ Download Resized Image
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

