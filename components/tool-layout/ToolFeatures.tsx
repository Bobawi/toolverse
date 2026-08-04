interface ToolFeaturesProps {
    features: string[];
}

export default function ToolFeatures({ features }: ToolFeaturesProps) {
    if (!features || features.length === 0) return null;

    return (
        <section className="mt-10">
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                Features
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-3 rounded-xl border border-border bg-background p-4"
                    >
                        <svg
                            className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p className="text-sm text-muted leading-relaxed">
                            {feature}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

