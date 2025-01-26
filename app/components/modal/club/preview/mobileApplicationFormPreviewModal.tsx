import React, { useEffect, useState } from "react";
import Image from "next/image";
import vector from "@/images/icon/backVector.svg";
import CustomInput from "@/components/input/customInput";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import close from "@/images/icon/close.svg";
import FileBadge from "@/components/badge/fileBadge";
import RenderField from "@/(club)/club/components/renderField";
import { BADGE_ITEMS } from "@/data/club";

interface ModalProps {
  onClose: () => void;
  selectedFields: {
    name: string;
    type: "radio" | "text" | "textarea" | "date";
    options?: string[];
    maxLength?: number;
    placeholder?: string;
  }[];
  portfolioCollected: boolean;
  documentQuestions: { question: string }[];
}

const MobileApplicationFromPreviewModal = ({
  onClose,
  selectedFields,
  portfolioCollected,
  documentQuestions,
}: ModalProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleClose = () => {
    onClose();
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
  };

  // 정렬된 필드 순서로 렌더링
  const sortedFields = BADGE_ITEMS.filter((badge) =>
    selectedFields.some((field) => field.name === badge.name)
  );

  // 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-background z-50 flex flex-col
    justify-between pt-[46px] pb-5 px-4 md:hidden"
    >
      <div className="flex gap-2 mb-5">
        <Image
          src={vector}
          alt={"뒤로가기"}
          width={24}
          height={24}
          onClick={handleClose}
          className="cursor-pointer"
        />
        <h1 className="text-text1 text-mobile_h1_contents_title">
          지원서 양식 미리보기
        </h1>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="flex flex-col gap-[30px]">
          {/* default 필드 */}
          <div className="flex flex-col gap-[18px]">
            <h3 className="flex text-text1 text-mobile_h3">
              이름
              <p className="text-noti text-mobile_body3_m ml-1">*</p>
            </h3>
            <CustomInput value={""} placeholder={"이름"} onChange={() => {}} />
          </div>
          {/* 선택 필드 */}
          {sortedFields.map((field, index) => (
            <RenderField key={index} field={field} index={index} />
          ))}
          {/* 포트폴리오 */}
          {portfolioCollected && (
            <div className="flex flex-col">
              <h3 className="flex text-text1 text-mobile_h3 mb-2.5">
                포트폴리오
              </h3>
              <p className="text-[#7D8595] text-mobile_body3_r mb-[14px]">
                포트폴리오 수집 목적 문구
              </p>
              <CustomInput
                value={""}
                placeholder={"게시물 주소(URL)를 입력해 주세요."}
                onChange={() => {}}
                className="mt-[14px]"
              />
              {fileName ? (
                <div className="flex items-center gap-2 mt-[14px]">
                  <Image
                    src={close}
                    alt={"삭제"}
                    width={20}
                    height={20}
                    onClick={handleRemoveFile}
                    className="cursor-pointer"
                  />
                  <FileBadge fileName={fileName} />
                </div>
              ) : null}
              <LargeBtn
                title={"pdf 파일 첨부"}
                onClick={() =>
                  document.getElementById("fileInputMobile")?.click()
                }
                className="mt-[14px]"
              />
              <input
                id="fileInputMobile"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}
          {/* 문항 */}
          {documentQuestions
            .filter((item) => item.question.trim() !== "")
            .map((item, index) => {
              const answer = answers[index] || "";
              const isOverMaxLength = answer.length > 50;

              return (
                <div className="flex flex-col gap-[18px]" key={index}>
                  <h3 className="flex text-text1 text-mobile_h3">
                    {item.question}
                  </h3>
                  <CustomInput
                    value={answer}
                    placeholder={"답변을 작성해 주세요."}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    maxLength={50}
                  />
                  {isOverMaxLength && (
                    <p className="text-noti text-mobile_body3_r mt-[-14px] ml-4">
                      최대 50자까지 작성 가능합니다.
                    </p>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MobileApplicationFromPreviewModal;
