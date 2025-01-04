"use client";

import MainRecruitmentCard from "@/components/card/mainRecruitmentCard";
import SubTap from "@/components/tab/subTap";
import { MAIN_RECRUITMENT_CARD, MAIN_RECRUITMENT_CARD_12 } from "@/data/main";
import { Affiliation_Type } from "@/data/pulldown";
import { MainRecruitmentCardProps } from "@/types/components/card";
import { useState } from "react";
import useResponsive from "../../../../hooks/useResponsive";
import MainRecruitmentCardWithCarousel from "@/components/card/mainRecruitmentCardWithCarousel";
import { flushAllTraces } from "next/dist/trace";

const LatestRecruitment = () => {
  const [latestRecruitmentData, setLatestRecruitmentData] = useState<
    MainRecruitmentCardProps[]
  >(MAIN_RECRUITMENT_CARD);
  const [latestRecruitmentData12, setLatestRecruitmentData12] = useState<
    MainRecruitmentCardProps[]
  >(MAIN_RECRUITMENT_CARD_12);
  const isMdUp = useResponsive("md");

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-[22px]">
        <h2 className="text-text1 text-mobile_h1_contents_title md:text-h1_contents_title">
          최신 모집공고
        </h2>
        <SubTap optionData={Affiliation_Type.slice(1, 3)} />
      </div>
      {isMdUp ? (
        <div className="w-full">
          <MainRecruitmentCardWithCarousel data={latestRecruitmentData12} />
        </div>
      ) : (
        <div
          className="flex flex-col gap-5 md:gap-x-4 md:gap-y-7 md:flex-row md:flex-wrap
        md:grid md:grid-cols-3 lx:grid-cols-4"
        >
          <MainRecruitmentCard data={latestRecruitmentData.slice(0, 8)} />
        </div>
      )}
    </section>
  );
};

export default LatestRecruitment;
