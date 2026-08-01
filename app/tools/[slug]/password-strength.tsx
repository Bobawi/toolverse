"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/Input";

export default function PasswordStrength() {
    const [password, setPassword] = useState("");

    const getStrength = (pw: string) => {
        let score = 0;
        if (pw.length >= 8) score += 1;
        if (pw.length >= 12) score += 1;
        if (pw.length >= 16) score += 1;
        if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score += 1;
        if (/\d/.test(pw)) score += 1;
        if (/[^a-zA-Z0-9]/.test(pw)) score += 1;
        return score;
    };

    const getLabel = (score: number) => {
        if (score <= 1) return { label: "Very Weak", color: "bg-red-500", text: "text-red-500" };
        if (score === 2) return { label: "Weak", color: "bg-orange-500", text: "text-orange-500" };
        if (score === 3) return { label: "Fair", color: "bg-amber-500", text: "text-amber-500" };
        if (score === 4) return { label: "Strong", color: "bg-emerald-500", text: "text-emerald-500" };
        return { label: "Very Strong", color: "bg-primary", text: "text-primary" };
    };

    const score = getStrength(password);
    const { label, color, text } = getLabel(score);
    const percent = (score / 6) * 100;

    const checks = [
        { label: "At least 8 characters", pass: password.length >= 8 },
        { label: "At least 12 characters", pass: password.length >= 12 },
        { label: "At least 16 characters", pass: password.length >= 16 },
        { label: "Uppercase + lowercase", pass: /[a-z]/.test(password) && /[A-Z]/.test(password) },
        { label: "Contains numbers", pass: /\d/.test(password) },
        { label: "Contains symbols", pass: /[^a-zA-Z0-9]/.test(password) },
    ];

    return (
        <div className="space-y-6">
            <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                    Enter a password to check
                </label>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type your password..."
                    className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
                />
            </div>

            {password && (
                <>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-foreground">Strength: <span className={text}>{label}</span></span>
                            <span className="text-muted">{score}/6</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-muted/20">
                            <div
                                className={`h-full rounded-full transition-all ${color}`}
                                style={{ width: `${percent}%` }}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Checklist</p>
                        {checks.map((c) => (
                            <div key={c.label} className="flex items-center gap-2 text-sm">
                                <span className={c.pass ? "text-green-500" : "text-muted"}>
                                    {c.pass ? "✓" : "○"}
                                </span>
                                <span className={c.pass ? "text-foreground" : "text-muted"}>
                                    {c.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {!password && (
                <p className="text-sm text-muted">Start typing to see the password strength analysis.</p>
            )}
        </div>
    );
}
