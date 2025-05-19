import axios from "axios";
import { refreshAccessToken } from "./login/api";
import { useAuthStore } from "@/stores/authStore";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers["Authorization"] = `${accessToken}`;
  }
  return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // accessToken 재발급 로직
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        if (!newAccessToken) throw new Error("토큰 재발급 실패");

        // 기존 refreshToken 재사용
        const { refreshToken } = useAuthStore.getState();

        // setAuth로 토큰 갱신
        useAuthStore.getState().setAuth({
          accessToken: newAccessToken,
          refreshToken: refreshToken!,
          oauthSignUpKey: null,
        });

        // 재요청 Authorization 설정
        originalRequest.headers["Authorization"] = `${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("RefreshToken 만료됨. 로그아웃 처리.");
        useAuthStore.getState().logout();
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
