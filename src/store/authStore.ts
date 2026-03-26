import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthUser } from "@/types";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  rememberMe: boolean;
  // Actions
  setAuth: (user: AuthUser, rememberMe: boolean) => void;
  logout: () => void;
}

/**
 * A dynamic storage that switches between localStorage and sessionStorage
 * depending on whether "remember me" was selected at login time.
 *
 * We store the preference flag itself in sessionStorage so we can read
 * it synchronously on the next page load before Zustand hydrates.
 */
const dynamicStorage = {
  getItem: (name: string): string | null => {
    // Try localStorage first (persistent session), then sessionStorage
    return localStorage.getItem(name) ?? sessionStorage.getItem(name);
  },
  setItem: (name: string, value: string): void => {
    // Read the rememberMe flag that was stored alongside
    const raw = localStorage.getItem(name) ?? sessionStorage.getItem(name);
    let rememberMe = false;
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as { state?: { rememberMe?: boolean } };
        rememberMe = parsed.state?.rememberMe ?? false;
      } catch {
        // ignore parse errors
      }
    }
    // Also try to read from the new value being set
    try {
      const newParsed = JSON.parse(value) as {
        state?: { rememberMe?: boolean };
      };
      if (newParsed.state?.rememberMe !== undefined) {
        rememberMe = newParsed.state.rememberMe;
      }
    } catch {
      // ignore
    }

    if (rememberMe) {
      localStorage.setItem(name, value);
      sessionStorage.removeItem(name);
    } else {
      sessionStorage.setItem(name, value);
      localStorage.removeItem(name);
    }
  },
  removeItem: (name: string): void => {
    localStorage.removeItem(name);
    sessionStorage.removeItem(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      rememberMe: false,

      setAuth: (user, rememberMe) => {
        set({ user, accessToken: user.accessToken, rememberMe });
      },

      logout: () => {
        set({ user: null, accessToken: null, rememberMe: false });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => dynamicStorage),
      // Only persist what's necessary
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        rememberMe: state.rememberMe,
      }),
    },
  ),
);
