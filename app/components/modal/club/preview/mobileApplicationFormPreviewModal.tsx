import React, { useEffect, useState } from "react";
import Image from "next/image";
import vector from "@/images/icon/backVector.svg";
import { ApplicationKeys, ApplyQuestionData } from "@/types/application";

// 사용 x
interface ModalProps {
  onClose: () => void;
  selectedFields: ApplicationKeys[];
  portfolioCollected: boolean;
  documentQuestions: ApplyQuestionData[];
}

const MobileApplicationFromPreviewModal = ({
  onClose,
  selectedFields,
  portfolioCollected,
  documentQuestions,
}: ModalProps) => {
  const handleClose = () => {
    onClose();
  };

  // 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-background z-50 flex flex-col
    justify-between pt-[46px] pb-5 px-4 md:hidden"
    >
      <div className="flex gap-2 mb-5">
        <Image
          src={vector}
          alt={"뒤로가기"}
          width={24}
          height={24}
          onClick={handleClose}
          className="cursor-pointer"
        />
        <h1 className="text-text1 text-mobile_h1_contents_title">
          지원서 양식 미리보기
        </h1>
      </div>
      {/* <ApplicationFieldForm
        selectedFields={selectedFields}
        portfolioCollected={portfolioCollected}
        documentQuestions={documentQuestions}
      /> */}
    </div>
  );
};

export default MobileApplicationFromPreviewModal;
