"use client";

import { useState, useCallback } from "react";
import UploadArea from "@/components/ui/UploadArea";
import Button from "@/components/ui/Button";
import ToolImagePreview from "@/components/tool-layout/ToolImagePreview";
import ToolFileInfo from "@/components/tool-layout/ToolFileInfo";
import ToolSuccessMessage from "@/components/tool-layout/ToolSuccessMessage";

interface FlipResult {
    originalName: string;
    originalSize: number;
    flippedSize: number;
    originalDataUrl: string;
    flippedDataUrl: string;
    originalDimensions: { width: number; height: number };
    type: string;
}

export default function ImageFlipper() {
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<FlipResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [flipMode, setFlipMode] = useState<"horizontal" | "vertical" | "both">("horizontal");
    const [format, setFormat] = useState<"jpeg" | "png" | "webp">("png");
    const [quality, setQuality] = useState(90);
    const [successMessage, setSuccessMessage] = useState(false);

    const flip = useCallback(async () => {
        if (!file) return;
        setLoading(true);
        setSuccessMessage(false);

        try {
            const img = new Image();
            const originalDataUrl = URL.createObjectURL(file);

            const flippedDataUrl = await new Promise<string>((resolve, reject) => {
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext("2d")!;

                    if (flipMode === "horizontal" || flipMode === "both") {
                        ctx.translate(canvas.width, 0);
                        ctx.scale(-1, 1);
                    }
                    if (flipMode === "vertical" || flipMode === "both") {
                        ctx.translate(0, canvas.height);
                        ctx.scale(1, -1);
                    }

                    ctx.drawImage(img, 0, 0);

                    const mimeType =
                        format === "jpeg"
                            ? "image/jpeg"
                            : format === "png"
                                ? "image/png"
                                : "image/webp";

                    if (format === "jpeg") {
                        const jpegCanvas = document.createElement("canvas");
                        jpegCanvas.width = canvas.width;
                        jpegCanvas.height = canvas.height;
                        const jctx = jpegCanvas.getContext("2d")!;
                        jctx.fillStyle = "#ffffff";
                        jctx.fillRect(0, 0, jpegCanvas.width, jpegCanvas.height);
                        jctx.drawImage(canvas, 0, 0);
                        jpegCanvas.toBlob(
                            (blob) => {
                                if (!blob) {
                                    reject(new Error("Flip failed"));
                                    return;
                                }
                                const reader = new FileReader();
                                reader.onload = () => resolve(reader.result as string);
                                reader.readAsDataURL(blob);
                            },
                            mimeType,
                            quality / 100
                        );
                        return;
                    }

                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                reject(new Error("Flip failed"));
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

            const flippedSize = Math.round(
                (flippedDataUrl.length * 3) / 4 -
                (flippedDataUrl.endsWith("==") ? 2 : flippedDataUrl.endsWith("=") ? 1 : 0)
            );

            setResult({
                originalName: file.name,
                originalSize: file.size,
                flippedSize,
                originalDataUrl,
                flippedDataUrl,
                originalDimensions: { width: img.width, height: img.height },
                type: `image/${format}`,
            });

            setSuccessMessage(true);
            setTimeout(() => setSuccessMessage(false), 3000);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [file, flipMode, format, quality]);

    const download = () => {
        if (!result) return;
        const link = document.createElement("a");
        const ext = format === "jpeg" ? "jpg" : format;
        const mode = flipMode === "both" ? "flipped" : `${flipMode}-flip`;
        const name = result.originalName.replace(/\.[^.]+$/, "") + `-${mode}.${ext}`;
        link.download = name;
        link.href = result.flippedDataUrl;
        link.click();
    };

    const formatBytes = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

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
                    {/* File bar */}
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/10 p-4">
                        <span className="text-2xl">🖼</span>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                            <p className="text-xs text-muted">{formatBytes(file.size)}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => { setFile(null); setResult(null); setSuccessMessage(false); }}>
                            Change
                        </Button>
                    </div>

                    {/* Flip mode options */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">Flip Direction</label>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: "↔ Horizontal", value: "horizontal" },
                                { label: "↕ Vertical", value: "vertical" },
                                { label: "✳ Both", value: "both" },
                            ].map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setFlipMode(opt.value as typeof flipMode)}
                                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${flipMode === opt.value
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-border text-muted hover:text-foreground"
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Output format */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">Output Format</label>
                            <select
                                value={format}
                                onChange={(e) => setFormat(e.target.value as typeof format)}
                                className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                            >
                                <option value="png">PNG</option>
                                <option value="jpeg">JPEG</option>
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

                    <Button onClick={flip} disabled={loading} size="lg">
                        {loading ? "⏳ Flipping..." : "🔄 Flip Image"}
                    </Button>

                    {successMessage && <ToolSuccessMessage message="Image flipped successfully!" />}

                    {result && (
                        <div className="space-y-6 rounded-lg border border-border bg-muted/10 p-6">
                            <ToolImagePreview
                                beforeUrl={result.originalDataUrl}
                                afterUrl={result.flippedDataUrl}
                                beforeLabel="Original"
                                afterLabel={`Flipped (${flipMode})`}
                                beforeSize={formatBytes(result.originalSize)}
                                afterSize={formatBytes(result.flippedSize)}
                            />

                            <ToolFileInfo
                                dimensions={`${result.originalDimensions.width} × ${result.originalDimensions.height}`}
                                fileType={result.type.toUpperCase()}
                                originalSize={formatBytes(result.originalSize)}
                                compressedSize={formatBytes(result.flippedSize)}
                            />

                            <div className="flex justify-center">
                                <Button onClick={download} variant="outline" size="lg">
                                    ⬇ Download Flipped Image
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

