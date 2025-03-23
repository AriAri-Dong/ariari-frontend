"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useResponsive from "@/hooks/useResponsive";
import { useClubInfoQuery } from "@/hooks/club/useClubInfoQuery";
import ClubInfoWrapper from "./content/clubInfoWrapper";
import { useClubContext } from "@/context/ClubContext";
import { useUserStore } from "@/providers/user-store-provider";
import { useShallow } from "zustand/shallow";
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
      {/* === 상단 동아리 정보(공통 영역) === */}
      {(!isClubDetailOnlyMdUpComponent || isMdUp) && <ClubInfoWrapper />}
      {children}
    </div>
  );
};

export default ClubPage;
