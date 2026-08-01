"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import Button from "@/components/ui/Button";
import ToolSuccessMessage from "@/components/tool-layout/ToolSuccessMessage";
import ToolFileInfo from "@/components/tool-layout/ToolFileInfo";

interface PdfFile {
    id: string;
    file: File;
}

export default function MergePdf() {
    const [files, setFiles] = useState<PdfFile[]>([]);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [error, setError] = useState("");
    const [merged, setMerged] = useState<{
        url: string;
        size: number;
        pages: number;
        name: string;
    } | null>(null);

    const formatBytes = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const addFiles = (list: FileList | null) => {
        if (!list) return;
        const newFiles = Array.from(list).filter(
            (f) => f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")
        );
        if (newFiles.length === 0) {
            setError("Please choose PDF files only.");
            return;
        }
        setError("");
        const withIds: PdfFile[] = newFiles.map((file) => ({
            id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
            file,
        }));
        setFiles((prev) => [...prev, ...withIds]);
        setMerged(null);
    };

    const removeFile = (id: string) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
        setMerged(null);
    };

    const moveFile = (index: number, direction: -1 | 1) => {
        setFiles((prev) => {
            const next = [...prev];
            const target = index + direction;
            if (target < 0 || target >= next.length) return prev;
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });
        setMerged(null);
    };

    const merge = async () => {
        if (files.length < 2) {
            setError("Please add at least 2 PDF files to merge.");
            return;
        }
        setError("");
        setLoading(true);
        setSuccessMessage(false);

        try {
            const mergedPdf = await PDFDocument.create();

            for (const { file } of files) {
                const bytes = await file.arrayBuffer();
                const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const mergedBytes = await mergedPdf.save();
            const blob = new Blob([new Uint8Array(mergedBytes) as BlobPart], {
                type: "application/pdf",
            });
            const url = URL.createObjectURL(blob);
            const pageCount = mergedPdf.getPageCount();

            setMerged({
                url,
                size: mergedBytes.length,
                pages: pageCount,
                name: `merged-${files.length}-files.pdf`,
            });
            setSuccessMessage(true);
            setTimeout(() => setSuccessMessage(false), 3000);
        } catch (err) {
            console.error(err);
            setError("Failed to merge PDFs. Make sure all files are valid PDFs.");
        } finally {
            setLoading(false);
        }
    };

    const download = () => {
        if (!merged) return;
        const link = document.createElement("a");
        link.href = merged.url;
        link.download = merged.name;
        link.click();
    };

    return (
        <div className="space-y-6">
            <div
                onClick={() => document.getElementById("pdf-merge-input")?.click()}
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
                <p className="text-sm text-muted">Drop PDF files here or click to browse</p>
                <p className="mt-1 text-xs text-muted">Multiple files allowed • Max 20MB each</p>
                <input
                    id="pdf-merge-input"
                    type="file"
                    accept="application/pdf,.pdf"
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
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-foreground">
                        Files to merge ({files.length})
                    </h3>
                    {files.map((f, i) => (
                        <div
                            key={f.id}
                            className="flex items-center gap-3 rounded-lg border border-border bg-muted/10 p-3"
                        >
                            <span className="text-lg">📄</span>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-foreground">
                                    {i + 1}. {f.file.name}
                                </p>
                                <p className="text-xs text-muted">{formatBytes(f.file.size)}</p>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => moveFile(i, -1)}
                                    disabled={i === 0}
                                    className="rounded-md border border-border p-1.5 text-muted hover:text-foreground disabled:opacity-30"
                                    aria-label="Move up"
                                >
                                    ↑
                                </button>
                                <button
                                    onClick={() => moveFile(i, 1)}
                                    disabled={i === files.length - 1}
                                    className="rounded-md border border-border p-1.5 text-muted hover:text-foreground disabled:opacity-30"
                                    aria-label="Move down"
                                >
                                    ↓
                                </button>
                                <button
                                    onClick={() => removeFile(f.id)}
                                    className="rounded-md border border-border p-1.5 text-red-500 hover:bg-red-500/10"
                                    aria-label="Remove file"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {files.length > 0 && (
                <Button onClick={merge} disabled={loading || files.length < 2} size="lg">
                    {loading
                        ? "⏳ Merging..."
                        : `📄 Merge ${files.length} PDF${files.length > 1 ? "s" : ""}`}
                </Button>
            )}

            {successMessage && <ToolSuccessMessage message="PDFs merged successfully!" />}

            {merged && (
                <div className="space-y-4 rounded-lg border border-border bg-muted/10 p-6">
                    <ToolFileInfo
                        fileType="PDF"
                        originalSize="Multiple files"
                        compressedSize={formatBytes(merged.size)}
                        dimensions={`${merged.pages} pages`}
                    />
                    <div className="flex justify-center">
                        <Button onClick={download} variant="outline" size="lg">
                            ⬇ Download Merged PDF
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

