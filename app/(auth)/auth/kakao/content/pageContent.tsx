"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import HeaderToken from "@/api/headerToken";
import LoginLoading from "./loginLoading";
import { getTokenWithCode } from "@/api/login/api";
import { getMemberData } from "@/api/member/api";
import axiosInstance from "@/api/axiosInstance";
import { useUserStore } from "@/providers/userStoreProvider";
import { authStore } from "@/stores/userStore";

export default function SignInPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [kakaoCode, setKakaoCode] = useState<string>("");
  const { signIn, setUserData } = useUserStore((state) => state);
  const { signOut } = authStore.getState();

  useEffect(() => {
    const curKakaoCode = searchParams.get("code") || "";
    if (curKakaoCode) {
      setKakaoCode(curKakaoCode);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!kakaoCode) return;

    getTokenWithCode(kakaoCode)
      .then(async (res1) => {
        signIn({
          accessToken: res1.accessToken,
          refreshToken: res1.refreshToken,
          isFirstLogin: res1.isFirstLogin,
          isSignIn: true,
        });

        if (typeof window !== "undefined") {
          sessionStorage.setItem("accessToken", res1.accessToken);
          sessionStorage.setItem("refreshToken", res1.refreshToken);
        }

        HeaderToken.set(res1.accessToken);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `${res1.accessToken}`;

        await new Promise((resolve) => setTimeout(resolve, 100));
        const res2 = await getMemberData();
        setUserData(res2);
        console.log("유저 데이터 >>", res2);

        router.replace(`/${res1.isFirstLogin ? "?firstLogin=1" : ""}`);
      })
      .catch(() => {
        signOut();
        alert("로그인에 실패했습니다.\n다시 시도해주세요.");
        localStorage.removeItem("ariari-storage");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        router.push("/");
        if (pathname === "/") {
          window.location.reload();
        }
      });
  }, [kakaoCode, router, setUserData, signIn]);

  return <LoginLoading />;
}
