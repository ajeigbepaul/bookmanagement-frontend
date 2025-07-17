import { Button } from "@/components/ui/button";
import {
  Eye,
  Pencil,
  Trash2,
  MessageCircle,
  Users,
  UserPlus,
  Calendar,
} from "lucide-react";
import Link from "next/link";

interface BookCardProps {
  title: string;
  author: string;
  description?: string;
  createdAt?: string;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isOwnBook?: boolean;
  commentsCount?: number;
  followersCount?: number;
  followingCount?: number;
  coverImageUrl?: string;
  id: number;
}

export default function BookCard({
  title,
  author,
  description,
  createdAt,
  onView,
  onEdit,
  onDelete,
  isOwnBook = false,
  commentsCount = 0,
  followersCount = 0,
  followingCount = 0,
  coverImageUrl = "",
  id,
}: BookCardProps) {
  return (
    <div
      className={`flex flex-col justify-between border rounded-xl shadow-md bg-gradient-to-br from-blue-50 via-white to-purple-50 transition hover:shadow-lg ${
        isOwnBook ? "border-blue-500" : "border-gray-200"
      }`}
      style={{
        aspectRatio: "3/5",
        minHeight: 340,
        maxWidth: 260,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Absolute action icons (view, edit, delete) */}
      <div className="absolute top-2 right-2 flex flex-row items-center gap-1 z-10 bg-white/70 rounded-lg px-1 py-1 shadow-md">
        {onView && (
          <Button
            size="icon"
            variant="ghost"
            onClick={onView}
            title="View"
            className="hover:bg-blue-100"
          >
            <Eye className="w-5 h-5 text-blue-700" />
          </Button>
        )}
        {isOwnBook && (
          <>
            <Link href={`/books/${id}/edit`} passHref>
              <Button
                size="icon"
                variant="ghost"
                asChild
                title="Edit"
                className="hover:bg-blue-100"
              >
                <Pencil className="w-5 h-5" />
              </Button>
            </Link>
            {onDelete && (
              <Button
                size="icon"
                variant="ghost"
                onClick={onDelete}
                title="Delete"
                className="hover:bg-red-100"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </Button>
            )}
          </>
        )}
      </div>
      {/* Cover image: 80% of card height */}
      {coverImageUrl && (
        <div
          className="flex-1 flex items-center justify-center"
          style={{ minHeight: "0", height: "80%" }}
        >
          <img
            src={coverImageUrl}
            alt={title + " cover"}
            className="w-full h-full object-cover rounded-t-xl border-b shadow-sm bg-gray-100"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
      )}
      {/* Card content: 20% of card height */}
      <div className="flex flex-col justify-between p-3 h-[20%] min-h-[80px]">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-semibold text-base flex-1 truncate text-blue-800">
            {title}
          </h2>
          {isOwnBook && (
            <span className="ml-2 px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700 font-medium border border-blue-200">
              Your Book
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-purple-700 font-semibold mb-1">
          <span className="truncate">by {author}</span>
          {createdAt && (
            <span className="flex items-center gap-1 text-xs text-gray-500 ml-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              {new Date(createdAt).toLocaleDateString()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1 mb-2 text-xs text-blue-700 font-medium">
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4 text-blue-400" /> {commentsCount}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4 text-purple-400" /> {followersCount}
          </span>
          <span className="flex items-center gap-1">
            <UserPlus className="w-4 h-4 text-green-400" /> {followingCount}
          </span>
        </div>
        <div className="flex items-center gap-2 justify-end mt-auto"></div>
      </div>
    </div>
  );
}
