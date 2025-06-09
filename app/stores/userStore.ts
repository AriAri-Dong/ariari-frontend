import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserDataResponseType } from "@/types/api";

interface UserState {
  user: UserDataResponseType | null;
  setUser: (user: UserDataResponseType) => void;
  clearUser: () => void;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "ariari-user-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
