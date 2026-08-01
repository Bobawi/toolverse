"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import Button from "@/components/ui/Button";
import ToolSuccessMessage from "@/components/tool-layout/ToolSuccessMessage";
import ToolFileInfo from "@/components/tool-layout/ToolFileInfo";

interface ImageFile {
    id: string;
    file: File;
    preview: string;
}

export default function ImageToPdf() {
    const [files, setFiles] = useState<ImageFile[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);
    const [orientation, setOrientation] = useState<"auto" | "landscape" | "portrait">("auto");
    const [margin, setMargin] = useState(20);
    const [result, setResult] = useState<{ url: string; size: number; pages: number; name: string } | null>(null);

    const formatBytes = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const addFiles = (list: FileList | null) => {
        if (!list) return;
        const newFiles = Array.from(list).filter((f) =>
            f.type.startsWith("image/")
        );
        if (newFiles.length === 0) {
            setError("Please choose image files only (PNG, JPG, WebP, etc).");
            return;
        }
        setError("");
        const withPreviews: ImageFile[] = newFiles.map((file) => ({
            id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
            file,
            preview: URL.createObjectURL(file),
        }));
        setFiles((prev) => [...prev, ...withPreviews]);
        setResult(null);
    };

    const removeFile = (id: string) => {
        setFiles((prev) => {
            const target = prev.find((f) => f.id === id);
            if (target) URL.revokeObjectURL(target.preview);
            return prev.filter((f) => f.id !== id);
        });
        setResult(null);
    };

    const moveFile = (index: number, direction: -1 | 1) => {
        setFiles((prev) => {
            const next = [...prev];
            const target = index + direction;
            if (target < 0 || target >= next.length) return prev;
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });
        setResult(null);
    };

    const convert = async () => {
        if (files.length === 0) {
            setError("Please add at least one image.");
            return;
        }
        setError("");
        setLoading(true);
        setSuccessMessage(false);

        try {
            const pdf = await PDFDocument.create();

            for (const { file } of files) {
                const bytes = await file.arrayBuffer();
                let image;
                const ext = file.name.toLowerCase().split(".").pop();

                if (ext === "png") {
                    image = await pdf.embedPng(bytes);
                } else if (ext === "jpg" || ext === "jpeg") {
                    image = await pdf.embedJpg(bytes);
                } else {
                    // WebP, GIF, BMP, etc — draw on canvas then embed as PNG
                    const dataUrl = await new Promise<string>((resolve, reject) => {
                        const img = new Image();
                        img.onload = () => {
                            const canvas = document.createElement("canvas");
                            canvas.width = img.width;
                            canvas.height = img.height;
                            const ctx = canvas.getContext("2d")!;
                            ctx.drawImage(img, 0, 0);
                            resolve(canvas.toDataURL("image/png"));
                        };
                        img.onerror = () => reject(new Error("Failed to load image"));
                        img.src = URL.createObjectURL(file);
                    });
                    const pngBytes = await (await fetch(dataUrl)).arrayBuffer();
                    image = await pdf.embedPng(pngBytes);
                }

                const page = pdf.addPage([image.width, image.height]);
                // Fit image to page with margin
                const maxW = page.getWidth() - margin * 2;
                const maxH = page.getHeight() - margin * 2;
                const scale = Math.min(maxW / image.width, maxH / image.height, 1);
                const drawW = image.width * scale;
                const drawH = image.height * scale;
                page.drawImage(image, {
                    x: (page.getWidth() - drawW) / 2,
                    y: (page.getHeight() - drawH) / 2,
                    width: drawW,
                    height: drawH,
                });
            }

            // Set orientation if requested
            if (orientation !== "auto") {
                const pages = pdf.getPages();
                for (const p of pages) {
                    if (orientation === "landscape" && p.getWidth() < p.getHeight()) {
                        p.setSize(p.getHeight(), p.getWidth());
                    } else if (orientation === "portrait" && p.getWidth() > p.getHeight()) {
                        p.setSize(p.getHeight(), p.getWidth());
                    }
                }
            }

            const bytes = await pdf.save();
            const blob = new Blob([new Uint8Array(bytes) as BlobPart], {
                type: "application/pdf",
            });
            const url = URL.createObjectURL(blob);

            setResult({
                url,
                size: bytes.length,
                pages: pdf.getPageCount(),
                name: `images-to-pdf.pdf`,
            });
            setSuccessMessage(true);
            setTimeout(() => setSuccessMessage(false), 3000);
        } catch (err) {
            console.error(err);
            setError("Failed to create PDF from images.");
        } finally {
            setLoading(false);
        }
    };

    const download = () => {
        if (!result) return;
        const link = document.createElement("a");
        link.href = result.url;
        link.download = result.name;
        link.click();
    };

    return (
        <div className="space-y-6">
            <div
                onClick={() => document.getElementById("img-pdf-input")?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    addFiles(e.dataTransfer.files);
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
                <p className="text-sm text-muted">Drop images here or click to browse</p>
                <p className="mt-1 text-xs text-muted">PNG, JPG, WebP, GIF, BMP • Multiple files allowed</p>
                <input
                    id="img-pdf-input"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                        addFiles(e.target.files);
                        e.target.value = "";
                    }}
                    className="hidden"
                />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            {files.length > 0 && (
                <>
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-foreground">
                            Images ({files.length})
                        </h3>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {files.map((f, i) => (
                                <div
                                    key={f.id}
                                    className="group relative overflow-hidden rounded-lg border border-border"
                                >
                                    <img
                                        src={f.preview}
                                        alt={f.file.name}
                                        className="h-24 w-full object-cover"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1.5 text-center">
                                        <p className="truncate text-[10px] text-white">{f.file.name}</p>
                                    </div>
                                    <div className="absolute right-1 top-1 flex gap-1">
                                        <button
                                            onClick={() => moveFile(i, -1)}
                                            disabled={i === 0}
                                            className="rounded bg-black/50 px-1.5 py-0.5 text-white disabled:opacity-30"
                                        >
                                            ↑
                                        </button>
                                        <button
                                            onClick={() => moveFile(i, 1)}
                                            disabled={i === files.length - 1}
                                            className="rounded bg-black/50 px-1.5 py-0.5 text-white disabled:opacity-30"
                                        >
                                            ↓
                                        </button>
                                        <button
                                            onClick={() => removeFile(f.id)}
                                            className="rounded bg-red-500/80 px-1.5 py-0.5 text-white"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                Page orientation
                            </label>
                            <select
                                value={orientation}
                                onChange={(e) => setOrientation(e.target.value as typeof orientation)}
                                className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                            >
                                <option value="auto">Auto (match image)</option>
                                <option value="landscape">Landscape</option>
                                <option value="portrait">Portrait</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                Margin: {margin}pt
                            </label>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                value={margin}
                                onChange={(e) => setMargin(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                        </div>
                    </div>

                    <Button onClick={convert} disabled={loading} size="lg">
                        {loading ? "⏳ Creating PDF..." : "📄 Create PDF"}
                    </Button>
                </>
            )}

            {successMessage && <ToolSuccessMessage message="PDF created successfully!" />}

            {result && (
                <div className="space-y-4 rounded-lg border border-border bg-muted/10 p-6">
                    <ToolFileInfo
                        fileType="PDF"
                        originalSize={`${files.length} images`}
                        compressedSize={formatBytes(result.size)}
                        dimensions={`${result.pages} pages`}
                    />
                    <div className="flex justify-center">
                        <Button onClick={download} variant="outline" size="lg">
                            ⬇ Download PDF
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

