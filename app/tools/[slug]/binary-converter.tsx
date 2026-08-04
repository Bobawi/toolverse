"use client";

import { useState } from "react";

export default function BinaryConverter() {
    const [binary, setBinary] = useState("");
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    const binaryToText = () => {
        const clean = binary.replace(/\s+/g, "");
        if (!clean) {
            setError("Please enter binary code.");
            return;
        }
        if (clean.length % 8 !== 0) {
            setError("Binary must be in groups of 8 bits (1 byte per character).");
            return;
        }
        if (!/^[01]+$/.test(clean)) {
            setError("Binary can only contain 0 and 1.");
            return;
        }
        setError("");
        let result = "";
        for (let i = 0; i < clean.length; i += 8) {
            const byte = clean.slice(i, i + 8);
            result += String.fromCharCode(parseInt(byte, 2));
        }
        setText(result);
    };

    const textToBinary = () => {
        if (!text) {
            setError("Please enter text.");
            return;
        }
        setError("");
        let result = "";
        for (let i = 0; i < text.length; i++) {
            result += text.charCodeAt(i).toString(2).padStart(8, "0") + " ";
        }
        setBinary(result.trim());
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                    Binary (0s and 1s)
                </label>
                <textarea
                    value={binary}
                    onChange={(e) => setBinary(e.target.value)}
                    placeholder="01001000 01100101 01101100 01101100 01101111"
                    rows={3}
                    className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                />
            </div>

            <div className="flex flex-wrap gap-3">
                <button
                    onClick={binaryToText}
                    className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                >
                    Binary → Text
                </button>
                <button
                    onClick={textToBinary}
                    className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted/10"
                >
                    Text → Binary
                </button>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                    Text
                </label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Hello"
                    rows={3}
                    className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                />
            </div>
        </div>
    );
}
