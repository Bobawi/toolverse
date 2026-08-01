"use client";

import { useState } from "react";

export default function Base64Tool() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [error, setError] = useState("");

    const process = () => {
        if (!input.trim()) {
            setError("Please enter text");
            return;
        }
        setError("");
        try {
            if (mode === "encode") {
                setOutput(btoa(input));
            } else {
                setOutput(atob(input));
            }
        } catch {
            setError("Invalid Base64 string");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-3">
                <button
                    onClick={() => { setMode("encode"); setOutput(""); setError(""); }}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === "encode"
                            ? "bg-primary text-white"
                            : "border border-border text-muted hover:text-foreground"
                        }`}
                >
                    Encode
                </button>
                <button
                    onClick={() => { setMode("decode"); setOutput(""); setError(""); }}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${mode === "decode"
                            ? "bg-primary text-white"
                            : "border border-border text-muted hover:text-foreground"
                        }`}
                >
                    Decode
                </button>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                    {mode === "encode" ? "Text to encode" : "Base64 to decode"}
                </label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10 font-mono"
                />
            </div>

            <button
                onClick={process}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
                {mode === "encode" ? "Encode" : "Decode"}
            </button>

            {error && <p className="text-sm text-red-500">{error}</p>}

            {output && (
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Result
                    </label>
                    <pre className="overflow-auto rounded-lg border border-border bg-muted/10 p-4 text-sm text-foreground">
                        <code>{output}</code>
                    </pre>
                </div>
            )}
        </div>
    );
}

