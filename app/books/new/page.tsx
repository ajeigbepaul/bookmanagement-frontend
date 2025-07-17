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
import BookForm, { BookFormValues } from "@/components/BookForm";

export default function NewBookPage() {
  const { user, token, loading } = useAuth();
  const router = useRouter();
  const initialValues: BookFormValues = {
    title: "",
    author: "",
    description: "",
    genre: "fiction",
    coverImageUrl: "",
  };
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
      router.push("/");
    },
    onError: () => {
      setError("Failed to create book");
      setSuccess("");
    },
  });

  const handleSubmit = (values: BookFormValues) => {
    mutation.mutate(values);
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
          <BookForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={mutation.isPending}
            mode="create"
          />
        </div>
      </div>
    </div>
  );
}
