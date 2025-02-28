import axios from "axios";
import { refreshAccessToken } from "./login/api";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  // 쿠키 인증 활성화
  withCredentials: true,
});

let accessToken = "";
if (typeof window !== "undefined") {
  accessToken = sessionStorage.getItem("accessToken") || "";
}

// 요청 인터셉터 (모든 요청에 accessToken 자동 추가)
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = token;
    }
  }
  return config;
});

// 응답 인터셉터 (401 발생 시 refreshToken 사용)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // refreshToken을 사용하여 accessToken 재발급 요청
        const newAccessToken = await refreshAccessToken();

        // 브라우저 환경에서만 sessionStorage 사용
        if (typeof window !== "undefined") {
          sessionStorage.setItem("accessToken", newAccessToken);
        }

        // 기존 요청에 새 accessToken 적용 후 재시도
        originalRequest.headers["Authorization"] = newAccessToken;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("RefreshToken 만료됨. 로그인 페이지로 이동.");

        if (typeof window !== "undefined") {
          sessionStorage.removeItem("accessToken");
          window.location.href = "/";
        }
      }
    }

    return Promise.reject(error);
  }
);

// 클라이언트에서만 accessToken을 설정할 수 있도록 수정
export const setAccessToken = (token: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("accessToken", token);
  }
};

export default axiosInstance;
