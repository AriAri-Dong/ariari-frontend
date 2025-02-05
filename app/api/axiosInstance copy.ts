import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터 (AccessToken을 헤더에 추가)
axiosInstance.interceptors.request.use(
  (config) => {
    // AccessToken을 쿠키에서 직접 가져오지 않음
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (401 발생 시 RefreshToken 사용)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // RefreshToken을 사용하여 AccessToken 재발급 요청
        await axios.post(
          `${apiBaseUrl}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        // ㄴ기존 요청 다시 시도 (AccessToken이 쿠키로 자동 설정됨)
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("RefreshToken expired. Redirecting to login.");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
