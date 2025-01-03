"use client";

import React, { useState } from "react";
import ClubInfoSection from "./content/clubInfoSection";
import DarkBtn from "@/components/button/withIconBtn/darkBtn";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import { useRouter } from 'next/navigation';

const ClubPage = () => {
  const router = useRouter()

  const handleRouter = () =>{
    // 모집 공고 임시 경로
    router.push("/")
  }

  return (
    <div>
      <ClubInfoSection />
      <div className="fixed bottom-[77px] right-5 md:hidden">
        <WriteBtn onClick={() => {}} />
      </div>
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 md:hidden">
        <DarkBtn title={"모집공고 보기"} onClick={handleRouter} />
      </div>
    </div>
  );
};

export default ClubPage;
