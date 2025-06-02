import Image from "next/image";
import React, { useEffect, useState } from "react";
import close from "@/images/icon/close.svg";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import { NoticeItem } from "@/types/components/withdrawInfo";

type AgreementDetailBottomSheetProps = {
  title: string;
  content: string | NoticeItem[];
  onClose: () => void;
};

const AgreementDetailBottomSheet = ({
  onClose,
  title,
  content,
}: AgreementDetailBottomSheetProps) => {
  const isStructured = Array.isArray(content);

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50">
      <div className="absolute inset-0" />
      <div
        className={`relative w-full h-4/5 bg-background px-4 rounded-t-[24px] shadow-default transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        } flex flex-col`}
      >
        {/* 제목 영역 */}
        <div className="flex justify-between mt-[22px] mb-4">
          <h1 className="text-text1 text-mobile_h1_contents_title">{title}</h1>
          <Image
            src={close}
            alt={"닫기"}
            width={20}
            height={20}
            onClick={handleClose}
          />
        </div>
        {/* 구분선 */}
        <div className="h-[1px] bg-menuborder" />
        <div className="flex-1 overflow-y-auto pt-[22px] pb-5 text-subtext1 custom-scrollbar">
          {isStructured ? (
            (content as NoticeItem[]).map((item, idx) => (
              <div key={idx} className="mb-6">
                <h2 className="text-mobile_h2 mb-2">{item.title}</h2>
                {item.description && (
                  <p className="text-mobile_h4 mb-2">{item.description}</p>
                )}
                <ul className="pl-5 space-y-1 text-mobile_body1_r text-subtext2">
                  {item.sections.map((section, sIdx) => (
                    <li key={sIdx}>{section}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-sm whitespace-pre-wrap">{content}</p>
          )}
        </div>
        {/* 고정 버튼 영역 */}
        <div className="pb-6 pt-[6px]">
          <LargeBtn title={"확인했습니다."} onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default AgreementDetailBottomSheet;
