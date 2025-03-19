"use client";

import React, { Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DarkBtn from "@/components/button/withIconBtn/darkBtn";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import useResponsive from "@/hooks/useResponsive";
import { useClubInfoQuery } from "@/hooks/club/useClubInfoQuery";
import ClubInfoWrapper from "./content/clubInfoWrapper";
import { ClubProvider, useClubContext } from "@/context/ClubContext";
import { useUserStore } from "@/providers/user-store-provider";
import { useShallow } from "zustand/shallow";
import LoginModal from "@/components/modal/login/loginModal";
import MobileLoginModal from "@/components/modal/login/mobileLoginModal";

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

  const withoutClubDetail = ["/management/recruitment/create"];
  // md 이상인 경우에만 clubInfo 컴포넌트를 보여주는 path인지 확인
  const isClubDetailOnlyMdUpComponent = clubDetailPathsOnlyMdUp.some((path) =>
    pathname.includes(path)
  );
  // 공통 컴포넌트가 없는 path인지 확인
  const isWithoutClubDetailComponent = withoutClubDetail.some((path) =>
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
    return <h1>Loading</h1>;
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
      {isWithoutClubDetailComponent ||
        ((!isClubDetailOnlyMdUpComponent || isMdUp) && <ClubInfoWrapper />)}
      {children}
    </div>
  );
};

const ClubPageWithProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClubProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <ClubPage>{children}</ClubPage>
      </Suspense>
    </ClubProvider>
  );
};

export default ClubPageWithProvider;
