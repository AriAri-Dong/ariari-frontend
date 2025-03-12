import axios from "axios";
import { REISSUE, LOGOUT } from "../apiUrl";
import { AuthResponseType } from "@/types/api";
import axiosInstance from "../axiosInstance";
import { authStore } from "@/stores/userStore";

// 토큰 갱신
export const refreshAccessToken = async () => {
  // 디버깅 목적 로그 추가 (추후 삭제 예정)
  try {
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.error("RefreshToken이 없음. 로그아웃 처리 필요");
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
    window.location.href = "/";
    console.error("refreshAccessToken 요청 실패:", error);
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
export const logout = async (accessToken: string, refreshToken: string) => {
  try {
    await axiosInstance.post(
      LOGOUT,
      { accessToken, refreshToken },
      { withCredentials: true }
    );

    sessionStorage.removeItem("accessToken");

    // 로그인 페이지로 리디렉트
    window.location.href = "/";
  } catch (err) {
    console.error("로그아웃 실패:", err);
  }
};
