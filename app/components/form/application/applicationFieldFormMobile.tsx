import { BADGE_ITEMS } from "@/data/club";
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
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import RadioBtn from "@/components/button/radioBtn";
import { ApplicationFieldFormProps } from "./applicationFieldForm";

const ApplicationFieldFormMobile = ({
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
      <div className="flex flex-col gap-[30px]">
        {/* default 필드 */}
        <div className="flex flex-col gap-[18px]">
          <h3 className="flex text-text1 text-mobile_h3">
            이름
            <p className="text-noti text-mobile_body3_m ml-1">*</p>
          </h3>
          <CustomInput
            value={name}
            placeholder={"이름"}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        {/* 선택 필드 */}
        {selectedFields.map((item, index) => (
          <RenderField
            keyName={item}
            key={index}
            inputValues={inputValues}
            handleInputChange={handleInputChange}
          />
        ))}
        {/* 문항 */}
        {documentQuestions
          .filter((item) => item.body.trim() !== "")
          .map((item, index) => {
            const answer = answers[item.id] || "";
            const isOverMaxLength = answer.length > 50;

            return (
              <div className="flex flex-col gap-[18px]" key={item.id}>
                <h3 className="flex text-text1 text-mobile_h3">{item.body}</h3>
                <CustomInput
                  value={answer}
                  placeholder={"답변을 작성해 주세요."}
                  onChange={(e) => handleAnswerChange(item.id, e.target.value)}
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
      {/* 포트폴리오 */}
      {portfolioCollected && (
        <div className="flex flex-col pt-[30px]">
          <h3 className="flex text-text1 text-mobile_h3 mb-2.5">포트폴리오</h3>
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
          {portfolioType === "URL" && (
            <CustomInput
              value={url || ""}
              placeholder={"게시물 주소(URL)를 입력해 주세요."}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-[14px]"
            />
          )}
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
          {portfolioType === "FILE" && (
            <>
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplicationFieldFormMobile;
