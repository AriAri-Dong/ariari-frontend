import React, { useState, useEffect } from "react";
import Image from "next/image";
import CustomInput from "@/components/input/customInput";
import { BADGE_ITEMS } from "@/data/club";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import close from "@/images/icon/close.svg";
import FileBadge from "@/components/badge/fileBadge";
import TextareaWithCounter from "@/components/textArea/textareaWithCounter";
import RenderField from "@/(club)/club/components/renderField";

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

const ApplicationFromPreviewModal = ({
  onClose,
  selectedFields,
  portfolioCollected,
  documentQuestions,
}: ModalProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [url, setUrl] = useState<string>("");

  // PDF 파일 선택 시 파일 이름 업데이트
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  // 파일 삭제 처리
  const handleRemoveFile = () => {
    setFileName(null);
  };

  const handleClose = () => {
    onClose();
  };

  const sortedFields = BADGE_ITEMS.filter((badge) =>
    selectedFields.some((field) => field.name === badge.name)
  );

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
        (e.target as HTMLDivElement).id === "background" && handleClose()
      }
    >
      <div className="bg-white py-[26px] px-6 shadow-modal rounded-2xl w-[900px] max-h-[90vh] flex flex-col">
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-[18px]">
              <h3 className="flex text-text1 text-h3">
                이름
                <p className="text-noti text-body3_m ml-1">*</p>
              </h3>
              <CustomInput
                value={""}
                placeholder={"이름"}
                onChange={() => {}}
              />
            </div>
            {sortedFields.map((field, index) => (
              <RenderField key={index} field={field} index={index} />
            ))}
            {portfolioCollected && (
              <div className="flex flex-col">
                <h3 className="flex text-text1 text-h3 mb-2.5">포트폴리오</h3>
                <p className="text-[#7D8595] text-body1_r">
                  포트폴리오 수집 목적 문구
                </p>
                <div className="flex flex-wrap gap-4 mt-5">
                  {/* 파일 첨부 버튼 */}
                  <SmallBtn
                    title={"pdf 파일 첨부"}
                    onClick={() =>
                      document.getElementById("fileInput")?.click()
                    }
                    className="flex text-nowrap"
                  />
                  <input
                    id="fileInput"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {/* 파일 이름 표시 및 삭제 버튼 */}
                  {fileName && (
                    <div className="flex items-center gap-2">
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
                  )}

                  {/* URL 입력 필드 */}
                  <CustomInput
                    value={url}
                    placeholder={"게시물 주소(URL)를 입력해 주세요."}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            )}
            {documentQuestions
              .filter((item) => item.question.trim() !== "")
              .map((item, index) => (
                <div className="flex flex-col gap-[18px]" key={index}>
                  <h3 className="flex text-text1 text-h3">{item.question}</h3>
                  <TextareaWithCounter
                    value={""}
                    placeholder={"답변을 작성해 주세요."}
                    onChange={() => {}}
                    maxLength={50}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationFromPreviewModal;
