"use client";

import { useState } from "react";
import QuestionDropdown from "@/(club)/club/help/components/questionDropdown";
import ClubNoticeHeader from "@/(club)/club/management/activity/notice/components/clubNoticeHeader";
import { FAQ_DATA } from "@/data/faq";
import { PROFILE_TYPES } from "@/data/profileType";
import { NOTICE_DATA } from "@/data/clubNotice";
import ClubNoticeDropdown from "@/components/dropdown/clubNoticeDropdown";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import MobileHeaderSection from "./components/mobileHeaderSection";
import { profileType } from "@/types/member";

const getProfileByIndex = (index: number): profileType => {
  return PROFILE_TYPES[index % PROFILE_TYPES.length];
};

const HelpPage = () => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  return (
    <div className="mt-8 mb-20 md:mb-[124px]">
      <MobileHeaderSection />
      <div>
        <h1
          className="text-text1 text-mobile_h1_contents_title md:text-h1_contents_title 
        md:mb-[22px] mb-5"
        >
          자주 묻는 질문
        </h1>
        <div
          className="hidden pl-6 pr-[114px] py-1.5 mb-2.5 justify-between bg-white70 
        text-subtext2 rounded-[4px] text-body1_m md:flex"
        >
          <div className="flex gap-[42px]">
            <p className="px-[19px]">분류</p>
            <p>제목</p>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          {FAQ_DATA.map((item, index) => (
            <QuestionDropdown
              key={item.id}
              data={item}
              myRoleType={"GENERAL"}
              myProfileType={getProfileByIndex(index)}
              isOpen={item.id === selectedFaq}
              setSelected={setSelectedFaq}
            />
          ))}
        </div>
        <div className="flex justify-center  mt-9 md:mt-10">
          <PlusBtn title={"더보기"} onClick={() => {}} />
        </div>
      </div>
      <div>
        <h1
          className="text-text1 text-mobile_h1_contents_title md:text-h1_contents_title md:mt-10
          mt-12 md:mb-[22px] mb-5"
        >
          서비스 공지사항
        </h1>
        <p
          className="text-subtext2 text-mobile_body2_m md:text-h4
          mt-4 mb-5 md:mt-[22px] md:mb-[22px]"
        >
          총 {NOTICE_DATA.length}개의 공지사항이 있어요.
        </p>
        <ClubNoticeHeader role="SERVICE_ADMIN" />
        <div className="flex flex-col gap-2.5">
          {NOTICE_DATA.map((notice) => (
            <ClubNoticeDropdown
              key={notice.id}
              notice={notice}
              isOpen={openDropdownId === notice.id}
              setOpenDropdownId={setOpenDropdownId}
              pin={false}
              role="SERVICE_ADMIN"
            />
          ))}
        </div>
        <div className="flex justify-center  mt-9 md:mt-10">
          <PlusBtn title={"더보기"} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
