"use client";

import { Tool } from "@/types";
import { useLanguage } from "@/components/LanguageProvider";
import { localizeToolHowToUse } from "@/lib/localize";

interface ToolHowToUseProps {
    tool: Tool;
}

export default function ToolHowToUse({ tool }: ToolHowToUseProps) {
    const { t, locale } = useLanguage();
    const steps = localizeToolHowToUse(tool, locale);
    if (!steps || steps.length === 0) return null;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How to Use This Tool",
        step: steps.map((step) => ({
            "@type": "HowToStep",
            position: step.step,
            name: step.title,
            text: step.description,
        })),
    };

    return (
        <section className="mt-10">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                {t("tool.howToUse")}
            </h2>
            <div className="mt-6 space-y-6">
                {steps.map((step) => (
                    <div key={step.step} className="flex gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{step.step}</div>
                        <div>
                            <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                            <p className="mt-1 text-sm text-muted leading-relaxed">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
