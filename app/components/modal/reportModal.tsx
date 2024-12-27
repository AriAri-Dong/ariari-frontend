"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import checkIcon from "@/images/icon/radio_button_checked.svg";
import uncheckIcon from "@/images/icon/radio_button_unchecked.svg";
import close from "@/images/icon/close.svg";
import { REPORT_REASONS } from "@/data/report";
import SmallBtn from "../button/basicBtn/smallBtn";
import Alert from "../alert/alert";

interface ReportBottomSheetProps {
  onClose: () => void;
  onSubmit: () => void;
}

const ReportModal = ({ onClose, onSubmit }: ReportBottomSheetProps) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [details, setDetails] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleReasonChange = (reason: string) => {
    setSelectedReason(reason);
    setAlertMessage(null);
  };

  const handleSubmit = () => {
    if (!selectedReason) {
      setAlertMessage("신고 사유를 선택해주세요.");
      return;
    }

    console.log("신고 사유:", selectedReason);
    console.log("신고 사유 상세:", details);

    setSelectedReason(null);
    setDetails("");
    onSubmit();
    onClose();
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
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end"
      onClick={(e) =>
        (e.target as HTMLDivElement).id === "background" && onClose()
      }
    >
      <div
        className={`bg-white p-5 shadow-modal rounded-t-2xl w-[950px] mt-[130px]`}
      >
        <div className="flex justify-between items-center pb-5 border-b">
          <h2 className="text-h1_contents_title">신고하기</h2>
          <button onClick={onClose}>
            <Image src={close} alt="닫기" width={20} height={20} />
          </button>
        </div>

        <div className="mt-[22px]">
          <h3 className="flex text-h3 mb-[18px]">
            신고 사유
            <span className="text-noti text-body3_m pl-1">*</span>
          </h3>
          <ul className="space-y-6 pl-2.5">
            {REPORT_REASONS.map((reason, index) => (
              <li key={index}>
                <label
                  className="flex items-center cursor-pointer text-body1_m text-subtext2"
                  onClick={() => handleReasonChange(reason)}
                >
                  <Image
                    src={selectedReason === reason ? checkIcon : uncheckIcon}
                    alt={selectedReason === reason ? "Checked" : "Unchecked"}
                    width={20}
                    height={20}
                    className="mr-2.5"
                  />
                  {reason}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-[38px]">
          <h3 className="text-h3 mb-[18px]">신고 사유 상세</h3>
          <textarea
            placeholder="신고 사유를 상세히 작성해 주세요."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            maxLength={1000}
            className="w-full p-1 h-[310px] border-0 rounded-md resize-none text-body1_r 
            text-subtext1  focus:outline-none focus:ring-[1px]
            focus:ring-searchbarborder placeholder:text-unselected"
          />
        </div>

        <div className="mt-6 flex justify-end items-center gap-[33px]">
          <p className="text-right text-unselected text-h4">
            {details.length}/1000
          </p>
          <SmallBtn onClick={handleSubmit} title={"신고하기"} />
        </div>
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default ReportModal;
