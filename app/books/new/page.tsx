"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, author, description }),
      });
      if (!res.ok) throw new Error("Failed to create book");
      setSuccess("Book created successfully!");
      setTitle("");
      setAuthor("");
      setDescription("");
      // Optionally redirect to book list or detail page
      // router.push("/books");
    } catch (err) {
      setError("Failed to create book");
    }
  };

  if (loading || !user) {
    return <div className="max-w-xl mx-auto p-8">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Add New Book</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Title
          </label>
          <Input
            id="title"
            name="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author" className="block mb-1 font-medium">
            Author
          </label>
          <Input
            id="author"
            name="author"
            type="text"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1 font-medium">
            Description
          </label>
          <Input
            id="description"
            name="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}
        <Button type="submit" className="w-full">
          Add Book
        </Button>
      </form>
    </div>
  );
}
