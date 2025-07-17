"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import UserAvatar from "@/components/UserAvatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full bg-white border-b shadow-sm mb-8">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold text-blue-600">
          BookManagement
        </Link>
        <div className="flex gap-4 items-center">
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none">
                  <UserAvatar username={user.username} size={36} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                
                  <DropdownMenuItem asChild>
                   
                      <Link href="/profile">Profile</Link>
                    
                  </DropdownMenuItem>
                
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
