import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoginLoading from "./loginLoading";
import { getTokenWithCode } from "@/api/login/api";
import { getMemberData } from "@/api/member/api";
import axiosInstance from "@/api/axiosInstance";
import { useUserStore } from "@/providers/userStoreProvider";
import { useAuthStore } from "@/stores/authStore";

export default function SignInPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [kakaoCode, setKakaoCode] = useState<string>("");
  const { setAuth, logout } = useAuthStore();
  const { signIn, setUserData } = useUserStore((state) => state);

  useEffect(() => {
    const curKakaoCode = searchParams.get("code") || "";
    if (curKakaoCode) {
      setKakaoCode(curKakaoCode);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!kakaoCode) return;

    getTokenWithCode(kakaoCode)
      .then(async (res) => {
        // 1. AuthStore에 토큰 저장
        setAuth({
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          oauthSignUpKey: res.oauthSignUpKey,
        });

        // 2. userStore에 로그인 상태 설정
        signIn({ isSignIn: true });

        // 3. 사용자 정보 불러오기
        if (res.accessToken) {
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `${res.accessToken}`;
          await new Promise((resolve) => setTimeout(resolve, 100));
          const userData = await getMemberData();
          setUserData(userData);
          console.log("유저 데이터 >>", userData);
        }

        router.replace("/");
      })
      .catch(() => {
        logout();
        alert("로그인에 실패했습니다.\n다시 시도해주세요.");
        localStorage.removeItem("ariari-auth");
        router.push("/");
        if (pathname === "/") {
          window.location.reload();
        }
      });
  }, [kakaoCode, router, pathname, setUserData, setAuth, logout, signIn]);

  return <LoginLoading />;
}
