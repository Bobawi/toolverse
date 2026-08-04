"use client";

import { useState } from "react";

export default function DiscountCalculator() {
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");

    const priceNum = parseFloat(price) || 0;
    const discountNum = parseFloat(discount) || 0;

    const discountAmount = priceNum * (discountNum / 100);
    const finalPrice = priceNum - discountAmount;

    return (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Original Price ($)
                    </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="100.00"
                        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Discount (%)
                    </label>
                    <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        placeholder="20"
                        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-border bg-background p-4">
                    <p className="text-xs text-muted">You Save</p>
                    <p className="mt-1 text-2xl font-bold text-emerald-500">
                        ${discountAmount.toFixed(2)}
                    </p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                    <p className="text-xs text-muted">Final Price</p>
                    <p className="mt-1 text-2xl font-bold text-primary">
                        ${finalPrice.toFixed(2)}
                    </p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                    <p className="text-xs text-muted">Savings</p>
                    <p className="mt-1 text-2xl font-bold text-primary">
                        {discountNum.toFixed(0)}%
                    </p>
                </div>
            </div>
        </div>
    );
}
