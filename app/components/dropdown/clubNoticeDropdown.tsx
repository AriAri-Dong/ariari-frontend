"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import vector from "@/images/icon/pullDown.svg";
import dotMenu from "@/images/icon/dotMenu.svg";
import noti from "@/images/icon/notice.svg";
import empty from "@/images/icon/empty_img.svg";
import RoundVectorBtn from "../button/iconBtn/roundVectorBtn";
import CommonBottomSheet from "../bottomSheet/commonBottomSheet";
import NotiPopUp from "../modal/notiPopUp";
import Alert from "../alert/alert";
import useResponsive from "@/hooks/useResponsive";
import DotMenuDropDown from "./option/dotMenuDropdown";
import IconBtn from "../button/withIconBtn/IconBtn";
import ReportModal from "../modal/reportModal";
import ReportBottomSheet from "../bottomSheet/report/reportBottomSheet";

const OPTION = [
  { id: 1, label: "수정하기" },
  { id: 2, label: "삭제하기" },
];

interface ClubNoticeDropdownProps {
  notice: {
    id: string;
    title: string;
    date: string;
    text: string;
    userName: string;
    imageUrls: any[];
  };
  isOpen: boolean;
  setOpenDropdownId: (id: string | null) => void;
  pin: boolean;
  isFirstPin?: boolean;
  isLastPin?: boolean;
  isSinglePin?: boolean;
  role: string;
}

