import Image from "next/image";
import React, { useEffect, useState } from "react";
import close from "@/images/icon/close.svg";
import help from "@/images/icon/help.svg";
import LargeBtn from "../button/basicBtn/largeBtn";
import Alert from "../alert/alert";
import Contour from "../bar/contour";
import { InterviewNoticeModalProps } from "../modal/club/interviewNoticeModal";

const InterviewNoticeBottomSheet = ({
  onClose,
  onSubmit,
}: InterviewNoticeModalProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [details, setDetails] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validateForm = () => {
    if (!details.trim()) {
      setAlertMessage("상세 안내 내용을 입력해주세요.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(details);
      onClose();
    }
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
    <div className="fixed inset-0 z-50 flex items-end bg-black/50">
      <div className="absolute inset-0" onClick={handleClose} />
      <div
        className={`relative w-full h-4/5 bg-background px-4 rounded-t-[24px] shadow-default transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        } flex flex-col`}
      >
        {/* 제목 영역 */}
        <div className="flex justify-between mt-[22px] mb-4">
          <div className="flex gap-1">
            <h1 className="text-text1 text-mobile_h1_contents_title">
              면접 확인 안내 전송
            </h1>
            <Image src={help} alt={"help"} width={20} height={20} />
          </div>
          <Image
            src={close}
            alt={"닫기"}
            width={20}
            height={20}
            onClick={handleClose}
          />
        </div>
        {/* 구분선 */}
        <Contour />
        {/* content */}
        <h3 className="flex gap-1 text-text1 text-mobile_h2 mb-[14px] mt-[22px]">
          상세 안내 내용
          <p className="text-noti text-body2_m">*</p>
        </h3>
        <textarea
          placeholder={`안녕하세요.
동아리 면접 대상자로 선정되신 것을 축하드리며, 면접 일정을 안내 드립니다.
부득이한 사정으로 참석이 어려우시거나 면접 일시 변경이 필요하신 경우, 담당자에게 사전에 연락 부탁드립니다.
    • 면접 일자 : 
    •  면접 시간 : 
    •  면접 장소 : 
    •  담당자 연락처 : 
감사합니다. 좋은 결과 있으시길 바랍니다.`}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          maxLength={1000}
          className="w-full p-1 h-[368px] border-0 rounded-md resize-none text-mobile_body1_r 
                text-subtext1 focus:outline-none focus:ring-[1px]
                focus:ring-searchbarborder placeholder:text-unselected
                placeholder:whitespace-pre-wrap"
          style={{ whiteSpace: "pre-wrap" }}
        />
        {/* 고정 버튼 영역 */}
        <div className="fixed gap-6 bottom-0 left-0 right-0 bg-background px-4 pb-6 pt-4 flex items-center justify-between">
          <p className={`text-mobile_h4 text-unselected`}>
            {details.length}/1000
          </p>
          <LargeBtn title={"전송하기"} onClick={handleSubmit} />
        </div>
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default InterviewNoticeBottomSheet;
