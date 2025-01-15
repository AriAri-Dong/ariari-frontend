import Image from "next/image";
import React, { useEffect, useState } from "react";
import close from "@/images/icon/close.svg";
import CustomInput from "../input/customInput";
import RadioBtn from "../button/radioBtn";
import DeleteBtn from "../button/iconBtn/deleteBtn";
import LargeBtn from "../button/basicBtn/largeBtn";
import PullDown from "../pulldown/pullDown";
import ProgressBar from "../bar/progressBar";
import Alert from "../alert/alert";

export const INTERVIEWER = [
  { id: 0, label: "면접인원" },
  { id: 1, label: "0명" },
  { id: 2, label: "1명" },
  { id: 3, label: "2명" },
  { id: 4, label: "3명" },
  { id: 5, label: "4명" },
  { id: 6, label: "5명" },
  { id: 7, label: "5명 이상" },
];

export const INTERVIEWE_STYLE = [
  { id: 0, label: "면접방식" },
  { id: 1, label: "온라인" },
  { id: 2, label: "오프라인" },
  { id: 3, label: "기타" },
];

interface BottomSheetProps {
  onClose: () => void;
  onSubmit: () => void;
  className?: string;
}

const AcceptanceReviewBottomSheet = ({
  onClose,
  onSubmit,
  className,
}: BottomSheetProps) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50">
      <div className="absolute inset-0" onClick={handleClose} />
      <div
        className={`relative w-full h-4/5 overflow-y-auto px-4 bg-background rounded-t-[24px] shadow-default transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* title 영역 */}
        <div className="flex justify-between mt-[22px] mb-4">
          <h1 className="text-text1 text-mobile_h1_contents_title">
            합격후기 작성하기
          </h1>
          <Image src={close} alt={"닫기"} width={20} height={20} />
        </div>
        {/* 구분선 */}
        <div className="h-[1px] bg-menuborder" />
        {/* content 영역 */}
        <div>
          <h3 className="flex text-text1 text-mobile_h2 mt-[22px] mb-2.5">
            합격후기 제목
            <span className="text-noti text-mobile_body3_m pl-1">*</span>
          </h3>
          <CustomInput
            value={title}
            placeholder={"합격후기 제목을 작성해주세요"}
            onChange={handleTitleChange}
          />
          <h3 className="flex text-text1 text-mobile_h2 mt-[30px] mb-2.5">
            합격 전형
            <span className="text-noti text-mobile_body3_m pl-1">*</span>
          </h3>
          <div className="flex gap-[14px] p-2">
            <RadioBtn isChecked={true} label={"서류"} onClick={() => {}} />
            <RadioBtn
              isChecked={false}
              label={"서류 · 면접"}
              onClick={() => {}}
            />
          </div>

          <div className="flex justify-between mt-[30px] mb-2.5 items-center">
            <h3 className="flex text-text1 text-mobile_h2">
              서류 문항
              <span className="text-noti text-mobile_body3_m pl-1">*</span>
            </h3>
            <p
              className="text-primary text-mobile_body3_m cursor-pointer"
              onClick={addDocumentQuestion}
            >
              + 추가
            </p>
          </div>
          <div className="h-[1px] bg-menuborder" />
          {documentQuestions.map((docQuestion, index) => (
            <div className="flex flex-col" key={`doc-${index}`}>
              <div className="flex justify-between mt-[14px] mb-2.5">
                <h3 className="text-text1 text-mobile_h4_sb">{`문항 - ${
                  index + 1
                }`}</h3>
                {index !== 0 && (
                  <DeleteBtn onClick={() => removeDocumentQuestion(index)} />
                )}
              </div>
              <div className="flex flex-col gap-2">
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
                <CustomInput
                  value={docQuestion.answer}
                  placeholder={"답변을 작성해주세요"}
                  onChange={(e) =>
                    handleDocumentQuestionChange(
                      index,
                      "answer",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-[30px] mb-2.5 items-center">
            <h3 className="flex text-text1 text-mobile_h2">
              면접
              <span className="text-noti text-mobile_body3_m pl-1">*</span>
            </h3>
          </div>
          <div className="flex w-full">
            <div className="flex flex-col">
              <div className="flex gap-[14px] mb-[14px]">
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
              </div>
              <div className="flex gap-[6px] border px-3 py-[6px] rounded-20">
                <p className="flex text-text1 text-mobile_body2_m whitespace-nowrap">
                  분위기
                  <span className="text-noti text-mobile_body3_m pl-1">*</span>
                </p>
                <ProgressBar align="horizontal" />
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-[30px] mb-2.5 items-center">
            <h3 className="flex text-text1 text-mobile_h2">
              면접 질문
              <span className="text-noti text-mobile_body3_m pl-1">*</span>
            </h3>
            <p
              className="text-primary text-mobile_body3_m cursor-pointer"
              onClick={addInterviewQuestion}
            >
              + 추가
            </p>
          </div>
          <div className="h-[1px] bg-menuborder" />
          {interviewQuestions.map((intQuestion, index) => (
            <div className="flex flex-col" key={`int-${index}`}>
              <div className="flex justify-between mt-[14px] mb-2.5">
                <h3 className="text-text1 text-mobile_h4_sb">{`질문 - ${
                  index + 1
                }`}</h3>
                {index !== 0 && (
                  <DeleteBtn onClick={() => removeInterviewQuestion(index)} />
                )}
              </div>
              <div className="flex flex-col gap-2">
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
                <CustomInput
                  value={intQuestion.answer}
                  placeholder={"답변을 작성해주세요"}
                  onChange={(e) =>
                    handleInterviewQuestionChange(
                      index,
                      "answer",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <div className="h-[113px] w-full bg-white" />
      </div>
      {/* 버튼 영역 */}
      <div className="fixed bottom-0 left-0 px-4 w-full">
        <div className="h-[6px] w-full bg-white" />
        <LargeBtn title={"등록하기"} onClick={handleSubmit} />
        <div className="h-6 w-full bg-white" />
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default AcceptanceReviewBottomSheet;
