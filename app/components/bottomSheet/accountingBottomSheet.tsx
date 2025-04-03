import Image from "next/image";
import React, { useEffect, useState } from "react";
import close from "@/images/icon/close.svg";

import Alert from "@/components/alert/alert";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import CustomInput from "@/components/input/customInput";
import { AccountingProps } from "../modal/club/accountingModal";
import SingleDateCalendar from "../calendar/singleDateCalendar";
import RadioBtn from "../button/radioBtn";
import CustomNumberInput from "../input/customNumberInput";

const AccountingBottomSheet = ({ onClose, onSubmit }: AccountingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(null);
  const [transaction, setTransaction] = useState<boolean | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [details, setDetails] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validateForm = () => {
    if (!date) {
      setAlertMessage("날짜를 선택해주세요.");
      return false;
    }
    if (transaction === null) {
      setAlertMessage("수입 또는 지출을 선택해주세요.");
      return false;
    }
    if (amount <= 0) {
      setAlertMessage("금액을 입력해주세요.");
      return false;
    }
    if (!details.trim()) {
      setAlertMessage("상세 내용을 입력해주세요.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({ date: date!, transaction: transaction!, amount, details });
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
          <h1 className="text-text1 text-mobile_h1_contents_title">
            회계내역 작성하기
          </h1>
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

        {/* 스크롤 가능한 내용 영역 */}
        <div className="flex-1 overflow-y-auto">
          <h3 className="flex text-text1 text-mobile_h2 mt-[22px] mb-[14px]">
            날짜
            <span className="text-noti text-mobile_body3_m pl-1">*</span>
          </h3>
          <SingleDateCalendar onDateChange={(newDate) => setDate(newDate)} />

          {/* 두 번째 문항 */}
          <h3 className="flex text-text1 text-mobile_h2 mt-[30px] mb-[14px]">
            수입 및 지출
            <span className="text-noti text-mobile_body3_m pl-1">*</span>
          </h3>
          <div className="flex gap-[34px] p-2">
            <RadioBtn
              label="수입"
              isChecked={transaction === true}
              onClick={() => setTransaction(true)}
            />
            <RadioBtn
              label="지출"
              isChecked={transaction === false}
              onClick={() => setTransaction(false)}
            />
          </div>

          {/* 금액 입력 */}
          <div className="flex justify-between mt-[30px] mb-[14px] items-center">
            <h3 className="flex text-text1 text-mobile_h2">
              금액
              <span className="text-noti text-mobile_body3_m pl-1">*</span>
            </h3>
          </div>
          <CustomNumberInput
            value={amount}
            placeholder="금액을 입력해주세요"
            onChange={(val) => setAmount(val)}
          />

          {/* 상세 내용 입력 */}
          <div className="flex justify-between mt-[30px] mb-[14px] items-center">
            <h3 className="flex text-text1 text-mobile_h2">
              내용
              <span className="text-noti text-mobile_body3_m pl-1">*</span>
            </h3>
          </div>
          <CustomInput
            value={details}
            placeholder="수입 및 지출 내역에 대해 작성해 주세요"
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        {/* 고정 버튼 영역 */}
        <div className="pb-6 pt-[6px]">
          <LargeBtn title={"등록하기"} onClick={handleSubmit} />
        </div>
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default AccountingBottomSheet;
