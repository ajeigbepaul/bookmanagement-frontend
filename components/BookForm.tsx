import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface BookFormValues {
  title: string;
  author: string;
  description: string;
  genre: string;
  coverImageUrl?: string;
}

export default function BookForm({
  initialValues,
  onSubmit,
  loading = false,
  mode = "create",
}: {
  initialValues: BookFormValues;
  onSubmit: (values: BookFormValues) => void;
  loading?: boolean;
  mode?: "create" | "edit";
}) {
  const [form, setForm] = useState<BookFormValues>(initialValues);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setForm(initialValues);
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.title || !form.author) {
      setError("Title and author are required");
      return;
    }
    onSubmit(form);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-extrabold text-blue-700 mb-1">
        {mode === "edit" ? "Edit Book" : "Add New Book"}
      </h1>
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
          value={form.title}
          onChange={handleChange}
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
          value={form.author}
          onChange={handleChange}
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
          value={form.description}
          onChange={handleChange}
          className="focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label
          htmlFor="genre"
          className="block mb-1 font-semibold text-blue-700"
        >
          Genre
        </label>
        <select
          id="genre"
          name="genre"
          required
          value={form.genre}
          onChange={handleChange}
          className="border rounded px-2 py-1 w-full focus:ring-2 focus:ring-blue-400"
        >
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-fiction</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="coverImageUrl"
          className="block mb-1 font-semibold text-blue-700"
        >
          Cover Image URL
        </label>
        <Input
          id="coverImageUrl"
          name="coverImageUrl"
          type="url"
          value={form.coverImageUrl || ""}
          onChange={handleChange}
          className="focus:ring-2 focus:ring-blue-400"
          placeholder="https://example.com/cover.jpg"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}
      <Button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading
          ? mode === "edit"
            ? "Saving..."
            : "Adding..."
          : mode === "edit"
          ? "Save Changes"
          : "Add Book"}
      </Button>
    </form>
  );
}
