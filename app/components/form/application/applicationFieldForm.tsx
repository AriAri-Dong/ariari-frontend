import Image from "next/image";
import close from "@/images/icon/close.svg";
import CustomInput from "../../input/customInput";
import {
  ApplicationKeys,
  ApplyQuestionData,
  SpecialQuestionList,
} from "@/types/application";
import RenderField from "@/(club)/club/components/renderField";
import { useEffect, useState } from "react";
import FileBadge from "@/components/badge/fileBadge";
import TextareaWithCounter from "@/components/textArea/textareaWithCounter";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import RadioBtn from "@/components/button/radioBtn";

export interface ApplicationFieldFormProps {
  selectedFields: ApplicationKeys[];
  portfolioCollected: boolean;
  name: string;
  setName: (value: string) => void;
  fileName: string | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: () => void;
  answers: Record<string, string>;
  handleAnswerChange: (index: string, value: string) => void;
  url: string | null;
  setUrl: (value: string) => void;
  documentQuestions: ApplyQuestionData[];
  inputValues: Partial<SpecialQuestionList>;
  handleInputChange: (fieldKey: ApplicationKeys, value: string) => void;
}
const ApplicationFieldForm = ({
  selectedFields,
  name,
  setName,
  fileName,
  handleFileChange,
  handleRemoveFile,
  answers,
  handleAnswerChange,
  url,
  setUrl,
  portfolioCollected,
  inputValues,
  handleInputChange,
  documentQuestions,
}: ApplicationFieldFormProps) => {
  const [portfolioType, setPortfolioType] = useState<"URL" | "FILE">("URL");

  const handlePortfolioTypeChange = (type: "URL" | "FILE") => {
    setPortfolioType(type);

    if (type === "FILE") {
      setUrl("");
    }

    if (type === "URL") {
      handleRemoveFile();
    }
  };

  useEffect(() => {
    if (fileName) {
      setPortfolioType("FILE");
    } else {
      setPortfolioType("URL");
    }
  }, [fileName]);
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-[18px]">
          <h3 className="flex text-text1 text-h3">
            이름
            <p className="text-noti text-body3_m ml-1">*</p>
          </h3>
          <CustomInput
            value={name}
            placeholder={"이름"}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        {selectedFields.map((item, index) => (
          <RenderField
            keyName={item}
            key={index}
            inputValues={inputValues}
            handleInputChange={handleInputChange}
          />
        ))}

        {documentQuestions &&
          documentQuestions
            .filter((item) => item.body.trim() !== "")
            .map((item, index) => {
              const answer = answers[item.id] || "";
              const isOverMaxLength = answer.length > 50;

              return (
                <div className="flex flex-col gap-[18px]" key={item.id}>
                  <h3 className="flex text-text1 text-h3">{item.body}</h3>
                  <TextareaWithCounter
                    value={answer}
                    placeholder={"답변을 작성해 주세요."}
                    onChange={(e) => handleAnswerChange(item.id, e)}
                    maxLength={50}
                  />
                </div>
              );
            })}
        {portfolioCollected && (
          <div className="flex flex-col">
            <h3 className="flex text-text1 text-h3 mb-2.5">포트폴리오</h3>
            <div className="flex gap-x-6 p-1 ml-1.5 flex-wrap">
              <RadioBtn
                isChecked={portfolioType === "URL"}
                label={"URL 입력"}
                onClick={() => {
                  handlePortfolioTypeChange("URL");
                }}
              />
              <RadioBtn
                isChecked={portfolioType === "FILE"}
                label={"파일 첨부"}
                onClick={() => {
                  handlePortfolioTypeChange("FILE");
                }}
              />
            </div>

            <div className="flex flex-wrap gap-4 mt-5">
              {/* 파일 첨부 버튼 */}
              {portfolioType === "FILE" && (
                <>
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
                </>
              )}

              {/* URL 입력 필드 */}
              {portfolioType === "URL" && (
                <CustomInput
                  value={url || ""}
                  placeholder={"게시물 주소(URL)를 입력해 주세요."}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationFieldForm;
