"use client";

import { useState, useRef, DragEvent } from "react";

interface UploadAreaProps {
    onFile: (file: File) => void;
    accept?: string;
    maxSizeMB?: number;
    label?: string;
}

export default function UploadArea({
    onFile,
    accept = "image/*",
    maxSizeMB = 10,
    label = "Drop your file here or click to browse",
}: UploadAreaProps) {
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
        setError("");
        if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
            setError(`File too large. Max size: ${maxSizeMB}MB`);
            return;
        }
        onFile(file);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    return (
        <div>
            <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-all ${dragOver
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted hover:bg-muted/5"
                    }`}
            >
                <svg
                    className="mb-3 h-10 w-10 text-muted"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                </svg>
                <p className="text-sm text-muted">{label}</p>
                <p className="mt-1 text-xs text-muted">
                    Max {maxSizeMB}MB
                </p>
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    onChange={handleChange}
                    className="hidden"
                />
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}

