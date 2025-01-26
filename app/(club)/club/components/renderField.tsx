import React, { useState } from "react";
import RadioBtn from "@/components/button/radioBtn";
import TextInputWithCounter from "@/components/input/textInputWithCounter";
import { BADGE_ITEMS } from "@/data/club";
import CustomInput from "@/components/input/customInput";
import useResponsive from "@/hooks/useResponsive";
import TextareaWithCounter from "@/components/textArea/textareaWithCounter";

interface RenderFieldProps {
  field: (typeof BADGE_ITEMS)[0];
  index: number;
}

const RenderField: React.FC<RenderFieldProps> = ({ field, index }) => {
  const isMdUp = useResponsive("md");
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const handleInputChange = (fieldName: string, value: string) => {
    if (fieldName === "연락처") {
      const onlyNumbers = value.replace(/[^0-9]/g, "");
      const formattedValue = formatPhoneNumber(onlyNumbers);
      setInputValues((prev) => ({ ...prev, [fieldName]: formattedValue }));
    } else {
      setInputValues((prev) => ({ ...prev, [fieldName]: value }));
    }
  };

  const formatPhoneNumber = (value: string) => {
    if (value.length <= 3) return value;
    if (value.length <= 7) return `${value.slice(0, 3)}-${value.slice(3)}`;
    return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
  };

  const value = inputValues[field.name] || "";
  const isOverMaxLength = field.maxLength && value.length === field.maxLength;

  switch (field.type) {
    case "radio":
      return (
        <div key={index} className="flex flex-col gap-[14px] md:gap-[18px]">
          <h3 className="text-text1 text-mobile_h3 md:text-h3">{field.name}</h3>
          <div className="flex gap-x-6 p-1 ml-1.5 flex-wrap">
            {field.options?.map((option, idx) => (
              <RadioBtn
                key={idx}
                isChecked={idx === 0 ? true : false}
                label={option}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>
      );

    case "text":
      // 연락처, 이메일, MBTI는 CustomInput 사용
      if (["연락처", "이메일", "MBTI"].includes(field.name)) {
        return (
          <div key={index} className="flex flex-col gap-[14px] md:gap-[18px]">
            <h3 className="text-text1 text-mobile_h3 md:text-h3">
              {field.name}
            </h3>
            <CustomInput
              value={value}
              placeholder={field.placeholder || ""}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              maxLength={field.maxLength || 100}
            />
            {isOverMaxLength && (
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
          <div key={index} className="flex flex-col gap-[14px] md:gap-[18px]">
            <h3 className="text-text1 text-mobile_h3 md:text-h3">
              {field.name}
            </h3>
            <TextInputWithCounter
              value={value}
              placeholder={field.placeholder || ""}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              maxLength={field.maxLength || 100}
              className="mt-2"
            />
          </div>
        );
      }

      return (
        <div key={index} className="flex flex-col gap-[14px] md:gap-[18px]">
          <h3 className="text-text1 text-mobile_h3 md:text-h3">{field.name}</h3>
          {isMdUp ? (
            <TextInputWithCounter
              value={value}
              placeholder={field.placeholder || ""}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              maxLength={field.maxLength || 50}
              className={`mt-2`}
            />
          ) : (
            <CustomInput
              value={value}
              placeholder={field.placeholder || ""}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              maxLength={field.maxLength || 50}
            />
          )}
          {isOverMaxLength && (
            <p className="text-noti text-mobile_body3_r mt-[-14px] ml-4 md:hidden">
              최대 {field.maxLength}자까지 작성 가능합니다.
            </p>
          )}
        </div>
      );

    case "textarea":
      return (
        <div key={index} className="flex flex-col gap-[14px] md:gap-[18px]">
          <h3 className="text-text1 text-mobile_h3 md:text-h3">{field.name}</h3>
          {isMdUp && field.maxLength && field.maxLength > 99 ? (
            // isMdUp이 true이고 maxLength가 100 이상인 경우 TextareaWithCounter 사용
            <TextareaWithCounter
              value={value}
              placeholder={field.placeholder || ""}
              onChange={(newValue) => handleInputChange(field.name, newValue)}
              maxLength={field.maxLength}
              className="mt-2"
            />
          ) : (
            // isMdUp이 false이거나 maxLength가 100 이하인 경우 CustomInput 사용
            <CustomInput
              value={value}
              placeholder={field.placeholder || ""}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              maxLength={field.maxLength || 300}
            />
          )}
          {isOverMaxLength && (
            <p className="text-noti text-mobile_body3_r mt-[-14px] ml-4 md:hidden">
              최대 {field.maxLength}자까지 작성 가능합니다.
            </p>
          )}
        </div>
      );

    case "date":
      return (
        <div key={index} className="flex flex-col gap-[14px] md:gap-[18px]">
          <h3 className="text-text1 text-mobile_h3 md:text-h3">{field.name}</h3>
          <input type="date" className="date-input-class" />
        </div>
      );

    default:
      return null;
  }
};

export default RenderField;
