interface ResultItem {
    label: string;
    value: string | number;
    highlight?: boolean;
}

interface ResultCardProps {
    items: ResultItem[];
    columns?: number;
}

export default function ResultCard({ items, columns = 3 }: ResultCardProps) {
    return (
        <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${Math.min(columns, items.length)}, 1fr)` }}
        >
            {items.map((item) => (
                <div
                    key={item.label}
                    className={`rounded-lg border ${item.highlight ? "border-primary/30 bg-primary/5" : "border-border bg-muted/10"
                        } p-4 text-center`}
                >
                    <p
                        className={`text-2xl font-bold ${item.highlight ? "text-primary" : "text-foreground"
                            }`}
                    >
                        {item.value}
                    </p>
                    <p className="mt-1 text-xs text-muted">{item.label}</p>
                </div>
            ))}
        </div>
    );
}

