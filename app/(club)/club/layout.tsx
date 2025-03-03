"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import DarkBtn from "@/components/button/withIconBtn/darkBtn";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import ClubInfoWrapper from "./content/clubInfoWrapper";
import useResponsive from "@/hooks/useResponsive";

const ClubPage = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
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

  const handleWrite = () => [console.log("작성 핸들러")];

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

export default ClubPage;
