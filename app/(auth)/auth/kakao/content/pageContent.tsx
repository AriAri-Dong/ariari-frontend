"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LoginLoading from "./loginLoading";
import { getTokenWithCode } from "@/api/login/api";
import { getMemberData } from "@/api/member/api";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";

export default function SignInPageContent() {
  const router = useRouter();
  const isHandled = useRef<boolean>(false);
  const searchParams = useSearchParams();

  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);

  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  const [kakaoCode, setKakaoCode] = useState<string>("");

  // 1. 카카오 code 추출
  useEffect(() => {
    const curKakaoCode = searchParams.get("code") || "";
    if (curKakaoCode) {
      setKakaoCode(curKakaoCode);
    }
  }, [searchParams]);

  // 2. 로그인 처리
  useEffect(() => {
    if (!kakaoCode || isHandled.current) return;

    isHandled.current = true;

    (async () => {
      try {
        const res = await getTokenWithCode(kakaoCode);

        setAuth({
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          oauthSignUpKey: res.oauthSignUpKey,
        });

        if (res.accessToken) {
          const userData = await getMemberData();
          if (!userData) throw new Error("유저 데이터 없음");
          setUser(userData);
          router.replace("/");
        }
      } catch (error) {
        console.error("로그인 실패:", error);
        logout();
        clearUser();
        alert("로그인에 실패했습니다.\n다시 시도해주세요.");
        localStorage.removeItem("ariari-auth");
        localStorage.removeItem("ariari-user-store");
        router.replace("/");
      }
    })();
    // }, [kakaoCode, router, setUser, setAuth, logout, clearUser]);
  }, [kakaoCode]);

  return <LoginLoading />;
}
