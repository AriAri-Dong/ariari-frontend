"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getTokenWithCode } from "@/api/apis.ts";
import { useUserStore } from "@/providers/user-store-provider";
import HeaderToken from "@/api/headerToken";

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useUserStore((state) => state);

  useEffect(() => {
    const kakaoCode = searchParams.get("code") || "";

    getTokenWithCode(kakaoCode).then((res) => {
      signIn({
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        isFirstLogin: res.isFirstLogin,
      });
      HeaderToken.set(res.accessToken);
      router.replace(`/${res.isFirstLogin ? "?firstLogin=1" : ""}`);
    });
    router.replace("/");
  }, [router, searchParams, signIn]);

  return (
    <>
      <p>카카오 로그인중입니다. 잠시만 기다려주세요.</p>
    </>
  );
}
