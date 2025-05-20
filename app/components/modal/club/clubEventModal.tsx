import React, { useEffect, useState } from "react";
import Image from "next/image";
import close from "@/images/icon/close.svg";
import Alert from "@/components/alert/alert";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import CustomInput from "@/components/input/customInput";
import SingleDateCalendar from "@/components/calendar/singleDateCalendar";

export interface ClubEventModalProps {
  onClose: () => void;
  onSubmit: (
    data: {
      date: Date;
      title: string;
      body: string;
      location: string;
    },
    eventId: string
  ) => void;
  type: "create" | "edit";
  eventData?: {
    id: string;
    date: Date;
    title: string;
    body: string;
    location: string;
  };
}

const ClubEventModal = ({
  type,
  onClose,
  onSubmit,
  eventData,
}: ClubEventModalProps) => {
  const [date, setDate] = useState<Date | null>(eventData?.date ?? null);
  const [title, setTitle] = useState<string>(eventData?.title ?? "");
  const [body, setBody] = useState<string>(eventData?.body ?? "");
  const [location, setLocation] = useState<string>(eventData?.location ?? "");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const validateForm = () => {
    if (!date) {
      setAlertMessage("날짜를 선택해주세요.");
      return false;
    }
    if (!title.trim()) {
      setAlertMessage("제목을 입력해주세요.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    onSubmit({ date: date!, title, body, location }, eventData?.id ?? "");
    onClose();
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
            {type === "create" ? "일정 추가하기" : "일정 수정하기"}
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
          <SingleDateCalendar
            onDateChange={(newDate) => setDate(newDate)}
            initialDate={date}
          />
          {/* 제목 입력 */}
          <div className="flex justify-between mt-7 mb-3 items-center">
            <h3 className="flex text-text1 text-h3">
              일정 제목
              <span className="text-noti text-body1_m pl-1">*</span>
            </h3>
          </div>
          <CustomInput
            value={title}
            placeholder="일정의 제목을 작성해 주세요."
            onChange={(e) => setTitle(e.target.value)}
            maxLength={20}
          />

          {/* 상세 내용 입력 */}
          <div className="flex justify-between mt-7 mb-3 items-center">
            <h3 className="flex text-text1 text-h3">내용</h3>
          </div>
          <CustomInput
            value={body}
            placeholder="시간을 포함한 일정에 대한 세부내용을 작성해 주세요."
            onChange={(e) => setBody(e.target.value)}
            maxLength={100}
          />
          {/* 위치 입력 */}
          <div className="flex justify-between mt-7 mb-3 items-center">
            <h3 className="flex text-text1 text-h3">위치</h3>
          </div>
          <CustomInput
            value={location}
            placeholder="회의 장소 및 약속한 위치 등을 작성해 주세요."
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end mt-6 pb-1">
          <SmallBtn title="저장하기" onClick={handleSubmit} />
        </div>
      </div>

      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default ClubEventModal;
