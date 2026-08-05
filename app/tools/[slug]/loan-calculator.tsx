"use client";

import { useState } from "react";

export default function LoanCalculator() {
    const [amount, setAmount] = useState("500000");
    const [rate, setRate] = useState("5");
    const [years, setYears] = useState("5");
    const [result, setResult] = useState<{
        monthly: number;
        total: number;
        interest: number;
    } | null>(null);

    const calculate = () => {
        const P = Number(amount);
        const r = Number(rate) / 100 / 12;
        const n = Number(years) * 12;

        if (!P || !r || !n) return;

        const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const total = monthly * n;
        const interest = total - P;

        setResult({
            monthly: Math.round(monthly * 100) / 100,
            total: Math.round(total * 100) / 100,
            interest: Math.round(interest * 100) / 100,
        });
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Loan Amount (MAD)
                    </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Interest Rate (%)
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Loan Term (years)
                    </label>
                    <input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                </div>
            </div>

            <button
                onClick={calculate}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
                Calculate
            </button>

            {result && (
                <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg border border-border bg-muted/10 p-4 text-center">
                        <p className="text-2xl font-bold text-primary">
                            {result.monthly.toLocaleString()} <span className="text-sm font-medium text-muted">MAD</span>
                        </p>
                        <p className="mt-1 text-xs text-muted">Monthly Payment</p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/10 p-4 text-center">
                        <p className="text-2xl font-bold text-foreground">
                            {result.total.toLocaleString()} <span className="text-sm font-medium text-muted">MAD</span>
                        </p>
                        <p className="mt-1 text-xs text-muted">Total Payment</p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/10 p-4 text-center">
                        <p className="text-2xl font-bold text-amber-500">
                            {result.interest.toLocaleString()} <span className="text-sm font-medium text-muted">MAD</span>
                        </p>
                        <p className="mt-1 text-xs text-muted">Total Interest</p>
                    </div>
                </div>
            )}
        </div>
    );
}

