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
  fetchReviews,
  fetchAverageRating,
  createReview,
} from "@/services/api";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { UserPlus, UserCheck, MessageCircle, Star } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/toast";

export default function BookDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [comment, setComment] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

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

  // Fetch reviews
  const {
    data: reviews,
    isLoading: reviewsLoading,
    refetch: refetchReviews,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => fetchReviews(typeof id === "string" ? id : ""),
    enabled: typeof id === "string" && !!id,
  });
  // Fetch average rating
  const { data: averageRating } = useQuery({
    queryKey: ["averageRating", id],
    queryFn: () => fetchAverageRating(typeof id === "string" ? id : ""),
    enabled: typeof id === "string" && !!id,
  });
  // Add review mutation
  const reviewMutation = useMutation({
    mutationFn: (data: { content: string; rating: number }) =>
      createReview(typeof id === "string" ? id : "", data),
    onSuccess: () => {
      setReviewContent("");
      setReviewRating(5);
      refetchReviews();
      showToast({
        title: "Review posted!",
        description: "Your review was added.",
        variant: "success",
      });
    },
    onError: () =>
      showToast({
        title: "Error",
        description: "Failed to post review.",
        variant: "error",
      }),
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
      <div
        className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl shadow-lg flex flex-col"
        style={{ minHeight: 540 }}
      >
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Books", href: "/" },
            { label: book.title },
          ]}
        />
        {book.coverImageUrl && (
          <div className="w-full mb-4 flex-shrink-0 h-[50%] min-h-[160px] max-h-[320px] overflow-hidden">
            <img
              src={book.coverImageUrl}
              alt={book.title + " cover"}
              className="w-full h-full object-cover rounded-t-xl border shadow-sm bg-gray-100"
              style={{ maxHeight: "100%", minHeight: "100%" }}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        )}
        <h1 className="text-3xl font-extrabold mb-2 text-blue-700 drop-shadow-sm">
          {book.title}
        </h1>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg text-purple-700 font-semibold">
            by {book.author}
          </span>
          <span className="text-xs text-white ml-2">
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
                <UserPlus className="w-4 h-4 text-blue-100" />
              )}
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}
          <span className="text-xs text-blue-400 ml-2 font-medium">
            {followers?.length ?? 0} follower
            {followers?.length === 1 ? "" : "s"}
          </span>
        </div>
        <p className="mb-6 text-gray-700 text-base bg-gradient-to-r from-blue-100 via-white to-purple-100 rounded p-3 shadow-inner">
          {book.description}
        </p>
        {/* Divider or height gap before comments */}
        <div className="h-8" />
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
        <hr className="my-6 border-blue-200" />
        {/* Reviews Section */}
        <h2 className="text-xl font-bold mb-2 text-yellow-600 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" /> Reviews
        </h2>
        <div className="mb-2 flex items-center gap-2">
          <span className="text-lg font-semibold text-yellow-700">
            Average Rating:
          </span>
          <span className="flex items-center gap-1">
            {averageRating ? (
              <>
                {averageRating.toFixed(1)}
                <Star className="w-4 h-4 text-yellow-400 inline-block" />
              </>
            ) : (
              <span className="text-gray-400">No ratings yet</span>
            )}
          </span>
        </div>
        {reviewsLoading ? (
          <div className="text-yellow-400">Loading reviews...</div>
        ) : (
          <div className="space-y-2 mb-4">
            {(!reviews || reviews.length === 0) && (
              <div className="text-gray-400">No reviews yet.</div>
            )}
            {reviews?.map((r: any) => (
              <div key={r.id} className="border rounded p-2 bg-white/80">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-yellow-700 flex items-center gap-1">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 inline-block"
                      />
                    ))}
                  </span>
                  <span className="text-xs text-blue-600 font-semibold">
                    by {r.user?.username ?? "Unknown"}
                  </span>
                  <span className="text-xs text-gray-400 ml-2">
                    {r.createdAt
                      ? new Date(r.createdAt).toLocaleDateString()
                      : ""}
                  </span>
                </div>
                <p className="text-gray-800 font-medium">{r.content}</p>
              </div>
            ))}
          </div>
        )}
        {user && (
          <form
            className="flex flex-col gap-2 mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (reviewContent.trim())
                reviewMutation.mutate({
                  content: reviewContent,
                  rating: reviewRating,
                });
            }}
          >
            <label className="font-semibold text-yellow-700">Your Rating</label>
            <div className="flex gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  type="button"
                  key={i}
                  className={`focus:outline-none ${
                    i < reviewRating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setReviewRating(i + 1)}
                  aria-label={`Rate ${i + 1} star${i === 0 ? "" : "s"}`}
                >
                  <Star className="w-6 h-6" />
                </button>
              ))}
            </div>
            <textarea
              className="border-2 border-yellow-200 rounded px-2 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Write your review..."
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              disabled={reviewMutation.isPending}
              rows={3}
              required
            />
            <Button
              type="submit"
              disabled={reviewMutation.isPending || !reviewContent.trim()}
              className="bg-yellow-500 text-white hover:bg-yellow-600"
            >
              {reviewMutation.isPending ? "Posting..." : "Post Review"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
