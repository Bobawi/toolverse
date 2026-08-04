"use client";

import { useState } from "react";

export default function Calculator() {
    const [display, setDisplay] = useState("0");
    const [prev, setPrev] = useState<number | null>(null);
    const [op, setOp] = useState<string | null>(null);
    const [waiting, setWaiting] = useState(false);

    const inputDigit = (digit: string) => {
        if (waiting) {
            setDisplay(digit);
            setWaiting(false);
        } else {
            setDisplay(display === "0" ? digit : display + digit);
        }
    };

    const inputDot = () => {
        if (waiting) {
            setDisplay("0.");
            setWaiting(false);
        } else if (!display.includes(".")) {
            setDisplay(display + ".");
        }
    };

    const clear = () => {
        setDisplay("0");
        setPrev(null);
        setOp(null);
        setWaiting(false);
    };

    const calculate = (a: number, b: number, operation: string): number => {
        switch (operation) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "×":
                return a * b;
            case "÷":
                return b === 0 ? NaN : a / b;
            default:
                return b;
        }
    };

    const chooseOp = (nextOp: string) => {
        const value = parseFloat(display);
        if (prev === null) {
            setPrev(value);
        } else if (op && !waiting) {
            const result = calculate(prev, value, op);
            setPrev(result);
            setDisplay(String(result));
        }
        setOp(nextOp);
        setWaiting(true);
    };

    const equals = () => {
        if (op === null || prev === null) return;
        const value = parseFloat(display);
        const result = calculate(prev, value, op);
        setDisplay(String(result));
        setPrev(null);
        setOp(null);
        setWaiting(false);
    };

    const buttons = [
        "C", "±", "%", "÷",
        "7", "8", "9", "×",
        "4", "5", "6", "-",
        "1", "2", "3", "+",
        "0", ".", "=",
    ];

    const handleClick = (b: string) => {
        if (b === "C") clear();
        else if (b === "±") setDisplay(String(-parseFloat(display)));
        else if (b === "%") setDisplay(String(parseFloat(display) / 100));
        else if (b === "÷" || b === "×" || b === "-" || b === "+") chooseOp(b);
        else if (b === "=") equals();
        else if (b === ".") inputDot();
        else inputDigit(b);
    };

    return (
        <div className="mx-auto max-w-xs space-y-4">
            <div className="rounded-lg border border-border bg-background p-4 text-right">
                <p className="text-3xl font-bold text-foreground break-all">
                    {display}
                </p>
            </div>
            <div className="grid grid-cols-4 gap-2">
                {buttons.map((b) => (
                    <button
                        key={b}
                        onClick={() => handleClick(b)}
                        className={`h-12 rounded-lg text-lg font-semibold transition-colors ${
                            b === "="
                                ? "bg-primary text-white hover:bg-primary-dark"
                                : b === "C" || b === "÷" || b === "×" || b === "-" || b === "+"
                                ? "bg-primary/10 text-primary hover:bg-primary/20"
                                : "border border-border bg-background text-foreground hover:bg-muted/10"
                        } ${b === "0" ? "col-span-2" : ""}`}
                    >
                        {b}
                    </button>
                ))}
            </div>
        </div>
    );
}
