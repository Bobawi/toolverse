"use client";

import { useState } from "react";

const romanMap: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
];

export default function RomanNumeralConverter() {
    const [number, setNumber] = useState("");
    const [roman, setRoman] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState("");

    const toRoman = () => {
        const num = parseInt(number, 10);
        if (isNaN(num) || num < 1 || num > 3999) {
            setError("Enter a number between 1 and 3999.");
            return;
        }
        setError("");
        let n = num;
        let out = "";
        for (const [value, symbol] of romanMap) {
            while (n >= value) {
                out += symbol;
                n -= value;
            }
        }
        setRoman(out);
        setResult(`${num} = ${out}`);
    };

    const fromRoman = () => {
        const input = roman.trim().toUpperCase();
        if (!input) {
            setError("Please enter a Roman numeral.");
            return;
        }
        const valueMap: Record<string, number> = {
            I: 1,
            V: 5,
            X: 10,
            L: 50,
            C: 100,
            D: 500,
            M: 1000,
        };
        if (!/^[IVXLCDM]+$/.test(input)) {
            setError("Invalid Roman numeral characters.");
            return;
        }
        let total = 0;
        for (let i = 0; i < input.length; i++) {
            const cur = valueMap[input[i]];
            const next = valueMap[input[i + 1]] || 0;
            if (cur < next) {
                total -= cur;
            } else {
                total += cur;
            }
        }
        setError("");
        setNumber(String(total));
        setResult(`${input} = ${total}`);
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                    Number (1–3999)
                </label>
                <input
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="1999"
                    className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                />
            </div>

            <button
                onClick={toRoman}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
                Number → Roman
            </button>

            <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                    Roman Numeral
                </label>
                <input
                    type="text"
                    value={roman}
                    onChange={(e) => setRoman(e.target.value)}
                    placeholder="MCMXCIX"
                    className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                />
            </div>

            <button
                onClick={fromRoman}
                className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted/10"
            >
                Roman → Number
            </button>

            {error && <p className="text-sm text-red-500">{error}</p>}

            {result && (
                <div className="rounded-lg border border-border bg-background p-4 text-lg font-semibold text-primary">
                    {result}
                </div>
            )}
        </div>
    );
}
