interface ToolHeaderProps {
  icon: string;
  name: string;
  description: string;
  bgColor: string;
}

export default function ToolHeader({ icon, name, description, bgColor }: ToolHeaderProps) {
  return (
    <div className="mb-8 flex items-start gap-4">
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl ${bgColor}`}
      >
        {icon}
      </div>
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          {name}
        </h1>
        <p className="mt-1 text-muted">{description}</p>
      </div>
    </div>
  );
}
