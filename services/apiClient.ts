export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

export async function apiFetch(
  url: string,
  options: RequestInit = {}
): Promise<any> {
  const token = getToken();
  const headers: HeadersInit = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "Content-Type": "application/json",
  };

  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  if (res.status === 204) return; // No Content
  const text = await res.text();
  if (!text) return; // Empty body
  return JSON.parse(text);
}
