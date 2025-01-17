"use client";
import { useUserStore } from "@/providers/user-store-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const { signIn, accessToken, signOut } = useUserStore((state) => state);
  const router = useRouter();

  const handleSignInClick = () => {
    signIn({
      accessToken: "dummy-access-token",
      refreshToken: "dummy-refresh-token",
    });
    router.back();
  };

  useEffect(() => {
    signOut();
  }, [signOut]);

  return (
    <div>
      accessToken: {accessToken}
      <br />
      <button onClick={handleSignInClick}>Sign in with dummy data</button>
    </div>
  );
}
