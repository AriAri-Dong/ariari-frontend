import Image from "next/image";
import React, { useEffect, useState } from "react";
import close from "@/images/icon/close.svg";
import Alert from "@/components/alert/alert";
import { INTERVIEWE_STYLE, INTERVIEWER } from "@/data/review";
import ProgressBar from "@/components/bar/progressBar";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import DeleteBtn from "@/components/button/iconBtn/deleteBtn";
import RadioBtn from "@/components/button/radioBtn";
import CustomInput from "@/components/input/customInput";
import PullDown from "@/components/pulldown/pullDown";
import CustomTextArea from "@/components/textArea/customTextArea";
import { AcceptanceReviewProps } from "@/types/components/review";

const AcceptanceReviewModal = ({
  onClose,
  onSubmit,
  className,
}: AcceptanceReviewProps) => {
  const [title, setTitle] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [interviewer, setInterviewer] = useState<string[]>([]);
  const [intervieweStyle, setIntervieweStyle] = useState<string[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // 문항과 질문 상태
  const [documentQuestions, setDocumentQuestions] = useState<
    { question: string; answer: string }[]
  >([{ question: "", answer: "" }]);

  const [interviewQuestions, setInterviewQuestions] = useState<
    { question: string; answer: string }[]
  >([{ question: "", answer: "" }]);

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
    setDocumentQuestions((prev) => [...prev, { question: "", answer: "" }]);
  };

  // 문항 삭제 함수
  const removeDocumentQuestion = (index: number) => {
    if (documentQuestions.length > 1) {
      setDocumentQuestions((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // 면접 질문 추가 함수
  const addInterviewQuestion = () => {
    setInterviewQuestions((prev) => [...prev, { question: "", answer: "" }]);
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
    field: "question" | "answer",
    value: string
  ) => {
    const updatedQuestions = [...documentQuestions];
    updatedQuestions[index][field] = value;
    setDocumentQuestions(updatedQuestions);
  };

  // 면접 질문 입력값 변경 처리
  const handleInterviewQuestionChange = (
    index: number,
    field: "question" | "answer",
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
    if (!intervieweStyle.length || !interviewer.length) {
      setAlertMessage("합격 전형과 면접 인원 정보를 선택해주세요.");
      return false;
    }

    // 서류 문항 검사
    for (let i = 0; i < documentQuestions.length; i++) {
      const docQuestion = documentQuestions[i];
      if (!docQuestion.question || !docQuestion.answer) {
        setAlertMessage(`서류 문항 ${i + 1}에 모든 값을 입력해주세요.`);
        return false;
      }
    }

    // 면접 질문 검사
    for (let i = 0; i < interviewQuestions.length; i++) {
      const intQuestion = interviewQuestions[i];
      if (!intQuestion.question || !intQuestion.answer) {
        setAlertMessage(`면접 질문 ${i + 1}에 모든 값을 입력해주세요.`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onClose();
      onSubmit();
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
        <div className="overflow-y-auto custom-scrollbar max-h-[calc(90vh-240px)]">
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
          <div className="flex gap-[14px] p-2">
            <RadioBtn isChecked={true} label={"서류"} onClick={() => {}} />
            <RadioBtn
              isChecked={false}
              label={"서류 · 면접"}
              onClick={() => {}}
            />
          </div>

          {/* 문항 추가 */}
          <div className="flex justify-between mt-7 mb-3 items-center">
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
          <div className="h-[1px] bg-menuborder" />
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
                  value={docQuestion.question}
                  placeholder={"문항을 작성해주세요"}
                  onChange={(e) =>
                    handleDocumentQuestionChange(
                      index,
                      "question",
                      e.target.value
                    )
                  }
                />
                <CustomTextArea
                  value={docQuestion.answer}
                  placeholder={"답변을 작성해주세요"}
                  onChange={(e) =>
                    handleDocumentQuestionChange(
                      index,
                      "answer",
                      e.target.value
                    )
                  }
                  className="min-h-[100px]"
                />
              </div>
            </div>
          ))}
          {/* 면접 질문 */}
          <div className="flex justify-between mt-7 mb-3 items-center">
            <h3 className="flex text-text1 text-h3">
              면접
              <span className="text-noti text-body1_m pl-1">*</span>
            </h3>
          </div>
          <div className="flex w-full">
            <div className="flex flex-row gap-5">
              <PullDown
                optionData={INTERVIEWE_STYLE}
                selectedOption={intervieweStyle}
                handleOption={setIntervieweStyle}
                optionSize={"mobile"}
                forceDropdown={true}
              />
              <PullDown
                optionData={INTERVIEWER}
                selectedOption={interviewer}
                handleOption={setInterviewer}
                optionSize={"mobile"}
                forceDropdown={true}
              />
              <div className="flex gap-2.5 border py-3 px-5 rounded-3xl self-center">
                <p className="flex text-text1 text-body2_m whitespace-nowrap">
                  면접 분위기
                  <span className="text-noti text-body1_m pl-1">*</span>
                </p>
                <ProgressBar align="horizontal" />
              </div>
            </div>
          </div>
          {/* 면접 질문 추가 */}
          <div className="flex justify-between mt-7 mb-3 items-center">
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
          <div className="h-[1px] bg-menuborder" />
          {interviewQuestions.map((intQuestion, index) => (
            <div className="flex flex-col" key={`int-${index}`}>
              <div className="flex justify-between mt-5 mb-[14px]">
                <h3 className="text-text1 text-h4_sb">{`질문 - ${
                  index + 1
                }`}</h3>
                {index !== 0 && (
                  <DeleteBtn onClick={() => removeInterviewQuestion(index)} />
                )}
              </div>
              <div className="flex flex-col gap-3">
                <CustomInput
                  value={intQuestion.question}
                  placeholder={"질문을 작성해주세요"}
                  onChange={(e) =>
                    handleInterviewQuestionChange(
                      index,
                      "question",
                      e.target.value
                    )
                  }
                />
                <CustomTextArea
                  value={intQuestion.answer}
                  placeholder={"답변을 작성해주세요"}
                  onChange={(e) =>
                    handleInterviewQuestionChange(
                      index,
                      "answer",
                      e.target.value
                    )
                  }
                  className="min-h-[100px]"
                />
              </div>
            </div>
          ))}
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
