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
import NotiPopUp from "@/components/modal/notiPopUp";

const LatestRecruitment = () => {
  const [latestRecruitmentData, setLatestRecruitmentData] = useState<
    MainRecruitmentCardProps[]
  >(MAIN_RECRUITMENT_CARD);
  const [latestRecruitmentData12, setLatestRecruitmentData12] = useState<
    MainRecruitmentCardProps[]
  >(MAIN_RECRUITMENT_CARD_12);
  const isMdUp = useResponsive("md");

  const [affiliationType, setAffiliationType] = useState<string[]>([
    Affiliation_Type[1].label,
  ]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const schoolCertification = false; // 학교 인증 여부 임시값

  const handleOption = (value: string) => {
    if (!schoolCertification && value == "교내" && !isModalOpen) {
      setModalOpen(true);
    } else {
      setAffiliationType([value]);
    }
  };

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-[22px]">
        <h2 className="text-text1 text-mobile_h1_contents_title md:text-h1_contents_title">
          최신 모집공고
        </h2>
        <SubTap
          optionData={Affiliation_Type.slice(1, 3)}
          selectedOption={affiliationType[0]}
          handleOption={handleOption}
        />
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
      {isModalOpen && (
        <NotiPopUp
          onClose={() => setModalOpen(false)}
          icon="school"
          title="학교 등록이 필요합니다"
          description={`교내 인기 동아리를 확인하기 위해서는\n학교 등록이 필요합니다.`}
          firstButton={() => {}}
          firstButtonText="학교 등록하기"
          secondButton={() => setModalOpen(false)}
          secondButtonText="다음에 할게요"
          modalType="button"
        />
      )}
    </section>
  );
};

export default LatestRecruitment;
