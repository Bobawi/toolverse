"use client";

import { useState } from "react";

type Unit = "celsius" | "fahrenheit" | "kelvin";

export default function TemperatureConverter() {
    const [value, setValue] = useState("");
    const [from, setFrom] = useState<Unit>("celsius");
    const [to, setTo] = useState<Unit>("fahrenheit");

    const convert = (v: number, fromUnit: Unit, toUnit: Unit): number => {
        let celsius: number;
        if (fromUnit === "celsius") celsius = v;
        else if (fromUnit === "fahrenheit") celsius = (v - 32) * (5 / 9);
        else celsius = v - 273.15;

        if (toUnit === "celsius") return celsius;
        if (toUnit === "fahrenheit") return celsius * (9 / 5) + 32;
        return celsius + 273.15;
    };

    const num = parseFloat(value);
    const result = !isNaN(num) ? convert(num, from, to) : null;

    const labels: Record<Unit, string> = {
        celsius: "°C",
        fahrenheit: "°F",
        kelvin: "K",
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                    Temperature Value
                </label>
                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="100"
                    className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        From
                    </label>
                    <select
                        value={from}
                        onChange={(e) => setFrom(e.target.value as Unit)}
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                    >
                        <option value="celsius">Celsius</option>
                        <option value="fahrenheit">Fahrenheit</option>
                        <option value="kelvin">Kelvin</option>
                    </select>
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        To
                    </label>
                    <select
                        value={to}
                        onChange={(e) => setTo(e.target.value as Unit)}
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                    >
                        <option value="celsius">Celsius</option>
                        <option value="fahrenheit">Fahrenheit</option>
                        <option value="kelvin">Kelvin</option>
                    </select>
                </div>
            </div>

            {result !== null && (
                <div className="rounded-lg border border-border bg-background p-4">
                    <p className="text-3xl font-bold text-primary">
                        {result.toFixed(2)} {labels[to]}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                        {num} {labels[from]} = {result.toFixed(2)} {labels[to]}
                    </p>
                </div>
            )}
        </div>
    );
}
