import Image from "next/image";
import React, { useEffect } from "react";
import close from "@/images/icon/close.svg";
import Contour from "../bar/contour";

const InterviewMessageBottomSheet = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-100 flex items-end bg-black/50">
      <div className="absolute inset-0" onClick={onClose} />
      <div
        className={`relative w-full h-4/5 bg-background px-4 rounded-t-[24px] shadow-default transition-transform duration-300 flex flex-col`}
      >
        {/* 제목 영역 */}
        <div className="flex justify-between mt-[22px] mb-4">
          <div className="flex gap-1">
            <h1 className="text-text1 text-mobile_h1_contents_title">
              면접 확인 안내
            </h1>
          </div>
          <Image
            src={close}
            alt={"닫기"}
            width={20}
            height={20}
            onClick={onClose}
          />
        </div>
        {/* 구분선 */}
        <Contour />
        {/* content */}
        <textarea
          defaultValue={message}
          maxLength={1000}
          className="w-full p-2 my-2 h-[368px] border-0 rounded-md resize-none text-mobile_body1_r 
                text-subtext1 focus:outline-none focus:ring-[1px]
                focus:ring-searchbarborder placeholder:text-unselected
                placeholder:whitespace-pre-wrap"
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>
    </div>
  );
};

export default InterviewMessageBottomSheet;
