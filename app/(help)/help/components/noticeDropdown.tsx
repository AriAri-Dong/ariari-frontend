import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import vector from "@/images/icon/pullDown.svg";
import noti from "@/images/icon/notice.svg";
import empty from "@/images/icon/empty_img.svg";
import Alert from "@/components/alert/alert";
import RoundVectorBtn from "@/components/button/iconBtn/roundVectorBtn";

import { format } from "date-fns";

interface NoticeDropdownProps {
  notice: {
    id: number;
    title: string;
    body: string;
    createdDateTime: string;
    imageUrls?: string[];
    userName?: string;
  };
  isOpen: boolean;
  setOpenDropdownId: (id: number | null) => void;
  pin: boolean;
  isFirstPin?: boolean;
  isLastPin?: boolean;
  isSinglePin?: boolean;
  index: number;
}

const NoticeDropdown = ({
  notice,
  isOpen,
  setOpenDropdownId,
  pin,
  isFirstPin,
  isLastPin,
  isSinglePin,
  index,
}: NoticeDropdownProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleVectorClick = useCallback(() => {
    setOpenDropdownId(isOpen ? null : notice.id);
  }, [isOpen, notice.id, setOpenDropdownId]);

  const isFirstSlide = currentImageIndex === 0;
  const isLastSlide =
    (notice.imageUrls?.length || 0) > 0 &&
    currentImageIndex === (notice.imageUrls?.length || 0) - 1;

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentImageIndex((prev) =>
        prev < (notice.imageUrls?.length || 0) - 1 ? prev + 1 : prev
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
      }`}
    >
      <div className="flex flex-col gap-3.5 md:flex-row justify-between">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-6">
            <p className="w-[66px] text-center md:block hidden text-subtext2 text-mobile_body3_r">
              {index + 1}
            </p>
            <div className="flex items-center gap-1 md:gap-2">
              <h1 className="text-text1 text-mobile_body1_m md:text-h4">
                {notice.title}
              </h1>
              {notice.imageUrls && notice.imageUrls.length > 0 && (
                <Image
                  src={empty}
                  alt="empty"
                  width={16}
                  height={16}
                  className={`md:w-5 md:h-5`}
                />
              )}
            </div>
          </div>
          <div className="flex items-center gap-[22px]">
            <p className="text-subtext2 hidden md:flex text-mobile_body3_r">
              {format(new Date(notice.createdDateTime), "yyyy.MM.dd")}
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
            </div>
          </div>
        </div>
        <p className="text-subtext2 text-mobile_body4_r md:hidden">
          {format(new Date(notice.createdDateTime), "yyyy.MM.dd")}
        </p>
      </div>

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
                {notice.body}
              </h1>
              <div className="flex justify-between items-center">
                <p className="text-unselected text-mobile_body2_m md:text-body2_m">
                  {notice.userName || "운영자"}
                </p>
              </div>
            </div>
          </div>

          {notice.imageUrls && notice.imageUrls.length > 0 && (
            <div {...handlers} className="relative w-full mt-4 md:mt-5">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <Image
                  src={notice.imageUrls[currentImageIndex]}
                  alt={`notice-image-${currentImageIndex + 1}`}
                  layout="fill"
                  objectFit="contain"
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                />
              </div>
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
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white70 py-1 px-2.5 rounded-12 backdrop-blur-sm">
                <p className="text-center text-mobile_body3_r md:text-body3_r text-subtext2">
                  {currentImageIndex + 1} / {notice.imageUrls.length}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default NoticeDropdown;
