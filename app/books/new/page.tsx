"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { createBook } from "@/services/api";
import { BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";

export default function NewBookPage() {
  const { user, token, loading } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  const mutation = useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      setSuccess("Book created successfully!");
      setTitle("");
      setAuthor("");
      setDescription("");
      setError("");
      router.push("/");
    },
    onError: () => {
      setError("Failed to create book");
      setSuccess("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    mutation.mutate({ title, author, description });
  };

  if (loading || !user) {
    return <div className="max-w-xl mx-auto p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      <div className="flex items-center justify-center py-8">
        <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-xl p-8 border border-blue-100">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Books", href: "/" },
              { label: "Add New" },
            ]}
          />
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-full">
              <BookOpen className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-blue-700 mb-1">
                Add New Book
              </h1>
              <p className="text-sm text-gray-500">
                Share a new book with the community.
              </p>
            </div>
          </div>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="title"
                className="block mb-1 font-semibold text-blue-700"
              >
                Title
              </label>
              <Input
                id="title"
                name="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label
                htmlFor="author"
                className="block mb-1 font-semibold text-blue-700"
              >
                Author
              </label>
              <Input
                id="author"
                name="author"
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-1 font-semibold text-blue-700"
              >
                Description
              </label>
              <Input
                id="description"
                name="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Adding..." : "Add Book"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
