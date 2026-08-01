import { Category } from "@/types";

export const categories: Category[] = [
    {
        slug: "image",
        name: "Image",
        icon: "🖼",
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
    },
    {
        slug: "pdf",
        name: "PDF",
        icon: "📄",
        color: "text-red-500",
        bgColor: "bg-red-500/10",
    },
    {
        slug: "developer",
        name: "Developer",
        icon: "💻",
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
    },
    {
        slug: "calculators",
        name: "Calculators",
        icon: "🧮",
        color: "text-amber-500",
        bgColor: "bg-amber-500/10",
    },
    {
        slug: "ai",
        name: "AI",
        icon: "🤖",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
    },
    {
        slug: "text",
        name: "Text",
        icon: "📝",
        color: "text-cyan-500",
        bgColor: "bg-cyan-500/10",
    },
    {
        slug: "security",
        name: "Security",
        icon: "🔒",
        color: "text-rose-500",
        bgColor: "bg-rose-500/10",
    },
    {
        slug: "converter",
        name: "Converter",
        icon: "🔄",
        color: "text-indigo-500",
        bgColor: "bg-indigo-500/10",
    },
];

export function getCategoryBySlug(slug: string): Category | undefined {
    return categories.find((cat) => cat.slug === slug);
}
