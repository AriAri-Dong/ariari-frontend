import React, { useState } from "react";
import RadioBtn from "@/components/button/radioBtn";
import TextInputWithCounter from "@/components/input/textInputWithCounter";
import { BADGE_ITEMS } from "@/data/club";
import CustomInput from "@/components/input/customInput";

export const renderField = (field: (typeof BADGE_ITEMS)[0], index: number) => {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const handleInputChange = (fieldName: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const value = inputValues[field.name] || "";
  const isOverMaxLength = field.maxLength && value.length === field.maxLength;

  switch (field.type) {
    case "radio":
      return (
        <div key={index} className="flex flex-col gap-[14px] md:gap-[18px]">
          <h3 className="text-text1 text-mobile_h3 md:text-h3">{field.name}</h3>
          <div className="flex gap-3">
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
      return field.name === "전공" ? (
        <div key={index} className="flex flex-col gap-[14px] md:gap-[18px]">
          <h3 className="text-text1 text-mobile_h3 md:text-h3">{field.name}</h3>
          <TextInputWithCounter
            value={value}
            placeholder={field.placeholder || ""}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            maxLength={field.maxLength || 100}
            className="mt-2"
          />
        </div>
      ) : (
        <div key={index} className="flex flex-col gap-[14px] md:gap-[18px]">
          <h3 className="text-text1 text-mobile_h3 md:text-h3">{field.name}</h3>
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

    case "textarea":
      return (
        <div key={index} className="flex flex-col gap-[14px] md:gap-[18px]">
          <h3 className="text-text1 text-mobile_h3 md:text-h3">{field.name}</h3>
          <textarea
            value={value}
            placeholder={field.placeholder || ""}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            maxLength={field.maxLength || 300}
            className="textarea-class mt-2 w-full bg-searchbar text-mobile_body1_r text-text1 py-3 px-4 rounded-xl focus:border-blue-500 focus:outline-none placeholder-subtext2"
          />
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
