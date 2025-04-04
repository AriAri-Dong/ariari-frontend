import axios from "axios";
import { refreshAccessToken } from "./login/api";
import { authStore } from "@/app/stores/userStore";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (모든 요청에 accessToken 자동 추가)
axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = authStore.getState();
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 인터셉터 (401 처리)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      !error.response ||
      (error.response.status === 401 && !originalRequest._retry)
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        if (!newAccessToken) throw new Error("토큰 재발급 실패");

        // Zustand 상태 업데이트
        authStore.getState().setAccessToken(newAccessToken);

        // axios 기본 헤더 업데이트
        axiosInstance.defaults.headers.common["Authorization"] = newAccessToken;

        // 기존 요청 헤더 업데이트
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
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
