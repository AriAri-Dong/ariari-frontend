"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useResponsive from "@/hooks/useResponsive";
import { usePostRecruitmentMutation } from "@/hooks/club/recruitment/useClubRecruitmentMutation";

import GuideBox from "@/components/card/guideBox";
import TextInputWithCounter from "@/components/input/textInputWithCounter";
import TextareaWithErrortext from "@/components/input/textareaWithErrortext";
import RadioBtn from "@/components/button/radioBtn";
import ImageUpload from "@/components/image/imageUploade";
import RecruitmentSlideContainer from "../components/recruitmentContainer";
import TransparentSmallBtn from "@/components/button/basicBtn/transparentSmallBtn";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import Alert from "@/components/alert/alert";
import DeleteBtn from "@/components/button/iconBtn/deleteBtn";
import RangeCalendar from "@/components/calendar/rangeCalendar";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import NotiPopUp from "@/components/modal/notiPopUp";

import { RecruitmentData, RecruitmentNoteData } from "@/types/recruitment";
import {
  RECRUITMENT_GUIDE_DATA_MOBILE,
  RECRUITMENT_GUIDE_DATA_PC,
} from "@/data/guideBox";
import RecruitmentPreviewForm from "../components/RecruitmentPreviewForm";
import { getClubRecruitmentList, postRecruitment } from "@/api/recruitment/api";

