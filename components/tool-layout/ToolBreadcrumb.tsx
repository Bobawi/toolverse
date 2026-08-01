import Link from "next/link";

interface ToolBreadcrumbProps {
    toolName: string;
}

export default function ToolBreadcrumb({ toolName }: ToolBreadcrumbProps) {
    return (
        <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-sm text-muted"
        >
            <Link href="/" className="hover:text-foreground">
                Home
            </Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-foreground">
                Tools
            </Link>
            <span>/</span>
            <span className="text-foreground" aria-current="page">
                {toolName}
            </span>
        </nav>
    );
}
