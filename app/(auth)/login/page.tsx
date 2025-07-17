"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(usernameOrEmail, password);
      router.push("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-xl p-8 border border-blue-100">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Login" }]}
        />
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-full">
            <LogIn className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-blue-700 mb-1">
              Login
            </h1>
            <p className="text-sm text-gray-500">
              Welcome back! Please sign in to your account.
            </p>
          </div>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="usernameOrEmail"
              className="block mb-1 font-semibold text-blue-700"
            >
              Username or Email
            </label>
            <Input
              id="usernameOrEmail"
              name="usernameOrEmail"
              type="text"
              required
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
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
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
