import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  useAddClubEventMutation,
  useUpdateClubEventMutation,
} from "@/hooks/club/evnet/useClubEventMutation";

import Alert from "@/components/alert/alert";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import CustomInput from "@/components/input/customInput";
import SingleDateCalendar from "../calendar/singleDateCalendar";
import close from "@/images/icon/close.svg";
import { ClubEventModalProps } from "../modal/club/clubEventModal";
import { ClubEventSaveReq } from "@/types/clubEvent";

const ClubEventBottomSheet = ({
  type,
  onClose,
  onSubmit,
  eventData,
}: ClubEventModalProps) => {
  const params = useSearchParams();
  const clubId = params.get("clubId") ?? "";
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [date, setDate] = useState<Date | null>(eventData?.date ?? null);
  const [title, setTitle] = useState<string>(eventData?.title ?? "");
  const [body, setBody] = useState<string>(eventData?.body ?? "");
  const [location, setLocation] = useState<string>(eventData?.location ?? "");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // 일정 등록
  const { mutate: addClubEvent } = useAddClubEventMutation({
    clubId,
    onSuccess: () => {
      onSubmit();
      onClose();
    },
    onError: () => {
      setAlertMessage("일정 등록에 실패했습니다.");
    },
  });

  // 일정 수정
  const { mutate: updateClubEvent } = useUpdateClubEventMutation({
    clubId,
    onSuccess: () => {
      onSubmit();
      onClose();
    },
    onError: () => {
      setAlertMessage("일정 수정에 실패했습니다.");
    },
  });

  // 일정 등록 핸들러
  const handleEventSubmit = async (data: {
    date: Date;
    title: string;
    body: string;
    location: string;
  }) => {
    const { date, title, body, location } = data;

    const payload: ClubEventSaveReq = {
      title: title,
      body: body,
      location: location,
      eventDateTime: date.toISOString(),
    };

    addClubEvent({ clubId, data: payload });
  };
  // 일정 수정 핸들러
  const handleEventUpdate = async (
    data: {
      date: Date;
      title: string;
      body: string;
      location: string;
    },
    clubEventId: string
  ) => {
    const { date, title, body, location } = data;

    const payload: ClubEventSaveReq = {
      title: title,
      body: body,
      location: location,
      eventDateTime: date.toISOString(),
    };

    updateClubEvent({ clubEventId, data: payload });
  };

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
    if (type === "create") {
      handleEventSubmit({ date: date!, title, body, location });
    } else {
      handleEventUpdate(
        { date: date!, title, body, location },
        eventData?.id ?? ""
      );
    }
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

  useEffect(() => {
    setIsVisible(true);
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
            {type === "create" ? "일정 추가하기" : "일정 수정하기"}
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
          <SingleDateCalendar
            initialDate={date}
            onDateChange={(newDate) => setDate(newDate)}
          />

          {/* 제목 입력 */}
          <h3 className="flex text-text1 text-mobile_h2 mt-[30px] mb-[14px]">
            일정 제목
            <span className="text-noti text-mobile_body3_m pl-1">*</span>
          </h3>
          <CustomInput
            value={title}
            placeholder="일정의 제목을 작성해 주세요."
            onChange={(e) => setTitle(e.target.value)}
            maxLength={20}
          />
          {title.length > 20 && (
            <p className="mt-1 pl-4 text-noti text-mobile_body3_r md:pl-[22px] md:mt-2 md:text-body4_r ">
              최대 20자까지 작성 가능합니다.
            </p>
          )}

          {/* 내용 입력 */}
          <div className="flex justify-between mt-[30px] mb-[14px] items-center">
            <h3 className="flex text-text1 text-mobile_h2">내용</h3>
          </div>
          <CustomInput
            value={body}
            placeholder="시간을 포함한 일정에 대한 세부내용을 작성해 주세요."
            onChange={(e) => setBody(e.target.value)}
            maxLength={100}
          />
          {body.length > 100 && (
            <p className="mt-1 pl-4 text-noti text-mobile_body3_r md:pl-[22px] md:mt-2 md:text-body4_r ">
              최대 100자까지 작성 가능합니다.
            </p>
          )}

          {/* 위치 입력 */}
          <div className="flex justify-between mt-[30px] mb-[14px] items-center">
            <h3 className="flex text-text1 text-mobile_h2">위치</h3>
          </div>
          <CustomInput
            value={location}
            placeholder="회의 장소 및 약속한 위치 등을 작성해 주세요."
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        {/* 고정 버튼 영역 */}
        <div className="pb-6 pt-[6px]">
          <LargeBtn title={"저장하기"} onClick={handleSubmit} />
        </div>
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default ClubEventBottomSheet;
