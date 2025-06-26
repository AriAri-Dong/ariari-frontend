import {
  REISSUE,
  LOGOUT,
  UNREGISTER,
  LOGIN,
  SIGNUP,
  RANDOM_NICKNAME,
} from "../apiUrl";
import { AuthResponseType, SignUpWithKeyBody } from "@/types/api";
import axiosInstance from "../axiosInstance";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import axios from "axios";

// 토큰 갱신
export const refreshToken = async (): Promise<string | null> => {
  const refreshToken = useAuthStore.getState().refreshToken;
  if (!refreshToken) return null;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${REISSUE}`,
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.accessToken;
  } catch (error) {
    console.error("리프레시 토큰으로 재발급 실패", error);
    return null;
  }
};

// export const refreshAccessToken = async () => {
//   const { refreshToken, setAuth, logout } = useAuthStore.getState();

//   try {
//     if (!refreshToken) {
//       console.error("RefreshToken이 없음. 로그아웃 처리 필요");
//       logout();
//       window.location.href = "/";
//       return null;
//     }

//     const response = await axiosInstance.post(REISSUE, { refreshToken });

//     const newAccessToken = response.data.accessToken;

//     if (!newAccessToken) {
//       console.error("서버에서 새로운 accessToken을 받지 못함");
//       window.location.href = "/";
//       return null;
//     }

//     // accessToken 갱신 후 store 업데이트
//     setAuth({
//       accessToken: newAccessToken,
//       refreshToken,
//       oauthSignUpKey: null,
//     });

//     return newAccessToken;
//   } catch (error) {
//     console.error("토큰 갱신 실패");
//     logout();
//     window.location.href = "/";
//     alert("세션이 만료되었습니다.\n다시 로그인해주세요.");
//     return null;
//   }
// };

// 카카오 로그인
export const getTokenWithCode = async (code: string) => {
  const url = `${LOGIN}?code=${code}`;

  try {
    const { data } = await axiosInstance.get<AuthResponseType>(url);
    return data;
  } catch (err) {
    console.error("카카오 로그인 실패:", err);
    throw err;
  }
};

// 카카오 회원가입
export const signUpWithKey = async (key: string, body: SignUpWithKeyBody) => {
  const url = `${SIGNUP}?key=${key}`;

  try {
    const { data } = await axiosInstance.post<AuthResponseType>(url, body);
    return data;
  } catch (err) {
    console.error("카카오 회원가입 실패:", err);
    alert("회원가입에 실패했습니다.\n다시 시도해주세요.");
    window.location.href = "/";

    return null;
  }
};

// 로그아웃
export const logout = async () => {
  const {
    accessToken,
    refreshToken,
    logout: clearAuth,
  } = useAuthStore.getState();

  try {
    // 백엔드에 로그아웃 요청
    await axiosInstance.post(LOGOUT, { accessToken, refreshToken });

    // 클라이언트 상태 초기화
    clearAuth(); // accessToken, refreshToken 제거
    useUserStore.getState().clearUser(); // user 정보 제거

    localStorage.removeItem("ariari-auth");
    localStorage.removeItem("ariari-user-store");

    // 새로고침
    window.location.reload();
  } catch (err) {
    console.error("로그아웃 실패:", err);
  }
};

// 회원 탈퇴
export const unregister = async () => {
  try {
    await axiosInstance.post(UNREGISTER);
    sessionStorage.removeItem("profileModalCount");
    useUserStore.getState().clearUser(); // user 정보 제거

    localStorage.removeItem("ariari-auth");
    localStorage.removeItem("ariari-user-store");

    window.location.reload();
  } catch (err) {
    console.error("회원탈퇴 실패:", err);
    throw err;
  }
};

// 랜덤 닉네임 발급
export const getRandomNickname = async (): Promise<string> => {
  try {
    const { data } = await axiosInstance.get(RANDOM_NICKNAME);
    return data;
  } catch (error) {
    console.error("랜덤 닉네임 요청 실패:", error);
    throw new Error("랜덤 닉네임을 불러오지 못했습니다.");
  }
};
