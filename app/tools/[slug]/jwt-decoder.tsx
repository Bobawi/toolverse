"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";

export default function JwtDecoder() {
    const [input, setInput] = useState("");
    const [header, setHeader] = useState("");
    const [payload, setPayload] = useState("");
    const [error, setError] = useState("");

    const decode = () => {
        setError("");
        setHeader("");
        setPayload("");
        if (!input.trim()) { setError("Please enter a JWT token"); return; }

        const parts = input.trim().split(".");
        if (parts.length !== 3) {
            setError("Invalid JWT format. Expected: header.payload.signature");
            return;
        }

        try {
            const decodedHeader = JSON.parse(atob(parts[0]));
            const decodedPayload = JSON.parse(atob(parts[1]));
            setHeader(JSON.stringify(decodedHeader, null, 2));
            setPayload(JSON.stringify(decodedPayload, null, 2));
        } catch {
            setError("Failed to decode JWT. Make sure it's a valid Base64-encoded token.");
        }
    };

    const copyHeader = async () => { if (header) await navigator.clipboard.writeText(header); };
    const copyPayload = async () => { if (payload) await navigator.clipboard.writeText(payload); };

    return (
        <div className="space-y-6">
            <Textarea
                label="JWT Token"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0."
                rows={4}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={decode}>Decode JWT</Button>
            {error && <p className="text-sm text-red-500">{error}</p>}

            {header && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-foreground">Header</label>
                        <Button variant="ghost" size="sm" onClick={copyHeader}>Copy</Button>
                    </div>
                    <pre className="overflow-auto rounded-lg border border-border bg-muted/10 p-4 text-sm text-foreground font-mono">
                        <code>{header}</code>
                    </pre>
                </div>
            )}

            {payload && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-foreground">Payload</label>
                        <Button variant="ghost" size="sm" onClick={copyPayload}>Copy</Button>
                    </div>
                    <pre className="overflow-auto rounded-lg border border-border bg-muted/10 p-4 text-sm text-foreground font-mono">
                        <code>{payload}</code>
                    </pre>
                    <p className="text-xs text-muted">⚠️ Signature not verified. This tool only decodes Base64 data.</p>
                </div>
            )}
        </div>
    );
}
