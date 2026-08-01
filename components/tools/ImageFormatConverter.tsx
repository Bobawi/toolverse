"use client";

import { useState, useCallback } from "react";
import UploadArea from "@/components/ui/UploadArea";
import Button from "@/components/ui/Button";
import ToolImagePreview from "@/components/tool-layout/ToolImagePreview";
import ToolFileInfo from "@/components/tool-layout/ToolFileInfo";
import ToolSuccessMessage from "@/components/tool-layout/ToolSuccessMessage";

interface ImageFormatConverterProps {
    fromLabel: string; // e.g. "JPG"
    toLabel: string; // e.g. "PNG"
    accept: string; // e.g. "image/jpeg"
    mimeType: string; // e.g. "image/png"
    extension: string; // e.g. "png"
    supportsQuality?: boolean; // JPEG/WebP output supports quality slider
    needsWhiteBackground?: boolean; // true when converting to JPG (no transparency)
}

interface ConvertResult {
    originalName: string;
    originalSize: number;
    convertedSize: number;
    originalDataUrl: string;
    convertedDataUrl: string;
    originalDimensions: { width: number; height: number };
    type: string;
}

export default function ImageFormatConverter({
    fromLabel,
    toLabel,
    accept,
    mimeType,
    extension,
    supportsQuality = true,
    needsWhiteBackground = false,
}: ImageFormatConverterProps) {
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<ConvertResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [quality, setQuality] = useState(90);
    const [successMessage, setSuccessMessage] = useState(false);

    const convert = useCallback(async () => {
        if (!file) return;
        setLoading(true);
        setSuccessMessage(false);

        try {
            const img = new Image();
            const originalDataUrl = URL.createObjectURL(file);

            const convertedDataUrl = await new Promise<string>((resolve, reject) => {
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext("2d")!;

                    // Fill white background for JPG output (no transparency support)
                    if (needsWhiteBackground) {
                        ctx.fillStyle = "#ffffff";
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    }

                    ctx.drawImage(img, 0, 0);

                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                reject(new Error("Conversion failed"));
                                return;
                            }
                            const reader = new FileReader();
                            reader.onload = () => resolve(reader.result as string);
                            reader.readAsDataURL(blob);
                        },
                        mimeType,
                        supportsQuality ? quality / 100 : undefined
                    );
                };
                img.onerror = () => reject(new Error("Failed to load image"));
                img.src = URL.createObjectURL(file);
            });

            const convertedSize = Math.round(
                (convertedDataUrl.length * 3) / 4 -
                (convertedDataUrl.endsWith("==") ? 2 : convertedDataUrl.endsWith("=") ? 1 : 0)
            );

            setResult({
                originalName: file.name,
                originalSize: file.size,
                convertedSize,
                originalDataUrl,
                convertedDataUrl,
                originalDimensions: { width: img.width, height: img.height },
                type: mimeType,
            });

            setSuccessMessage(true);
            setTimeout(() => setSuccessMessage(false), 3000);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [file, mimeType, quality, supportsQuality, needsWhiteBackground]);

    const download = () => {
        if (!result) return;
        const link = document.createElement("a");
        const name = result.originalName.replace(/\.[^.]+$/, "") + `.${extension}`;
        link.download = name;
        link.href = result.convertedDataUrl;
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
                    accept={accept}
                    maxSizeMB={10}
                    label={`Drop a ${fromLabel} image here or click to browse`}
                />
            ) : (
                <>
                    {/* File bar */}
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/10 p-4">
                        <span className="text-2xl">🖼</span>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-foreground">
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

                    {/* Quality (only for lossy output formats) */}
                    {supportsQuality && (
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                Quality: {quality}%
                            </label>
                            <input
                                type="range"
                                min={1}
                                max={100}
                                value={quality}
                                onChange={(e) => setQuality(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                        </div>
                    )}

                    <Button onClick={convert} disabled={loading} size="lg">
                        {loading ? "⏳ Converting..." : `🔄 Convert to ${toLabel}`}
                    </Button>

                    {successMessage && (
                        <ToolSuccessMessage
                            message={`Image converted to ${toLabel} successfully!`}
                        />
                    )}

                    {result && (
                        <div className="space-y-6 rounded-lg border border-border bg-muted/10 p-6">
                            <ToolImagePreview
                                beforeUrl={result.originalDataUrl}
                                afterUrl={result.convertedDataUrl}
                                beforeLabel={`Original (${fromLabel})`}
                                afterLabel={`Converted (${toLabel})`}
                                beforeSize={formatBytes(result.originalSize)}
                                afterSize={formatBytes(result.convertedSize)}
                            />

                            <ToolFileInfo
                                dimensions={`${result.originalDimensions.width} × ${result.originalDimensions.height}`}
                                fileType={result.type.toUpperCase()}
                                originalSize={formatBytes(result.originalSize)}
                                compressedSize={formatBytes(result.convertedSize)}
                            />

                            <div className="flex justify-center">
                                <Button onClick={download} variant="outline" size="lg">
                                    ⬇ Download {toLabel} Image
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

