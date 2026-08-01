"use client";

import { useState } from "react";
import { FaqItem } from "@/types";

interface ToolFAQProps {
    faq: FaqItem[];
}

export default function ToolFAQ({ faq }: ToolFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    if (!faq || faq.length === 0) return null;

    // JSON-LD structured data for FAQ
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };

    return (
        <section className="mt-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                Frequently Asked Questions
            </h2>
            <div className="mt-6 space-y-3">
                {faq.map((item, index) => (
                    <div
                        key={index}
                        className="overflow-hidden rounded-xl border border-border"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-muted/5"
                        >
                            <span className="text-sm font-medium text-foreground">
                                {item.question}
                            </span>
                            <svg
                                className={`h-5 w-5 shrink-0 text-muted transition-transform ${
                                    openIndex === index ? "rotate-180" : ""
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                        {openIndex === index && (
                            <div className="border-t border-border px-5 py-4">
                                <p className="text-sm text-muted leading-relaxed">
                                    {item.answer}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
