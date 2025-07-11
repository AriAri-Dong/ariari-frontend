import Image from "next/image";
import React, { useEffect, useState } from "react";
import close from "@/images/icon/close.svg";
import help from "@/images/icon/help.svg";
import Alert from "@/components/alert/alert";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import Contour from "@/components/bar/contour";
import NotiPopUp from "../notiPopUp";

export const noticeDefaultValue = `안녕하세요.
동아리 면접 대상자로 선정되신 것을 축하드리며, 면접 일정을 안내 드립니다.
부득이한 사정으로 참석이 어려우시거나 면접 일시 변경이 필요하신 경우, 담당자에게 사전에 연락 부탁드립니다.
    • 면접 일자 : 
    •  면접 시간 : 
    •  면접 장소 : 
    •  담당자 연락처 : 
감사합니다. 좋은 결과 있으시길 바랍니다.`;

export interface InterviewNoticeModalProps {
  onClose: () => void;
  onSubmit: (message: string) => void;
}

const InterviewNoticeModal = ({
  onClose,
  onSubmit,
}: InterviewNoticeModalProps) => {
  const [details, setDetails] = useState<string>(noticeDefaultValue);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

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
    if (details.trim()) {
      setShowConfirmModal(true);
      return;
    }
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
        className={`bg-white p-5 shadow-modal rounded-2xl w-[826px] max-h-[90vh] flex flex-col`}
      >
        {/* header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-2">
            <h1 className="text-text1 text-h1_contents_title">
              면접 확인 안내 전송하기
            </h1>
            <Image src={help} alt={"help"} width={24} height={24} />
          </div>
          <Image
            src={close}
            alt={"닫기"}
            width={24}
            height={24}
            onClick={handleClose}
            className="md:w-6 md:h-6 cursor-pointer"
          />
        </div>
        <Contour />
        {/* content */}
        <h3 className="flex gap-1 text-text1 text-h3 mb-[18px] mt-[22px]">
          상세 안내 내용
          <p className="text-noti text-body2_m">*</p>
        </h3>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          maxLength={1000}
          className="w-full p-1 h-[700px] border-0 rounded-md resize-none text-body1_r 
                text-subtext1 focus:outline-none focus:ring-[1px]
                focus:ring-searchbarborder placeholder:text-unselected
                placeholder:whitespace-pre-wrap"
          style={{ whiteSpace: "pre-wrap" }}
        />
        {/* 하단 버튼 */}
        <div className="flex justify-end items-center gap-8 pb-1 pt-6">
          <p className={`text- h4 text-unselected`}>{details.length}/1000</p>
          <SmallBtn title="전송하기" onClick={handleSubmit} />
        </div>
      </div>

      {/* ====== 면접 메세지 close 확인 모달 ======*/}
      {showConfirmModal && (
        <NotiPopUp
          onClose={() => setShowConfirmModal(false)}
          title="작성 중단하기"
          description="작성 중인 내용이 저장되지 않고 사라집니다."
          modalType="button"
          firstButton={() => setShowConfirmModal(false)}
          firstButtonText="취소"
          secondButton={onClose}
          secondButtonText="확인"
        />
      )}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default InterviewNoticeModal;
