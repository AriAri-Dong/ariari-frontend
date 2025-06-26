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
      !originalRequest._retry &&
      !originalRequest.url?.includes("/reissue/token")
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

          originalRequest.headers.Authorization = `${newToken}`;
          return axiosInstance(originalRequest);
        } else {
          // newToken이 null일 경우도 처리
          throw new Error("refreshToken expired or invalid");
        }
      } catch (err) {
        console.error("토큰 갱신 실패", err);
        useAuthStore.getState().logout();
        localStorage.removeItem("ariari-auth");
        localStorage.removeItem("ariari-storage");
        alert("로그인 세션이 만료되었습니다.\n다시 로그인해주세요.");
        window.location.reload();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
