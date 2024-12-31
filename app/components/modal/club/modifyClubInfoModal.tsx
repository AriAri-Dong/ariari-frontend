import Image from "next/image";
import React, { useEffect, useState } from "react";
import close from "@/images/icon/close.svg";
import Alert from "@/components/alert/alert";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import CustomInput from "@/components/input/customInput";
import { ModalProps } from "@/types/components/modal";

const ModifyClubInfoModal = ({ onClose, onSubmit }: ModalProps) => {
  const [clubName, setClubName] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      id="background"
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50"
      onClick={(e) =>
        (e.target as HTMLDivElement).id === "background" && handleClose()
      }
    >
      <div
        className={`bg-white p-5 shadow-modal rounded-2xl w-[950px] max-h-[90vh] flex flex-col`}
      >
        <div className="flex justify-between mt-5 mb-5">
          <h1 className="text-text1 text-h1_contents_title">
            동아리 정보 수정하기
          </h1>
          <Image
            src={close}
            alt={"닫기"}
            width={24}
            height={24}
            onClick={handleClose}
            className="md:w-6 md:h-6 cursor-pointer"
          />
        </div>
        <div className="h-[1px] bg-menuborder" />

        {/* content 영역 (스크롤 가능한 영역) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* 동아리 이름 */}
          <h3 className="flex text-text1 text-h3 mt-7 mb-[18px]">
            동아리 이름
          </h3>
          <CustomInput
            value={clubName}
            placeholder={"동아리 이름"}
            onChange={(e) => setClubName(e.target.value)}
          />
          <h3 className="flex text-text1 text-h3 mt-7 mb-[18px]">
            동아리 한 줄 소개
          </h3>
          <CustomInput
            value={clubName}
            placeholder={"동아리 소개를 입력해주세요."}
            onChange={(e) => setClubName(e.target.value)}
          />
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end mt-6 pb-1">
          <SmallBtn title="등록하기" onClick={handleSubmit} />
        </div>
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default ModifyClubInfoModal;
