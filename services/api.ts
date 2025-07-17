import { apiFetch } from "./apiClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchBooks({
  search = "",
  genre = "",
  page = 1,
  limit = 10,
}) {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (genre) params.append("genre", genre);
  params.append("page", String(page));
  params.append("limit", String(limit));
  return apiFetch(`${API_URL}/books?${params.toString()}`);
}

export async function fetchBook(id: number | string) {
  return apiFetch(`${API_URL}/books/${id}`);
}

export async function fetchComments(
  bookId: number | string,
  page = 1,
  limit = 10
) {
  return apiFetch(
    `${API_URL}/books/${bookId}/comments?page=${page}&limit=${limit}`
  );
}

export async function postComment(bookId: number | string, content: string) {
  return apiFetch(`${API_URL}/books/${bookId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

export async function fetchFollowers(userId: number | string) {
  return apiFetch(`${API_URL}/users/${userId}/followers`);
}

export async function fetchFollowing(userId: number | string) {
  return apiFetch(`${API_URL}/users/${userId}/following`);
}

export async function followUser(userId: number | string) {
  return apiFetch(`${API_URL}/users/${userId}/follow`, {
    method: "POST",
  });
}

export async function unfollowUser(userId: number | string) {
  return apiFetch(`${API_URL}/users/${userId}/follow`, {
    method: "DELETE",
  });
}
