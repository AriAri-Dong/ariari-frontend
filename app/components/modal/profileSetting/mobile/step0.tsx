"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import vector from "@/images/icon/vector.svg";
import { useProfileContext } from "@/context/profileConetxt";
import RadioBtn from "@/components/button/radioBtn";
import AgreementDetailBottomSheet from "@/components/bottomSheet/agreementsBottomSheet";
import { AGREEMENTS_CONTENTS, ModalKey } from "@/data/agreements";
import {
  TERMS_OF_PRIVACY,
  TERMS_OF_SERVICE_INFO,
  TERMS_OF_CLUB,
} from "@/data/policies";
import { NoticeItem } from "@/types/components/withdrawInfo";
import { getRandomNickname } from "@/api/login/api";

const agreementContentMap: Record<ModalKey, string | NoticeItem[]> = {
  privacy: TERMS_OF_PRIVACY,
  rules: TERMS_OF_SERVICE_INFO,
  club: TERMS_OF_CLUB,
};

const Step0 = () => {
  const { profileData, updateProfileData } = useProfileContext();
  const [openBottomSheet, setOpenBottomSheet] = useState<ModalKey | null>(null);

  const toggleAgreement = () => {
    updateProfileData({ agreements: !profileData.agreements });
  };

  useEffect(() => {
    const fetchNickname = async () => {
      if (!profileData.username) {
        try {
          const nickname = await getRandomNickname();
          updateProfileData({ username: nickname });
        } catch (err) {
          console.error("랜덤 닉네임 불러오기 실패", err);
        }
      }
    };

    fetchNickname();
  }, []);

  return (
    <>
      <div className="flex w-full rounded-8 bg-searchbar mt-10">
        <RadioBtn
          isChecked={profileData.agreements}
          label={"이용 약관 전체 동의"}
          onClick={toggleAgreement}
          className="px-2.5 py-3"
        />
      </div>
      <div className="flex flex-col text-subtext1 gap-1 text-mobile_body2_m mt-3 w-full">
        <button
          className="flex justify-between items-center p-[6px]"
          onClick={() => setOpenBottomSheet("privacy")}
        >
          <p>개인정보 이용수칙</p>
          <Image src={vector} alt="vector" width={16} height={16} />
        </button>
        <button
          className="flex justify-between items-center p-[6px]"
          onClick={() => setOpenBottomSheet("rules")}
        >
          <p>아리아리 이용수칙</p>
          <Image src={vector} alt="vector" width={16} height={16} />
        </button>
        <button
          className="flex justify-between items-center p-[6px]"
          onClick={() => setOpenBottomSheet("club")}
        >
          <p>Ariari 동아리 운영원칙</p>
          <Image src={vector} alt="vector" width={16} height={16} />
        </button>
      </div>
      {openBottomSheet && (
        <AgreementDetailBottomSheet
          title={AGREEMENTS_CONTENTS[openBottomSheet].title}
          content={agreementContentMap[openBottomSheet]}
          onClose={() => setOpenBottomSheet(null)}
        />
      )}
    </>
  );
};

export default Step0;
