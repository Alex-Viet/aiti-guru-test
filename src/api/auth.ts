import type { AuthUser } from "@/types";
import { API_BASE_URL } from "@/config/env";

interface LoginPayload {
  username: string;
  password: string;
  expiresInMins?: number;
}

/**
 * Authenticates the user with DummyJSON API.
 * Throws an Error with the API's message on failure.
 */
export async function loginUser(payload: LoginPayload): Promise<AuthUser> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: payload.username,
      password: payload.password,
      expiresInMins: payload.expiresInMins ?? 60,
    }),
  });

  const data: unknown = await response.json();

  if (!response.ok) {
    const errorData = data as { message?: string };
    throw new Error(errorData.message ?? "Ошибка авторизации");
  }

  return data as AuthUser;
}

/**
 * Fetches the current authenticated user using the stored access token.
 */
export async function getAuthUser(accessToken: string): Promise<AuthUser> {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Сессия истекла");
  }

  return (await response.json()) as AuthUser;
}
