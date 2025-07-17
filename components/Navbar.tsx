"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full bg-white border-b shadow-sm mb-8">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold text-blue-600">
          BookManagement
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/books" className="text-gray-700 hover:text-blue-600">
            Books
          </Link>
          {user ? (
            <>
              <Link href="/profile">
                <Button variant="ghost" size="sm">
                  {user.username}
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="default" size="sm">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
