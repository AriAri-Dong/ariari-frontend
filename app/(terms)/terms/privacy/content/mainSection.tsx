"use client";

import HeaderSection from "@/(club)/club/withdrawal/content/headerSection";
import useResponsive from "@/hooks/useResponsive";
import MarkdownSection from "../../content/markdownSection";

const MainSection = () => {
  const isMdUp = useResponsive("md");
  return (
    <div className="mt-[46px] mb-20 md:mb-0">
      {!isMdUp && <HeaderSection title={"개인정보 처리방침"} />}
      <div className="hidden gap-[22px] mt-6 md:flex md:flex-col md:mt-8 md:">
        <h1 className="text-text1 md:text-h1_contents_title">
          개인정보처리방침
        </h1>
      </div>
      <div className="w-full rounded-8 bg-background mt-5 mb-20 md:mb-[124px] md:mt-[22px] md:px-6 md:py-[26px]">
        <MarkdownSection termType={"PRIVACY_POLICY"} />
      </div>
    </div>
  );
};

export default MainSection;
