import Image from "next/image";
import React, { useEffect, useState } from "react";
import close from "@/images/icon/close.svg";
import CustomInput from "../input/customInput";
import LargeBtn from "../button/basicBtn/largeBtn";
import Alert from "../alert/alert";
import ReviewBadgeContainer from "../badge/review/reviewBadgeContainer";
import { REVIEW_BADGE_LIST } from "@/data/reviewBadge";

interface BottomSheetProps {
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    details: string;
    badges: number[];
  }) => void;
}

const ActivityReviewBottomSheet = ({ onClose, onSubmit }: BottomSheetProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [selectedBadges, setSelectedBadges] = useState<number[]>([]);

  const handleBadgeSelection = (id: number) => {
    if (selectedBadges.includes(id)) {
      setSelectedBadges(selectedBadges.filter((badgeId) => badgeId !== id));
    } else {
      setSelectedBadges([...selectedBadges, id]);
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validateForm = () => {
    if (!title.trim()) {
      setAlertMessage("활동후기 제목을 입력해주세요.");
      return false;
    }
    if (!details.trim()) {
      setAlertMessage("활동후기 내용을 입력해주세요.");
      return false;
    }
    if (selectedBadges.length === 0) {
      setAlertMessage("좋았던 점을 최소 1개 이상 선택해주세요.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({ title, details, badges: selectedBadges });
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
          <h1 className="text-text1 text-mobile_h1_contents_title">
            활동후기 작성하기
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
            합격후기 제목
            <span className="text-noti text-mobile_body3_m pl-1">*</span>
          </h3>
          <CustomInput
            value={title}
            placeholder={"활동후기 제목을 작성해주세요"}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* 두 번째 문항 */}
          <h3 className="flex text-text1 text-mobile_h2 mt-[30px] mb-[14px]">
            이런 점이 좋았어요
            <span className="text-noti text-mobile_body3_m pl-1">*</span>
          </h3>
          <ReviewBadgeContainer
            REVIEW_BADGE_LIST={REVIEW_BADGE_LIST}
            onBadgeSelect={handleBadgeSelection}
            selectedBadges={selectedBadges}
            className="flex-col items-start"
          />

          <div className="flex justify-between mt-[30px] mb-[14px] items-center">
            <h3 className="flex text-text1 text-mobile_h2">
              활동후기
              <span className="text-noti text-mobile_body3_m pl-1">*</span>
            </h3>
          </div>
          <div className="p-1">
            <textarea
              placeholder="동아리 분위기, 개인적 평가 등 자유롭게 할동 후기를 기재해 주세요."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              maxLength={1000}
              className="w-full p-2 border-0 rounded-md resize-none text-mobile_body1_r 
                  text-subtext1 focus:outline-none focus:ring-[1px] 
                  focus:ring-searchbarborder placeholder:text-unselected
                    flex-1 min-h-[10vh] max-h-[15vh]"
            />
          </div>
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

export default ActivityReviewBottomSheet;