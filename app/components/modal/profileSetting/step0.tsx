"use client";

import React, { useState } from "react";
import RadioBtn from "@/components/button/radioBtn";
import vector from "@/images/icon/vector.svg";
import { useProfileContext } from "@/context/profileConetxt";
import Image from "next/image";
import AgreementDetailModal from "./agreementDetailModal";
import { AGREEMENTS_CONTENTS, ModalKey } from "@/data/agreements";

const Step0 = () => {
  const { profileData, updateProfileData } = useProfileContext();
  const [openModal, setOpenModal] = useState<ModalKey | null>(null);

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
          content={AGREEMENTS_CONTENTS[openModal].content}
          onClose={() => setOpenModal(null)}
        />
      )}
    </div>
  );
};

export default Step0;
