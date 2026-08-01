interface ToolSuccessMessageProps {
    message: string;
}

export default function ToolSuccessMessage({ message }: ToolSuccessMessageProps) {
    return (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600">
            <span className="text-lg">✅</span>
            <span>{message}</span>
        </div>
    );
}
