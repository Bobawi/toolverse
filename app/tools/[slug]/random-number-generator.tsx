"use client";

import { useState } from "react";

export default function RandomNumberGenerator() {
    const [min, setMin] = useState("1");
    const [max, setMax] = useState("100");
    const [count, setCount] = useState("1");
    const [results, setResults] = useState<number[]>([]);
    const [error, setError] = useState("");

    const generate = () => {
        const lo = parseInt(min, 10);
        const hi = parseInt(max, 10);
        const n = parseInt(count, 10) || 1;

        if (isNaN(lo) || isNaN(hi)) {
            setError("Please enter valid numbers.");
            return;
        }
        if (lo > hi) {
            setError("Minimum must be less than or equal to maximum.");
            return;
        }
        if (n < 1 || n > 1000) {
            setError("Quantity must be between 1 and 1000.");
            return;
        }

        setError("");
        const nums: number[] = [];
        for (let i = 0; i < n; i++) {
            nums.push(Math.floor(Math.random() * (hi - lo + 1)) + lo);
        }
        setResults(nums);
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Minimum
                    </label>
                    <input
                        type="number"
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Maximum
                    </label>
                    <input
                        type="number"
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Quantity
                    </label>
                    <input
                        type="number"
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                        min={1}
                        max={1000}
                        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                </div>
            </div>

            <button
                onClick={generate}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
                Generate Random Number
            </button>

            {error && <p className="text-sm text-red-500">{error}</p>}

            {results.length > 0 && (
                <div className="rounded-lg border border-border bg-background p-4">
                    <div className="flex flex-wrap gap-2">
                        {results.map((n, i) => (
                            <span
                                key={i}
                                className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary"
                            >
                                {n}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
