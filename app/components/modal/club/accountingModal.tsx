import Image from "next/image";
import React, { useEffect, useState } from "react";
import close from "@/images/icon/close.svg";
import Alert from "@/components/alert/alert";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import CustomInput from "@/components/input/customInput";
import CustomNumberInput from "@/components/input/customNumberInput";
import SingleDateCalendar from "@/components/calendar/singleDateCalendar";
import RadioBtn from "@/components/button/radioBtn";

export interface AccountingProps {
  onClose: () => void;
  onSubmit: (data: {
    date: Date | null;
    transaction: boolean | null;
    amount: number;
    details: string;
  }) => void;
}

const AccountingModal = ({ onClose, onSubmit }: AccountingProps) => {
  const [date, setDate] = useState<Date | null>(null);
  const [transaction, setTransaction] = useState<boolean | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [details, setDetails] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

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
      onSubmit({ date, transaction, amount, details });
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
        <div className="flex justify-between mb-5">
          <h1 className="text-text1 text-h1_contents_title">
            회계내역 작성하기
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

        {/* content 영역 */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* 날짜 입력 */}
          <h3 className="flex text-text1 text-h3 mt-[22px] mb-[18px]">
            날짜
            <span className="text-noti text-body1_m pl-1">*</span>
          </h3>
          <SingleDateCalendar onDateChange={(newDate) => setDate(newDate)} />
          {/* 수입 및 지출 선택 */}
          <div className="flex justify-between mt-7 mb-3 items-center">
            <h3 className="flex text-text1 text-h3">
              수입 및 지출
              <span className="text-noti text-body1_m pl-1">*</span>
            </h3>
          </div>
          <div className="flex gap-[46px] p-2.5">
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
          <div className="flex justify-between mt-7 mb-3 items-center">
            <h3 className="flex text-text1 text-h3">
              금액
              <span className="text-noti text-body1_m pl-1">*</span>
            </h3>
          </div>
          <CustomNumberInput
            value={amount}
            placeholder="금액을 입력해주세요"
            onChange={(val) => setAmount(val)}
          />

          {/* 상세 내용 입력 */}
          <div className="flex justify-between mt-7 mb-3 items-center">
            <h3 className="flex text-text1 text-h3">
              내용
              <span className="text-noti text-body1_m pl-1">*</span>
            </h3>
          </div>
          <CustomInput
            value={details}
            placeholder="수입 및 지출 내역에 대해 작성해 주세요"
            onChange={(e) => setDetails(e.target.value)}
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

export default AccountingModal;
