"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import ToolSuccessMessage from "@/components/tool-layout/ToolSuccessMessage";
import ToolFileInfo from "@/components/tool-layout/ToolFileInfo";

interface PageImage {
    page: number;
    url: string;
    size: number;
    width: number;
    height: number;
}

type PdfJsModule = typeof import("pdfjs-dist");

async function getPdfJs(): Promise<PdfJsModule> {
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    return pdfjsLib;
}

export default function PdfToImage() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);
    const [scale, setScale] = useState(2);
    const [format, setFormat] = useState<"png" | "jpeg">("png");
    const [images, setImages] = useState<PageImage[]>([]);
    const [pageCount, setPageCount] = useState(0);

    const formatBytes = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const onFile = async (f: File) => {
        setError("");
        setImages([]);
        setFile(f);
        try {
            const pdfjsLib = await getPdfJs();
            const bytes = await f.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
            setPageCount(pdf.numPages);
        } catch {
            setError("Invalid PDF file. Please choose a valid PDF.");
            setFile(null);
        }
    };

    const convert = async () => {
        if (!file) return;
        setError("");
        setLoading(true);
        setSuccessMessage(false);
        setImages([]);

        try {
            const pdfjsLib = await getPdfJs();
            const bytes = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
            const baseName = file.name.replace(/\.pdf$/i, "");
            const outImages: PageImage[] = [];

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale });
                const canvas = document.createElement("canvas");
                canvas.width = Math.floor(viewport.width);
                canvas.height = Math.floor(viewport.height);
                const ctx = canvas.getContext("2d")!;
                await page.render({
                    canvas,
                    canvasContext: ctx,
                    viewport,
                }).promise;

                const mime = format === "png" ? "image/png" : "image/jpeg";
                const dataUrl = canvas.toDataURL(mime, 0.92);
                const blob = await (await fetch(dataUrl)).blob();
                const url = URL.createObjectURL(blob);

                outImages.push({
                    page: i,
                    url,
                    size: blob.size,
                    width: canvas.width,
                    height: canvas.height,
                });
            }

            setImages(outImages);
            setSuccessMessage(true);
            setTimeout(() => setSuccessMessage(false), 3000);
            void baseName;
        } catch (err) {
            console.error(err);
            setError("Failed to convert PDF to images.");
        } finally {
            setLoading(false);
        }
    };

    const downloadOne = (img: PageImage) => {
        const link = document.createElement("a");
        link.href = img.url;
        link.download = `page-${img.page}.${format}`;
        link.click();
    };

    const downloadAll = () => {
        images.forEach((img) => {
            const link = document.createElement("a");
            link.href = img.url;
            link.download = `page-${img.page}.${format}`;
            link.click();
        });
    };

    const inputClass =
        "w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none";

    return (
        <div className="space-y-6">
            {!file ? (
                <div
                    onClick={() => document.getElementById("pdf-img-input")?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        const f = e.dataTransfer.files[0];
                        if (f) onFile(f);
                    }}
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-10 text-center transition-all hover:border-primary hover:bg-primary/5"
                >
                    <svg className="mb-3 h-10 w-10 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                    </svg>
                    <p className="text-sm text-muted">Drop a PDF file here or click to browse</p>
                    <p className="mt-1 text-xs text-muted">Max 20MB</p>
                    <input
                        id="pdf-img-input"
                        type="file"
                        accept="application/pdf,.pdf"
                        onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) onFile(f);
                            e.target.value = "";
                        }}
                        className="hidden"
                    />
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/10 p-4">
                        <span className="text-2xl">📄</span>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                            <p className="text-xs text-muted">
                                {formatBytes(file.size)} • {pageCount} pages
                            </p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => { setFile(null); setImages([]); }}>
                            Change
                        </Button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                Output format
                            </label>
                            <select
                                value={format}
                                onChange={(e) => setFormat(e.target.value as typeof format)}
                                className={inputClass}
                            >
                                <option value="png">PNG (lossless)</option>
                                <option value="jpeg">JPG (smaller size)</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                Quality / Scale: {scale}×
                            </label>
                            <input
                                type="range"
                                min={1}
                                max={4}
                                step={0.5}
                                value={scale}
                                onChange={(e) => setScale(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                            <p className="mt-1 text-xs text-muted">
                                Higher scale = sharper images, larger files.
                            </p>
                        </div>
                    </div>

                    <Button onClick={convert} disabled={loading} size="lg">
                        {loading ? "⏳ Converting..." : "🖼️ Convert to Images"}
                    </Button>

                    {error && <p className="text-sm text-red-500">{error}</p>}
                    {successMessage && (
                        <ToolSuccessMessage message={`Converted ${images.length} page${images.length > 1 ? "s" : ""} to images!`} />
                    )}

                    {images.length > 0 && (
                        <div className="space-y-4 rounded-lg border border-border bg-muted/10 p-6">
                            <ToolFileInfo
                                fileType={format === "png" ? "PNG" : "JPG"}
                                originalSize={formatBytes(file.size)}
                                compressedSize={`${images.length} files`}
                                dimensions={`${images[0].width}×${images[0].height}px`}
                            />
                            <div className="grid max-h-80 grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3">
                                {images.map((img) => (
                                    <div
                                        key={img.page}
                                        className="overflow-hidden rounded-lg border border-border bg-background"
                                    >
                                        <img
                                            src={img.url}
                                            alt={`Page ${img.page}`}
                                            className="h-28 w-full object-cover"
                                        />
                                        <div className="flex items-center justify-between p-2">
                                            <span className="text-xs text-muted">
                                                Page {img.page} • {formatBytes(img.size)}
                                            </span>
                                            <button
                                                onClick={() => downloadOne(img)}
                                                className="rounded-md border border-border px-2 py-1 text-xs hover:bg-muted/10"
                                            >
                                                ⬇
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center">
                                <Button onClick={downloadAll} variant="outline" size="lg">
                                    ⬇ Download All ({images.length})
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

