"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

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
      router.push("/login");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-xl p-8 border border-blue-100">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Register" }]}
        />
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-full">
            <UserPlus className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-blue-700 mb-1">
              Register
            </h1>
            <p className="text-sm text-gray-500">
              Create a new account to join the community.
            </p>
          </div>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block mb-1 font-semibold text-blue-700"
            >
              Username
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-semibold text-blue-700"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 font-semibold text-blue-700"
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </div>
    </div>
  );
}
