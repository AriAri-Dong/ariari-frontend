"use client";

import React, { useState } from "react";
import Image from "next/image";

import keyboardArrowDown from "@/images/icon/keyboardArrowDown.svg";
import keyboardArrowUp from "@/images/icon/keyboardArrowUp.svg";
import polygon from "@/images/icon/polygon_4.svg";
import report from "@/images/icon/report.svg";
import Q from "@/images/icon/Q.svg";
import A from "@/images/icon/A.svg";

import { profileImageMap } from "@/utils/mappingProfile";
import { tokenColorMapping } from "../../util/colorMapping";
import { ClubFaqData, ClubQuestionData } from "@/models/club";
import { clubMemberRoleType, profileType } from "@/models/member";

import ReportBottomSheet from "@/components/bottomSheet/reportBottomSheet";
import ReportModal from "@/components/modal/reportModal";
import SendBtn from "@/components/button/iconBtn/sendBtn";

interface QuestionDropdownProps {
  data: ClubQuestionData | ClubFaqData;
  myRoleType: clubMemberRoleType | null | undefined;
  myProfileType: profileType | null | undefined;
}
/**
 *
 * @param data QNA 데이터 or FAQ 데이터
 * @returns
 */
const QuestionDropdown = ({
  data,
  myRoleType,
  myProfileType,
}: QuestionDropdownProps) => {
  let bg, text, label;
  const isFaq = "clubFaqColorType" in data;
  const [reportIsOpen, setReportIsOpen] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  if (isFaq) {
    // faq의 경우
    const color = tokenColorMapping[data.clubFaqColorType];
    bg = color.bg;
    text = color.text;
    label = data.clubFaqClassification;
  } else {
    // qna의 경우
    bg = data.clubAnswerData ? "bg-selectedoption_hover" : "bg-token_bg";
    text = data.clubAnswerData ? "text-primary" : "text-subtext2";
    label = data.clubAnswerData ? "답변완료" : "미답변";
  }
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-4 justify-start items-start pt-4 pb-2.5 pl-4 pr-3 md:px-6 md:py-[26px] bg-background rounded-[8px] md:gap-8 ">
      <div className="w-full justify-between items-center md:flex">
        <div
          className={`w-[62px] h-[24px] flex items-center justify-center mr-10 rounded-[4px] text-mobile_body3_m text-center mb-2.5 md:mb-0 md:w-[66px] md:h-[28px] md:text-body3_m  ${bg} ${text} shrink-0`}
        >
          {label}
        </div>
        <div
          className={`w-full ${
            isFaq
              ? "flex justify-between items-center"
              : "flex flex-col gap-1.5"
          } md:flex md:flex-row md:justify-between md:items-center `}
        >
          <div className="text-text1 text-mobile_body1_m md:text-h4">
            {data.title}
          </div>
          <div className="flex items-center justify-between md:gap-5">
            {!isFaq && (
              <p className="text-subtext2 text-mobile_body4_r md:text-body2_m">
                {"2024. 01. 08"}
              </p>
            )}
            <button
              className="flex justify-center items-center p-0.5 cursor-pointer"
              onClick={onClick}
            >
              <Image
                src={isOpen ? keyboardArrowUp : keyboardArrowDown}
                alt={"arrow"}
                width={28}
                height={28}
              />
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="w-full">
          {!isFaq && (
            <div className="flex justify-start items-start gap-10 ">
              <Image
                src={Q}
                alt={"Q"}
                width={56}
                height={57}
                className="hidden pl-2 md:block h-[57px]"
              />

              <div className="w-full flex flex-col gap-[14px] md:gap-[23px] ">
                <div className="text-subtext1 text-mobile_body1_r">
                  {data.body}
                </div>
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <div className="text-unselected text-mobile_body2_m">
                    {data.memberData.nickname}
                  </div>
                  <div
                    className="pl-1 pr-1.5 py-1 rounded-lg justify-start items-center gap-1.5 flex cursor-pointer"
                    onClick={() => {
                      setReportIsOpen(true);
                    }}
                  >
                    <Image
                      src={report}
                      alt={"report"}
                      width={16}
                      height={16}
                      className=""
                    />
                    <div className="hidden text-center text-icon text-body3_m md:block">
                      신고하기
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!isFaq &&
            (data.clubAnswerData ||
              myRoleType == "MANAGER" ||
              myRoleType == "ADMIN") && (
              <div className="flex gap-2 mb-3 items-center md:hidden">
                <Image
                  src={A}
                  alt={"A"}
                  width={14}
                  height={16}
                  className="h-4"
                />
                <p className="text-mobile_body1_sb text-subtext1">답변이에요</p>
              </div>
            )}
          {(isFaq ||
            (!isFaq &&
              (data.clubAnswerData ||
                myRoleType == "MANAGER" ||
                myRoleType == "ADMIN"))) && (
            <div
              className={`w-full flex-col justify-start items-start gap-8 flex`}
            >
              <div className="w-full items-start gap-8 flex md:pl-1">
                <Image
                  src={
                    profileImageMap[
                      isFaq
                        ? data.clubMemberData.profileType
                        : data.clubAnswerData
                        ? data.clubAnswerData!.clubMemberData.profileType
                        : myProfileType!
                    ]
                  }
                  alt={"club_img"}
                  width={56}
                  height={56}
                  className="hidden md:block rounded-full"
                />
                <div className="w-full flex justify-start items-start  relative">
                  <Image
                    src={polygon}
                    alt={"polygon"}
                    width={34}
                    height={30.5}
                    className="hidden absolute left-[-16px] top-[8px] md:block"
                  />
                  {!isFaq && !data.clubAnswerData ? (
                    <div className="w-full flex px-3 py-2.5 gap-2.5 bg-hover rounded-[12px] justify-between items-center text-subtext2 text-mobile_body1_r  md:body1_r md:px-6 md:py-5 md:gap-4  ">
                      <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="답변을 입력해주세요."
                        className="w-full py-[5px] rounded-[12px] bg-searchbar text-subtext1 text-mobile_body1_r md:py-1.5 md:text-body1_r focus:outline-none placeholder:text-subtext1"
                      />
                      <div>
                        <SendBtn onClick={() => {}} />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex p-3 bg-hover rounded-[12px] justify-start items-center text-subtext2 text-mobile_body1_r md:body1_r  md:p-6 ">
                      {isFaq ? data.body : data.clubAnswerData!.body}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {reportIsOpen && (
        <div style={{ zIndex: 1000 }}>
          <div className="md:hidden">
            <ReportBottomSheet
              onClose={() => setReportIsOpen(false)}
              onSubmit={() => {}}
            />
          </div>
          <div className="hidden md:block">
            <ReportModal
              onClose={() => setReportIsOpen(false)}
              onSubmit={() => {}}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDropdown;