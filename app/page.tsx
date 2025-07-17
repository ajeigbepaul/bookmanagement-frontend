"use client";
import { useEffect } from "react";
import { useBookStore } from "@/store/useBookStore";
import { useQuery } from "@tanstack/react-query";
import BookCard from "@/components/BookCard";
import Loader from "@/components/Loader";

const fetchBooks = async (
  search: string,
  genre: string,
  page: number,
  limit: number
) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (genre) params.append("genre", genre);
  params.append("page", String(page));
  params.append("limit", String(limit));
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/books?${params.toString()}`
  );
  return res.json();
};

export default function HomePage() {
  const { filter, setFilter } = useBookStore();
  const { data, isLoading } = useQuery({
    queryKey: ["books", filter],
    queryFn: () =>
      fetchBooks(filter.search, filter.genre, filter.page, filter.limit),
  });

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Books Inventory</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border rounded px-2 py-1"
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
        <div className="space-y-4">
          {data?.data?.length === 0 && <p>No books found.</p>}
          {data?.data?.map((book: any) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              description={book.description}
              onClick={() => (window.location.href = `/books/${book.id}`)}
            />
          ))}
        </div>
      )}
      {/* Pagination controls */}
      <div className="flex gap-2 mt-6">
        <button
          className="px-3 py-1 border rounded"
          disabled={filter.page <= 1}
          onClick={() => setFilter({ page: filter.page - 1 })}
        >
          Prev
        </button>
        <span>Page {filter.page}</span>
        <button
          className="px-3 py-1 border rounded"
          disabled={data && data.data.length < filter.limit}
          onClick={() => setFilter({ page: filter.page + 1 })}
        >
          Next
        </button>
      </div>
    </div>
  );
}
