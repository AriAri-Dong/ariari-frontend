import { REISSUE, LOGOUT, UNREGISTER, LOGIN, SIGNUP } from "../apiUrl";
import { AuthResponseType } from "@/types/api";
import axiosInstance from "../axiosInstance";
import { useAuthStore } from "@/stores/authStore";

// 토큰 갱신
export const refreshToken = async (): Promise<string | null> => {
  const refreshToken = useAuthStore.getState().refreshToken;
  if (!refreshToken) return null;

  try {
    const response = await axiosInstance.post(REISSUE, {
      refreshToken,
    });

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
    console.error(err);
    window.location.href = "/";
    alert("로그인에 실패했습니다.\n다시 시도해주세요.");
    return {
      accessToken: "",
      refreshToken: "",
      oauthSignUpKey: "",
    };
  }
};

// 카카오 회원가입
export const signUpWithKey = async (key: string) => {
  const url = `${SIGNUP}?key=${key}`;

  try {
    const { data } = await axiosInstance.post<AuthResponseType>(url);
    return data;
  } catch (err) {
    console.error(err);
    window.location.href = "/";
    alert("회원가입에 실패했습니다.\n다시 시도해주세요.");
    return {
      accessToken: "",
      refreshToken: "",
      oauthSignUpKey: "",
    };
  }
};

// 로그아웃
export const logout = async (signOutUser?: () => void) => {
  const {
    accessToken,
    refreshToken,
    logout: signOutAuth,
  } = useAuthStore.getState();
  console.log(accessToken);
  console.log(refreshToken);

  try {
    await axiosInstance.post(LOGOUT, { accessToken, refreshToken });

    window.location.reload();

    signOutAuth(); // authStore 초기화
    signOutUser?.(); // userStore 초기화

    localStorage.removeItem("ariari-auth");
    localStorage.removeItem("ariari-storage");
  } catch (err) {
    console.error("로그아웃 실패:", err);
  }
};

// 회원 탈퇴
export const unregister = async () => {
  try {
    await axiosInstance.post(UNREGISTER);
    sessionStorage.removeItem("profileModalCount");
  } catch (err) {
    console.error("회원탈퇴 실패:", err);
  }
};
