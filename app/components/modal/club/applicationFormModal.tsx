import React, { useState, useEffect } from "react";
import Image from "next/image";
import CustomInput from "@/components/input/customInput";
import { BADGE_ITEMS } from "@/data/club";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import close from "@/images/icon/close.svg";
import eye from "@/images/icon/eye.svg";
import FileBadge from "@/components/badge/fileBadge";
import TextareaWithCounter from "@/components/textArea/textareaWithCounter";
import RenderField from "@/(club)/club/components/renderField";
import ApplicationInputForm from "@/components/form/application/applicationFieldForm";
import { ApplicationKeys, ApplyQuestionData } from "@/types/application";
import { getApplyForm } from "@/api/apply/api";

interface ModalProps {
  clubId: string;
  onClose: () => void;
}

const ApplicationFormModal = ({ onClose, clubId }: ModalProps) => {
  const [selectedFields, setSelectedFields] = useState<ApplicationKeys[]>([]);
  const [portfolioCollected, setPortfolioCollected] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [documentQuestions, setDocumentQuestions] = useState<
    ApplyQuestionData[]
  >([]);

  const [inputValues, setInputValues] = useState<
    Partial<Record<ApplicationKeys, string>>
  >({});
  const [name, setName] = useState<string>("");
  const [fileName, setFileName] = useState<string | null>(null);
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
  const handleAnswerChange = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
    console.log(answers);
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (clubId) {
      getApplyForm(clubId).then((res) => {
        setPortfolioCollected(res.portfolio);
        setDocumentQuestions(res.applyQuestionDataList);

        if (!res || !res.specialQuestionList) return;
        const data: ApplicationKeys[] = Object.keys(
          res.specialQuestionList
        ).filter(
          (key): key is ApplicationKeys =>
            res.specialQuestionList[key as ApplicationKeys] !== null
        );
        setSelectedFields(data);
      });
    }
  }, [clubId]);

  return (
    <div
      id="background"
      className="fixed flex-col gap-5 inset-0 z-50 flex
    items-center justify-center backdrop-blur-sm bg-black bg-opacity-50"
      //   onClick={(e) =>
      //     (e.target as HTMLDivElement).id === "background" && handleClose()
      //   }
    >
      <div
        className="absolute top-4 right-4 cursor-pointer bg-white p-2 border border-menuborder rounded-full"
        onClick={handleClose}
      >
        <Image src={close} alt={"닫기"} width={24} height={24} />
      </div>
      {/* Header */}
      <div
        className="bg-background flex w-[900px] h-14 rounded-[32px] 
    items-center justify-between py-[14px] px-6"
      >
        <ApplicationInputForm
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
      <div className="absolute bottom-10 flex items-center py-3 px-4 gap-3 rounded-36 bg-black_50">
        <Image src={eye} alt="눈" width={24} height={24} />
        <p className="text-background text-body1_sb">
          동아리 지원서 양식 미리보기
        </p>
      </div>
    </div>
  );
};

export default ApplicationFormModal;
