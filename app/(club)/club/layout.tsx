"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DarkBtn from "@/components/button/withIconBtn/darkBtn";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import useResponsive from "@/hooks/useResponsive";
import { useFetchClubInfo } from "@/hooks/club/useClubInfo";
import ClubInfoWrapper from "./content/clubInfoWrapper";
import { ClubProvider, useClubContext } from "@/context/ClubContext";

const ClubPage = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const clubId = params.get("clubId") ?? "";

  const { clubInfo, isLoading } = useFetchClubInfo(clubId);
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

  useEffect(() => {
    if (!clubInfo) return;
    setRole(clubInfo.clubMemberData.clubMemberRoleType);
    setClubInfo(clubInfo);
  }, [clubInfo, setRole]);

  const handleWrite = () => [console.log("작성 핸들러")];

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      {/* === 상단 동아리 정보(공통 영역) === */}
      {(!isClubDetailOnlyMdUpComponent || isMdUp) && <ClubInfoWrapper />}
      {children}
      {/* === 모바일 해상도에서만 보이는 하단 버튼 ===  */}
      <div className="fixed bottom-[77px] right-5 md:hidden">
        <WriteBtn onClick={handleWrite} />
      </div>
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 md:hidden">
        <DarkBtn title={"모집공고 보기"} onClick={handleRouter} />
      </div>
    </div>
  );
};

const ClubPageWithProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClubProvider>
      <ClubPage>{children}</ClubPage>
    </ClubProvider>
  );
};

export default ClubPageWithProvider;
