"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const { register, loading } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await register(username, email, password);
      router.push("/profile");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="block mb-1 font-medium">
            Username
          </label>
          <Input
            id="username"
            name="username"
            type="text"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
} 