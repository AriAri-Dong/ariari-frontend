"use client";

import HeaderSection from "@/(club)/club/withdrawal/content/headerSection";
import NoticeCard from "@/components/card/NoticeCard";
import { TERMS_OF_CLUB } from "@/data/policies";
import useResponsive from "@/hooks/useResponsive";

const ClubPolicyPage = () => {
  const isMdUp = useResponsive("md");
  return (
    <div className="mt-[46px] mb-20 md:mb-0">
      {!isMdUp && <HeaderSection title={"동아리 운영원칙"} />}
      <div className="hidden gap-[22px] mt-6 md:flex md:flex-col md:mt-8 md:">
        <h1 className="text-text1 md:text-h1_contents_title">
          동아리 운영원칙
        </h1>
      </div>
      <div className="flex flex-col gap-7 rounded-8 bg-background mt-5 mb-20 md:mb-[124px] md:mt-[22px] md:px-6 md:py-[26px] md:gap-10">
        <div className="flex flex-col gap-10 md:gap-12">
          {TERMS_OF_CLUB.map((info, index) => (
            <div key={index}>
              <NoticeCard info={info} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubPolicyPage;
