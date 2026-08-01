"use client";

import { useState, useCallback, useRef } from "react";
import UploadArea from "@/components/ui/UploadArea";
import Button from "@/components/ui/Button";
import ToolCropArea from "@/components/tool-layout/ToolCropArea";
import type { CropArea } from "@/components/tool-layout/ToolCropArea";
import ToolImagePreview from "@/components/tool-layout/ToolImagePreview";
import ToolFileInfo from "@/components/tool-layout/ToolFileInfo";
import ToolSuccessMessage from "@/components/tool-layout/ToolSuccessMessage";

interface AspectOption {
    label: string;
    value: number | null; // null = free
}

const aspectOptions: AspectOption[] = [
    { label: "Free", value: null },
    { label: "1:1", value: 1 },
    { label: "4:3", value: 4 / 3 },
    { label: "3:2", value: 3 / 2 },
    { label: "16:9", value: 16 / 9 },
    { label: "3:4", value: 3 / 4 },
    { label: "2:3", value: 2 / 3 },
    { label: "9:16", value: 9 / 16 },
];

interface CropResult {
    originalName: string;
    originalSize: number;
    croppedSize: number;
    originalDataUrl: string;
    croppedDataUrl: string;
    originalDimensions: { width: number; height: number };
    croppedDimensions: { width: number; height: number };
    type: string;
}

export default function ImageCropper() {
    const [file, setFile] = useState<File | null>(null);
    const [result, setResult] = useState<CropResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [aspectRatio, setAspectRatio] = useState<number | null>(null);
    const [format, setFormat] = useState<"jpeg" | "png" | "webp">("jpeg");
    const [quality, setQuality] = useState(90);
    const [successMessage, setSuccessMessage] = useState(false);
    const cropRef = useRef<CropArea>({ x: 0, y: 0, width: 100, height: 100 });
    const imageRef = useRef<HTMLImageElement>(null);

    const handleCropChange = useCallback((crop: CropArea) => {
        cropRef.current = crop;
    }, []);

    const cropImage = useCallback(async () => {
        if (!file) return;
        setLoading(true);
        setSuccessMessage(false);

        try {
            const img = new Image();
            const originalDataUrl = URL.createObjectURL(file);

            const croppedDataUrl = await new Promise<string>((resolve, reject) => {
                img.onload = () => {
                    const containerEl = document.querySelector("[data-crop-container]");
                    const displayW = containerEl?.clientWidth || img.width;
                    const displayH = containerEl?.clientHeight || img.height;
                    const scale = Math.min(displayW / img.width, displayH / img.height, 1);
                    const crop = cropRef.current;

                    // Convert display coords to actual image coords
                    const actualX = Math.round(crop.x / scale);
                    const actualY = Math.round(crop.y / scale);
                    const actualW = Math.round(crop.width / scale);
                    const actualH = Math.round(crop.height / scale);

                    const canvas = document.createElement("canvas");
                    canvas.width = actualW;
                    canvas.height = actualH;
                    const ctx = canvas.getContext("2d")!;
                    ctx.drawImage(img, actualX, actualY, actualW, actualH, 0, 0, actualW, actualH);

                    const mimeType =
                        format === "jpeg"
                            ? "image/jpeg"
                            : format === "png"
                                ? "image/png"
                                : "image/webp";

                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                reject(new Error("Crop failed"));
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

            const croppedSize = Math.round(
                (croppedDataUrl.length * 3) / 4 -
                (croppedDataUrl.endsWith("==") ? 2 : croppedDataUrl.endsWith("=") ? 1 : 0)
            );

            const crop = cropRef.current;
            const containerEl = document.querySelector("[data-crop-container]");
            const displayW = containerEl?.clientWidth || img.width;
            const displayH = containerEl?.clientHeight || img.height;
            const scale = Math.min(displayW / img.width, displayH / img.height, 1);
            const actualW = Math.round(crop.width / scale);
            const actualH = Math.round(crop.height / scale);

            setResult({
                originalName: file.name,
                originalSize: file.size,
                croppedSize,
                originalDataUrl,
                croppedDataUrl,
                originalDimensions: { width: img.width, height: img.height },
                croppedDimensions: { width: actualW, height: actualH },
                type: `image/${format}`,
            });

            setSuccessMessage(true);
            setTimeout(() => setSuccessMessage(false), 3000);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [file, format, quality]);

    const download = () => {
        if (!result) return;
        const link = document.createElement("a");
        const ext = format === "jpeg" ? "jpg" : format;
        const name = result.originalName.replace(/\.[^.]+$/, "") + `-cropped.${ext}`;
        link.download = name;
        link.href = result.croppedDataUrl;
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

                    {/* Aspect Ratio */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">Aspect Ratio</label>
                        <div className="flex flex-wrap gap-2">
                            {aspectOptions.map((opt) => (
                                <button
                                    key={opt.label}
                                    onClick={() => setAspectRatio(opt.value)}
                                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${aspectRatio === opt.value
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-border text-muted hover:text-foreground"
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Crop Area */}
                    <div data-crop-container>
                        <ToolCropArea
                            imageUrl={URL.createObjectURL(file)}
                            aspectRatio={aspectRatio}
                            onCropChange={handleCropChange}
                        />
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

                    <Button onClick={cropImage} disabled={loading} size="lg">
                        {loading ? "⏳ Cropping..." : "✂️ Crop Image"}
                    </Button>

                    {successMessage && <ToolSuccessMessage message="Image cropped successfully!" />}

                    {result && (
                        <div className="space-y-6 rounded-lg border border-border bg-muted/10 p-6">
                            <ToolImagePreview
                                beforeUrl={result.originalDataUrl}
                                afterUrl={result.croppedDataUrl}
                                beforeLabel={`Original (${result.originalDimensions.width}×${result.originalDimensions.height})`}
                                afterLabel={`Cropped (${result.croppedDimensions.width}×${result.croppedDimensions.height})`}
                                beforeSize={formatBytes(result.originalSize)}
                                afterSize={formatBytes(result.croppedSize)}
                            />

                            <ToolFileInfo
                                dimensions={`${result.croppedDimensions.width} × ${result.croppedDimensions.height}`}
                                fileType={result.type.toUpperCase()}
                                originalSize={formatBytes(result.originalSize)}
                                compressedSize={formatBytes(result.croppedSize)}
                            />

                            <div className="flex justify-center">
                                <Button onClick={download} variant="outline" size="lg">
                                    ⬇ Download Cropped Image
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

