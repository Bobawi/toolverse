"use client";

import { useState, useCallback } from "react";
import UploadArea from "@/components/ui/UploadArea";
import Button from "@/components/ui/Button";
import ToolImagePreview from "@/components/tool-layout/ToolImagePreview";
import ToolFileInfo from "@/components/tool-layout/ToolFileInfo";
import ToolSuccessMessage from "@/components/tool-layout/ToolSuccessMessage";

type Preset = "high" | "balanced" | "maximum";

const presetQualities: Record<Preset, number> = {
    high: 90,
    balanced: 70,
    maximum: 40,
};

const presetLabels: Record<Preset, string> = {
    high: "High Quality",
    balanced: "Balanced",
    maximum: "Maximum Compression",
};

interface CompressedResult {
    originalName: string;
    originalSize: number;
    compressedSize: number;
    originalDataUrl: string;
    compressedDataUrl: string;
    dimensions: { width: number; height: number };
    type: string;
    timeMs: number;
}

export default function ImageCompressor() {
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<CompressedResult | null>(null);
    const [preset, setPreset] = useState<Preset>("balanced");
    const [quality, setQuality] = useState(presetQualities.balanced);
    const [loading, setLoading] = useState(false);
    const [format, setFormat] = useState<"jpeg" | "png" | "webp">("jpeg");
    const [successMessage, setSuccessMessage] = useState(false);

    const handlePresetChange = (p: Preset) => {
        setPreset(p);
        setQuality(presetQualities[p]);
    };

    const compress = useCallback(async () => {
        if (!file) return;
        setLoading(true);
        setSuccessMessage(false);

        try {
            const startTime = performance.now();
            const img = new Image();
            const originalDataUrl = URL.createObjectURL(file);

            const compressedDataUrl = await new Promise<string>((resolve, reject) => {
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext("2d")!;
                    ctx.drawImage(img, 0, 0);

                    const mimeType =
                        format === "jpeg"
                            ? "image/jpeg"
                            : format === "png"
                                ? "image/png"
                                : "image/webp";

                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                reject(new Error("Compression failed"));
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

            const endTime = performance.now();
            const timeMs = Math.round(endTime - startTime);

            const compressedSize = Math.round(
                (compressedDataUrl.length * 3) / 4 -
                (compressedDataUrl.endsWith("==") ? 2 : compressedDataUrl.endsWith("=") ? 1 : 0)
            );

            setResult({
                originalName: file.name,
                originalSize: file.size,
                compressedSize,
                originalDataUrl,
                compressedDataUrl,
                dimensions: { width: img.width, height: img.height },
                type: `image/${format}`,
                timeMs,
            });

            setSuccessMessage(true);
            setTimeout(() => setSuccessMessage(false), 3000);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [file, quality, format]);

    const download = () => {
        if (!result) return;
        const link = document.createElement("a");
        const ext = format === "jpeg" ? "jpg" : format;
        const name = result.originalName.replace(/\.[^.]+$/, "") + `-compressed.${ext}`;
        link.download = name;
        link.href = result.compressedDataUrl;
        link.click();
    };

    const formatBytes = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const savings =
        result
            ? Math.round((1 - result.compressedSize / result.originalSize) * 100)
            : 0;

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
                    {/* File info bar */}
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/10 p-4">
                        <span className="text-2xl">🖼</span>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                                {file.name}
                            </p>
                            <p className="text-xs text-muted">{formatBytes(file.size)}</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                setFile(null);
                                setResult(null);
                                setSuccessMessage(false);
                            }}
                        >
                            Change
                        </Button>
                    </div>

                    {/* Options */}
                    <div className="grid gap-4 sm:grid-cols-3">
                        {/* Output Format */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                Output Format
                            </label>
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

                        {/* Presets */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                Compression Level
                            </label>
                            <div className="flex gap-1">
                                {(Object.keys(presetLabels) as Preset[]).map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => handlePresetChange(p)}
                                        className={`flex-1 rounded-lg px-2 py-2 text-xs font-medium transition-all ${preset === p
                                                ? "bg-primary text-white shadow-sm"
                                                : "border border-border text-muted hover:text-foreground"
                                            }`}
                                    >
                                        {presetLabels[p]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Fine-tune quality */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                Fine-tune: {quality}%
                            </label>
                            <input
                                type="range"
                                min={1}
                                max={100}
                                value={quality}
                                onChange={(e) => {
                                    setQuality(Number(e.target.value));
                                    setPreset("balanced");
                                }}
                                className="w-full accent-primary"
                            />
                        </div>
                    </div>

                    <Button onClick={compress} disabled={loading} size="lg" className="w-full sm:w-auto">
                        {loading ? "⏳ Compressing..." : "📦 Compress Image"}
                    </Button>

                    {/* Success message */}
                    {successMessage && (
                        <ToolSuccessMessage message="Image compressed successfully!" />
                    )}

                    {/* Result */}
                    {result && (
                        <div className="space-y-6 rounded-lg border border-border bg-muted/10 p-6">
                            {/* Before / After Preview */}
                            <ToolImagePreview
                                beforeUrl={result.originalDataUrl}
                                afterUrl={result.compressedDataUrl}
                                beforeSize={formatBytes(result.originalSize)}
                                afterSize={formatBytes(result.compressedSize)}
                                savings={`-${savings}% file size reduction`}
                            />

                            {/* File info */}
                            <ToolFileInfo
                                dimensions={`${result.dimensions.width} × ${result.dimensions.height}`}
                                fileType={result.type.toUpperCase()}
                                originalSize={formatBytes(result.originalSize)}
                                compressedSize={formatBytes(result.compressedSize)}
                                timeTaken={`${result.timeMs}ms`}
                            />

                            {/* Download */}
                            <div className="flex justify-center">
                                <Button onClick={download} variant="outline" size="lg">
                                    ⬇ Download Compressed Image
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
