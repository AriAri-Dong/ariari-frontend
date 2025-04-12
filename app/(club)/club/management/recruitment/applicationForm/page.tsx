"use client";

import React, { useState } from "react";
import ClubInfoSection from "../../../content/clubInfoSection";
import Alert from "@/components/alert/alert";
import useResponsive from "@/hooks/useResponsive";
import NoticeBanner from "@/components/banner/noticeBanner";
import CustomInput from "@/components/input/customInput";
import IconBtn from "@/components/button/withIconBtn/IconBtn";
import ToggleBadge from "@/components/badge/toggleBadge";
import Contour from "@/components/bar/contour";
import DeleteBtn from "@/components/button/iconBtn/deleteBtn";
import RadioBtn from "@/components/button/radioBtn";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import TransparentSmallBtn from "@/components/button/basicBtn/transparentSmallBtn";
import ApplicationFromPreviewModal from "@/components/modal/club/preview/applicationFormPreviewModal";
import { BADGE_ITEMS, BADGE_TITLES } from "@/data/club";
import MobileApplicationFromPreviewModal from "@/components/modal/club/preview/mobileApplicationFormPreviewModal";
import LeftMenu from "@/(club)/club/components/menu/leftMenu";
import ApplicationFormPeviewBottomSheet from "@/components/bottomSheet/preview/applicationPreviewBottomSheet";
import MobileMenu from "@/(club)/club/components/menu/mobileMenu";
import ClubInfoWrapper from "@/(club)/club/content/clubInfoWrapper";
import { ApplicationKeys, ApplyQuestionData } from "@/types/application";
import { APPLICATION_DISPLAY_INFO } from "@/data/application";

