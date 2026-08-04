"use client";

import { useState } from "react";

// Static reference rates (for demo/offline use). Users can edit the base rate.
const defaultRates: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.5,
    CAD: 1.36,
    AUD: 1.52,
    CHF: 0.88,
    CNY: 7.24,
    INR: 83.2,
    AED: 3.67,
    SAR: 3.75,
    EGP: 48.5,
    MAD: 10.0,
};

export default function CurrencyConverter() {
    const [amount, setAmount] = useState("1");
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("EUR");
    const [rates, setRates] = useState(defaultRates);

    const num = parseFloat(amount) || 0;
    const result = (num / rates[from]) * rates[to];

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
                                {c}
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
                                {c}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="rounded-lg border border-border bg-background p-5 text-center">
                <p className="text-3xl font-bold text-primary">
                    {num} {from} = {result.toFixed(2)} {to}
                </p>
                <p className="mt-1 text-xs text-muted">
                    Rates are reference values and may not be live market rates.
                </p>
            </div>
        </div>
    );
}
