import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
      {items.map((item, idx) => (
        <span key={item.label} className="flex items-center">
          {item.href ? (
            <Link href={item.href} className="hover:text-blue-600 font-medium transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-blue-700 font-semibold">{item.label}</span>
          )}
          {idx < items.length - 1 && (
            <ChevronRight className="mx-2 w-4 h-4 text-gray-400" />
          )}
        </span>
      ))}
    </nav>
  );
} 