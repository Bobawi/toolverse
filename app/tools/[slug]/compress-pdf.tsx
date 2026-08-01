"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import Button from "@/components/ui/Button";
import ToolSuccessMessage from "@/components/tool-layout/ToolSuccessMessage";
import ToolFileInfo from "@/components/tool-layout/ToolFileInfo";

interface CompressResult {
    url: string;
    size: number;
    pages: number;
    name: string;
    originalSize: number;
}

export default function CompressPdf() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);
    const [level, setLevel] = useState<"low" | "medium" | "high">("medium");
    const [result, setResult] = useState<CompressResult | null>(null);

    const formatBytes = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const onFile = async (f: File) => {
        setError("");
        setResult(null);
        setFile(f);
        try {
            const bytes = await f.arrayBuffer();
            const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
            void pdf; // just validate
        } catch {
            setError("Invalid PDF file. Please choose a valid PDF.");
            setFile(null);
        }
    };

    const compress = async () => {
        if (!file) return;
        setError("");
        setLoading(true);
        setSuccessMessage(false);

        try {
            const bytes = await file.arrayBuffer();
            const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });

            // Compression via object streams re-save
            const compressedBytes = await pdf.save({
                useObjectStreams: level !== "low",
                addDefaultPage: false,
            });

            const blob = new Blob([new Uint8Array(compressedBytes) as BlobPart], {
                type: "application/pdf",
            });
            const url = URL.createObjectURL(blob);

            const savedRatio = compressedBytes.length / bytes.byteLength;
            // If the result is somehow bigger, fallback to "low" (no object streams)
            const finalBytes =
                compressedBytes.length < bytes.byteLength
                    ? compressedBytes
                    : await pdf.save({
                          useObjectStreams: false,
                          addDefaultPage: false,
                      });

            const finalBlob = new Blob([new Uint8Array(finalBytes) as BlobPart], {
                type: "application/pdf",
            });
            const finalUrl = URL.createObjectURL(finalBlob);

            const name = file.name.replace(/\.pdf$/i, "") + "-compressed.pdf";

            setResult({
                url: finalUrl,
                size: finalBytes.length,
                pages: pdf.getPageCount(),
                name,
                originalSize: file.size,
            });
            setSuccessMessage(true);
            setTimeout(() => setSuccessMessage(false), 3000);
            void savedRatio;
            void url;
        } catch (err) {
            console.error(err);
            setError("Failed to compress the PDF.");
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

    const inputClass =
        "w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none";

    return (
        <div className="space-y-6">
            {!file ? (
                <div
                    onClick={() => document.getElementById("pdf-compress-input")?.click()}
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
                        id="pdf-compress-input"
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
                            <p className="text-xs text-muted">{formatBytes(file.size)}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => { setFile(null); setResult(null); }}>
                            Change
                        </Button>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Compression level
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: "😊 Low", value: "low" },
                                { label: "⚡ Medium", value: "medium" },
                                { label: "🔥 High", value: "high" },
                            ].map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setLevel(opt.value as typeof level)}
                                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${level === opt.value
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-border text-muted hover:text-foreground"
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button onClick={compress} disabled={loading} size="lg">
                        {loading ? "⏳ Compressing..." : "🗜️ Compress PDF"}
                    </Button>

                    {error && <p className="text-sm text-red-500">{error}</p>}
                    {successMessage && <ToolSuccessMessage message="PDF compressed successfully!" />}

                    {result && (
                        <div className="space-y-4 rounded-lg border border-border bg-muted/10 p-6">
                            <ToolFileInfo
                                fileType="PDF"
                                originalSize={formatBytes(result.originalSize)}
                                compressedSize={formatBytes(result.size)}
                                dimensions={`${result.pages} pages`}
                            />
                            {result.size < result.originalSize && (
                                <p className="text-center text-sm font-semibold text-green-600">
                                    Saved {formatBytes(result.originalSize - result.size)} (
                                    {Math.round((1 - result.size / result.originalSize) * 100)}%
                                    smaller!)
                                </p>
                            )}
                            <div className="flex justify-center">
                                <Button onClick={download} variant="outline" size="lg">
                                    ⬇ Download Compressed PDF
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

