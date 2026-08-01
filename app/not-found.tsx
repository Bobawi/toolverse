import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-md text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-5xl">
                    🔍
                </div>
                <h1 className="mt-6 text-6xl font-bold text-foreground">404</h1>
                <h2 className="mt-2 text-xl font-semibold text-foreground">
                    Page Not Found
                </h2>
                <p className="mt-3 text-muted">
                    Oops! The page you&apos;re looking for doesn&apos;t exist or has been
                    moved. Let&apos;s get you back on track.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href="/"
                        className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                    >
                        ← Back to Home
                    </Link>
                    <Link
                        href="/tools"
                        className="rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted/10"
                    >
                        Browse Tools
                    </Link>
                </div>
            </div>
        </div>
    );
}

