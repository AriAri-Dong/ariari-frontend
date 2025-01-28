"use client";

import { useEffect, useState } from "react";

import useResponsive from "@/hooks/useResponsive";
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
import DeleteBtn from "@/components/button/iconBtn/deleteBtn";
import CustomInput from "@/components/input/customInput";
import CustomTextArea from "@/components/textArea/customTextArea";
import RangeCalendar from "@/components/calendar/rangeCalendar";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import NotiPopUp from "@/components/modal/notiPopUp";
import RecruitmentPreviewForm from "../components/RecruitmentPreviewForm";

const CreateSection = () => {
  const isMdUp = useResponsive("md");
  //이전 모집공고
  const [previousRecruitmentList] =
    useState<RecruitmentData[]>(RECRUITMENT_DATA);
  //선택된 이전 모집공고
  const [selectedRecruitment, setSelectedRecruitment] =
    useState<RecruitmentData | null>(null);

  const [title, setTitle] = useState<string>(""); //제목
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); //이미지
  const [procedureType, setProcedureType] = useState<"DOCUMENT" | "INTERVIEW">(
    "DOCUMENT"
  ); // 모집 절차
  const [limits, setLimits] = useState<number | null>(null); //모집 인원
  const [body, setBody] = useState<string>(""); //활동 내용
  const [items, setItems] = useState<{ question: string; answer: string }[]>([
    { question: "", answer: "" },
  ]); // 추가 항목

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  // 추가 항목 추가 함수
  const addInterviewQuestion = () => {
    setItems((prev) => [...prev, { question: "", answer: "" }]);
  };

  // 추가 항목 삭제 함수
  const removeInterviewQuestion = (index: number) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // 추가 항목 입력값 변경 처리
  const handleInterviewQuestionChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const updatedQuestions = [...items];
    updatedQuestions[index][field] = value;
    setItems(updatedQuestions);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
    setAlertMessage("정상 등록되었습니다.");
  };
  const checkValidity = () => {
    const hasEmptyFields =
      !title.trim() || // 제목
      !uploadedImage || // 이미지
      limits === null ||
      limits <= 0 || // 모집 인원
      !body.trim() || // 활동 내용
      items.some(
        (item) => !item.question.trim() || !item.answer.trim() // 추가 항목
      );
    setIsPreviewOpen(false);

    if (hasEmptyFields) {
      setAlertMessage("미입력한 항목이 있습니다.");
      return;
    }
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (selectedRecruitment) {
      setTitle(selectedRecruitment.title);
      setUploadedImage(selectedRecruitment.posterUri);
      setProcedureType(selectedRecruitment.procedureType);
      setLimits(selectedRecruitment.limits);
      setBody(selectedRecruitment.body);
      //  setItems(selectedRecruitment.);
      if (selectedRecruitment.procedureType === "INTERVIEW") {
        setProcedureType("INTERVIEW");
      } else {
        setProcedureType("DOCUMENT");
      }
    }
  }, [selectedRecruitment]);

  return (
    <section className="bg-background rounded-8 md:px-6 md:py-[26px] mb-[124px]">
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
              isChecked={procedureType == "DOCUMENT"}
              onClick={() => {
                setProcedureType("DOCUMENT");
              }}
              label="서류"
              className="flex-grow md:p-2.5 md:pr-[48px] md:gap-2.5"
            />
            <RadioBtn
              isChecked={procedureType == "INTERVIEW"}
              onClick={() => {
                setProcedureType("INTERVIEW");
              }}
              label="서류 · 면접"
              className="flex-grow md:p-2.5 md:pr-[48px] md:gap-2.5 "
            />
          </div>
        </div>
        <div>
          <h3 className="flex text-mobile_h3 mb-[14px] md:mb-[18px] md:text-h3">
            모집 기간
            <span className="text-noti text-mobile_body3_m pl-1">*</span>
          </h3>
          <RangeCalendar placeholder="모집 공고 게시 기간" />
        </div>

        <div>
          <h3 className="flex text-mobile_h3 mb-[14px] md:mb-[18px] md:text-h3">
            모집 인원
            <span className="text-noti text-mobile_body3_m pl-1">*</span>
          </h3>
          <div className="flex w-full justify-between px-4 py-3 bg-searchbar text-mobile_body1_r md:w-[200px] md:text-h4  md:py-[13px] md:px-[22px] rounded-xl  focus-within:border focus-within:border-indigo-300 ">
            <input
              type="number"
              value={limits ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                setLimits(value === "" ? null : Number(value));
              }}
              placeholder={isMdUp ? "" : "모집인원을 입력해 주세요."}
              className="md:w-[142px] border-none outline-none bg-searchbar text-subtext2 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none "
            />
            <p className="text-unselected">명</p>
          </div>
        </div>
        <div>
          <h3 className="flex text-mobile_h3 mb-[14px] md:mb-[18px] md:text-h3">
            활동 내용
            <span className="text-noti text-mobile_body3_m pl-1">*</span>
          </h3>
          <TextareaWithErrortext
            value={body}
            onChange={(e) => setBody(e)}
            maxLength={100}
            className="md:h-[680px]"
            counter={isMdUp ? true : false}
            placeholder="활동내용을 입력해주세요"
            errorMessage={
              body.length === 100 ? "최대 2000자까지 작성 가능합니다." : ""
            }
          />
        </div>
      </section>
      <section>
        <div className="flex justify-between mt-8 mb-3 items-center">
          <h3 className="flex text-text1 text-h3">
            추가 항목
            <span className="text-noti text-body1_m pl-1">*</span>
          </h3>
          <p
            className="text-primary text-body1_m cursor-pointer"
            onClick={addInterviewQuestion}
          >
            + 추가
          </p>
        </div>
        <div className="h-[1px] bg-menuborder" />
        {items.map((item, index) => (
          <div className="flex flex-col" key={`int-${index}`}>
            <div className="flex justify-between mt-5 mb-[14px]">
              <h3 className="text-text1 text-h4_sb">{`항목 - ${index + 1}`}</h3>
              {index !== 0 && (
                <DeleteBtn onClick={() => removeInterviewQuestion(index)} />
              )}
            </div>
            <div className="flex flex-col gap-3">
              <TextInputWithCounter
                value={item.question}
                placeholder={"예) 활동장소/활동요일/회비"}
                onChange={(e) =>
                  handleInterviewQuestionChange(
                    index,
                    "question",
                    e.target.value
                  )
                }
                maxLength={10}
              />
              <TextareaWithErrortext
                value={item.answer}
                placeholder={"내용을 입력해 주세요."}
                onChange={(value) =>
                  handleInterviewQuestionChange(index, "answer", value)
                }
                className="min-h-[100px]"
                maxLength={100}
                errorMessage={
                  item.answer.length === 100
                    ? "최대 100자까지 작성 가능합니다."
                    : ""
                }
                counter={isMdUp ? true : false}
              />
            </div>
          </div>
        ))}
      </section>
      <section className="hidden md:flex justify-center gap-3 mt-[40px]">
        <TransparentSmallBtn title={"등록하기"} onClick={checkValidity} />
        <SmallBtn
          title={"미리보기"}
          onClick={() => {
            setIsPreviewOpen(true);
          }}
          className="h-[44px] flex flex-col items-center justify-center"
        />
      </section>

      <section className="flex flex-col items-center gap-5 md:hidden mt-[40px] mb-[80px]">
        <LargeBtn title={"등록하기"} onClick={checkValidity} />
        <button
          onClick={() => {
            setIsPreviewOpen(true);
          }}
          className="border-none py-1 px-1.5 text-subtext2 text-mobile_body3_m"
        >
          미리보기
        </button>
      </section>
      {alertMessage && (
        <Alert
          text={alertMessage}
          onClose={() => {
            setAlertMessage(null);
          }}
        />
      )}
      {isModalOpen && (
        <NotiPopUp
          onClose={() => setIsModalOpen(false)}
          title="모집공고를 등록할까요?"
          description={`모집공고 등록 후에는 지원서 양식 수정이 불가능해요.\n이대로 모집공고를 등록할까요?`}
          icon="registration"
          modalType="button"
          firstButton={handleSubmit}
          firstButtonText="등록하기"
          secondButtonText="취소하기"
          secondButton={() => setIsModalOpen(false)}
        />
      )}
      {isPreviewOpen && (
        <RecruitmentPreviewForm
          onClose={() => {
            setIsPreviewOpen(false);
          }}
          onSubmit={checkValidity}
        />
      )}
    </section>
  );
};

export default CreateSection;
