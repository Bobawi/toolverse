"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";

export default function UrlEncoder() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");

    const process = () => {
        if (!input.trim()) return;
        if (mode === "encode") {
            setOutput(encodeURIComponent(input));
        } else {
            try {
                setOutput(decodeURIComponent(input));
            } catch {
                setOutput("Invalid URL encoding");
            }
        }
    };

    const copy = async () => {
        if (output) await navigator.clipboard.writeText(output);
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-3">
                <Button
                    variant={mode === "encode" ? "primary" : "outline"}
                    size="sm"
                    onClick={() => { setMode("encode"); setOutput(""); }}
                >
                    Encode
                </Button>
                <Button
                    variant={mode === "decode" ? "primary" : "outline"}
                    size="sm"
                    onClick={() => { setMode("decode"); setOutput(""); }}
                >
                    Decode
                </Button>
            </div>

            <Textarea
                label={mode === "encode" ? "Text to URL-encode" : "URL-encoded string to decode"}
                placeholder={
                    mode === "encode"
                        ? "hello world & more"
                        : "hello%20world%20%26%20more"
                }
                rows={5}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <div className="flex gap-3">
                <Button onClick={process}>
                    {mode === "encode" ? "Encode" : "Decode"}
                </Button>
                <Button variant="outline" onClick={() => { setInput(""); setOutput(""); }}>
                    Clear
                </Button>
            </div>

            {output && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-foreground">Result</label>
                        <Button variant="ghost" size="sm" onClick={copy}>
                            Copy
                        </Button>
                    </div>
                    <pre className="overflow-auto rounded-lg border border-border bg-muted/10 p-4 text-sm text-foreground font-mono">
                        <code>{output}</code>
                    </pre>
                </div>
            )}
        </div>
    );
}
