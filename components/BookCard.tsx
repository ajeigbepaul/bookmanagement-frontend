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
}: BookCardProps) {
  return (
    <div
      className={`border rounded-xl shadow-md p-5 flex flex-col gap-2 transition hover:shadow-lg bg-gradient-to-br from-blue-50 via-white to-purple-50 ${
        isOwnBook ? "border-blue-500" : "border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="font-semibold text-lg flex items-center gap-2 text-blue-800">
            {title}
            {isOwnBook && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700 font-medium border border-blue-200">
                Your Book
              </span>
            )}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-purple-700 font-semibold">
              by {author}
            </span>
            {createdAt && (
              <span className="flex items-center gap-1 text-xs text-gray-500 ml-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                {new Date(createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onView && (
            <Button size="icon" variant="ghost" onClick={onView} title="View">
              <Eye className="w-5 h-5" />
            </Button>
          )}
          {onEdit && (
            <Button size="icon" variant="ghost" onClick={onEdit} title="Edit">
              <Pencil className="w-5 h-5" />
            </Button>
          )}
          {onDelete && (
            <Button
              size="icon"
              variant="ghost"
              onClick={onDelete}
              title="Delete"
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </Button>
          )}
        </div>
      </div>
      {description && (
        <p className="mb-2 text-gray-700 text-sm line-clamp-2">{description}</p>
      )}
      <div className="flex items-center gap-4 mt-2 text-xs text-blue-700 font-medium">
        <span className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4 text-blue-400" /> {commentsCount}{" "}
          Comments
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-4 h-4 text-purple-400" /> {followersCount}{" "}
          Followers
        </span>
        <span className="flex items-center gap-1">
          <UserPlus className="w-4 h-4 text-green-400" /> {followingCount}{" "}
          Following
        </span>
      </div>
    </div>
  );
}
