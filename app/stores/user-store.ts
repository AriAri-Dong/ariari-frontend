import { UserDataResponseType } from "@/types/api";
import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type UserState = {
  accessToken: string;
  // refreshToken: string;
  id: string;
  isSignIn: boolean;
  isFirstLogin: boolean;
  memberData: {
    memberId: string;
    nickname: string;
    // profileType: string | null;
  };
  schoolData: {
    name: string;
  } | null;
};

export type UserActions = {
  signIn: ({
    accessToken,
    // refreshToken,
    isFirstLogin,
    isSignIn,
  }: {
    accessToken: string;
    // refreshToken: string;
    isFirstLogin: boolean;
    isSignIn: boolean;
  }) => void;
  signOut: () => void;
  setUserData: (userData: UserDataResponseType) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  accessToken: "initialAccessToken",
  // refreshToken: "initialRefreshToken",
  id: "defaultIdValue",
  isSignIn: false,
  isFirstLogin: false,
  memberData: {
    memberId: "",
    nickname: "",
    // profileType: "",
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
          signIn: ({ accessToken, isFirstLogin, isSignIn }) =>
            set((state) => {
              return {
                ...state,
                accessToken: accessToken,
                // refreshToken: refreshToken,
                isFirstLogin: isFirstLogin,
                isSignIn: isSignIn,
              };
            }),
          signOut: () => set(() => initState),
          setUserData: (userData) =>
            set((state) => ({
              ...state,
              memberData: {
                ...userData.memberData,
              },
              schoolData: {
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
