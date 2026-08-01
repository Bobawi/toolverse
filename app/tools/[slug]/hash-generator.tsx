"use client";

import { useState } from "react";

async function hashString(text: string, algorithm: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function HashGenerator() {
    const [text, setText] = useState("");
    const [results, setResults] = useState<Record<string, string>>({});

    const generate = async () => {
        if (!text.trim()) return;
        const algorithms = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
        const res: Record<string, string> = {};
        for (const algo of algorithms) {
            res[algo] = await hashString(text, algo);
        }
        setResults(res);
    };

    const copyHash = async (hash: string) => {
        await navigator.clipboard.writeText(hash);
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                    Enter text
                </label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Text to hash..."
                    rows={4}
                    className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                />
            </div>

            <button
                onClick={generate}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
                Generate Hashes
            </button>

            {Object.keys(results).length > 0 && (
                <div className="space-y-3">
                    {Object.entries(results).map(([algo, hash]) => (
                        <div
                            key={algo}
                            className="rounded-lg border border-border bg-muted/10 p-4"
                        >
                            <div className="mb-1 flex items-center justify-between">
                                <span className="text-xs font-medium text-muted">{algo}</span>
                                <button
                                    onClick={() => copyHash(hash)}
                                    className="text-xs text-muted hover:text-foreground"
                                >
                                    Copy
                                </button>
                            </div>
                            <p className="break-all font-mono text-xs text-foreground">
                                {hash}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

