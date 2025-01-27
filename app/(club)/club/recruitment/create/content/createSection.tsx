"use client";

import { useState } from "react";

import useResponsive from "../../../../../../hooks/useResponsive";

import GuideBox from "@/components/card/guideBox";
import TextInputWithCounter from "@/components/input/textInputWithCounter";
import TextareaWithErrortext from "@/components/input/textareaWithErrortext";
import RadioBtn from "@/components/button/radioBtn";
import ImageUpload from "@/components/image/imageUploade";
import RecruitmentSlideContainer from "../components/recruitmentContainer";
import TransparentSmallBtn from "@/components/button/basicBtn/transparentSmallBtn";
import SmallButton from "@/components/button/smallButton";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import TransparentLargeBtn from "@/components/button/basicBtn/transparentLargeBtn";
import Alert from "@/components/alert/alert";

import {
  RECRUITMENT_GUIDE_DATA_MOBILE,
  RECRUITMENT_GUIDE_DATA_PC,
} from "@/data/guideBox";
import { RECRUITMENT_DATA } from "@/data/recruitment";
import { RecruitmentData } from "@/model/recruitment";

const CreateSection = () => {
  const isMdUp = useResponsive("md");

  const [previousRecruitmentList] =
    useState<RecruitmentData[]>(RECRUITMENT_DATA);
  const [selectedRecruitment, setSelectedRecruitment] =
    useState<RecruitmentData | null>(null);

  const [title, setTitle] = useState<string>("");
  const [activityContent, setActivityContent] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <section className="bg-background rounded-8 md:px-6 md:py-[26px]">
      <GuideBox
        data={
          isMdUp ? RECRUITMENT_GUIDE_DATA_PC : RECRUITMENT_GUIDE_DATA_MOBILE
        }
        className="mt-5 md:mt-0"
      />
      <section className="pb-[30px] mb-[30px] border-b border-menuborder md:pb-[40px] md:mb-[40px]">
        <h3 className="mb-2.5 mt-5 md:mt-10 text-text1 text-mobile_h3 md:text-h3">
          지난 모집공고 양식 불러오기
        </h3>
        <p className="mb-[18px] md:mb-5 text-subtext2 text-mobile_body3_r md:text-body1_r">
          지난 모집공고에서 작성한 양식을 그대로 불러올 수 있어요.
        </p>
        <RecruitmentSlideContainer
          previousRecruitmentList={previousRecruitmentList}
          selectedRecruitment={selectedRecruitment}
          handleClick={setSelectedRecruitment}
        />
      </section>
      <section className="flex flex-col gap-[30px] md:gap-8">
        <div>
          <h3 className="flex  mb-[14px] text-mobile_h3 md:mb-[18px] md:text-h3">
            모집공고 제목
            <span className="text-noti text-mobile_body3_m pl-1">*</span>
          </h3>
          <TextInputWithCounter
            value={title}
            onChange={handleTitleChange}
            maxLength={30}
            placeholder="모집공고 제목을 작성해주세요."
          />
        </div>
        <div>
          <h3 className="flex mb-[14px] text-mobile_h3 md:mb-[18px] md:text-h3">
            모집공고 이미지
            <span className="pl-1 text-noti text-mobile_body3_m ">*</span>
          </h3>
          <ImageUpload
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
          />
        </div>
        <div>
          <h3 className="flex mb-[14px] text-mobile_h3 md:mb-[18px] md:text-h3">
            모집절차
            <span className="pl-1 text-noti text-mobile_body3_m">*</span>
          </h3>
          <div className="flex gap-[14px] md:w-fit md:gpa-5">
            <RadioBtn
              isChecked={true}
              onClick={() => {}}
              label="서류"
              className="flex-grow md:p-2.5 md:pr-[48px] md:gap-2.5"
            />
            <RadioBtn
              isChecked={false}
              onClick={() => {}}
              label="서류 · 면접"
              className="flex-grow md:p-2.5 md:pr-[48px] md:gap-2.5 "
            />
          </div>
        </div>
        <div>
          <h3 className="flex text-mobile_h3 mb-[14px] md:mb-[18px] md:text-h3">
            모집 시작일
            <span className="text-noti text-mobile_body3_m pl-1">*</span>
          </h3>
        </div>
        <div>
          <h3 className="flex text-mobile_h3 mb-[14px] md:mb-[18px] md:text-h3">
            모집 마감일
            <span className="text-noti text-mobile_body3_m pl-1">*</span>
          </h3>
        </div>
        <div>
          <h3 className="flex text-mobile_h3 mb-[14px] md:mb-[18px] md:text-h3">
            모집 인원
            <span className="text-noti text-mobile_body3_m pl-1">*</span>
          </h3>
          <div className="flex w-full justify-between px-4 py-3 bg-searchbar text-mobile_body1_r md:w-[200px] md:text-h4  md:py-[13px] md:px-[22px] rounded-xl  focus-within:border focus-within:border-indigo-300 ">
            <input
              type="number"
              placeholder={isMdUp ? "" : "모집인원을 입력해 주세요."}
              className="md:w-[142px] border-none outline-none bg-searchbar text-subtext2 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none "
            />
            <p className="text-unselected">명</p>
          </div>
        </div>
        <div>
          <h3 className="flex text-mobile_h3 mb-[14px] md:mb-[18px] md:text-h3">
            활동 내역
            <span className="text-noti text-mobile_body3_m pl-1">*</span>
          </h3>
          <TextareaWithErrortext
            value={activityContent}
            onChange={(e) => setActivityContent(e)}
            maxLength={100}
            className="md:h-[680px]"
            counter={isMdUp ? true : false}
            errorMessage={
              activityContent.length === 100
                ? "최대 2000자까지 작성 가능합니다."
                : ""
            }
          />
        </div>
      </section>
      <section className="hidden md:flex justify-center gap-3 mt-[40px]">
        <TransparentSmallBtn title={"미리보기"} onClick={() => {}} />
        <SmallButton title={"등록하기"} onClick={() => {}} />
      </section>

      <section className=" md:hidden mt-[40px] ">
        <LargeBtn title={"미리보기"} onClick={() => {}} />
        <TransparentLargeBtn title={"등록하기"} onClick={() => {}} />
      </section>
      {alertMessage && (
        <Alert
          text={alertMessage}
          onClose={() => {
            setAlertMessage(null);
          }}
        />
      )}
    </section>
  );
};

export default CreateSection;
