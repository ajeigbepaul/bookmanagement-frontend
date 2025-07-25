"use client";
import { useEffect, useState } from "react";
import { useBookStore } from "@/store/useBookStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBooks, deleteBook } from "@/services/api";
import BookCard from "@/components/BookCard";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import Breadcrumb from "@/components/Breadcrumb";

export default function HomePage() {
  const { filter, setFilter } = useBookStore();
  const { user } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<number | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["books", filter],
    queryFn: () => fetchBooks(filter),
  });

  // Handler for deleting a book
  const handleDelete = async () => {
    if (!bookToDelete) return;
    try {
      await deleteBook(bookToDelete);
      showToast({
        title: "Book deleted",
        description: "The book was deleted successfully.",
        variant: "success",
      });
      setDeleteDialogOpen(false);
      setBookToDelete(null);
      queryClient.invalidateQueries({ queryKey: ["books"] });
    } catch (err) {
      showToast({
        title: "Error",
        description: "Failed to delete book.",
        variant: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
      {/* More visible edge gradient background */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0">
          <div className="absolute -top-32 -left-32 w-[60vw] h-[60vw] rounded-full bg-blue-200/20 blur-2xl" />
          <div className="absolute -bottom-32 -right-32 w-[60vw] h-[60vw] rounded-full bg-purple-200/20 blur-2xl" />
        </div>
      </div>
      {/* Header/Navbar */}
      <Navbar />
      <div className="max-w-4xl mx-auto p-8 relative z-10">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Books" }]}
        />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Books Inventory</h1>
          <div className="flex gap-2 items-center">
            {user && (
              <Button asChild>
                <Link href="/books/new">Create Book</Link>
              </Button>
            )}
          </div>
        </div>
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            className="border rounded px-2 py-1 flex-1"
            placeholder="Search by title or author"
            value={filter.search}
            onChange={(e) => setFilter({ search: e.target.value, page: 1 })}
          />
          <select
            className="border rounded px-2 py-1"
            value={filter.genre}
            onChange={(e) => setFilter({ genre: e.target.value, page: 1 })}
          >
            <option value="">All Genres</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-fiction</option>
          </select>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {data?.data?.length === 0 && <p>No books found.</p>}
            {data?.data?.map((book: any) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                description={book.description}
                createdAt={book.createdAt}
                onView={() => router.push(`/books/${book.id}`)}
                onDelete={
                  user
                    ? () => {
                        setBookToDelete(book.id);
                        setDeleteDialogOpen(true);
                      }
                    : undefined
                }
                isOwnBook={!!user && book.createdBy?.id === user.id}
                commentsCount={book.commentsCount}
                followersCount={book.followersCount}
                followingCount={book.followingCount}
                coverImageUrl={book.coverImageUrl}
              />
            ))}
          </div>
        )}
        {/* Pagination controls */}
        {data && data.total > filter.limit && (
          <div className="flex gap-2 mt-8 justify-center items-center">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={filter.page <= 1}
              onClick={() => setFilter({ page: filter.page - 1 })}
            >
              Prev
            </Button>
            {/* Page numbers */}
            {Array.from({
              length: Math.ceil(data.total / filter.limit),
            })
              .map((_, i) => i + 1)
              .filter(
                (pageNum) =>
                  pageNum === 1 ||
                  pageNum === Math.ceil(data.total / filter.limit) ||
                  Math.abs(pageNum - filter.page) <= 2
              )
              .map((pageNum, idx, arr) => [
                idx > 0 && pageNum - arr[idx - 1] > 1 ? (
                  <span key={`ellipsis-${pageNum}`}>...</span>
                ) : null,
                <Button
                  key={pageNum}
                  variant={pageNum === filter.page ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-full px-3 font-semibold ${
                    pageNum === filter.page
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "hover:bg-blue-100"
                  }`}
                  onClick={() => setFilter({ page: pageNum })}
                  disabled={pageNum === filter.page}
                >
                  {pageNum}
                </Button>,
              ])}
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              disabled={
                data && filter.page >= Math.ceil(data.total / filter.limit)
              }
              onClick={() => setFilter({ page: filter.page + 1 })}
            >
              Next
            </Button>
          </div>
        )}
      </div>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogTitle>Delete Book</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this book? This action cannot be
            undone.
          </DialogDescription>
          <div className="flex gap-2 justify-end mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
