"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PROFILE_SETTING } from "@/data/profileSetting";
import check from "@/images/icon/check.svg";
import { useProfileContext } from "@/context/profileConetxt";
import useScreenHeight from "@/hooks/useScreenHeight";
import { profileType } from "@/types/member";
import { getRandomNickname } from "@/api/login/api";

const Step1 = () => {
  const { profileData, updateProfileData } = useProfileContext();

  const isSmallScreen = useScreenHeight(740);

  const [selectedProfileAlias, setSelectedProfileAlias] = useState<
    string | null
  >(null);
  const [userName, setUserName] = useState<string>(profileData.username);

  const handleProfileClick = (alias: string | null) => {
    setSelectedProfileAlias(alias);
    updateProfileData({ selectedProfileType: alias as profileType });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUserName(value);
    updateProfileData({ username: value });
  };

  // 선택된 프로필 데이터 가져오기
  const selectedProfileData =
    PROFILE_SETTING.find((item) => item.alias === selectedProfileAlias) ||
    PROFILE_SETTING[0];

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const nickname = await getRandomNickname();
        setUserName(nickname);
        updateProfileData({ username: nickname });
      } catch (err) {
        console.error("랜덤 닉네임 요청 실패", err);
      }
    };

    fetchNickname();
  }, []);

  return (
    <>
      <Image
        src={selectedProfileData.imageUrl || ""}
        alt={selectedProfileData.alias || "프로필 기본 이미지"}
        width={90}
        height={90}
        className={`rounded-full border border-menuborder p-1
            ${isSmallScreen ? "mb-2.5 mt-3" : "mb-4 mt-7"}`}
      />
      <div className="w-full relative">
        <input
          className="w-full bg-searchbar text-mobile_body1_r text-subtext2 py-3 px-4 rounded-xl 
      focus:border-blue-500 focus:outline-none"
          placeholder="사용자 이름"
          maxLength={9}
          value={userName}
          onChange={handleChange}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-unselected text-mobile_body1_r">
          {userName?.length ?? 0}/10
        </div>
      </div>
      <div
        className={`grid grid-cols-3 w-full gap-x-7 ${
          isSmallScreen ? "mt-4 gap-y-2.5" : "mt-6 gap-y-4"
        }`}
      >
        {PROFILE_SETTING.map((profile) => (
          <div
            key={profile.id}
            className="relative cursor-pointer rounded-full w-[64px] h-[64px] flex items-center justify-center mx-auto"
            onClick={() => handleProfileClick(profile.alias)}
          >
            <Image
              src={profile.imageUrl}
              alt={profile.alias || ""}
              width={64}
              height={64}
              className="rounded-full block"
            />
            {profile.alias === selectedProfileAlias && (
              <>
                <div className="absolute inset-0 bg-black opacity-50 rounded-full z-10" />
                <div className="absolute inset-0 flex items-center justify-center z-20">
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
