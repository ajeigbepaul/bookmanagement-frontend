"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCurrentUser,
  fetchUserFollowers,
  fetchUserFollowing,
  updateProfile,
} from "@/services/api";
import Loader from "@/components/Loader";
import UserAvatar from "@/components/UserAvatar";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, User as UserIcon, Mail, Edit2 } from "lucide-react";

export default function ProfilePage() {
  const { token, loading: authLoading } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ username: "", email: "" });
  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] = useState("");

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    enabled: !!token,
  });

  const { data: followers, isLoading: loadingFollowers } = useQuery({
    queryKey: ["userFollowers", user?.id],
    queryFn: () => fetchUserFollowers(user.id),
    enabled: !!token && !!user,
  });

  const { data: following, isLoading: loadingFollowing } = useQuery({
    queryKey: ["userFollowing", user?.id],
    queryFn: () => fetchUserFollowing(user.id),
    enabled: !!token && !!user,
  });

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      setEditSuccess("Profile updated!");
      setEditError("");
      setEditMode(false);
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: () => {
      setEditError("Failed to update profile");
      setEditSuccess("");
    },
  });

  useEffect(() => {
    if (!authLoading && !token) {
      router.replace("/login");
    }
  }, [token, authLoading, router]);

  useEffect(() => {
    if (user) {
      setForm({ username: user.username, email: user.email });
    }
  }, [user]);

  if (authLoading || isLoading) {
    return <Loader />;
  }

  if (isError || !user) {
    return <div className="max-w-xl mx-auto p-8">Failed to load profile.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-xl mx-auto p-8">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Profile" }]}
        />
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <UserAvatar username={user.username} size={64} />
          <h1 className="text-2xl font-bold mt-4 mb-2 flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-blue-500" /> {user.username}
          </h1>
          <p className="text-gray-600 mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400" /> {user.email}
          </p>
          <div className="flex gap-8 my-4">
            <div className="flex flex-col items-center">
              <Users className="w-5 h-5 text-blue-500 mb-1" />
              <span className="font-semibold">Followers</span>
              {loadingFollowers ? (
                <span className="text-xs text-gray-400">Loading...</span>
              ) : (
                <span className="text-sm">{followers?.length ?? 0}</span>
              )}
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-5 h-5 text-green-500 mb-1" />
              <span className="font-semibold">Following</span>
              {loadingFollowing ? (
                <span className="text-xs text-gray-400">Loading...</span>
              ) : (
                <span className="text-sm">{following?.length ?? 0}</span>
              )}
            </div>
          </div>
          {editMode ? (
            <form
              className="w-full max-w-sm space-y-3 mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate(form);
              }}
            >
              <div>
                <label className="block mb-1 font-medium">Username</label>
                <Input
                  value={form.username}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, username: e.target.value }))
                  }
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <Input
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  required
                  type="email"
                />
              </div>
              {editError && <p className="text-red-500 text-sm">{editError}</p>}
              {editSuccess && (
                <p className="text-green-600 text-sm">{editSuccess}</p>
              )}
              <div className="flex gap-2 mt-2">
                <Button type="submit" className="w-full">
                  Save
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <Button
              className="mt-4 flex items-center gap-2"
              onClick={() => setEditMode(true)}
            >
              <Edit2 className="w-4 h-4" /> Edit Profile
            </Button>
          )}
        </div>
        {/* Followers/Following List */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-lg font-semibold mb-2">Followers</h2>
          <ul className="list-disc pl-4 text-gray-700">
            {followers?.length ? (
              followers.map((f: any) => <li key={f.id}>{f.username}</li>)
            ) : (
              <li className="text-gray-400">No followers yet.</li>
            )}
          </ul>
          <h2 className="text-lg font-semibold mt-6 mb-2">Following</h2>
          <ul className="list-disc pl-4 text-gray-700">
            {following?.length ? (
              following.map((f: any) => <li key={f.id}>{f.username}</li>)
            ) : (
              <li className="text-gray-400">Not following anyone yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