const ClubNoticeDropdown = ({
  notice,
  isOpen,
  setOpenDropdownId,
  pin,
  isFirstPin,
  isLastPin,
  isSinglePin,
  role,
}: ClubNoticeDropdownProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const isMdUp = useResponsive("md");

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [openOption, setOpenOption] = useState<boolean>(false);
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);
  const [isNotiPopUpOpen, setIsNotiPopUpOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [modifyOpen, setModifyOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleVectorClick = useCallback(() => {
    setOpenDropdownId(isOpen ? null : notice.id);
  }, [isOpen, notice.id, setOpenDropdownId]);

  const handleMenuClick = () => {
    if (isMdUp) {
      setIsOpenOption(!isOpenOption);
    } else {
      setOpenOption(!openOption);
    }
  };

  const handleOptionClick = (label: string) => {
    setIsOpenOption(false);
    if (label === "삭제하기") {
      setIsNotiPopUpOpen(true);
    } else if (label === "수정하기") {
      setModifyOpen(true);
    }
  };

  const handleReport = () => {
    setIsReportOpen(true);
  };

  const handleReportSubmit = () => {
    setIsReportOpen(false);
    setAlertMessage("신고가 정상적으로 접수되었습니다.");
  };

  const handleDelete = () => {
    setIsNotiPopUpOpen(false);
    // 임시 구현 (api)
    if (true) {
      setAlertMessage("삭제 되었습니다.");
    } else {
      setAlertMessage(`에러가 발생했습니다.<br /> 잠시 후 다시 시도해주세요.`);
    }
  };

  const isFirstSlide = currentImageIndex === 0;
  const isLastSlide = currentImageIndex === notice.imageUrls.length - 1;

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentImageIndex((prev) =>
        prev < notice.imageUrls.length - 1 ? prev + 1 : prev
      ),
    onSwipedRight: () =>
      setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev)),
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
    delta: 10,
  });

  useEffect(() => {
    if (!isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  const handleSliderPrevClick = () => {
    if (!isFirstSlide) setCurrentImageIndex((prev) => prev - 1);
  };

  const handleSliderNextClick = () => {
    if (!isLastSlide) setCurrentImageIndex((prev) => prev + 1);
  };

  // 메뉴 영역 밖 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpenOption(false);
      }
    };
    if (isOpenOption) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenOption]);

  return (
    <div
      className={`bg-background p-4 md:py-[26px] md:px-6 
    ${
      pin
        ? isSinglePin
          ? "rounded-lg"
          : isFirstPin
          ? "rounded-t-lg"
          : isLastPin
          ? "rounded-b-lg"
          : ""
        : "rounded-lg"
    }
  `}
    >
      <div className="flex flex-col gap-3.5 md:flex-row justify-between">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-6">
            <p className="w-[66px] text-center md:block hidden text-subtext2 text-mobile_body3_r">
              {notice.id}
            </p>
            <div className="flex items-center gap-1 md:gap-2">
              <h1 className="text-text1 text-mobile_body1_m md:text-h4">
                {notice.title}
              </h1>
              <Image
                src={empty}
                alt="empty"
                width={16}
                height={16}
                className={`md:w-5 md:h-5 ${
                  notice.imageUrls.length > 0 ? "" : "hidden"
                }`}
              />
            </div>
          </div>
          <div className="flex items-center gap-[22px]">
            <p className="text-subtext2 hidden md:flex text-mobile_body3_r">
              2024.03.04
            </p>
            <div className="flex gap-1 md:gap-[6px]">
              <Image
                src={vector}
                alt="vector"
                width={24}
                height={24}
                className={`cursor-pointer transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                onClick={handleVectorClick}
              />
              {role === "ADMIN" && (
                <>
                  {isMdUp ? (
                    <div ref={menuRef} className="relative inline-block">
                      <Image
                        src={dotMenu}
                        alt="menu"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                        onClick={handleMenuClick}
                      />
                      {isOpenOption && (
                        <DotMenuDropDown onClick={handleOptionClick} />
                      )}
                    </div>
                  ) : (
                    <Image
                      src={dotMenu}
                      alt="menu"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                      onClick={handleMenuClick}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <p className="text-subtext2 text-mobile_body4_r md:hidden">
          {notice.date}
        </p>
      </div>

      {/* === 드롭다운 영역 === */}
      {isOpen && (
        <div className="md:mt-[34px] mt-4">
          <div className="flex items-center gap-10">
            <Image
              src={noti}
              alt="noti"
              width={32}
              height={32}
              className="ml-[17px] md:block hidden self-start"
            />
            <div className="flex w-full flex-col gap-[14px] md:gap-[23px]">
              <h1 className="text-subtext1 text-mobile_body1_r md:text-body1_r">
                {notice.text}
              </h1>
              <div className="flex justify-between items-center">
                <p className="text-unselected text-mobile_body2_m md:text-body2_m">
                  {notice.userName}
                </p>
                {role === "MEMBER" && (
                  <IconBtn
                    type={"declaration"}
                    size={"small"}
                    title={""}
                    onClick={handleReport}
                  />
                )}
              </div>
            </div>
          </div>

          {/* 이미지 영역 */}
          {notice.imageUrls.length > 0 && (
            <div {...handlers} className="relative w-full mt-4 md:mt-5">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <Image
                  src={notice.imageUrls[currentImageIndex]}
                  alt={`notice-image-${currentImageIndex + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                />
              </div>

              {/* Slider */}
              <div className="hidden md:block">
                <RoundVectorBtn
                  className={`absolute rotate-180 top-[calc(50%-24px)] ml-4 ${
                    isFirstSlide ? "hidden" : "block"
                  }`}
                  imageSize={30}
                  onClick={handleSliderPrevClick}
                />
                <RoundVectorBtn
                  className={`absolute top-[calc(50%-24px)] right-4 ${
                    isLastSlide ? "hidden" : "block"
                  }`}
                  imageSize={30}
                  onClick={handleSliderNextClick}
                />
              </div>

              {/* 이미지 개수 */}
              <div
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white70 
                py-1 px-2.5 rounded-12 backdrop-blur-sm"
              >
                <p className="text-center text-mobile_body3_r md:text-body3_r text-subtext2">
                  {currentImageIndex + 1} / {notice.imageUrls.length}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      {openOption && (
        <CommonBottomSheet
          optionData={OPTION}
          selectedOption={""}
          handleMenuClick={(label: string) => {
            setSelectedOption(label);
            setOpenOption(true);
            if (label === "삭제하기") {
              setIsNotiPopUpOpen(true);
            } else if (label === "수정하기") {
              setModifyOpen(true);
            }
          }}
          onClose={() => {
            setOpenOption(false);
          }}
        />
      )}
      {isNotiPopUpOpen && (
        <NotiPopUp
          onClose={() => setIsNotiPopUpOpen(false)}
          icon={"delete"}
          title="공지사항 삭제"
          description={`공지사항을 정말 삭제하시겠습니까? `}
          modalType={"button"}
          firstButton={handleDelete}
          firstButtonText="삭제하기"
          secondButton={() => setIsNotiPopUpOpen(false)}
          secondButtonText="취소하기"
        />
      )}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
      {isMdUp
        ? isReportOpen && (
            <ReportModal
              onClose={() => setIsReportOpen(false)}
              onSubmit={handleReportSubmit}
            />
          )
        : isReportOpen && (
            <ReportBottomSheet
              onClose={() => setIsReportOpen(false)}
              onSubmit={handleReportSubmit}
            />
          )}
    </div>
  );
};

export default ClubNoticeDropdown;
