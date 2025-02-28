"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@/providers/user-store-provider";
import LoginLoading from "./loginLoading";
import { setAccessToken } from "@/api/axiosInstance";
import { getTokenWithCode } from "@/api/login/api";

export default function SignInPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useUserStore((state) => state);

  useEffect(() => {
    const curKakaoCode = searchParams.get("code");
    if (!curKakaoCode) return;

    (async () => {
      try {
        // 카카오 로그인 후 AccessToken 발급
        const res1 = await getTokenWithCode(curKakaoCode);
        const { accessToken, isFirstLogin } = res1;

        // 로그인 상태 업데이트
        signIn({ accessToken, isFirstLogin, isSignIn: true });

        // axiosInstance에 accessToken 저장
        setAccessToken(accessToken);

        // 첫 로그인 여부에 따라 리디렉트 처리
        router.replace(isFirstLogin ? "/?firstLogin=1" : "/");
      } catch (error: any) {
        console.error("Login error:", error);
        router.replace("/");
      }
    })();
  }, [router, searchParams, signIn]);

  return <LoginLoading />;
}
