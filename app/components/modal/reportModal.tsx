"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import checkIcon from "@/images/icon/radio_button_checked.svg";
import uncheckIcon from "@/images/icon/radio_button_unchecked.svg";
import close from "@/images/icon/close.svg";
import { REPORT_REASONS } from "@/data/report";
import SmallBtn from "../button/basicBtn/smallBtn";
import Alert from "../alert/alert";
import { ReportTargetType, ReportType } from "@/types/report";
import { reportItem } from "@/api/report/api";
import { useUserStore } from "@/stores/userStore";

interface ReportBottomSheetProps {
  id?: string;
  reportTargetType?: ReportTargetType;
  onClose: () => void;
  onSubmit: () => void;
}

/**
 * 신고하기 바텀 시트 컴포넌트
 * @param id 신고 대상 id
 * @param reportTargetType 신고 대상 타입 ex) | "CLUB" | "MEMBER""PASS_REVIEW"... 타입 참조
 * @param onClose 바텀시트 닫는 함수
 * @param onSubmit 신고 제출 함수
 * @returns
 */

const ReportModal = ({
  id,
  reportTargetType,
  onClose,
  onSubmit,
}: ReportBottomSheetProps) => {
  const isSignIn = useUserStore((state) => !!state.user);

  const [selectedReason, setSelectedReason] = useState<ReportType | null>(null);
  const [details, setDetails] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleReasonChange = (reason: ReportType) => {
    setSelectedReason(reason);
    setAlertMessage(null);
  };

  const handleSubmit = () => {
    if (!selectedReason) {
      setAlertMessage("신고 사유를 선택해주세요.");
      return;
    }
    if (id && reportTargetType) {
      reportItem({
        reportTargetType,
        reportType: selectedReason,
        body: details,
        reportedEntityId: id,
      })
        .then(() => {
          setSelectedReason(null);
          setDetails("");
          onSubmit();
          onClose();
        })
        .catch((err) => {
          setAlertMessage(err.message);
        });
    }
  };

  // 스크롤 금지
  useEffect(() => {
    if (!isSignIn) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSignIn]);

  useEffect(() => {
    if (!isSignIn) {
      setAlertMessage("로그인 후 이용가능합니다");

      const timer = setTimeout(() => {
        setAlertMessage(null);
        onClose();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isSignIn, onClose]);
  return (
    <>
      {isSignIn && (
        <div
          id="background"
          className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50"
          onClick={(e) =>
            (e.target as HTMLDivElement).id === "background" && onClose()
          }
          style={{ zIndex: 1000 }}
        >
          <div
            className={`bg-white p-5 shadow-modal rounded-2xl w-[826px] max-h-[90vh] flex flex-col`}
          >
            <div className="flex justify-between items-center pb-5 border-b">
              <h2 className="text-h1_contents_title">신고하기</h2>
              <button onClick={onClose}>
                <Image src={close} alt="닫기" width={20} height={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
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
                        onClick={() => handleReasonChange(reason.value)}
                      >
                        <Image
                          src={
                            selectedReason === reason.value
                              ? checkIcon
                              : uncheckIcon
                          }
                          alt={
                            selectedReason === reason.value
                              ? "Checked"
                              : "Unchecked"
                          }
                          width={20}
                          height={20}
                          className="mr-2.5"
                        />
                        {reason.label}
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
                  maxLength={500}
                  className="w-full p-1.5 h-[310px] border-0 rounded-md resize-none text-body1_r 
            text-subtext1  focus:outline-none  placeholder:text-unselected"
                />
              </div>
              <div className="mt-6 flex justify-end items-center gap-[33px]">
                <p className="text-right text-unselected text-h4">
                  {details.length}/500
                </p>
                <SmallBtn onClick={handleSubmit} title={"신고하기"} />
              </div>
            </div>
          </div>
        </div>
      )}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </>
  );
};

export default ReportModal;
