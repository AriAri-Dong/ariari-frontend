"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getTokenWithCode, getUserData } from "@/api/apis.ts";
import { useUserStore } from "@/providers/user-store-provider";
import HeaderToken from "@/api/headerToken";
import { IoConstructOutline } from "react-icons/io5";

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [kakaoCode, setKakaoCode] = useState<string>("");
  const { signIn, setUserData } = useUserStore((state) => state);

  useEffect(() => {
    const curKakaoCode = searchParams.get("code") || "";
    if (curKakaoCode === "") return;
    setKakaoCode(curKakaoCode);

    getTokenWithCode(kakaoCode)
      .then(async (res1) => {
        signIn({
          accessToken: res1.accessToken,
          refreshToken: res1.refreshToken,
          isFirstLogin: res1.isFirstLogin,
          isSignIn: true,
        });

        HeaderToken.set(res1.accessToken);

        await getUserData().then((res2) => {
          setUserData(res2);
        });

        router.replace(`/${res1.isFirstLogin ? "?firstLogin=1" : ""}`);
      })
      .catch(() => {
        router.replace("/");
      });
  }, [kakaoCode, router, searchParams, setUserData, signIn]);

  return (
    <>
      <p>카카오 로그인중입니다. 잠시만 기다려주세요.</p>
    </>
  );
}
