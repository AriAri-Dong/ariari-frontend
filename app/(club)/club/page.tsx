
"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import ClubInfoSection from "./content/clubInfoSection";
import DarkBtn from "@/components/button/withIconBtn/darkBtn";
import WriteBtn from "@/components/button/iconBtn/writeBtn";

const ClubPage = () => {
  const router = useRouter()

  const handleRouter = () =>{
    // 모집 공고 임시 경로
    router.push("/")
  }

  const handleWrite  = () =>[
    console.log("작성 핸들러")
  ]

  return (
    <div>
      {/* === 공통 영역 === */}
      <ClubInfoSection />
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
