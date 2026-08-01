interface ToolFileInfoProps {
    dimensions: string;
    fileType: string;
    originalSize: string;
    compressedSize?: string;
    timeTaken?: string;
}

export default function ToolFileInfo({
    dimensions,
    fileType,
    originalSize,
    compressedSize,
    timeTaken,
}: ToolFileInfoProps) {
    return (
        <div className="grid grid-cols-2 gap-3 rounded-lg border border-border bg-muted/10 p-4 sm:grid-cols-3">
            <div className="text-center">
                <p className="text-xs text-muted">Dimensions</p>
                <p className="text-sm font-medium text-foreground">{dimensions}</p>
            </div>
            <div className="text-center">
                <p className="text-xs text-muted">Type</p>
                <p className="text-sm font-medium text-foreground">{fileType}</p>
            </div>
            <div className="text-center">
                <p className="text-xs text-muted">Original Size</p>
                <p className="text-sm font-medium text-foreground">{originalSize}</p>
            </div>
            {compressedSize && (
                <div className="text-center">
                    <p className="text-xs text-muted">Compressed Size</p>
                    <p className="text-sm font-medium text-emerald-500">{compressedSize}</p>
                </div>
            )}
            {timeTaken && (
                <div className="text-center">
                    <p className="text-xs text-muted">Time</p>
                    <p className="text-sm font-medium text-foreground">{timeTaken}</p>
                </div>
            )}
        </div>
    );
}
