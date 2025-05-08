"use client";

import React, { useState } from "react";
import Image from "next/image";
import vector from "@/images/icon/vector.svg";
import { useProfileContext } from "@/context/profileConetxt";
import RadioBtn from "@/components/button/radioBtn";
import AgreementDetailBottomSheet from "@/components/bottomSheet/agreementsBottomSheet";
import { AGREEMENTS_CONTENTS, ModalKey } from "@/data/agreements";

const Step0 = () => {
  const { profileData, updateProfileData } = useProfileContext();
  const [openBottomSheet, setOpenBottomSheet] = useState<ModalKey | null>(null);

  const toggleAgreement = () => {
    updateProfileData({ agreements: !profileData.agreements });
  };

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
          content={AGREEMENTS_CONTENTS[openBottomSheet].content}
          onClose={() => setOpenBottomSheet(null)}
        />
      )}
    </>
  );
};

export default Step0;
