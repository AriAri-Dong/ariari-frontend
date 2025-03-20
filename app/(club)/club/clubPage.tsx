"use client";

import React, { Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useResponsive from "@/hooks/useResponsive";
import { useClubInfoQuery } from "@/hooks/club/useClubInfoQuery";
import ClubInfoWrapper from "./content/clubInfoWrapper";
import { useClubContext } from "@/context/ClubContext";
import { useUserStore } from "@/providers/user-store-provider";
import { useShallow } from "zustand/shallow";
import LoginModal from "@/components/modal/login/loginModal";
import MobileLoginModal from "@/components/modal/login/mobileLoginModal";
import Loading from "@/components/feedback/loading";

const ClubPage = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const clubId = params.get("clubId") ?? "";

  const isSignIn = useUserStore(useShallow((state) => state.isSignIn));
  const { clubInfo, isLoading } = useClubInfoQuery(clubId);
  const { setRole, setClubInfo } = useClubContext();

  const isMdUp = useResponsive("md");
  const clubDetailPathsOnlyMdUp = ["/club/withdrawal", "/club/close"];

  // md 이상인 경우에만 clubInfo 컴포넌트를 보여주는 path인지 확인
  const isClubDetailOnlyMdUpComponent = clubDetailPathsOnlyMdUp.some((path) =>
    pathname.includes(path)
  );
  const handleRouter = () => {
    // 모집 공고 임시 경로
    router.push("/");
  };

  const handleWrite = () => {
    console.log("작성 핸들러");
  };

  useEffect(() => {
    if (!clubInfo) return;
    if (isSignIn && clubInfo.clubMemberData != null) {
      setRole(clubInfo.clubMemberData.clubMemberRoleType);
    }
    setClubInfo(clubInfo);
  }, [clubInfo, setRole]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {/* === 로그인하지 않은 경우 모달 노출 ===*/}
      {/* 학교 인증에 따른 모달 추가 구현 필요 */}
      {!isSignIn &&
        (isMdUp ? (
          <LoginModal onClose={handleRouter} />
        ) : (
          <MobileLoginModal onClose={handleRouter} />
        ))}

      {/* === 상단 동아리 정보(공통 영역) === */}
      {(!isClubDetailOnlyMdUpComponent || isMdUp) && <ClubInfoWrapper />}
      {children}
    </div>
  );
};

export default ClubPage;
