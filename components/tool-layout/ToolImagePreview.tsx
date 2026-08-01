"use client";

interface ToolImagePreviewProps {
    beforeUrl: string;
    afterUrl: string;
    beforeLabel?: string;
    afterLabel?: string;
    beforeSize?: string;
    afterSize?: string;
    savings?: string;
}

export default function ToolImagePreview({
    beforeUrl,
    afterUrl,
    beforeLabel = "Original",
    afterLabel = "Compressed",
    beforeSize,
    afterSize,
    savings,
}: ToolImagePreviewProps) {
    return (
        <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                {/* Before */}
                <div className="space-y-2">
                    <p className="text-center text-sm font-medium text-muted">{beforeLabel}</p>
                    <div className="overflow-hidden rounded-lg border border-border bg-muted/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={beforeUrl}
                            alt={beforeLabel}
                            className="h-48 w-full object-contain"
                        />
                    </div>
                    {beforeSize && (
                        <p className="text-center text-xs text-muted">{beforeSize}</p>
                    )}
                </div>

                {/* After */}
                <div className="space-y-2">
                    <p className="text-center text-sm font-medium text-emerald-500">{afterLabel}</p>
                    <div className="overflow-hidden rounded-lg border border-emerald-500/30 bg-emerald-500/5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={afterUrl}
                            alt={afterLabel}
                            className="h-48 w-full object-contain"
                        />
                    </div>
                    {afterSize && (
                        <p className="text-center text-xs text-muted">{afterSize}</p>
                    )}
                </div>
            </div>

            {savings && (
                <p className="text-center text-sm font-medium text-emerald-500">
                    {savings}
                </p>
            )}
        </div>
    );
}
