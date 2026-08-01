"use client";

import { useState, useCallback } from "react";

const AMBIGUOUS_CHARS = "O0Il1|";
const UPPERCASE_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_SET = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS_SET = "0123456789";
const SYMBOLS_SET = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const EASY_TO_READ_SYMBOLS = "!@#$%^&*()-_=+[]{}<>?";

export default function PasswordGenerator() {
    const [length, setLength] = useState(16);
    const [uppercase, setUppercase] = useState(true);
    const [lowercase, setLowercase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [symbols, setSymbols] = useState(false);
    const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
    const [easyToRead, setEasyToRead] = useState(false);
    const [passwords, setPasswords] = useState<string[]>([]);
    const [count, setCount] = useState(1);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const buildCharSet = useCallback(() => {
        let chars = "";
        if (uppercase) chars += UPPERCASE_SET;
        if (lowercase) chars += LOWERCASE_SET;
        if (numbers) chars += NUMBERS_SET;
        if (symbols) chars += easyToRead ? EASY_TO_READ_SYMBOLS : SYMBOLS_SET;

        if (excludeAmbiguous) {
            chars = chars
                .split("")
                .filter((c) => !AMBIGUOUS_CHARS.includes(c))
                .join("");
        }
        return chars;
    }, [uppercase, lowercase, numbers, symbols, excludeAmbiguous, easyToRead]);

    const generate = useCallback(() => {
        const chars = buildCharSet();
        if (!chars) {
            setPasswords(["Select at least one option"]);
            return;
        }

        const results: string[] = [];
        for (let p = 0; p < count; p++) {
            let result = "";
            const array = new Uint32Array(length);
            crypto.getRandomValues(array);
            for (let i = 0; i < length; i++) {
                result += chars[array[i] % chars.length];
            }
            results.push(result);
        }
        setPasswords(results);
        setCopiedIndex(null);
    }, [buildCharSet, count, length]);

    const copyToClipboard = async (text: string, index: number) => {
        await navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const copyAll = async () => {
        const valid = passwords.filter((p) => p !== "Select at least one option");
        if (valid.length === 0) return;
        await navigator.clipboard.writeText(valid.join("\n"));
        setCopiedIndex(-1);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const getEntropy = () => {
        const chars = buildCharSet();
        if (!chars) return 0;
        const poolSize = chars.length;
        return Math.round(length * Math.log2(poolSize));
    };

    const entropy = getEntropy();
    const strengthLabel =
        entropy < 40 ? "Weak" : entropy < 60 ? "Fair" : entropy < 80 ? "Strong" : "Excellent";
    const strengthColor =
        entropy < 40
            ? "bg-red-500"
            : entropy < 60
                ? "bg-amber-500"
                : entropy < 80
                    ? "bg-emerald-500"
                    : "bg-primary";
    const strengthPercent = Math.min(entropy, 128);

    const validPasswords = passwords.filter((p) => p !== "Select at least one option");
    const hasPasswords = validPasswords.length > 0;

    return (
        <div className="space-y-6">
            {/* Strength indicator */}
            {hasPasswords && (
                <div className="mb-4">
                    <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="text-muted">
                            Strength:{" "}
                            <span className="font-semibold text-foreground">
                                {strengthLabel}
                            </span>
                        </span>
                        <span className="text-muted">{entropy} bits entropy</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted/20">
                        <div
                            className={`h-full rounded-full transition-all ${strengthColor}`}
                            style={{ width: `${Math.min((strengthPercent / 128) * 100, 100)}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Generated passwords */}
            <div className="space-y-2">
                {passwords.length > 0 &&
                    passwords.map((pw, i) => (
                        <div key={i} className="flex gap-2">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={pw}
                                readOnly
                                placeholder="Click Generate to create passwords"
                                className="flex-1 rounded-lg border border-border bg-background p-3 font-mono text-sm text-foreground placeholder:text-muted focus:outline-none"
                            />
                            {pw !== "Select at least one option" && (
                                <button
                                    onClick={() => copyToClipboard(pw, i)}
                                    className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/10"
                                >
                                    {copiedIndex === i ? "✓ Copied" : "Copy"}
                                </button>
                            )}
                        </div>
                    ))}
            </div>

            {/* Action bar */}
            <div className="flex flex-wrap items-center gap-3">
                <button
                    onClick={generate}
                    className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                >
                    🔄 Generate {count > 1 ? `${count} Passwords` : "Password"}
                </button>

                {hasPasswords && (
                    <>
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/10"
                        >
                            {showPassword ? "🙈 Hide" : "👁 Show"}
                        </button>
                        <button
                            onClick={copyAll}
                            className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/10"
                        >
                            {copiedIndex === -1 ? "✓ Copied All" : "📋 Copy All"}
                        </button>
                    </>
                )}
            </div>

            {/* Options */}
            <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Length: {length} characters
                        </label>
                        <input
                            type="range"
                            min={4}
                            max={64}
                            value={length}
                            onChange={(e) => setLength(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Number of passwords: {count}
                        </label>
                        <input
                            type="range"
                            min={1}
                            max={10}
                            value={count}
                            onChange={(e) => setCount(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    {[
                        { label: "Uppercase (A-Z)", value: uppercase, set: setUppercase },
                        { label: "Lowercase (a-z)", value: lowercase, set: setLowercase },
                        { label: "Numbers (0-9)", value: numbers, set: setNumbers },
                        { label: "Symbols (!@#\$)", value: symbols, set: setSymbols },
                        {
                            label: "Exclude ambiguous (O,0,I,l,1,|)",
                            value: excludeAmbiguous,
                            set: setExcludeAmbiguous,
                        },
                        {
                            label: "Easy-to-read symbols only",
                            value: easyToRead,
                            set: setEasyToRead,
                        },
                    ].map(({ label, value, set }) => (
                        <label
                            key={label}
                            className="flex items-center gap-2 text-sm text-foreground"
                        >
                            <input
                                type="checkbox"
                                checked={value}
                                onChange={(e) => set(e.target.checked)}
                                className="rounded border-border text-primary focus:ring-primary/10"
                            />
                            {label}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}

