"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchBook, updateBook } from "@/services/api";
import BookForm, { BookFormValues } from "@/components/BookForm";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import { useToast } from "@/components/ui/toast";

export default function EditBookPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();

  const { data: book, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBook(typeof id === "string" ? id : ""),
    enabled: typeof id === "string" && !!id,
  });

  const mutation = useMutation({
    mutationFn: (values: BookFormValues) => updateBook(id as string, values),
    onSuccess: () => {
      showToast({
        title: "Book updated",
        description: "The book was updated successfully.",
        variant: "success",
      });
      router.push(`/books/${id}`);
    },
    onError: () => {
      showToast({
        title: "Error",
        description: "Failed to update book.",
        variant: "error",
      });
    },
  });

  useEffect(() => {
    if (!isLoading && book && user && book.createdBy?.id !== user.id) {
      router.replace("/");
    }
  }, [isLoading, book, user, router]);

  if (isLoading || !book) {
    return <div className="max-w-xl mx-auto p-8">Loading...</div>;
  }

  const initialValues: BookFormValues = {
    title: book.title || "",
    author: book.author || "",
    description: book.description || "",
    genre: book.genre || "fiction",
    coverImageUrl: book.coverImageUrl || "",
  };

  const handleSubmit = (values: BookFormValues) => {
    mutation.mutate(values);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      <div className="flex items-center justify-center py-8">
        <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-xl p-8 border border-blue-100">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Books", href: "/" },
              { label: book.title, href: `/books/${id}` },
              { label: "Edit" },
            ]}
          />
          <BookForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={mutation.isPending}
            mode="edit"
          />
        </div>
      </div>
    </div>
  );
}
