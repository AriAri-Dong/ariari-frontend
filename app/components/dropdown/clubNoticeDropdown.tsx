"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useSwipeable } from "react-swipeable";
import vector from "@/images/icon/pullDown.svg";
import dotMenu from "@/images/icon/dotMenu.svg";
import noti from "@/images/icon/notice.svg";
import RoundVectorBtn from "../button/iconBtn/roundVectorBtn";

interface ClubNoticeDropdownProps {
  notice: {
    id: string;
    title: string;
    text: string;
    userName: string;
    imageUrls: any[];
  };
  isOpen: boolean;
  setOpenDropdownId: (id: string | null) => void;
}

const ClubNoticeDropdown = ({
  notice,
  isOpen,
  setOpenDropdownId,
}: ClubNoticeDropdownProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleVectorClick = useCallback(() => {
    setOpenDropdownId(isOpen ? null : notice.id);
  }, [isOpen, notice.id, setOpenDropdownId]);

  const isFirstSlide = currentImageIndex === 0;
  const isLastSlide = currentImageIndex === notice.imageUrls.length - 1;

  // 마우스 스와이프 이벤트 핸들러 (md 이하에서만 작동)
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentImageIndex((prev) =>
        prev < notice.imageUrls.length - 1 ? prev + 1 : 0
      ),
    onSwipedRight: () =>
      setCurrentImageIndex((prev) =>
        prev > 0 ? prev - 1 : notice.imageUrls.length - 1
      ),
  });

  // md 이상에서만 버튼 클릭으로 이미지 넘기기
  const handleSliderPrevClick = () => {
    if (!isFirstSlide) setCurrentImageIndex((prev) => prev - 1);
  };

  const handleSliderNextClick = () => {
    if (!isLastSlide) setCurrentImageIndex((prev) => prev + 1);
  };

  return (
    <div className="bg-background p-4 md:py-[26px] md:px-6 border-b border-gray-300">
      <div className="flex flex-col gap-3.5 md:flex-row justify-between">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-6">
            <p className="w-[66px] text-center md:block hidden text-subtext2 text-mobile_body3_r">
              {notice.id}
            </p>
            <h1 className="text-text1 text-mobile_body1_m md:text-h4">
              {notice.title}
            </h1>
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
              <Image
                src={dotMenu}
                alt="menu"
                width={20}
                height={20}
                className="md:w-6 md:h-6 cursor-pointer"
                onClick={() => console.log("menu 클릭!")}
              />
            </div>
          </div>
        </div>
        <p className="text-subtext2 text-mobile_body4_r md:hidden">
          2024.03.04
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
              <p className="text-unselected text-mobile_body2_m md:text-body2_m">
                {notice.userName}
              </p>
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
    </div>
  );
};

export default ClubNoticeDropdown;
