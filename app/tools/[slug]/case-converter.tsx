"use client";

import { useState } from "react";

export default function CaseConverter() {
    const [text, setText] = useState("");
    const [result, setResult] = useState("");

    const convert = (type: "upper" | "lower" | "title" | "camel" | "sentence") => {
        if (!text.trim()) return;
        switch (type) {
            case "upper":
                setResult(text.toUpperCase());
                break;
            case "lower":
                setResult(text.toLowerCase());
                break;
            case "title":
                setResult(
                    text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                );
                break;
            case "camel":
                setResult(
                    text
                        .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
                        .replace(/^[A-Z]/, (c) => c.toLowerCase())
                );
                break;
            case "sentence":
                setResult(
                    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
                );
                break;
        }
    };

    return (
        <div className="space-y-6">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to convert..."
                rows={4}
                className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
            />

            <div className="flex flex-wrap gap-3">
                {[
                    { label: "UPPERCASE", type: "upper" as const },
                    { label: "lowercase", type: "lower" as const },
                    { label: "Title Case", type: "title" as const },
                    { label: "camelCase", type: "camel" as const },
                    { label: "Sentence case", type: "sentence" as const },
                ].map(({ label, type }) => (
                    <button
                        key={type}
                        onClick={() => convert(type)}
                        className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/10"
                    >
                        {label}
                    </button>
                ))}
            </div>

            {result && (
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Result
                    </label>
                    <pre className="overflow-auto rounded-lg border border-border bg-muted/10 p-4 text-sm text-foreground">
                        <code>{result}</code>
                    </pre>
                </div>
            )}
        </div>
    );
}

