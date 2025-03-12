import axios from "axios";
import { refreshAccessToken } from "./login/api";
import { authStore } from "@/stores/userStore";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 디버깅 목적 로그 추가 (리프레시 토큰 및 회원탈퇴 완료 후 삭제 예정)

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = authStore.getState();
  console.log("+++ 요청 인터셉터 - 현재 Access Token:", accessToken);
  if (accessToken) {
    config.headers["Authorization"] = `${accessToken}`;
  }
  return config;
});

// 응답 인터셉터 (401 처리)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("error", error);

    const originalRequest = error.config;

    // error.response가 undefined이거나 401일 경우 refreshToken 시도
    if (!error.response || error.response.status === 401) {
      console.log("401 Unauthorized 또는 응답 없음 >>> Refresh Token 시도");

      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        console.log("새로운 액세스 토큰 발급됨:", newAccessToken);

        if (!newAccessToken) throw new Error("토큰 재발급 실패");

        // Zustand 상태 업데이트
        authStore.getState().setAccessToken(newAccessToken);

        // axios 기본 헤더 업데이트
        axiosInstance.defaults.headers.common["Authorization"] = newAccessToken;

        // 기존 요청을 새로운 accessToken으로 재시도
        originalRequest.headers["Authorization"] = newAccessToken;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("RefreshToken 만료됨. 로그아웃 처리.");
        authStore.getState().signOut();
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
