import Image from "next/image";
import React, { useEffect, useState } from "react";
import close from "@/images/icon/close.svg";
import { ApplicationKeys, ApplyQuestionData } from "@/types/application";
import ApplicationInputFormMobile from "@/components/form/application/applicationFieldFormMobile";

interface ModalProps {
  onClose: () => void;
  selectedFields: ApplicationKeys[];
  portfolioCollected: boolean;
  documentQuestions: ApplyQuestionData[];
}

const ApplicationFormPeviewBottomSheet = ({
  onClose,
  selectedFields,
  portfolioCollected,
  documentQuestions,
}: ModalProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<
    Partial<Record<ApplicationKeys, string>>
  >({});
  const [name, setName] = useState<string>("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [url, setUrl] = useState<string>("");

  const formatPhoneNumber = (value: string) => {
    if (value.length <= 3) return value;
    if (value.length <= 7) return `${value.slice(0, 3)}-${value.slice(3)}`;
    return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
  };

  const handleInputChange = (fieldKey: ApplicationKeys, value: string) => {
    if (fieldKey === "phone") {
      const onlyNumbers = value.replace(/[^0-9]/g, "");
      const formattedValue = formatPhoneNumber(onlyNumbers);

      setInputValues((prev) => {
        return { ...prev, [fieldKey]: formattedValue };
      });
    } else {
      setInputValues((prev) => {
        return { ...prev, [fieldKey]: value };
      });
    }
  };

  // PDF 파일 선택 시 상태 업데이트
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  // 파일 제거
  const handleRemoveFile = () => {
    setFileName(null);
  };

  // 답변 입력 핸들러
  const handleAnswerChange = (index: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
    console.log(answers);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  // 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50">
      <div className="absolute inset-0" onClick={handleClose} />
      <div
        className={`relative w-full h-4/5 bg-background px-4 rounded-t-[24px] shadow-default transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        } flex flex-col`}
      >
        {/* 제목 영역 */}
        <div className="flex justify-between mt-[22px] mb-4">
          <h1 className="text-text1 text-mobile_h1_contents_title">
            지원서 양식 미리보기
          </h1>
          <Image
            src={close}
            alt={"닫기"}
            width={20}
            height={20}
            onClick={handleClose}
          />
        </div>
        {/* 구분선 */}
        <div className="h-[1px] bg-menuborder" />

        {/* 스크롤 가능한 내용 영역 */}
        <ApplicationInputFormMobile
          selectedFields={selectedFields}
          portfolioCollected={portfolioCollected}
          documentQuestions={documentQuestions}
          name={name}
          setName={setName}
          fileName={fileName}
          handleFileChange={handleFileChange}
          handleRemoveFile={handleRemoveFile}
          answers={answers}
          handleAnswerChange={handleAnswerChange}
          url={url}
          setUrl={setUrl}
          inputValues={inputValues}
          handleInputChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default ApplicationFormPeviewBottomSheet;
