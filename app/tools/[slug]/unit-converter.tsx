"use client";

import { useState } from "react";

const units: Record<string, { label: string; units: { name: string; toBase: (v: number) => number; fromBase: (v: number) => number }[] }> = {
    length: {
        label: "Length",
        units: [
            { name: "Meters", toBase: (v) => v, fromBase: (v) => v },
            { name: "Kilometers", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
            { name: "Centimeters", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
            { name: "Millimeters", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
            { name: "Miles", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
            { name: "Yards", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
            { name: "Feet", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
            { name: "Inches", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
        ],
    },
    weight: {
        label: "Weight",
        units: [
            { name: "Kilograms", toBase: (v) => v, fromBase: (v) => v },
            { name: "Grams", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
            { name: "Milligrams", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
            { name: "Pounds", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
            { name: "Ounces", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
        ],
    },
    temperature: {
        label: "Temperature",
        units: [
            { name: "Celsius", toBase: (v) => v, fromBase: (v) => v },
            { name: "Fahrenheit", toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
            { name: "Kelvin", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
        ],
    },
};

export default function UnitConverter() {
    const [category, setCategory] = useState("length");
    const [fromUnit, setFromUnit] = useState("Meters");
    const [toUnit, setToUnit] = useState("Feet");
    const [value, setValue] = useState("1");
    const [result, setResult] = useState("");

    const convert = () => {
        const cat = units[category];
        const from = cat.units.find((u) => u.name === fromUnit);
        const to = cat.units.find((u) => u.name === toUnit);
        if (!from || !to || !value) return;
        const base = from.toBase(Number(value));
        const converted = to.fromBase(base);
        setResult(converted.toFixed(6));
    };

    return (
        <div className="space-y-6">
            {/* Category */}
            <div className="flex flex-wrap gap-2">
                {Object.entries(units).map(([key, cat]) => (
                    <button
                        key={key}
                        onClick={() => {
                            setCategory(key);
                            setFromUnit(cat.units[0].name);
                            setToUnit(cat.units[1]?.name || cat.units[0].name);
                            setResult("");
                        }}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${category === key
                                ? "bg-primary text-white"
                                : "border border-border text-muted hover:text-foreground"
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Value</label>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">From</label>
                    <select
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                    >
                        {units[category].units.map((u) => (
                            <option key={u.name} value={u.name}>{u.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">To</label>
                    <select
                        value={toUnit}
                        onChange={(e) => setToUnit(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                    >
                        {units[category].units.map((u) => (
                            <option key={u.name} value={u.name}>{u.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                onClick={convert}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
                Convert
            </button>

            {result && (
                <div className="rounded-lg border border-border bg-muted/10 p-6 text-center">
                    <p className="text-sm text-muted">Result</p>
                    <p className="mt-1 text-3xl font-bold text-foreground">
                        {Number(value).toLocaleString()} {fromUnit} = {result} {toUnit}
                    </p>
                </div>
            )}
        </div>
    );
}

