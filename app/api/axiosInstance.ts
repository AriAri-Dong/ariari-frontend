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

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = authStore.getState();

  if (accessToken) {
    config.headers["Authorization"] = `${accessToken}`;
  }
  return config;
});

// 토큰 새로고침 관련 타입 및 변수 선언
type RefreshTokenCallback = (token: string) => void;
let isRefreshing = false;
let refreshSubscribers: RefreshTokenCallback[] = [];

// 콜백을 대기열에 추가하는 함수
const subscribeTokenRefresh = (callback: RefreshTokenCallback): void => {
  refreshSubscribers.push(callback);
};

// 새 토큰으로 콜백을 실행하는 함수
const onTokenRefreshed = (token: string): void => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 오류이면서 아직 재시도되지 않은 요청에 대해서만 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        isRefreshing = true;
        originalRequest._retry = true;

        try {
          const newAccessToken = await refreshAccessToken();

          if (!newAccessToken) {
            throw new Error("토큰 갱신 실패");
          }

          // auth store 업데이트
          authStore.getState().setAccessToken(newAccessToken);

          // 기본 헤더 업데이트
          axiosInstance.defaults.headers.common["Authorization"] =
            newAccessToken;

          // 토큰을 기다리고 있는 모든 요청에 알림
          onTokenRefreshed(newAccessToken);

          // 현재 요청 헤더 업데이트
          originalRequest.headers["Authorization"] = newAccessToken;

          isRefreshing = false;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("RefreshToken 만료됨. 로그아웃 처리.");
          authStore.getState().signOut();

          // 렌더링 중 상태 업데이트를 방지하기 위해 setTimeout 사용
          setTimeout(() => {
            window.location.href = "/";
          }, 0);

          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      } else {
        // 이미 토큰 갱신 중이면 새 토큰을 기다림
        return new Promise<any>((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers["Authorization"] = token;
            resolve(axiosInstance(originalRequest));
          });
        });
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
