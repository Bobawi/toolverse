"use client";

import { useState } from "react";

export default function JsonFormatter() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");

    const format = () => {
        if (!input.trim()) {
            setError("Please enter JSON");
            return;
        }
        setError("");
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, 2));
        } catch {
            setError("Invalid JSON. Please check your input.");
        }
    };

    const minify = () => {
        if (!input.trim()) {
            setError("Please enter JSON");
            return;
        }
        setError("");
        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
        } catch {
            setError("Invalid JSON. Please check your input.");
        }
    };

    const validate = () => {
        if (!input.trim()) {
            setError("Please enter JSON");
            return;
        }
        try {
            JSON.parse(input);
            setOutput("✅ Valid JSON");
            setError("");
        } catch {
            setError("❌ Invalid JSON");
            setOutput("");
        }
    };

    const copyOutput = async () => {
        if (output) await navigator.clipboard.writeText(output);
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                    Enter JSON
                </label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='{"name": "toolverse", "type": "tools"}'
                    rows={6}
                    className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10 font-mono"
                />
            </div>

            <div className="flex flex-wrap gap-3">
                <button
                    onClick={format}
                    className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                >
                    Format
                </button>
                <button
                    onClick={minify}
                    className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted/10"
                >
                    Minify
                </button>
                <button
                    onClick={validate}
                    className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted/10"
                >
                    Validate
                </button>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            {output && (
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <label className="text-sm font-medium text-foreground">
                            Output
                        </label>
                        <button
                            onClick={copyOutput}
                            className="text-xs text-muted hover:text-foreground"
                        >
                            Copy
                        </button>
                    </div>
                    <pre className="overflow-auto rounded-lg border border-border bg-muted/10 p-4 text-sm text-foreground">
                        <code>{output}</code>
                    </pre>
                </div>
            )}
        </div>
    );
}

