import { Button } from "@/components/ui/button";

interface BookCardProps {
  title: string;
  author: string;
  description?: string;
  onClick?: () => void;
}

export default function BookCard({
  title,
  author,
  description,
  onClick,
}: BookCardProps) {
  return (
    <div className="border rounded p-4 shadow bg-white">
      <h2 className="font-semibold text-lg">{title}</h2>
      <p className="text-sm text-gray-600 mb-2">by {author}</p>
      {description && <p className="mb-4 text-gray-700">{description}</p>}
      {onClick && (
        <Button variant="outline" size="sm" onClick={onClick}>
          View Details
        </Button>
      )}
    </div>
  );
}
