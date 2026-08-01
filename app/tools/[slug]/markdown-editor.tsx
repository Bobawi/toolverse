"use client";

import { useState, useMemo } from "react";

export default function MarkdownEditor() {
    const [markdown, setMarkdown] = useState("# Hello ToolVerse!\n\nStart typing markdown here...\n\n- **Bold**\n- *Italic*\n- `Code`\n- [Links](https://toolverse.app)");

    const html = useMemo(() => {
        const h = markdown
            // Headers
            .replace(/^### (.+)$/gm, "<h3>$1</h3>")
            .replace(/^## (.+)$/gm, "<h2>$1</h2>")
            .replace(/^# (.+)$/gm, "<h1>$1</h1>")
            // Bold & Italic
            .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.+?)\*/g, "<em>$1</em>")
            // Code blocks
            .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
            .replace(/`(.+?)`/g, "<code>$1</code>")
            // Links
            .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary underline">$1</a>')
            // Lists
            .replace(/^- (.+)$/gm, "<li>$1</li>")
            // Paragraphs
            .replace(/^(?!<[a-z])/gm, "")
            .split("\n\n")
            .map((block) => {
                if (block.startsWith("<")) return block;
                return `<p>${block}</p>`;
            })
            .join("\n")
            // Wrap lists
            .replace(/(<li>.*\n?)+/g, (match) => `<ul class="list-disc pl-6 space-y-1">${match}</ul>`);
        return h;
    }, [markdown]);

    return (
        <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                {/* Editor */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Markdown
                    </label>
                    <textarea
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        rows={16}
                        className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10 font-mono"
                    />
                </div>

                {/* Preview */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Preview
                    </label>
                    <div
                        className="h-full min-h-[400px] rounded-lg border border-border bg-background p-4 text-sm text-foreground prose prose-sm max-w-none overflow-auto"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </div>
            </div>
        </div>
    );
}

