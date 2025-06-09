import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  oauthSignUpKey: string | null;
  setAuth: (data: {
    accessToken: string;
    refreshToken: string;
    oauthSignUpKey: string | null;
  }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      oauthSignUpKey: null,
      setAuth: ({ accessToken, refreshToken, oauthSignUpKey }) =>
        set({ accessToken, refreshToken, oauthSignUpKey }),
      logout: () =>
        set({ accessToken: null, refreshToken: null, oauthSignUpKey: null }),
    }),
    {
      name: "ariari-auth",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : undefined!
      ),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        oauthSignUpKey: state.oauthSignUpKey,
      }),
    }
  )
);
