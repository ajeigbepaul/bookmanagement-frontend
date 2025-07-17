"use client";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchBook,
  fetchComments,
  postComment,
  fetchFollowers,
  followUser,
  unfollowUser,
} from "@/services/api";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { UserPlus, UserCheck, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/toast";

export default function BookDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [comment, setComment] = useState("");

  // Fetch book details
  const { data: book, isLoading: bookLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBook(typeof id === "string" ? id : ""),
    enabled: typeof id === "string" && !!id,
  });

  // Fetch comments
  const {
    data: commentsData,
    isLoading: commentsLoading,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => fetchComments(typeof id === "string" ? id : ""),
    enabled: typeof id === "string" && !!id,
  });

  // Fetch followers (for user follow)
  const { data: followers, refetch: refetchFollowers } = useQuery({
    queryKey: ["followers", book?.createdBy?.id],
    queryFn: () =>
      book?.createdBy?.id ? fetchFollowers(book.createdBy.id) : [],
    enabled: !!book?.createdBy?.id,
  });

  // Check if current user is following the book's author
  const isFollowing = user && followers?.some((f: any) => f.id === user.id);
  const isOwnBook = user && book?.createdBy?.id === user.id;

  // Follow/unfollow mutations
  const followMutation = useMutation({
    mutationFn: () => followUser(book.createdBy.id),
    onSuccess: () => {
      refetchFollowers();
      showToast({
        title: "Followed!",
        description: `You are now following ${book.createdBy.username}.`,
        variant: "success",
      });
    },
    onError: () =>
      showToast({
        title: "Error",
        description: "Failed to follow user.",
        variant: "error",
      }),
  });
  const unfollowMutation = useMutation({
    mutationFn: () => unfollowUser(book.createdBy.id),
    onSuccess: () => {
      refetchFollowers();
      showToast({
        title: "Unfollowed",
        description: `You have unfollowed ${book.createdBy.username}.`,
        variant: "default",
      });
    },
    onError: () =>
      showToast({
        title: "Error",
        description: "Failed to unfollow user.",
        variant: "error",
      }),
  });

  // Add comment mutation
  const commentMutation = useMutation({
    mutationFn: (content: string) =>
      postComment(typeof id === "string" ? id : "", content),
    onSuccess: () => {
      setComment("");
      refetchComments();
      showToast({
        title: "Comment posted!",
        description: "Your comment was added.",
        variant: "success",
      });
    },
    onError: () =>
      showToast({
        title: "Error",
        description: "Failed to post comment.",
        variant: "error",
      }),
  });

  if (bookLoading)
    return (
      <div>
        <Navbar />
        <div className="max-w-2xl mx-auto p-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Books", href: "/" },
              { label: "Book Details" },
            ]}
          />
          Loading...
        </div>
      </div>
    );
  if (!book)
    return (
      <div>
        <Navbar />
        <div className="max-w-2xl mx-auto p-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Books", href: "/" },
              { label: "Book Details" },
            ]}
          />
          Book not found.
        </div>
      </div>
    );

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl shadow-lg">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Books", href: "/" },
            { label: book.title },
          ]}
        />
        <h1 className="text-3xl font-extrabold mb-2 text-blue-700 drop-shadow-sm">
          {book.title}
        </h1>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg text-purple-700 font-semibold">
            by {book.author}
          </span>
          <span className="text-xs text-gray-500 ml-2">
            Published:{" "}
            {book.createdAt
              ? new Date(book.createdAt).toLocaleDateString()
              : "N/A"}
          </span>
          {isOwnBook && (
            <span className="ml-2 px-2 py-0.5 text-xs rounded bg-blue-200 text-blue-900 font-bold border border-blue-300 shadow-sm">
              Your Book
            </span>
          )}
          {!isOwnBook && user && (
            <Button
              size="sm"
              variant={isFollowing ? "secondary" : "outline"}
              className="flex items-center gap-1 border-blue-400 text-blue-700 hover:bg-blue-100"
              onClick={() => {
                if (isFollowing) {
                  unfollowMutation.mutate();
                } else {
                  followMutation.mutate();
                }
              }}
              disabled={followMutation.isPending || unfollowMutation.isPending}
            >
              {isFollowing ? (
                <UserCheck className="w-4 h-4 text-green-600" />
              ) : (
                <UserPlus className="w-4 h-4 text-blue-600" />
              )}
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}
          <span className="text-xs text-blue-500 ml-2 font-medium">
            {followers?.length ?? 0} follower
            {followers?.length === 1 ? "" : "s"}
          </span>
        </div>
        <p className="mb-6 text-gray-700 text-base bg-gradient-to-r from-blue-100 via-white to-purple-100 rounded p-3 shadow-inner">
          {book.description}
        </p>
        <hr className="my-6 border-blue-200" />
        <h2 className="text-xl font-bold mb-2 text-purple-700 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-blue-400" /> Comments
        </h2>
        {commentsLoading ? (
          <div className="text-blue-400">Loading comments...</div>
        ) : (
          <div className="space-y-2 mb-4">
            {commentsData?.data?.length === 0 && (
              <div className="text-gray-400">No comments yet.</div>
            )}
            {commentsData?.data?.map((c: any) => (
              <div key={c.id} className="border rounded p-2 bg-white/80">
                <p className="text-gray-800 font-medium">{c.content}</p>
                <span className="text-xs text-blue-600 font-semibold">
                  by {c.user?.username ?? "Unknown"}
                </span>
              </div>
            ))}
          </div>
        )}
        {user && (
          <form
            className="flex gap-2 mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (comment.trim()) commentMutation.mutate(comment);
            }}
          >
            <input
              className="border-2 border-blue-200 rounded px-2 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={commentMutation.isPending}
            />
            <Button
              type="submit"
              disabled={commentMutation.isPending || !comment.trim()}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {commentMutation.isPending ? "Posting..." : "Post"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