const ApplicationFormPage = () => {
  const isMdUp = useResponsive("md");

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [selectedBadges, setSelectedBadges] = useState<ApplicationKeys[]>([]);
  const [documentQuestions, setDocumentQuestions] = useState<
    ApplyQuestionData[]
  >([]);
  const [portfolioCollection, setPortfolioCollection] = useState<string>("");
  const [isPortfolioCollected, setIsPortfolioCollected] =
    useState<boolean>(true);
  const [openPreview, setOpenPreview] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 20) {
      setName(inputValue);
      setNameError(null);
    } else {
      setNameError("이름은 최대 20자까지 작성 가능합니다.");
    }
  };

  const handleBadgeClick = (text: ApplicationKeys) => {
    setSelectedBadges((prev) =>
      prev.includes(text)
        ? prev.filter((item) => item !== text)
        : [...prev, text]
    );
  };

  const addDocumentQuestion = () => {
    setDocumentQuestions((prev) => [...prev, { id: "", body: "" }]);
  };

  const removeDocumentQuestion = (index: string) => {
    if (documentQuestions.length > 1) {
      setDocumentQuestions((prev) => prev.filter((item) => item.id !== index));
    }
  };

  const handleDocumentQuestionChange = (
    index: string,
    field: "body",
    value: string
  ) => {
    setDocumentQuestions((prevQuestions) =>
      prevQuestions.map((item, i) =>
        item.id === index ? { ...item, [field]: value } : item
      )
    );
  };

  const togglePortfolioCollection = (isCollected: boolean) => {
    setIsPortfolioCollected(isCollected);
    if (!isCollected) {
      setPortfolioCollection("");
    }
  };

  const handlePreview = () => {
    setOpenPreview(true);
  };

  return (
    <>
      <div className="bg-sub_bg flex justify-center items-center w-full pb-20 md:pb-[124px]">
        <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 md:mt-8 md:px-5">
          <MobileMenu />
          <div className="flex lg:gap-9">
            {/* 임시 메뉴 */}
            <LeftMenu />
            <div className="w-full bg-white rounded-lg p-5 md:px-6 md:py-[26px]">
              <NoticeBanner
                text={"모집공고 게시 중에는 지원서 양식 수정이 불가능합니다."}
              />
              <h3 className="flex text-text1 text-mobile_h2 md:text-h3 mt-[30px] md:mt-10 mb-[14px]">
                이름
                <p className="text-noti text-mobile_body3_m ml-1">*</p>
              </h3>
              <CustomInput
                value={name}
                placeholder={"이름"}
                onChange={handleNameChange}
              />
              {nameError && (
                <p className="text-noti text-mobile_body3_r ml-4 mt-1">
                  {nameError}
                </p>
              )}
              <div className="flex justify-between items-center mt-[30px] md:mt-10">
                <h3 className="text-text1 text-mobile_h2 md:text-h3">
                  지원서 양식
                </h3>
                <IconBtn
                  type={"reset"}
                  size={"small"}
                  title={isMdUp ? "초기화" : ""}
                  onClick={() => {
                    setName("");
                    setNameError(null);
                    setSelectedBadges([]);
                    setDocumentQuestions([{ id: "", body: "" }]);
                  }}
                />
              </div>
              <Contour className={"mt-2.5 mb-[14px]"} />
              <div className="flex flex-wrap gap-2.5">
                {Object.values(APPLICATION_DISPLAY_INFO).map((item) => (
                  <ToggleBadge
                    key={item.key}
                    text={item.name}
                    isSelected={selectedBadges.includes(item.key)}
                    onClick={() => handleBadgeClick(item.key)}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-[30px] md:mt-10">
                <h3 className="text-text1 text-mobile_h2 md:text-h3">
                  서류 문항
                </h3>
                <p
                  className="text-primary text-body3_m md:text-body1_m cursor-pointer"
                  onClick={addDocumentQuestion}
                >
                  + 추가
                </p>
              </div>
              <Contour className={"mt-2.5"} />
              {documentQuestions.map((docQuestion, index) => (
                <div className="flex flex-col" key={`doc-${index}`}>
                  <div className="flex justify-between mb-2.5 mt-[14px] md:mt-5 md:mb-[13px]">
                    <h3 className="text-text1 text-mobile_h4_sb md:text-h4_sb">{`문항 - ${
                      index + 1
                    }`}</h3>
                    {index !== 0 && (
                      <DeleteBtn
                        onClick={() => removeDocumentQuestion(index.toString())}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <CustomInput
                      value={docQuestion.body}
                      placeholder={"문항을 작성해주세요"}
                      onChange={(e) =>
                        handleDocumentQuestionChange(
                          index.toString(),
                          "body",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              ))}
              <h3 className="flex text-text1 text-mobile_h2 md:text-h3 mt-[30px] md:mt-10 mb-2">
                포토폴리오 수집 유무
                <p className="text-noti text-mobile_body3_m ml-1">*</p>
              </h3>
              <div className="flex gap-3 p-2 mb-2">
                <RadioBtn
                  isChecked={isPortfolioCollected}
                  label={"수집 받기"}
                  onClick={() => togglePortfolioCollection(true)}
                />
                <RadioBtn
                  isChecked={!isPortfolioCollected}
                  label={"수집받지 않기"}
                  onClick={() => togglePortfolioCollection(false)}
                />
              </div>
              <CustomInput
                value={portfolioCollection}
                placeholder={"포트폴리오 수집 목적을 입력해 주세요."}
                onChange={(e) => setPortfolioCollection(e.target.value)}
                disable={!isPortfolioCollected}
              />
              {/* 모바일 버튼 */}
              <div className="md:hidden felx flex-col mt-10">
                <LargeBtn title={"저장하기"} onClick={() => {}} />
                <button
                  className="flex justify-center items-center p-1 pt-[14px] w-full text-subtext2 text-mobile_body3_m"
                  onClick={handlePreview}
                >
                  미리보기
                </button>
              </div>
              {/* PC 버튼 */}
              <div className="hidden md:flex justify-center mt-12 gap-4">
                <TransparentSmallBtn
                  title={"미리보기"}
                  onClick={handlePreview}
                  round={true}
                />
                <SmallBtn title={"저장하기"} onClick={() => {}} round={true} />
              </div>
            </div>
          </div>
        </div>
        {isMdUp
          ? openPreview && (
              <ApplicationFromPreviewModal
                onClose={() => setOpenPreview(false)}
                portfolioCollected={isPortfolioCollected}
                selectedFields={selectedBadges}
                documentQuestions={documentQuestions}
              />
            )
          : openPreview && (
              <ApplicationFormPeviewBottomSheet
                onClose={() => setOpenPreview(false)}
                portfolioCollected={isPortfolioCollected}
                selectedFields={selectedBadges}
                documentQuestions={documentQuestions}
              />
            )}
        {alertMessage && (
          <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
        )}
      </div>
    </>
  );
};

export default ApplicationFormPage;
