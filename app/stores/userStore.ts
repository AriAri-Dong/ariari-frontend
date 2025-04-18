import { UserDataResponseType } from "@/types/api";
import { profileType } from "@/types/member";
import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type UserState = {
  accessToken: string;
  refreshToken: string;
  id: string;
  isSignIn: boolean;
  isFirstLogin: boolean;
  memberData: {
    memberId: string;
    nickname: string;
    profileType: profileType;
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
    isSignIn,
  }: {
    accessToken: string;
    refreshToken: string;
    isFirstLogin: boolean;
    isSignIn: boolean;
  }) => void;
  signOut: () => void;
  setUserData: (userData: UserDataResponseType) => void;
  setAccessToken: (accessToken: string) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  accessToken: "",
  refreshToken: "",
  id: "",
  isSignIn: false,
  isFirstLogin: false,
  memberData: {
    memberId: "",
    nickname: "",
    profileType: null,
  },
  schoolData: null,
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()(
    devtools(
      persist(
        (set, get) => ({
          ...initState,
          signIn: ({ accessToken, refreshToken, isFirstLogin, isSignIn }) =>
            set((state) => ({
              ...state,
              accessToken,
              refreshToken,
              isFirstLogin,
              isSignIn,
            })),
          signOut: () =>
            set(() => {
              localStorage.removeItem("ariari-storage");
              sessionStorage.removeItem("accessToken");
              sessionStorage.removeItem("refreshToken");

              return defaultInitState;
            }),
          setUserData: (userData) =>
            set((state) => ({
              ...state,
              memberData: {
                ...userData.memberData,
                profileType: userData.memberData.profileType as profileType,
              },
              schoolData: userData.schoolData
                ? { ...userData.schoolData }
                : null,
            })),

          setAccessToken: (accessToken) =>
            set((state) => ({
              ...state,
              accessToken,
            })),
        }),
        {
          name: "ariari-storage",
        }
      )
    )
  );
};

export const authStore = createUserStore();
