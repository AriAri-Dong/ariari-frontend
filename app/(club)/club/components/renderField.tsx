import React from "react";
import RadioBtn from "@/components/button/radioBtn";
import TextInputWithCounter from "@/components/input/textInputWithCounter";
import CustomInput from "@/components/input/customInput";
import useResponsive from "@/hooks/useResponsive";
import TextareaWithCounter from "@/components/textArea/textareaWithCounter";
import SingleDateCalendar from "@/components/calendar/singleDateCalendar";
import { ApplicationKeys, SpecialQuestionList } from "@/types/application";
import { APPLICATION_DISPLAY_INFO } from "@/data/application";

interface RenderFieldProps {
  keyName: ApplicationKeys;
  inputValues: Partial<SpecialQuestionList>;
  handleInputChange: (key: ApplicationKeys, value: string) => void;
}

const RenderField: React.FC<RenderFieldProps> = ({
  keyName,
  inputValues,
  handleInputChange,
}) => {
  const isMdUp = useResponsive("md");
  const field = APPLICATION_DISPLAY_INFO[keyName];

  switch (field.type) {
    case "radio":
      return (
        <div className="flex flex-col gap-[14px] md:gap-[18px]">
          <h3 className="text-text1 text-mobile_h3 md:text-h3">{field.name}</h3>
          <div className="flex gap-x-6 p-1 ml-1.5 flex-wrap">
            {field.options?.map((option, idx) => (
              <RadioBtn
                key={idx}
                isChecked={inputValues[keyName] === option}
                label={option}
                onClick={() => {
                  handleInputChange(field.key, option);
                }}
              />
            ))}
          </div>
        </div>
      );

    case "text":
      // 연락처, 이메일, MBTI는 CustomInput 사용
      if (["연락처", "이메일", "MBTI"].includes(field.name)) {
        return (
          <div className="flex flex-col gap-[14px] md:gap-[18px]">
            <h3 className="text-text1 text-mobile_h3 md:text-h3">
              {field.name}
            </h3>
            <CustomInput
              value={inputValues[keyName] || ""}
              placeholder={field.placeholder || ""}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              maxLength={field.maxLength || 100}
            />
            {field.maxLength &&
              inputValues[keyName] &&
              inputValues[keyName].length === field.maxLength && (
                <p className="text-noti text-mobile_body3_r mt-[-14px] ml-4 md:hidden">
                  최대 {field.maxLength}자까지 작성 가능합니다.
                </p>
              )}
          </div>
        );
      }

      // 전공은 TextInputWithCounter 사용
      if (field.name === "전공") {
        return (
          <div className="flex flex-col gap-[14px] md:gap-[18px]">
            <h3 className="text-text1 text-mobile_h3 md:text-h3">
              {field.name}
            </h3>
            <TextInputWithCounter
              value={inputValues[keyName] || ""}
              placeholder={field.placeholder || ""}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              maxLength={field.maxLength || 100}
              className="mt-2"
            />
          </div>
        );
      }

      return (
        <div className="flex flex-col gap-[14px] md:gap-[18px]">
          <h3 className="text-text1 text-mobile_h3 md:text-h3">{field.name}</h3>
          {isMdUp ? (
            <TextInputWithCounter
              value={inputValues[keyName] || ""}
              placeholder={field.placeholder || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChange(field.key, e.target.value);
              }}
              maxLength={field.maxLength || 50}
              className={`mt-2`}
            />
          ) : (
            <CustomInput
              value={inputValues[keyName] || ""}
              placeholder={field.placeholder || ""}
              onChange={(e) => {
                console.log(e);
                handleInputChange(field.key, e.target.value);
              }}
              maxLength={field.maxLength || 50}
            />
          )}
          {field.maxLength &&
            inputValues[keyName] &&
            inputValues[keyName].length === field.maxLength && (
              <p className="text-noti text-mobile_body3_r mt-[-14px] ml-4 md:hidden">
                최대 {field.maxLength}자까지 작성 가능합니다.
              </p>
            )}
        </div>
      );

    case "textarea":
      return (
        <div className="flex flex-col gap-[14px] md:gap-[18px]">
          <h3 className="text-text1 text-mobile_h3 md:text-h3">{field.name}</h3>
          {isMdUp && field.maxLength && field.maxLength > 99 ? (
            // isMdUp이 true이고 maxLength가 100 이상인 경우 TextareaWithCounter 사용
            <TextareaWithCounter
              value={inputValues[keyName] || ""}
              placeholder={field.placeholder || ""}
              onChange={(newValue) => handleInputChange(field.key, newValue)}
              maxLength={field.maxLength}
              className="mt-2"
            />
          ) : (
            // isMdUp이 false이거나 maxLength가 100 이하인 경우 CustomInput 사용
            <CustomInput
              value={inputValues[keyName] || ""}
              placeholder={field.placeholder || ""}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              maxLength={field.maxLength || 300}
            />
          )}
          {field.maxLength &&
            inputValues[keyName] &&
            inputValues[keyName].length === field.maxLength && (
              <p className="text-noti text-mobile_body3_r mt-[-14px] ml-4 md:hidden">
                최대 {field.maxLength}자까지 작성 가능합니다.
              </p>
            )}
        </div>
      );

    case "date":
      return (
        <div className="flex flex-col gap-[14px] md:gap-[18px]">
          <h3 className="text-text1 text-mobile_h3 md:text-h3">{field.name}</h3>
          <SingleDateCalendar />
        </div>
      );

    default:
      return null;
  }
};

export default RenderField;
