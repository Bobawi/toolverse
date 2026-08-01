import Link from "next/link";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 transition-all hover:border-primary/30 hover:shadow-sm"
    >
      <span className="text-2xl">{category.icon}</span>
      <span className="text-xs font-medium text-foreground">{category.name}</span>
    </Link>
  );
}

