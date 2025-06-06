"use client";

import React, { useEffect, useState } from "react";
import RadioBtn from "@/components/button/radioBtn";
import vector from "@/images/icon/vector.svg";
import { useProfileContext } from "@/context/profileConetxt";
import Image from "next/image";
import AgreementDetailModal from "./agreementDetailModal";
import { AGREEMENTS_CONTENTS, ModalKey } from "@/data/agreements";
import {
  TERMS_OF_CLUB,
  TERMS_OF_PRIVACY,
  TERMS_OF_SERVICE_INFO,
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
  const [openModal, setOpenModal] = useState<ModalKey | null>(null);

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

  const toggleAgreement = () => {
    updateProfileData({ agreements: !profileData.agreements });
  };

  return (
    <div className="flex w-full flex-col items-center mb-8 mt-8">
      <div className="flex w-full rounded-8 bg-searchbar">
        <RadioBtn
          isChecked={profileData.agreements}
          label={"이용 약관 전체 동의"}
          onClick={toggleAgreement}
          className="px-2.5 py-3"
        />
      </div>

      <div className="flex flex-col text-subtext1 text-body2_m mt-4 gap-2 w-full max-w-[390px]">
        <button
          className="flex justify-between items-center p-[6px]"
          onClick={() => setOpenModal("privacy")}
        >
          <p>개인정보 이용수칙</p>
          <Image src={vector} alt="vector" width={24} height={24} />
        </button>
        <button
          className="flex justify-between items-center p-[6px]"
          onClick={() => setOpenModal("rules")}
        >
          <p>아리아리 이용수칙</p>
          <Image src={vector} alt="vector" width={24} height={24} />
        </button>
        <button
          className="flex justify-between items-center p-[6px]"
          onClick={() => setOpenModal("club")}
        >
          <p>Ariari 동아리 운영원칙</p>
          <Image src={vector} alt="vector" width={24} height={24} />
        </button>
      </div>

      {openModal && (
        <AgreementDetailModal
          title={AGREEMENTS_CONTENTS[openModal].title}
          content={agreementContentMap[openModal]}
          onClose={() => setOpenModal(null)}
        />
      )}
    </div>
  );
};

export default Step0;
