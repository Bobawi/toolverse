"use client";

import { useState, useEffect } from "react";

export default function TextToSpeech() {
    const [text, setText] = useState("");
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState("");
    const [speaking, setSpeaking] = useState(false);
    const [rate, setRate] = useState(1);
    const [pitch, setPitch] = useState(1);

    useEffect(() => {
        const loadVoices = () => {
            const v = speechSynthesis.getVoices();
            setVoices(v);
            if (v.length > 0) setSelectedVoice(v[0].name);
        };
        loadVoices();
        speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    const speak = () => {
        if (!text.trim()) return;
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const voice = voices.find((v) => v.name === selectedVoice);
        if (voice) utterance.voice = voice;
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.onstart = () => setSpeaking(true);
        utterance.onend = () => setSpeaking(false);
        speechSynthesis.speak(utterance);
    };

    const stop = () => {
        speechSynthesis.cancel();
        setSpeaking(false);
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                    Enter text
                </label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste text to convert to speech..."
                    rows={6}
                    className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10"
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        Voice
                    </label>
                    <select
                        value={selectedVoice}
                        onChange={(e) => setSelectedVoice(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                    >
                        {voices.map((v) => (
                            <option key={v.name} value={v.name}>
                                {v.name} ({v.lang})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Rate: {rate}x
                        </label>
                        <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={rate}
                            onChange={(e) => setRate(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">
                            Pitch: {pitch}
                        </label>
                        <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={pitch}
                            onChange={(e) => setPitch(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={speak}
                    className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                >
                    {speaking ? "Speaking..." : "🔊 Speak"}
                </button>
                {speaking && (
                    <button
                        onClick={stop}
                        className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted/10"
                    >
                        Stop
                    </button>
                )}
            </div>
        </div>
    );
}

