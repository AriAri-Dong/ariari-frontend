import Image from "next/image";
import React, { useEffect, useState } from "react";
import close from "@/images/icon/close.svg";
import Alert from "@/components/alert/alert";
import ProgressBar from "@/components/bar/progressBar";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import DeleteBtn from "@/components/button/iconBtn/deleteBtn";
import RadioBtn from "@/components/button/radioBtn";
import CustomInput from "@/components/input/customInput";
import PullDown from "@/components/pulldown/pullDown";
import CustomTextArea from "@/components/textArea/customTextArea";
import {
  getInterviewRatioLabel,
  getInterviewRatioType,
  getInterviewType,
  getInterviewTypeLabel,
} from "@/utils/reviewMapping";
import {
  InterviewRatioType,
  InterviewType,
  PassReviewNote,
  PassReviewSaveReq,
  ProcedureType,
} from "@/types/review";
import { AcceptanceReviewProps } from "@/types/components/review";
import { INTERVIEWE_STYLE, INTERVIEWER } from "@/data/review";

const AcceptanceReviewModal = ({
  onClose,
  onSubmit,
  className,
}: AcceptanceReviewProps) => {
  const [title, setTitle] = useState<string>("");
  const [procedureType, setProcedureType] = useState<ProcedureType | null>(
    null
  );
  const [interviewType, setInterviewType] = useState<InterviewType | null>(
    null
  );
  const [interviewRatioType, setInterviewerRatioType] =
    useState<InterviewRatioType | null>(null);
  const [interviewMood, setInterviewerMood] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // 문항과 질문 상태
  const [documentQuestions, setDocumentQuestions] = useState<PassReviewNote[]>([
    { title: "", body: "", noteType: "DOCUMENT" },
  ]);

  const [interviewQuestions, setInterviewQuestions] = useState<
    PassReviewNote[]
  >([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 문항 추가 함수
  const addDocumentQuestion = () => {
    setDocumentQuestions((prev) => [
      ...prev,
      { title: "", body: "", noteType: "DOCUMENT" },
    ]);
  };

  // 문항 삭제 함수
  const removeDocumentQuestion = (index: number) => {
    if (documentQuestions.length > 1) {
      setDocumentQuestions((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // 면접 질문 추가 함수
  const addInterviewQuestion = () => {
    setInterviewQuestions((prev) => [
      ...prev,
      { title: "", body: "", noteType: "INTERVIEW" },
    ]);
  };

  // 면접 질문 삭제 함수
  const removeInterviewQuestion = (index: number) => {
    if (interviewQuestions.length > 1) {
      setInterviewQuestions((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // 문항 입력값 변경 처리
  const handleDocumentQuestionChange = (
    index: number,
    field: "title" | "body",
    value: string
  ) => {
    const updatedQuestions = [...documentQuestions];
    updatedQuestions[index][field] = value;
    setDocumentQuestions(updatedQuestions);
  };

  // 면접 질문 입력값 변경 처리
  const handleInterviewQuestionChange = (
    index: number,
    field: "title" | "body",
    value: string
  ) => {
    const updatedQuestions = [...interviewQuestions];
    updatedQuestions[index][field] = value;
    setInterviewQuestions(updatedQuestions);
  };

  // 유효성 검사 함수
  const validateForm = () => {
    // 제목 검사
    const titleInput = document.querySelector(
      "input[placeholder='합격후기 제목을 작성해주세요']"
    ) as HTMLInputElement;
    if (!titleInput.value) {
      setAlertMessage("합격후기 제목을 작성해주세요.");
      titleInput.focus();
      return false;
    }

    // 합격 전형 검사
    if (!procedureType) {
      setAlertMessage("합격 전형을 선택해주세요.");
      return false;
    }
    // 면접인 경우
    if (procedureType === "INTERVIEW") {
      // 면접 전형 검사
      if (!interviewType || !interviewRatioType) {
        setAlertMessage("면접 전형과 면접 인원 정보를 선택해주세요.");
        return false;
      }
      // 면접 질문 검사
      for (let i = 0; i < interviewQuestions.length; i++) {
        const intQuestion = interviewQuestions[i];
        if (!intQuestion.title || !intQuestion.body) {
          setAlertMessage(`면접 질문 ${i + 1}에 모든 값을 입력해주세요.`);
          return false;
        }
      }
    }
    // 서류 문항 검사
    for (let i = 0; i < documentQuestions.length; i++) {
      const docQuestion = documentQuestions[i];
      if (!docQuestion.title || !docQuestion.body) {
        setAlertMessage(`서류 문항 ${i + 1}에 모든 값을 입력해주세요.`);
        return false;
      }
    }

    const req: PassReviewSaveReq = {
      title,
      procedureType,
      ...(interviewType && { interviewType }),
      ...(interviewRatioType && { interviewRatioType }),
      ...(interviewMood && { interviewMood }),
      passReviewNotes: [...documentQuestions, ...interviewQuestions],
    };

    return req;

    // return true;
  };

  const handleSubmit = () => {
    const req = validateForm();
    if (req) {
      onSubmit(req);
      onClose();
    }
  };

  // 스크롤 금지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      id="background"
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50"
      onClick={(e) =>
        (e.target as HTMLDivElement).id === "background" && onClose()
      }
    >
      <div
        className={`bg-white p-5 shadow-modal rounded-2xl w-[826px] max-h-[90vh]`}
      >
        {/* title 영역 */}
        <div className="flex justify-between mb-5">
          <h1 className="text-text1 text-h1_contents_title">
            합격후기 작성하기
          </h1>
          <Image
            src={close}
            alt={"닫기"}
            width={24}
            height={24}
            onClick={handleClose}
            className="md:w-6 md:h-6 cursor-pointer"
          />
        </div>
        <div className="h-[1px] bg-menuborder" />

        {/* content 영역 (스크롤 가능한 영역) */}
        <div className="overflow-y-auto custom-scrollbar max-h-[calc(90vh-240px)] overflow-x-visible">
          {/* 제목 */}
          <h3 className="flex text-text1 text-h3 mt-[22px] mb-[18px]">
            합격후기 제목
            <span className="text-noti text-body1_m pl-1">*</span>
          </h3>
          <CustomInput
            value={title}
            placeholder={"합격후기 제목을 작성해주세요"}
            onChange={handleTitleChange}
          />
          {/* 합격 전형 */}
          <h3 className="flex text-text1 text-h3 mt-7 mb-3">
            합격 전형
            <span className="text-noti text-body1_m pl-1">*</span>
          </h3>
          <div className="flex gap-[14px]">
            <RadioBtn
              isChecked={procedureType === "DOCUMENT"}
              label={"서류"}
              onClick={() => {
                setProcedureType("DOCUMENT");
              }}
            />
            <RadioBtn
              isChecked={procedureType === "INTERVIEW"}
              label={"서류 · 면접"}
              onClick={() => {
                setProcedureType("INTERVIEW");
                setInterviewQuestions([
                  { title: "", body: "", noteType: "INTERVIEW" },
                ]);
              }}
            />
          </div>

          {/* 문항 추가 */}
          <div className="flex justify-between mt-7 pb-3 items-center border-b border-menuborder">
            <h3 className="flex text-text1 text-h3">
              서류 문항
              <span className="text-noti text-body1_m pl-1">*</span>
            </h3>
            <p
              className="text-primary text-body1_m cursor-pointer"
              onClick={addDocumentQuestion}
            >
              + 추가
            </p>
          </div>
          {documentQuestions.map((docQuestion, index) => (
            <div className="flex flex-col" key={`doc-${index}`}>
              <div className="flex justify-between mt-5 mb-[14px]">
                <h3 className="text-text1 text-h4_sb">{`문항 - ${
                  index + 1
                }`}</h3>
                {index !== 0 && (
                  <DeleteBtn onClick={() => removeDocumentQuestion(index)} />
                )}
              </div>
              <div className="flex flex-col gap-3">
                <CustomInput
                  value={docQuestion.title}
                  placeholder={"문항을 작성해주세요"}
                  onChange={(e) =>
                    handleDocumentQuestionChange(index, "title", e.target.value)
                  }
                />
                <CustomTextArea
                  value={docQuestion.body}
                  placeholder={"답변을 작성해주세요"}
                  onChange={(e) =>
                    handleDocumentQuestionChange(index, "body", e.target.value)
                  }
                  className="min-h-[100px]"
                />
              </div>
            </div>
          ))}
          {/* 면접 질문 */}
          {procedureType === "INTERVIEW" && (
            <>
              <div className="flex justify-between mt-7 mb-3 items-center">
                <h3 className="flex text-text1 text-h3">
                  면접
                  <span className="text-noti text-body1_m pl-1">*</span>
                </h3>
              </div>
              <div className="flex w-full">
                <div className="flex flex-row gap-5">
                  <PullDown
                    optionData={INTERVIEWE_STYLE.slice(1)}
                    selectedOption={
                      interviewType
                        ? [getInterviewTypeLabel(interviewType)]
                        : [INTERVIEWE_STYLE[0].label]
                    }
                    handleOption={(value) => {
                      setInterviewType(getInterviewType(value[0]));
                    }}
                    optionSize={"mobile"}
                    forceDropdown={true}
                  />
                  <PullDown
                    optionData={INTERVIEWER.slice(1)}
                    selectedOption={
                      interviewRatioType
                        ? [getInterviewRatioLabel(interviewRatioType)]
                        : [INTERVIEWER[0].label]
                    }
                    handleOption={(value) => {
                      setInterviewerRatioType(getInterviewRatioType(value[0]));
                    }}
                    optionSize={"mobile"}
                    forceDropdown={true}
                  />
                  <div className="flex gap-2.5 border py-3 px-5 rounded-3xl self-center">
                    <p className="flex text-text1 text-body2_m whitespace-nowrap">
                      면접 분위기
                      <span className="text-noti text-body1_m pl-1">*</span>
                    </p>
                    <ProgressBar
                      align="horizontal"
                      currentStep={interviewMood}
                      setCurrentStep={setInterviewerMood}
                    />
                  </div>
                </div>
              </div>
              {/* 면접 질문 추가 */}

              <div className="flex justify-between mt-7 pb-3 items-center border-b border-menuborder">
                <h3 className="flex text-text1 text-h3">
                  면접 질문
                  <span className="text-noti text-body1_m pl-1">*</span>
                </h3>
                <p
                  className="text-primary text-body1_m cursor-pointer"
                  onClick={addInterviewQuestion}
                >
                  + 추가
                </p>
              </div>
              {interviewQuestions.map((intQuestion, index) => (
                <div className="flex flex-col" key={`int-${index}`}>
                  <div className="flex justify-between mt-5 mb-[14px]">
                    <h3 className="text-text1 text-h4_sb">{`질문 - ${
                      index + 1
                    }`}</h3>
                    {index !== 0 && (
                      <DeleteBtn
                        onClick={() => removeInterviewQuestion(index)}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <CustomInput
                      value={intQuestion.title}
                      placeholder={"질문을 작성해주세요"}
                      onChange={(e) =>
                        handleInterviewQuestionChange(
                          index,
                          "title",
                          e.target.value
                        )
                      }
                    />
                    <CustomTextArea
                      value={intQuestion.body}
                      placeholder={"답변을 작성해주세요"}
                      onChange={(e) =>
                        handleInterviewQuestionChange(
                          index,
                          "body",
                          e.target.value
                        )
                      }
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              ))}
            </>
          )}
          <div className="h-[57px]" />
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end pt-6">
          <SmallBtn title="등록하기" onClick={handleSubmit} />
        </div>
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default AcceptanceReviewModal;
