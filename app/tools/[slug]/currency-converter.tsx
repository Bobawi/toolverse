"use client";

import { useState, useCallback } from "react";

// Static reference rates based on MAD (Moroccan Dirham) as base.
// 1 MAD = X foreign currency. Rates are ± reference values (not live).
const ratesToMAD: Record<string, number> = {
    MAD: 1,
    USD: 0.1,
    EUR: 0.092,
    GBP: 0.079,
    JPY: 15.0,
    CAD: 0.136,
    AUD: 0.152,
    CHF: 0.088,
    CNY: 0.72,
    INR: 8.32,
    AED: 0.367,
    SAR: 0.375,
    EGP: 4.85,
};

const currencyNames: Record<string, string> = {
    MAD: "Moroccan Dirham",
    USD: "US Dollar",
    EUR: "Euro",
    GBP: "British Pound",
    JPY: "Japanese Yen",
    CAD: "Canadian Dollar",
    AUD: "Australian Dollar",
    CHF: "Swiss Franc",
    CNY: "Chinese Yuan",
    INR: "Indian Rupee",
    AED: "UAE Dirham",
    SAR: "Saudi Riyal",
    EGP: "Egyptian Pound",
};

export default function CurrencyConverter() {
    const [amount, setAmount] = useState("1");
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("MAD");
    const [rates, setRates] = useState(ratesToMAD);

    const num = parseFloat(amount) || 0;
    // rates = how much of each currency equals 1 MAD.
    // Step 1: convert `from` amount to MAD: amount / rates[from]
    // Step 2: convert MAD to `to`: madValue * rates[to]
    const inMAD = (num / (rates[from] || 1)) * rates.MAD;
    const result = inMAD * (rates[to] || 1);

    const format = useCallback((val: number, code: string) => {
        return val.toLocaleString("en-US", { maximumFractionDigits: 2 }) + " " + code;
    }, []);

    return (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Amount
                    </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="1"
                        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        From
                    </label>
                    <select
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                    >
                        {Object.keys(rates).map((c) => (
                            <option key={c} value={c}>
                                {c} — {currencyNames[c]}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        To
                    </label>
                    <select
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                    >
                        {Object.keys(rates).map((c) => (
                            <option key={c} value={c}>
                                {c} — {currencyNames[c]}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="rounded-lg border border-border bg-background p-5 text-center">
                <p className="text-3xl font-bold text-primary">
                    {format(num, from)} = {format(result, to)}
                </p>
                <p className="mt-1 text-xs text-muted">
                    Rates are reference values (≈ {format(rates[from], "MAD")} = 1 {from}) and may not be live market rates.
                </p>
            </div>
        </div>
    );
}
