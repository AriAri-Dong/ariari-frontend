import { UserDataResponseType } from "@/types/api";
import { profileType } from "@/types/member";
import { devtools, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type UserState = {
  id: string;
  isSignIn: boolean;
  memberData: {
    memberId: string;
    nickname: string;
    profileType: profileType;
  };
  schoolData: {
    name: string;
  };
};

export type UserActions = {
  signIn: (data: { isSignIn: boolean }) => void;
  signOut: () => void;
  setUserData: (userData: UserDataResponseType) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  id: "",
  isSignIn: false,
  memberData: {
    memberId: "",
    nickname: "",
    profileType: null,
  },
  schoolData: {
    name: "",
  },
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()(
    devtools(
      persist(
        (set) => ({
          ...initState,

          signIn: ({ isSignIn }) =>
            set(() => ({
              isSignIn,
            })),

          signOut: () => set(() => defaultInitState),

          setUserData: (userData) =>
            set((state) => ({
              ...state,
              memberData: {
                ...userData.memberData,
                profileType: userData.memberData.profileType as profileType,
              },
              schoolData: userData.schoolData
                ? { ...userData.schoolData }
                : { name: "" }, // 빈 값으로 fallback
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
