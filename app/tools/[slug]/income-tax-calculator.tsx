"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import ResultCard from "@/components/ui/ResultCard";

// Moroccan General Tax Code (CGI) — Income Tax (IR) progressive annual scale.
// These are the 2024/2025 brackets (Article 73 of the CGI).
const IR_BRACKETS: { min: number; max: number; rate: number }[] = [
    { min: 0, max: 30000, rate: 0 },
    { min: 30000, max: 50000, rate: 10 },
    { min: 50000, max: 60000, rate: 20 },
    { min: 60000, max: 80000, rate: 30 },
    { min: 80000, max: 180000, rate: 34 },
    { min: 180000, max: 240000, rate: 38 },
    { min: 240000, max: 360000, rate: 40 },
    { min: 360000, max: 600000, rate: 42 },
    { min: 600000, max: Infinity, rate: 44 },
];

// Professional expenses deduction: 35% of gross, capped at 35,000 MAD/year.
const PROF_RATE = 0.35;
const PROF_CAP = 35000;

// Family deduction: 360 MAD/year per dependent (spouse + children).
const FAMILY_DEDUCTION_PER_DEP = 360;

function computeIR(annualGross: number, dependents: number) {
    // Step 1: apply professional expenses deduction (35%, capped).
    const profDeduction = Math.min(annualGross * PROF_RATE, PROF_CAP);
    const afterProf = Math.max(annualGross - profDeduction, 0);

    // Step 2: apply family deductions (360 MAD per dependent).
    const familyDeduction = dependents * FAMILY_DEDUCTION_PER_DEP;
    const netTaxable = Math.max(afterProf - familyDeduction, 0);

    // Step 3: apply progressive brackets.
    let tax = 0;
    for (let i = 0; i < IR_BRACKETS.length; i++) {
        const b = IR_BRACKETS[i];
        if (netTaxable > b.min) {
            const taxableInBracket = Math.min(netTaxable, b.max) - b.min;
            tax += taxableInBracket * (b.rate / 100);
        }
    }

    // Step 4: social solidarity contribution (CSS) 2% on income above 120,000 MAD (2024+).
    let css = 0;
    if (annualGross > 120000) {
        css = annualGross * 0.02;
    }

    const totalDeduction = tax + css;
    const annualNetSalary = annualGross - totalDeduction;

    return {
        annualGross,
        profDeduction,
        familyDeduction,
        netTaxable,
        tax,
        css,
        totalDeduction,
        annualNetSalary,
        monthlyNetSalary: annualNetSalary / 12,
        monthlyTax: totalDeduction / 12,
    };
}

const fmt = (val: number) =>
    new Intl.NumberFormat("fr-MA", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    }).format(val) + " DH";

export default function IncomeTaxCalculator() {
    const [salary, setSalary] = useState("8000");
    const [dependents, setDependents] = useState(0);
    const [result, setResult] = useState<ReturnType<typeof computeIR> | null>(null);

    const calculate = () => {
        const monthly = Number(salary) || 0;
        if (monthly <= 0) return;
        setResult(computeIR(monthly * 12, dependents));
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Net monthly salary (MAD)
                    </label>
                    <input
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder="8000"
                        min="0"
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Dependents (spouse + children)
                    </label>
                    <input
                        type="number"
                        value={dependents}
                        onChange={(e) => setDependents(Math.max(0, Number(e.target.value) || 0))}
                        placeholder="0"
                        min="0"
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                    />
                </div>
            </div>

            <Button onClick={calculate} size="lg">
                Calculate my IR
            </Button>

            {result && (
                <div className="space-y-4">
                    <ResultCard
                        items={[
                            {
                                label: "Monthly IR + CSS",
                                value: fmt(result.monthlyTax),
                                highlight: true,
                            },
                            {
                                label: "Net monthly salary",
                                value: fmt(result.monthlyNetSalary),
                            },
                            {
                                label: "Annual net salary",
                                value: fmt(result.annualNetSalary),
                            },
                        ]}
                        columns={3}
                    />

                    <div className="rounded-xl border border-border bg-muted/10 p-5 text-sm">
                        <h4 className="mb-3 font-semibold text-foreground">Breakdown (annual)</h4>
                        <div className="grid gap-3 sm:grid-cols-2 text-muted">
                            <div className="flex justify-between gap-2">
                                <span>Gross salary:</span>
                                <span className="font-medium text-foreground">{fmt(result.annualGross)}</span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span>Professional expenses (35%):</span>
                                <span className="font-medium text-foreground">-{fmt(result.profDeduction)}</span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span>Family deduction:</span>
                                <span className="font-medium text-foreground">-{fmt(result.familyDeduction)}</span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span>Net taxable income:</span>
                                <span className="font-medium text-foreground">{fmt(result.netTaxable)}</span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span>Income tax (IR):</span>
                                <span className="font-medium text-foreground">-{fmt(result.tax)}</span>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span>Social solidarity contribution:</span>
                                <span className="font-medium text-foreground">-{fmt(result.css)}</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-muted">
                        * Based on the Moroccan General Tax Code (CGI) 2024/2025 progressive IR scale and a 35% professional
                        expenses deduction (capped at 35,000 DH). This is an estimate for informational purposes only and
                        does not replace official tax advice.
                    </p>
                </div>
            )}
        </div>
    );
}
