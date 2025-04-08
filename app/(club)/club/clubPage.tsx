"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useResponsive from "@/hooks/useResponsive";
import { useClubInfoQuery } from "@/hooks/club/useClubInfoQuery";
import ClubInfoWrapper from "./content/clubInfoWrapper";
import { useClubContext } from "@/context/ClubContext";
import Loading from "@/components/feedback/loading";
import ErrorNotice from "@/components/feedback/error";

const ClubPage = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const clubId = params.get("clubId") ?? "";

  const { clubInfo, isLoading, errorMessage } = useClubInfoQuery(clubId);
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
    if (clubInfo.clubMemberData != null) {
      setRole(clubInfo.clubMemberData.clubMemberRoleType);
    }
    setClubInfo(clubInfo);
  }, [clubInfo, setRole]);

  if (isLoading) {
    return <Loading />;
  }
  if (errorMessage) {
    return <ErrorNotice description={errorMessage} />;
  }

  return (
    <div>
      {/* === 상단 동아리 정보(공통 영역) === */}
      {(!isClubDetailOnlyMdUpComponent || isMdUp) && <ClubInfoWrapper />}
      {children}
    </div>
  );
};

export default ClubPage;
