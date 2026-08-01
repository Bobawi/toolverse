"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import Button from "@/components/ui/Button";
import ToolSuccessMessage from "@/components/tool-layout/ToolSuccessMessage";
import ToolFileInfo from "@/components/tool-layout/ToolFileInfo";

interface SplitResult {
    url: string;
    size: number;
    pages: number;
    name: string;
}

export default function SplitPdf() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [mode, setMode] = useState<"ranges" | "every">("ranges");
    const [ranges, setRanges] = useState("");
    const [every, setEvery] = useState(1);
    const [results, setResults] = useState<SplitResult[]>([]);

    const formatBytes = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const onFile = async (f: File) => {
        setError("");
        setResults([]);
        setFile(f);
        try {
            const bytes = await f.arrayBuffer();
            const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
            setTotalPages(pdf.getPageCount());
        } catch {
            setError("Invalid PDF file. Please choose a valid PDF.");
            setFile(null);
        }
    };

    const parseRanges = (input: string): number[][] => {
        const result: number[][] = [];
        const parts = input.split(",");
        for (const part of parts) {
            const trimmed = part.trim();
            if (!trimmed) continue;
            if (trimmed.includes("-")) {
                const [a, b] = trimmed.split("-").map(Number);
                if (a && b && a <= b && a >= 1 && b <= totalPages) {
                    result.push([a, b]);
                }
            } else {
                const p = Number(trimmed);
                if (p && p >= 1 && p <= totalPages) result.push([p, p]);
            }
        }
        return result;
    };

    const split = async () => {
        if (!file) return;
        setError("");
        setLoading(true);
        setSuccessMessage(false);
        setResults([]);

        try {
            const bytes = await file.arrayBuffer();
            const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });

            let rangesToSplit: number[][] = [];
            if (mode === "ranges") {
                rangesToSplit = parseRanges(ranges);
                if (rangesToSplit.length === 0) {
                    setError("Please enter valid page ranges (e.g. 1-3, 5, 7-9).");
                    setLoading(false);
                    return;
                }
            } else {
                for (let p = 1; p <= totalPages; p += every) {
                    const end = Math.min(p + every - 1, totalPages);
                    rangesToSplit.push([p, end]);
                }
            }

            const outResults: SplitResult[] = [];
            const baseName = file.name.replace(/\.pdf$/i, "");

            for (let i = 0; i < rangesToSplit.length; i++) {
                const [start, end] = rangesToSplit[i];
                const newPdf = await PDFDocument.create();
                const pages = await newPdf.copyPages(
                    pdf,
                    Array.from({ length: end - start + 1 }, (_, j) => start - 1 + j)
                );
                pages.forEach((page) => newPdf.addPage(page));

                const bytesOut = await newPdf.save();
                const blob = new Blob([new Uint8Array(bytesOut) as BlobPart], {
                    type: "application/pdf",
                });
                const url = URL.createObjectURL(blob);
                outResults.push({
                    url,
                    size: bytesOut.length,
                    pages: end - start + 1,
                    name: `${baseName}-part${i + 1}-p${start}-${end}.pdf`,
                });
            }

            setResults(outResults);
            setSuccessMessage(true);
            setTimeout(() => setSuccessMessage(false), 3000);
        } catch (err) {
            console.error(err);
            setError("Failed to split the PDF.");
        } finally {
            setLoading(false);
        }
    };

    const downloadAll = () => {
        results.forEach((r) => {
            const link = document.createElement("a");
            link.href = r.url;
            link.download = r.name;
            link.click();
        });
    };

    const inputClass =
        "w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none";

    return (
        <div className="space-y-6">
            {!file ? (
                <div
                    onClick={() => document.getElementById("pdf-split-input")?.click()}
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
                        id="pdf-split-input"
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
                                {formatBytes(file.size)} • {totalPages} pages
                            </p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => { setFile(null); setResults([]); }}>
                            Change
                        </Button>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">Split mode</label>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setMode("ranges")}
                                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${mode === "ranges"
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-border text-muted hover:text-foreground"
                                    }`}
                            >
                                Page ranges
                            </button>
                            <button
                                onClick={() => setMode("every")}
                                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${mode === "every"
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-border text-muted hover:text-foreground"
                                    }`}
                            >
                                Every N pages
                            </button>
                        </div>
                    </div>

                    {mode === "ranges" ? (
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                Page ranges (e.g. 1-3, 5, 7-9)
                            </label>
                            <input
                                value={ranges}
                                onChange={(e) => setRanges(e.target.value)}
                                placeholder={`1-${Math.min(totalPages, 10)}`}
                                className={inputClass}
                            />
                            <p className="mt-1 text-xs text-muted">
                                PDF has {totalPages} pages. Separate ranges with commas.
                            </p>
                        </div>
                    ) : (
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">
                                Pages per split: {every}
                            </label>
                            <input
                                type="range"
                                min={1}
                                max={Math.max(totalPages, 1)}
                                value={every}
                                onChange={(e) => setEvery(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                            <p className="mt-1 text-xs text-muted">
                                Splits into chunks of {every} page{every > 1 ? "s" : ""}.
                            </p>
                        </div>
                    )}

                    <Button onClick={split} disabled={loading} size="lg">
                        {loading ? "⏳ Splitting..." : "✂️ Split PDF"}
                    </Button>

                    {error && <p className="text-sm text-red-500">{error}</p>}
                    {successMessage && (
                        <ToolSuccessMessage message={`PDF split into ${results.length} part${results.length > 1 ? "s" : ""}!`} />
                    )}

                    {results.length > 0 && (
                        <div className="space-y-4 rounded-lg border border-border bg-muted/10 p-6">
                            <ToolFileInfo
                                fileType="PDF"
                                originalSize={formatBytes(file.size)}
                                compressedSize={`${results.length} files`}
                                dimensions={`${totalPages} pages total`}
                            />
                            <div className="max-h-60 space-y-2 overflow-y-auto">
                                {results.map((r) => (
                                    <div
                                        key={r.name}
                                        className="flex items-center justify-between rounded-lg border border-border bg-background p-3"
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-foreground">{r.name}</p>
                                            <p className="text-xs text-muted">
                                                {r.pages} pages • {formatBytes(r.size)}
                                            </p>
                                        </div>
                                        <a
                                            href={r.url}
                                            download={r.name}
                                            className="ml-3 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted/10"
                                        >
                                            ⬇
                                        </a>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center">
                                <Button onClick={downloadAll} variant="outline" size="lg">
                                    ⬇ Download All ({results.length})
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

