"use client";

import { useState, useEffect, useRef } from "react";

export default function CountdownTimer() {
    const [minutes, setMinutes] = useState("5");
    const [seconds, setSeconds] = useState("0");
    const [totalLeft, setTotalLeft] = useState(0);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (running) {
            intervalRef.current = setInterval(() => {
                setTotalLeft((prev) => {
                    if (prev <= 1) {
                        setRunning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [running]);

    const start = () => {
        const m = parseInt(minutes, 10) || 0;
        const s = parseInt(seconds, 10) || 0;
        setTotalLeft(m * 60 + s);
        setRunning(true);
    };

    const format = (total: number) => {
        const m = Math.floor(total / 60);
        const s = total % 60;
        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Minutes
                    </label>
                    <input
                        type="number"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                        min={0}
                        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Seconds
                    </label>
                    <input
                        type="number"
                        value={seconds}
                        onChange={(e) => setSeconds(e.target.value)}
                        min={0}
                        max={59}
                        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                </div>
            </div>

            <div className="rounded-lg border border-border bg-background p-8 text-center">
                <p className="font-mono text-5xl font-bold text-primary sm:text-6xl">
                    {format(totalLeft)}
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
                <button
                    onClick={start}
                    className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                >
                    Start
                </button>
                <button
                    onClick={() => setRunning(!running)}
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted/10"
                >
                    {running ? "Pause" : "Resume"}
                </button>
                <button
                    onClick={() => {
                        setRunning(false);
                        setTotalLeft(0);
                    }}
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted/10"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
