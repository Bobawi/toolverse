"use client";

import { useState, useCallback } from "react";
import UploadArea from "@/components/ui/UploadArea";
import Button from "@/components/ui/Button";
import ToolImagePreview from "@/components/tool-layout/ToolImagePreview";
import ToolFileInfo from "@/components/tool-layout/ToolFileInfo";
import ToolSuccessMessage from "@/components/tool-layout/ToolSuccessMessage";

interface RotateResult {
    originalName: string;
    originalSize: number;
    rotatedSize: number;
    originalDataUrl: string;
    rotatedDataUrl: string;
    originalDimensions: { width: number; height: number };
    newDimensions: { width: number; height: number };
    type: string;
}

export default function ImageRotator() {
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<RotateResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [angle, setAngle] = useState<90 | 180 | 270>(90);
    const [format, setFormat] = useState<"jpeg" | "png" | "webp">("png");
    const [quality, setQuality] = useState(90);
    const [successMessage, setSuccessMessage] = useState(false);

    const rotate = useCallback(async () => {
        if (!file) return;
        setLoading(true);
        setSuccessMessage(false);

        try {
            const img = new Image();
            const originalDataUrl = URL.createObjectURL(file);

            const rotatedDataUrl = await new Promise<string>((resolve, reject) => {
                img.onload = () => {
                    // Swap width/height for 90 & 270 degree rotations
                    const swap = angle === 90 || angle === 270;
                    const canvas = document.createElement("canvas");
                    canvas.width = swap ? img.height : img.width;
                    canvas.height = swap ? img.width : img.height;
                    const ctx = canvas.getContext("2d")!;

                    if (angle === 90) {
                        ctx.translate(canvas.width, 0);
                        ctx.rotate(Math.PI / 2);
                    } else if (angle === 180) {
                        ctx.translate(canvas.width, canvas.height);
                        ctx.rotate(Math.PI);
                    } else if (angle === 270) {
                        ctx.translate(0, canvas.height);
                        ctx.rotate((3 * Math.PI) / 2);
                    }

                    ctx.drawImage(img, 0, 0);

                    const mimeType =
                        format === "jpeg"
                            ? "image/jpeg"
                            : format === "png"
                                ? "image/png"
                                : "image/webp";

                    // Fill white background for JPEG
                    if (format === "jpeg") {
                        const finalCtx = ctx;
                        // Redraw on white background for jpeg
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
                                    reject(new Error("Rotation failed"));
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
                                reject(new Error("Rotation failed"));
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

            const rotatedSize = Math.round(
                (rotatedDataUrl.length * 3) / 4 -
                (rotatedDataUrl.endsWith("==") ? 2 : rotatedDataUrl.endsWith("=") ? 1 : 0)
            );

            const swap = angle === 90 || angle === 270;
            const newW = swap ? img.height : img.width;
            const newH = swap ? img.width : img.height;

            setResult({
                originalName: file.name,
                originalSize: file.size,
                rotatedSize,
                originalDataUrl,
                rotatedDataUrl,
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
    }, [file, angle, format, quality]);

    const download = () => {
        if (!result) return;
        const link = document.createElement("a");
        const ext = format === "jpeg" ? "jpg" : format;
        const name = result.originalName.replace(/\.[^.]+$/, "") + `-rotated-${angle}.${ext}`;
        link.download = name;
        link.href = result.rotatedDataUrl;
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

                    {/* Rotation options */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">Rotate</label>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: "↻ 90°", value: 90 },
                                { label: "↺ 180°", value: 180 },
                                { label: "↺ 270°", value: 270 },
                            ].map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setAngle(opt.value as 90 | 180 | 270)}
                                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${angle === opt.value
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

                    <Button onClick={rotate} disabled={loading} size="lg">
                        {loading ? "⏳ Rotating..." : "🔄 Rotate Image"}
                    </Button>

                    {successMessage && <ToolSuccessMessage message="Image rotated successfully!" />}

                    {result && (
                        <div className="space-y-6 rounded-lg border border-border bg-muted/10 p-6">
                            <ToolImagePreview
                                beforeUrl={result.originalDataUrl}
                                afterUrl={result.rotatedDataUrl}
                                beforeLabel={`Original (${result.originalDimensions.width}×${result.originalDimensions.height})`}
                                afterLabel={`Rotated ${angle}° (${result.newDimensions.width}×${result.newDimensions.height})`}
                                beforeSize={formatBytes(result.originalSize)}
                                afterSize={formatBytes(result.rotatedSize)}
                            />

                            <ToolFileInfo
                                dimensions={`${result.newDimensions.width} × ${result.newDimensions.height}`}
                                fileType={result.type.toUpperCase()}
                                originalSize={formatBytes(result.originalSize)}
                                compressedSize={formatBytes(result.rotatedSize)}
                            />

                            <div className="flex justify-center">
                                <Button onClick={download} variant="outline" size="lg">
                                    ⬇ Download Rotated Image
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

