import axios from "axios";
import { REISSUE, LOGOUT, UNREGISTER } from "../apiUrl";
import { AuthResponseType } from "@/types/api";
import axiosInstance from "../axiosInstance";
import { authStore } from "@/stores/userStore";

// 토큰 갱신
export const refreshAccessToken = async () => {
  const { refreshToken, signOut } = authStore.getState();

  // 디버깅 목적 로그 추가 (추후 삭제 예정)
  try {
    if (!refreshToken) {
      console.error("RefreshToken이 없음. 로그아웃 처리 필요");
      signOut();
      window.location.href = "/";
      return null;
    }

    const response = await axios.post(REISSUE, { refreshToken });

    console.log("서버 응답 (토큰 갱신):", response.data);

    if (!response.data.accessToken) {
      console.error("서버에서 새로운 accessToken을 받지 못함");
      window.location.href = "/";
      return null;
    }

    const newAccessToken = response.data.accessToken;

    // 새로운 accessToken을 저장
    sessionStorage.setItem("accessToken", newAccessToken);
    authStore.getState().setAccessToken(newAccessToken);
    console.log("새로운 accessToken 저장 완료:", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("토큰 갱신 실패");
    signOut();
    window.location.href = "/";
    alert("세션이 만료되었습니다.\n다시 로그인해주세요.");
    return null;
  }
};

// 카카오 로그인
export const getTokenWithCode = async (code: string) => {
  const url = `/login/kakao?code=${code}`;

  try {
    const { data } = await axiosInstance.get<AuthResponseType>(url);
    return data;
  } catch (err) {
    console.error(err);
    return { accessToken: "", refreshToken: "", isFirstLogin: false };
  }
};

// 로그아웃
export const logout = async () => {
  const { accessToken, refreshToken, isFirstLogin, signOut } =
    authStore.getState();

  try {
    await axios.post(LOGOUT, {
      accessToken,
      refreshToken,
      isFirstLogin,
    });

    signOut();

    window.location.href = "/";
  } catch (err) {
    console.error("로그아웃 실패:", err);
  }
};

// 회원 탈퇴
export const unregister = async () => {
  try {
    await axiosInstance.post(UNREGISTER);
  } catch (err) {
    console.error("회원탈퇴 실패:", err);
  }
};
