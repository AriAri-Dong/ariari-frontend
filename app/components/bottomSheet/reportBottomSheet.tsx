"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import checkIcon from "@/images/icon/radio_button_checked.svg";
import uncheckIcon from "@/images/icon/radio_button_unchecked.svg";
import close from "@/images/icon/close.svg";
import Alert from "../alert/alert";
import LargeBtn from "../button/basicBtn/largeBtn";

const REPORT_REASONS = [
  "스팸 홍보/도배글 입니다.",
  "음란물입니다.",
  "불법정보를 포함하고 있습니다.",
  "욕설/생명경시/혐오/차별적 표현입니다.",
  "개인정보 노출 게시물입니다.",
  "불쾌한 표현이 있습니다.",
  "기타",
];

interface ReportBottomSheetProps {
  onClose: () => void;
  onSubmit: () => void;
}

const ReportBottomSheet = ({ onClose, onSubmit }: ReportBottomSheetProps) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(
    REPORT_REASONS[0]
  );
  const [details, setDetails] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleReasonChange = (reason: string) => {
    setSelectedReason(reason);
  };

  const handleSubmit = () => {
    if (!selectedReason) {
      alert("신고 사유를 선택해주세요.");
      return;
    }

    console.log("신고 사유:", selectedReason);
    console.log("신고 사유 상세:", details);

    setSelectedReason(REPORT_REASONS[0]);
    setDetails("");
    onSubmit();
    onClose();
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "background") {
      onClose();
    }
  };

  // 스크롤 금지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      id="background"
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end duration-300"
      onClick={handleBackgroundClick}
    >
      <div
        className="bg-white w-full p-4 shadow-lg rounded-t-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-mobile_h1_contents_title">신고하기</h2>
          <button onClick={onClose}>
            <Image src={close} alt="닫기" width={20} height={20} />
          </button>
        </div>

        <div className="mt-[22px]">
          <h3 className="flex text-mobile_h2 mb-[22px]">
            신고 사유
            <span className="text-noti text-mobile_body3_m pl-1">*</span>
          </h3>
          <ul className="space-y-[14px] pl-2.5">
            {REPORT_REASONS.map((reason, index) => (
              <li key={index}>
                <label
                  className="flex items-center cursor-pointer text-mobile_h4 text-subtext2"
                  onClick={() => handleReasonChange(reason)}
                >
                  <Image
                    src={selectedReason === reason ? checkIcon : uncheckIcon}
                    alt={selectedReason === reason ? "Checked" : "Unchecked"}
                    width={20}
                    height={20}
                    className="mr-[14px]"
                  />
                  {reason}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-[38px]">
          <h3 className="text-mobile_h2 mb-[14px]">신고 사유 상세</h3>
          <textarea
            placeholder="신고 사유를 상세히 작성해 주세요."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            maxLength={1000}
            className="w-full p-1 h-32 border-0 rounded-md resize-none text-mobile_body1_r 
            text-subtext1  focus:outline-none focus:ring-[1px] focus:ring-searchbarborder placeholder:text-unselected"
          />
        </div>

        <div className="mt-[6px] flex items-center gap-6">
          <p className="text-right text-unselected text-mobile_h4">
            {details.length}/1000
          </p>
          <LargeBtn onClick={handleSubmit} title={"신고하기"} />
        </div>
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default ReportBottomSheet;
