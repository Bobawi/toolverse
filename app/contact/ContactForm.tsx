"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function ContactForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
        "idle"
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        // Simulate send (no backend yet — mailto fallback)
        setTimeout(() => {
            const subject = encodeURIComponent(
                `ToolVerse Contact: ${form.name || "New message"}`
            );
            const body = encodeURIComponent(
                `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
            );
            window.location.href = `mailto:contact@toolverse.app?subject=${subject}&body=${body}`;
            setStatus("sent");
        }, 800);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-foreground"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
                    />
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-foreground"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-foreground"
                >
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full rounded-lg border border-border bg-background p-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary/50 focus:outline-none"
                />
            </div>

            <Button type="submit" size="lg" disabled={status === "sending"}>
                {status === "sending"
                    ? "Sending..."
                    : status === "sent"
                        ? "✅ Message ready — check your email app!"
                        : "Send Message"}
            </Button>

            {status === "error" && (
                <p className="text-sm text-red-500">
                    Something went wrong. Please try again.
                </p>
            )}
        </form>
    );
}

