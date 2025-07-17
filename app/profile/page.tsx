"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="max-w-xl mx-auto p-8">Loading...</div>;
  }

  if (!user) {
    return null; // Redirecting
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="mb-6">
        <p className="font-semibold">Username: {user.username}</p>
        <p className="text-gray-600">Email: {user.email}</p>
      </div>
    </div>
  );
}