const CreateSection = () => {
  const isMdUp = useResponsive("md");
  const router = useRouter();
  const params = useSearchParams();
  const clubId = params.get("clubId") ?? "";

  //이전 모집공고
  const [previousRecruitmentList, setPrevRecruitmentList] = useState<
    RecruitmentData[]
  >([]);
  //선택된 이전 모집공고
  const [selectedRecruitment, setSelectedRecruitment] =
    useState<RecruitmentData | null>(null);

  const [title, setTitle] = useState<string>(""); //제목
  const [imageUrl, setImageUrl] = useState<string | null>(
    null // 서버에서 받은 이미지
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [procedureType, setProcedureType] = useState<"DOCUMENT" | "INTERVIEW">(
    "DOCUMENT"
  ); // 모집 절차
  const [date, setDate] = useState<[Date | null, Date | null]>([null, null]); // [시작날짜.마감날짜]
  const [limits, setLimits] = useState<number | null>(null); //모집 인원
  const [body, setBody] = useState<string>(""); //활동 내용
  const [items, setItems] = useState<RecruitmentNoteData[]>([
    {
      question: "",
      answer: "",
    },
  ]); // 추가 항목

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  const { mutate: postRecruitment } = usePostRecruitmentMutation({
    clubId,
    onSuccess: () => {
      setAlertMessage("정상 등록되었습니다.");
      router.replace(`/club/recruitment?clubId=${clubId}`);
    },
    onError: () => {
      setAlertMessage("문제가 발생했습니다.");
    },
  });

  // 추가 항목 추가 함수
  const addInterviewQuestion = () => {
    setItems((prev) => [...prev, { question: "", answer: "" }]);
  };

  // 추가 항목 삭제 함수
  const removeInterviewQuestion = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
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

  // 날짜 겹치는 모집공고 확인
  const isOverlapping = (
    recruitment: RecruitmentData,
    [newStartDate, newEndDate]: [Date | null, Date | null]
  ): boolean => {
    if (!newStartDate || !newEndDate) return false;
    const startDate = new Date(recruitment.startDateTime);
    const endDate = new Date(recruitment.endDateTime);
    return newStartDate <= endDate && newEndDate >= startDate;
  };
  const overlappingRecruitments = previousRecruitmentList.filter(
    (recruitment) => isOverlapping(recruitment, date)
  );

  // 이미지 url 파일로 변환
  const fetchImageAsFile = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], "image", { type: blob.type });
      setImageFile(file);
    } catch (error) {
      setAlertMessage("이미지 업로드에 실패했습니다.");
      setImageUrl(null);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  // Formdata 형식으로 반환
  const createFormData = () => {
    const formData = new FormData();

    formData.append(
      "saveReq",
      JSON.stringify({
        title: title,
        body: body,
        procedureType: procedureType,
        limits: limits,
        startDateTime: date[0] ? date[0].toISOString() : "",
        endDateTime: date[1] ? date[1].toISOString() : "",
        recruitmentNotes: items.map((item) => ({
          question: item.question,
          answer: item.answer,
        })),
      })
    );

    if (imageFile) {
      formData.append("file", imageFile);
    }

    return formData;
  };
  // 제출 핸들러
  const handleSubmit = () => {
    setIsModalOpen(false);
    const data = createFormData();
    postRecruitment(data);
  };
  const checkValidity = () => {
    const emptyItem = items.find(
      (item) => !item.question.trim() || !item.answer.trim()
    );

    if (!title.trim()) {
      setAlertMessage("제목을 입력해주세요");
    } else if (!imageFile) {
      setAlertMessage("이미지를 추가해주세요");
    } else if (!date[0] || !date[1]) {
      setAlertMessage("모집 기간를 설정해주세요");
    } else if (date[1] && date[1] < new Date()) {
      setAlertMessage("모집 마감일은 현재 날짜 이후여야 합니다.");
    } else if (overlappingRecruitments.length > 0) {
      // 이전 모집공고와 겹치는 날짜 확인
      setIsNoticeModalOpen(true);
    } else if (limits === null || limits <= 0) {
      setAlertMessage("모집 인원을 1명 이상 입력해주세요");
    } else if (!body.trim()) {
      setAlertMessage("활동 내용을 입력해주세요");
    } else if (emptyItem) {
      setAlertMessage("추가 항목의 질문과 답변을 모두 입력 또는 삭제해주세요.");
    } else {
      setIsPreviewOpen(false);
      createFormData();
      setIsModalOpen(true);
    }
  };

  // 이전 모집공고 클릭시
  useEffect(() => {
    if (selectedRecruitment) {
      setTitle(selectedRecruitment.title);
      setImageUrl(selectedRecruitment.posterUri);
      fetchImageAsFile(selectedRecruitment.posterUri);
      setProcedureType(selectedRecruitment.procedureType);
      setLimits(selectedRecruitment.limits);
      setBody(selectedRecruitment.body);
      if (selectedRecruitment.recruitmentNoteDataList.length) {
        setItems(selectedRecruitment.recruitmentNoteDataList);
      } else {
        setItems([{ question: "", answer: "" }]);
      }
      if (selectedRecruitment.procedureType === "INTERVIEW") {
        setProcedureType("INTERVIEW");
      } else {
        setProcedureType("DOCUMENT");
      }
    }
  }, [selectedRecruitment]);

  // 이전 모집공고 불러오기
  useEffect(() => {
    if (clubId) {
      const fetchPrevRecruitment = async () => {
        try {
          const data = await getClubRecruitmentList(clubId);
          setPrevRecruitmentList(data!.recruitmentDataList);
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchPrevRecruitment();
    }
  }, [clubId]);

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
          <h3 className="flex mb-[14px] text-mobile_h3 md:mb-2.5 md:text-h3">
            모집공고 이미지
            <span className="pl-1 text-noti text-mobile_body3_m ">*</span>
          </h3>
          {isMdUp && (
            <p className="md:mb-[18px] text-subtext2 md:text-body1_r">
              유해한 내용이 포함된 사진일 경우, 별도의 안내 없이 사진이 삭제
              처리되며 서비스 이용에 제한이 있을 수 있습니다.
              <br />
              이미지 파일 업로드(JPG, JPEG, PNG 지원)
            </p>
          )}
          <ImageUpload
            uploadedImage={imageUrl}
            setUploadedImage={setImageUrl}
            setUploadedFile={setImageFile}
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
          <RangeCalendar
            placeholder="모집 공고 게시 기간"
            onDateChange={([startDate, endDate]) => {
              setDate([startDate, endDate]);
            }}
          />
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
            maxLength={2000}
            className="md:h-[680px]"
            counter={isMdUp ? true : false}
            placeholder="활동내용을 입력해주세요"
            errorMessage={
              body.length === 2000 ? "최대 2000자까지 작성 가능합니다." : ""
            }
          />
        </div>
      </section>
      <section>
        <div className="flex justify-between mt-8 mb-3 items-center">
          <h3 className="flex text-text1 text-h3">추가 항목</h3>
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
              {<DeleteBtn onClick={() => removeInterviewQuestion(index)} />}
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
        <TransparentSmallBtn
          title={"미리보기"}
          onClick={() => {
            setIsPreviewOpen(true);
          }}
        />
        <SmallBtn
          title={"등록하기"}
          onClick={checkValidity}
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
          description={
            isMdUp
              ? `모집공고 등록 후에는 지원서 양식 수정이 불가능해요.\n이대로 모집공고를 등록할까요?`
              : `모집공고 등록 후에는\n지원서 양식 수정이 불가능해요.`
          }
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
          title={title}
          body={body}
          imageUrl={imageUrl}
          date={date}
          limits={limits}
          procedureType={procedureType}
          recruitmentNoteDataList={items}
          prevRecruitmentList={previousRecruitmentList}
          onClose={() => {
            setIsPreviewOpen(false);
          }}
          onSubmit={checkValidity}
        />
      )}
      {isNoticeModalOpen && (
        <NotiPopUp
          onClose={() => setIsNoticeModalOpen(false)}
          title="모집 기간을 변경해 주세요."
          description={
            "새 모집 공고는 이전 공고 기간과\n겹치지 않도록 설정해주세요."
          }
          icon="warning"
          modalType="x-button"
        />
      )}
    </section>
  );
};

export default CreateSection;
