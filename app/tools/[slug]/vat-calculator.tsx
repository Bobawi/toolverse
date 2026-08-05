"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import ResultCard from "@/components/ui/ResultCard";

export default function VatCalculator() {
    const [amount, setAmount] = useState("");
    const [rate, setRate] = useState(20);
    const [mode, setMode] = useState<"add" | "remove">("add");
    const [result, setResult] = useState<{
        net: number;
        vat: number;
        gross: number;
    } | null>(null);

    const calculate = () => {
        if (!amount || Number(amount) <= 0) return;
        const amt = Number(amount);
        const r = rate / 100;

        if (mode === "add") {
            const vat = amt * r;
            const gross = amt + vat;
            setResult({ net: amt, vat, gross });
        } else {
            const net = amt / (1 + r);
            const vat = amt - net;
            setResult({ net, vat, gross: amt });
        }
    };

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "MAD",
        }).format(val);

    // Morocco VAT (TVA) rates as set by the General Tax Code (CGI).
    // 20% is the standard rate; reduced rates apply to specific goods/services.
    const vatRates = [
        { value: 20, label: "20% (Standard TVA Morocco)" },
        { value: 14, label: "14% (TVA)" },
        { value: 10, label: "10% (TVA)" },
        { value: 7, label: "7% (TVA)" },
        { value: 0, label: "0% (Exempt)" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex gap-3">
                <Button
                    variant={mode === "add" ? "primary" : "outline"}
                    size="sm"
                    onClick={() => { setMode("add"); setResult(null); }}
                >
                    Add VAT
                </Button>
                <Button
                    variant={mode === "remove" ? "primary" : "outline"}
                    size="sm"
                    onClick={() => { setMode("remove"); setResult(null); }}
                >
                    Remove VAT
                </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        {mode === "add" ? "Net amount (excl. VAT)" : "Gross amount (incl. VAT)"}
                    </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">VAT Rate</label>
                    <select
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                    >
                        {vatRates.map((r) => (
                            <option key={r.value} value={r.value}>
                                {r.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <Button onClick={calculate} size="lg">
                Calculate
            </Button>

            {result && (
                <ResultCard
                    items={[
                        {
                            label: mode === "add" ? "Net Amount" : "Net (excl. VAT)",
                            value: formatCurrency(result.net),
                        },
                        { label: "VAT Amount", value: formatCurrency(result.vat), highlight: true },
                        {
                            label: mode === "add" ? "Gross (incl. VAT)" : "Gross Amount",
                            value: formatCurrency(result.gross),
                        },
                    ]}
                    columns={3}
                />
            )}
        </div>
    );
}

