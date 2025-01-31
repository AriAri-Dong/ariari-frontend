import { UserDataResponseType } from "@/api/types";
import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type UserState = {
  accessToken: string;
  refreshToken: string;
  id: string;
  isSignIn: boolean;
  isFirstLogin: boolean;
  memberData: {
    id: string;
    nickname: string;
    profileType: string | null;
  };
  schoolData: {
    name: string;
  } | null;
};

export type UserActions = {
  signIn: ({
    accessToken,
    refreshToken,
    isFirstLogin,
  }: {
    accessToken: string;
    refreshToken: string;
    isFirstLogin: boolean;
  }) => void;
  signOut: () => void;
  setUserData: (userData: UserDataResponseType) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  accessToken: "initialAccessToken",
  refreshToken: "initialRefreshToken",
  id: "defaultIdValue",
  isSignIn: false,
  isFirstLogin: false,
  memberData: {
    id: "",
    nickname: "",
    profileType: "",
  },
  schoolData: {
    name: "",
  },
};

export const initUserStore = (): UserState => {
  return defaultInitState;
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()(
    devtools(
      persist(
        (set, get) => ({
          ...initState,
          signIn: ({ accessToken, refreshToken, isFirstLogin }) =>
            set((state) => ({
              ...state,
              accessToken: accessToken,
              refreshToken: refreshToken,
              isFirstLogin: isFirstLogin,
            })),
          signOut: () => set(() => initState),
          setUserData: (userData) =>
            set((state) => ({
              ...state,
              memberData: {
                ...state.memberData,
                ...userData.memberData,
              },
              schoolData: {
                ...state.schoolData,
                ...userData.schoolData,
              },
            })),
        }),
        {
          name: "ariari-storage",
        }
      )
    )
  );
};
