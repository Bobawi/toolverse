import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative overflow-hidden border-b border-border">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                }}
            />

            <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
                <div className="mx-auto max-w-3xl text-center">
                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-medium text-muted backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Discover amazing tools
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        The Ultimate{" "}
                        <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                            Tool Directory
                        </span>{" "}
                        for Developers
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-6 text-lg text-muted sm:text-xl">
                        Curated collection of the best tools, libraries, and resources to
                        supercharge your development workflow.
                    </p>

                    {/* CTA */}
                    <div className="mt-10 flex items-center justify-center gap-4">
                        <Link
                            href="/tools"
                            className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary-dark hover:shadow-md"
                        >
                            Explore Tools
                        </Link>
                        <Link
                            href="#categories"
                            className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-all hover:bg-muted/10"
                        >
                            Browse Categories
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

