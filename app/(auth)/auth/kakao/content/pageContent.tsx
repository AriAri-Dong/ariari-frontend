"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import HeaderToken from "@/api/headerToken";
import LoginLoading from "./loginLoading";
import { getTokenWithCode } from "@/api/login/api";
import { getMemberData } from "@/api/member/api";
import axiosInstance from "@/api/axiosInstance";
import { useUserStore } from "@/providers/user-store-provider";

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

    getTokenWithCode(kakaoCode)
      .then(async (res1) => {
        // 로그인 상태 업데이트
        signIn({
          accessToken: res1.accessToken,
          isFirstLogin: res1.isFirstLogin,
          isSignIn: true,
        });

        // 토큰을 sessionStorage에 저장
        if (typeof window !== "undefined") {
          sessionStorage.setItem("accessToken", res1.accessToken);
        }

        // API 요청을 위한 헤더에 액세스 토큰 설정
        HeaderToken.set(res1.accessToken);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res1.accessToken}`;

        // 유저 정보 가져와서 상태 업데이트
        await getMemberData().then((res2) => {
          setUserData(res2);
          console.log(res2);
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
