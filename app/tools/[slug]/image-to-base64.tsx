"use client";

import { useState, useCallback } from "react";
import UploadArea from "@/components/ui/UploadArea";
import Button from "@/components/ui/Button";
import ToolSuccessMessage from "@/components/tool-layout/ToolSuccessMessage";

export default function ImageToBase64() {
    const [file, setFile] = useState<File | null>(null);
    const [base64, setBase64] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [withPrefix, setWithPrefix] = useState(true);
    const [successMessage, setSuccessMessage] = useState(false);

    const convert = useCallback(async () => {
        if (!file) return;
        setLoading(true);
        setSuccessMessage(false);

        try {
            const reader = new FileReader();
            reader.onload = () => {
                const dataUrl = reader.result as string;
                setBase64(withPrefix ? dataUrl : dataUrl.split(",")[1] || "");
                setSuccessMessage(true);
                setTimeout(() => setSuccessMessage(false), 3000);
            };
            reader.onerror = () => {
                console.error("Failed to read file");
            };
            reader.readAsDataURL(file);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [file, withPrefix]);

    const copyToClipboard = async () => {
        if (!base64) return;
        try {
            await navigator.clipboard.writeText(base64);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    const downloadTxt = () => {
        if (!base64) return;
        const blob = new Blob([base64], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = file ? file.name.replace(/\.[^.]+$/, "") + "-base64.txt" : "base64.txt";
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
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
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                setFile(null);
                                setBase64("");
                                setSuccessMessage(false);
                            }}
                        >
                            Change
                        </Button>
                    </div>

                    {/* Prefix toggle */}
                    <label className="flex items-center gap-2 rounded-lg border border-border p-3 text-sm text-foreground">
                        <input
                            type="checkbox"
                            checked={withPrefix}
                            onChange={(e) => {
                                setWithPrefix(e.target.checked);
                                // Re-convert if already have base64
                                if (base64) {
                                    const raw = file ? base64 : "";
                                    setBase64(e.target.checked ? raw : raw.split(",")[1] || "");
                                }
                            }}
                            className="accent-primary"
                        />
                        Include data URI prefix (e.g. data:image/png;base64,...)
                    </label>

                    <Button onClick={convert} disabled={loading} size="lg">
                        {loading ? "⏳ Converting..." : "🔄 Convert to Base64"}
                    </Button>

                    {successMessage && <ToolSuccessMessage message="Image converted to Base64 successfully!" />}

                    {base64 && (
                        <div className="space-y-4 rounded-lg border border-border bg-muted/10 p-6">
                            <div className="flex flex-wrap gap-2">
                                <Button onClick={copyToClipboard} variant="outline" size="sm">
                                    {copied ? "✓ Copied!" : "📋 Copy Base64"}
                                </Button>
                                <Button onClick={downloadTxt} variant="outline" size="sm">
                                    ⬇ Download .txt
                                </Button>
                            </div>

                            <textarea
                                readOnly
                                value={base64}
                                rows={8}
                                className="w-full rounded-lg border border-border bg-background p-3 font-mono text-xs text-foreground focus:outline-none"
                                placeholder="Base64 output will appear here..."
                            />

                            <div className="rounded-lg bg-background/50 p-3 text-xs text-muted">
                                <p>📊 Length: {base64.length.toLocaleString()} characters</p>
                                <p>📁 Original size: {formatBytes(file?.size || 0)}</p>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

