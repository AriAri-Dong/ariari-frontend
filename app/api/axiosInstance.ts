import axios from "axios";
import { refreshToken } from "./login/api";
import { useAuthStore } from "@/stores/authStore";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 – 401일 경우 토큰 재발급 시도
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry // 무한루프 방지
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();
        if (newToken) {
          useAuthStore.getState().setAuth({
            accessToken: newToken,
            refreshToken: useAuthStore.getState().refreshToken!,
            oauthSignUpKey: null,
          });

          // 새 토큰으로 Authorization 갱신 후 재요청
          originalRequest.headers.Authorization = `${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        console.error("토큰 갱신 실패", err);
        useAuthStore.getState().logout();
        localStorage.removeItem("ariari-auth");
        localStorage.removeItem("ariari-storage");

        window.location.reload();

        alert("로그인 세션이 만료되었습니다. \n 다시 로그인해주세요.");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
