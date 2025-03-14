"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PROFILE_SETTING } from "@/data/profileSetting";
import check from "@/images/icon/check.svg";
import { useProfileContext } from "@/context/profileConetxt";

const Step1 = () => {
  const { profileData, updateProfileData } = useProfileContext();
  const [inputValue, setInputValue] = useState<string>(profileData.username);

  const handleProfileClick = (id: string) => {
    updateProfileData({ selectedProfileType: id });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    updateProfileData({ username: value });
  };

  const selectedProfileData = PROFILE_SETTING.find(
    (item) => item.alias === profileData.selectedProfileType
  );

  return (
    <>
      <div className="flex justify-center mb-4 mt-8">
        <Image
          src={selectedProfileData?.imageUrl || ""}
          alt={selectedProfileData?.alias || "프로필 기본 이미지"}
          width={112}
          height={112}
          className="rounded-full border border-menuborder p-1"
        />
      </div>
      <div className="relative mb-8">
        <input
          className="w-full bg-searchbar text-body1_r text-subtext2 py-[13px] px-[22px] rounded-xl 
            focus:border-blue-500 focus:outline-none"
          placeholder="사용자 이름"
          maxLength={7}
          value={inputValue}
          onChange={handleChange}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-unselected text-body1_sb">
          {inputValue.length}/8
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {PROFILE_SETTING.map((item) => (
          <div
            key={item.id}
            className="relative flex justify-center items-center w-[76px] h-[76px] cursor-pointer rounded-full"
            onClick={() => handleProfileClick(item.alias || "")}
          >
            <Image
              src={item.imageUrl}
              alt={item.alias || ""}
              width={76}
              height={76}
              className="rounded-full"
            />
            {profileData.selectedProfileType === item.alias && (
              <>
                <div className="absolute inset-0 bg-black_50 rounded-full z-10 opacity-70"></div>
                <div className="absolute z-20">
                  <Image src={check} alt="check" width={24} height={24} />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Step1;
