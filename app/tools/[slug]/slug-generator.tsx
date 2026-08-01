"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

export default function SlugGenerator() {
    const [input, setInput] = useState("");
    const [slug, setSlug] = useState("");

    const generate = () => {
        if (!input.trim()) return;
        const s = input
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_]+/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");
        setSlug(s);
    };

    const copy = async () => {
        if (slug) await navigator.clipboard.writeText(slug);
    };

    return (
        <div className="space-y-6">
            <Textarea
                label="Enter text to convert to a slug"
                placeholder="e.g. How to Create a Blog Post in 2024"
                rows={3}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <div className="flex gap-3">
                <Button onClick={generate}>Generate Slug</Button>
                <Button variant="outline" onClick={() => { setInput(""); setSlug(""); }}>
                    Clear
                </Button>
            </div>

            {slug && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-foreground">Slug</label>
                        <Button variant="ghost" size="sm" onClick={copy}>
                            📋 Copy
                        </Button>
                    </div>
                    <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                        <code className="text-sm text-foreground break-all">{slug}</code>
                    </div>
                    <div className="text-xs text-muted">
                        <p>🔗 URL preview: /{slug}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

