"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

const loremWords = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
    "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit",
    "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
    "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
    "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id",
    "est", "laborum",
];

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateParagraph(wordCount: number): string {
    const words: string[] = [];
    for (let i = 0; i < wordCount; i++) {
        words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }
    const sentence = words.join(" ") + ".";
    return capitalize(sentence);
}

export default function LoremIpsum() {
    const [paragraphs, setParagraphs] = useState(3);
    const [wordsPerParagraph, setWordsPerParagraph] = useState(20);
    const [output, setOutput] = useState("");

    const generate = () => {
        const result: string[] = [];
        for (let i = 0; i < paragraphs; i++) {
            result.push(generateParagraph(wordsPerParagraph));
        }
        setOutput(result.join("\n\n"));
    };

    const copy = async () => {
        if (output) await navigator.clipboard.writeText(output);
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Paragraphs
                    </label>
                    <input
                        type="number"
                        value={paragraphs}
                        onChange={(e) => setParagraphs(Math.max(1, Number(e.target.value)))}
                        min={1}
                        max={100}
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Words per paragraph
                    </label>
                    <input
                        type="number"
                        value={wordsPerParagraph}
                        onChange={(e) => setWordsPerParagraph(Math.max(5, Number(e.target.value)))}
                        min={5}
                        max={200}
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                    />
                </div>
            </div>

            <div className="flex gap-3">
                <Button onClick={generate}>Generate</Button>
                <Button variant="outline" onClick={() => setOutput("")}>
                    Clear
                </Button>
            </div>

            {output && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-foreground">Generated Text</label>
                        <Button variant="ghost" size="sm" onClick={copy}>
                            📋 Copy
                        </Button>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/10 p-4">
                        {output.split("\n\n").map((p, i) => (
                            <p key={i} className="mb-4 last:mb-0 text-sm text-foreground text-justify">
                                {p}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

