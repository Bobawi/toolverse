"use client";

import { useState, useEffect, useRef } from "react";

export default function Stopwatch() {
    const [elapsed, setElapsed] = useState(0);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (running) {
            const start = Date.now() - elapsed;
            intervalRef.current = setInterval(() => {
                setElapsed(Date.now() - start);
            }, 10);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [running]);

    const format = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const centis = Math.floor((ms % 1000) / 10);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
            2,
            "0"
        )}.${String(centis).padStart(2, "0")}`;
    };

    return (
        <div className="space-y-6">
            <div className="rounded-lg border border-border bg-background p-8 text-center">
                <p className="font-mono text-5xl font-bold text-primary sm:text-6xl">
                    {format(elapsed)}
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
                <button
                    onClick={() => setRunning(!running)}
                    className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                >
                    {running ? "Pause" : "Start"}
                </button>
                <button
                    onClick={() => {
                        setRunning(false);
                        setElapsed(0);
                    }}
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted/10"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
