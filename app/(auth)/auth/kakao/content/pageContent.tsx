"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getTokenWithCode, getUserData } from "@/api/apis.ts";
import { useUserStore } from "@/providers/user-store-provider";
import HeaderToken from "@/api/headerToken";
import LoginLoading from "./loginLoading";

export default function SignInPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [kakaoCode, setKakaoCode] = useState<string>("");
  const { signIn, setUserData } = useUserStore((state) => state);

  useEffect(() => {
    // "code" 쿼리 파라미터 추출
    const curKakaoCode = searchParams.get("code") || "";
    if (curKakaoCode === "") return;
    // 카카오 로그인 코드 상태 업데이트
    setKakaoCode(curKakaoCode);

    // 카카오 로그인 코드로 액세스 토큰 요청
    getTokenWithCode(kakaoCode)
      .then(async (res1) => {
        // 로그인 상태 업데이트
        signIn({
          accessToken: res1.accessToken,
          refreshToken: res1.refreshToken,
          isFirstLogin: res1.isFirstLogin,
          isSignIn: true,
        });

        // API 요청을 위한 헤더에 액세스 토큰 설정
        HeaderToken.set(res1.accessToken);

        // 유저 정보 가져와서 상태 업데이트
        await getUserData().then((res2) => {
          setUserData(res2);
        });

        // 첫 로그인 여부에 따라 리다이렉트 처리
        router.replace(`/${res1.isFirstLogin ? "?firstLogin=1" : ""}`);
      })
      .catch(() => {
        router.replace("/");
      });
  }, [kakaoCode, router, searchParams, setUserData, signIn]);

  return <LoginLoading />;
}
