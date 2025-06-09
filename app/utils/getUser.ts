import { getMemberData } from "@/api/member/api";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { isEqual } from "lodash";

export const getUser = async () => {
  const { accessToken } = useAuthStore.getState();
  const currentUser = useUserStore.getState().user;

  if (!accessToken || accessToken.trim() === "") {
    console.log("비로그인 상태 → 사용자 정보 요청 생략");
    return;
  }

  try {
    const res = await getMemberData();
    if (res && !isEqual(res, currentUser)) {
      useUserStore.getState().setUser(res);
    }
  } catch (error) {
    console.error("유저 정보 요청 실패:", error);
  }
};
