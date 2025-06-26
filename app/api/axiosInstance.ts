import axios from "axios";
import { refreshToken } from "./login/api";
import { useAuthStore } from "@/stores/authStore";

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (token: string | null, error: unknown) => {
  failedQueue.forEach((prom) => {
    if (token) prom.resolve(token);
    else prom.reject(error);
  });
  failedQueue = [];
};

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

    // 조건: 401 + 중복 재요청 방지 + 토큰 재발급 URL 제외
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/reissue/token")
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // 이미 리프레시 중이면 큐에 추가
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `${token}`;
              resolve(axiosInstance(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const newToken = await refreshToken();

        if (!newToken) throw new Error("refreshToken expired or invalid");

        // 토큰 저장
        useAuthStore.getState().setAuth({
          accessToken: newToken,
          refreshToken: useAuthStore.getState().refreshToken!,
          oauthSignUpKey: null,
        });

        processQueue(newToken, null);

        originalRequest.headers.Authorization = `${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(null, err); 
        useAuthStore.getState().logout();
        localStorage.removeItem("ariari-auth");
        localStorage.removeItem("ariari-storage");
        alert("로그인 세션이 만료되었습니다.\n다시 로그인해주세요.");
        window.location.reload();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
