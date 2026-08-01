"use client";

import { useState } from "react";

export default function CharacterCounter() {
    const [text, setText] = useState("");

    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+\s*/).filter(Boolean).length : 0;
    const lines = text ? text.split("\n").length : 0;
    const charsNoSpaces = text.replace(/\s/g, "").length;

    return (
        <div className="space-y-6">
            <div>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text here..."
                    rows={8}
                    className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                {[
                    { label: "Characters", value: chars },
                    { label: "Words", value: words },
                    { label: "Sentences", value: sentences },
                    { label: "Lines", value: lines },
                    { label: "Chars (no spaces)", value: charsNoSpaces },
                ].map(({ label, value }) => (
                    <div
                        key={label}
                        className="rounded-lg border border-border bg-muted/10 p-4 text-center"
                    >
                        <p className="text-2xl font-bold text-foreground">{value}</p>
                        <p className="mt-1 text-xs text-muted">{label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

