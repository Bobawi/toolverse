"use client";

import { useState } from "react";

export default function TipCalculator() {
    const [bill, setBill] = useState("");
    const [tipPercent, setTipPercent] = useState("15");
    const [people, setPeople] = useState("1");

    const billNum = parseFloat(bill) || 0;
    const tipNum = parseFloat(tipPercent) || 0;
    const peopleNum = parseInt(people, 10) || 1;

    const tipAmount = billNum * (tipNum / 100);
    const total = billNum + tipAmount;
    const perPerson = peopleNum > 0 ? total / peopleNum : 0;

    return (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Bill Amount ($)
                    </label>
                    <input
                        type="number"
                        value={bill}
                        onChange={(e) => setBill(e.target.value)}
                        placeholder="0.00"
                        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Tip Percentage (%)
                    </label>
                    <input
                        type="number"
                        value={tipPercent}
                        onChange={(e) => setTipPercent(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Number of People
                    </label>
                    <input
                        type="number"
                        value={people}
                        onChange={(e) => setPeople(e.target.value)}
                        min={1}
                        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-border bg-background p-4">
                    <p className="text-xs text-muted">Tip Amount</p>
                    <p className="mt-1 text-2xl font-bold text-primary">
                        ${tipAmount.toFixed(2)}
                    </p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                    <p className="text-xs text-muted">Total Bill</p>
                    <p className="mt-1 text-2xl font-bold text-primary">
                        ${total.toFixed(2)}
                    </p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                    <p className="text-xs text-muted">Per Person</p>
                    <p className="mt-1 text-2xl font-bold text-primary">
                        ${perPerson.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
}
