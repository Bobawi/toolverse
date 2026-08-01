"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";

const AMP = "\x26amp;";
const LT = "\x26lt;";
const GT = "\x26gt;";
const QUOT = "\x26quot;";
const APOS = "\x26#039;";

export default function HtmlEncoder() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");

    const encodeHtml = (str: string) => {
        const map: Record<string, string> = {
            "\x26": AMP,
            "\x3C": LT,
            "\x3E": GT,
            "\x22": QUOT,
            "'": APOS,
        };
        return str.replace(/[&<>"']/g, (ch) => map[ch]);
    };

    const decodeHtml = (str: string) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = str;
        return txt.value;
    };

    const process = () => {
        if (!input.trim()) return;
        if (mode === "encode") {
            setOutput(encodeHtml(input));
        } else {
            setOutput(decodeHtml(input));
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
                label={mode === "encode" ? "HTML to encode" : "HTML entities to decode"}
                placeholder={
                    mode === "encode"
                        ? 'Example: <div class="box">Hello & welcome</div>'
                        : "Example: <div>Hello &amp; welcome</div>"
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
