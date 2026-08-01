"use client";

import { useState } from "react";

function generateUUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export default function UuidGenerator() {
    const [count, setCount] = useState(5);
    const [uuids, setUuids] = useState<string[]>([]);

    const generate = () => {
        const generated: string[] = [];
        for (let i = 0; i < count; i++) {
            generated.push(generateUUID());
        }
        setUuids(generated);
    };

    const copyAll = async () => {
        await navigator.clipboard.writeText(uuids.join("\n"));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Number of UUIDs
                    </label>
                    <input
                        type="number"
                        min={1}
                        max={100}
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                    />
                </div>
                <button
                    onClick={generate}
                    className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                >
                    Generate UUIDs
                </button>
            </div>

            {uuids.length > 0 && (
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-muted">{uuids.length} UUID{uuids.length > 1 ? "s" : ""}</span>
                        <button
                            onClick={copyAll}
                            className="text-xs text-muted hover:text-foreground"
                        >
                            Copy all
                        </button>
                    </div>
                    <div className="space-y-2">
                        {uuids.map((uuid, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between rounded-lg border border-border bg-muted/10 px-4 py-2.5"
                            >
                                <code className="text-sm text-foreground font-mono">{uuid}</code>
                                <button
                                    onClick={async () => {
                                        await navigator.clipboard.writeText(uuid);
                                    }}
                                    className="text-xs text-muted hover:text-foreground"
                                >
                                    Copy
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

