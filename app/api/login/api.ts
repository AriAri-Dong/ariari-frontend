import axios from "axios";
import { REISSUE, LOGOUT } from "../apiUrl";
import { AuthResponseType } from "@/types/api";
import axiosInstance from "../axiosInstance";

export const refreshAccessToken = async () => {
  const response = await axios.post(REISSUE, {}, { withCredentials: true });
  return response.data.accessToken;
};

export const getTokenWithCode = async (code: string) => {
  const url = `/login/kakao?code=${code}`;

  try {
    const { data } = await axiosInstance.get<AuthResponseType>(url);
    return data;
  } catch (err) {
    console.error(err);
    return { accessToken: "", isFirstLogin: false };
  }
};

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
