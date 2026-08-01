"use client";

import { useState } from "react";

export default function AgeCalculator() {
    const [birthDate, setBirthDate] = useState("");
    const [result, setResult] = useState<{
        years: number;
        months: number;
        days: number;
        hours: number;
        minutes: number;
        nextBirthday: number;
    } | null>(null);

    const calculate = () => {
        if (!birthDate) return;

        const birth = new Date(birthDate);
        const now = new Date();

        if (birth > now) {
            return;
        }

        let years = now.getFullYear() - birth.getFullYear();
        let months = now.getMonth() - birth.getMonth();
        let days = now.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        const msDiff = now.getTime() - birth.getTime();
        const hours = Math.floor(msDiff / (1000 * 60 * 60));
        const minutes = Math.floor(msDiff / (1000 * 60));

        // days until next birthday
        const nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBday < now) nextBday.setFullYear(nextBday.getFullYear() + 1);
        const nextBirthday = Math.ceil(
            (nextBday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );

        setResult({ years, months, days, hours, minutes, nextBirthday });
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                    Select your date of birth
                </label>
                <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                />
            </div>

            <button
                onClick={calculate}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
                Calculate Age
            </button>

            {result && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {[
                        { label: "Years", value: result.years },
                        { label: "Months", value: result.months },
                        { label: "Days", value: result.days },
                        { label: "Hours", value: result.hours.toLocaleString() },
                        { label: "Minutes", value: result.minutes.toLocaleString() },
                        { label: "Next Birthday", value: `${result.nextBirthday} days` },
                    ].map(({ label, value }) => (
                        <div
                            key={label}
                            className="rounded-lg border border-border bg-muted/10 p-4 text-center"
                        >
                            <p className="text-2xl font-bold text-foreground">{value}</p>
                            <p className="mt-1 text-xs text-muted">{label}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

