"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { MainRecruitmentCardProps } from "@/types/components/card";
import DdayBadge from "../badge/dDayBadge";
import { MdBookmark } from "react-icons/md";
import { calculateRemainingDays } from "@/utils/dateFormatter";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RoundVectorBtn from "../button/iconBtn/roundVectorBtn";
import useResponsive from "../../../hooks/useResponsive";

interface CardProps {
  data: MainRecruitmentCardProps[];
}

const MainRecruitmentCardWithCarousel = ({ data }: CardProps) => {
  const router = useRouter();
  const isXlUp = useResponsive("lx");
  const [cardData, setCardData] = useState<MainRecruitmentCardProps[]>(data);
  const [isFirstSlide, setIsFirstSlide] = useState<boolean>(true);
  const [isLastSlide, setIsLastSlide] = useState<boolean>(false);
  const slickRef = useRef<Slider>(null);

  const handleSliderPrevClick = useCallback(
    () => slickRef?.current?.slickPrev(),
    []
  );
  const handleSliderNextClick = useCallback(
    () => slickRef?.current?.slickNext(),
    []
  );

  const carouselSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    swipe: false,
    responsive: [
      {
        breakpoint: 1288,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    afterChange: (index: number) => {
      const slidesToScroll = isXlUp ? 4 : 3;
      setIsFirstSlide(index === 0);
      setIsLastSlide(cardData.length - slidesToScroll <= index);
    },
  };

  const toggleScrap = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    setCardData((prevData) =>
      prevData.map((item, idx) =>
        idx === index ? { ...item, isScrap: !item.isScrap } : item
      )
    );
    e.preventDefault();
  };

  useEffect(() => {
    const slidesToScroll = isXlUp ? 4 : 3;
    setIsLastSlide(cardData.length - slidesToScroll <= 0);
  }, [cardData.length, isXlUp]);

  if (cardData.length === 0) {
    return null;
  }

  const handleRouter = () => {
    // 경로 임시 설정
    router.push("/");
  };

  return (
    <>
      <div className="w-full relative">
        <div
          className={`absolute rotate-180 top-[calc(50%-24px)] left-[-10px] ${
            isFirstSlide ? "hidden" : "block"
          }`}
          style={{ zIndex: 1 }}
        >
          <RoundVectorBtn
            className="p-[9px]"
            imageSize={30}
            onClick={handleSliderPrevClick}
          />
        </div>
        <div
          className={`absolute top-[calc(50%-24px)] right-[-10px] ${
            isLastSlide ? "hidden" : "block"
          }`}
          style={{ zIndex: 1 }}
        >
          <RoundVectorBtn
            className="p-[9px]"
            imageSize={30}
            onClick={handleSliderNextClick}
          />
        </div>
        <Slider ref={slickRef} {...carouselSettings}>
          {cardData.map((item, index) => {
            const isExpired = calculateRemainingDays(item.date) === "마감";
            return (
              <div
                key={index}
                className={`flex gap-4 mr-[18px] md:gap-5 md:flex-col cursor-pointer ${
                  isExpired ? "opacity-50 backdrop-filter backdrop-blur-md" : ""
                }`}
                onClick={() => handleRouter}
              >
                <div className="relative min-w-[114px] md:w-full mb-[20px]">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={114}
                    height={114}
                    className="rounded-3xl md:w-full shadow-default"
                  />
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 md:bottom-5">
                    <DdayBadge date={item.date} />
                  </div>
                </div>
                <div className="flex flex-col w-full md:px-2 md:mt-2.5 md:mb-6">
                  <div className="flex justify-between">
                    <p className="text-subtext1 text-mobile_body3_m mb-[6px] md:text-h4">
                      {item.clubName}
                    </p>
                    <button
                      onClick={(e) => toggleScrap(e, index)}
                      className="focus:outline-none"
                    >
                      {item.isScrap ? (
                        <MdBookmark className="text-[#D1F75D] w-5 h-5 md:w-6 md:h-6" />
                      ) : (
                        <MdBookmark className="text-[#E3E3E3] w-5 h-5 md:w-6 md:h-6" />
                      )}
                    </button>
                  </div>
                  <h3
                    className="flex flex-wrap max-w-[166px] text-text1 text-mobile_body1_sb mb-5
              md:text-h3 md:h-[54px]"
                  >
                    {item.title}
                  </h3>
                  <p className="text-subtext2 text-mobile_body3_m md:text-body2_m">
                    {item.tag.affiliation} | {item.tag.field} |{" "}
                    {item.tag.region} |{item.tag.target}
                  </p>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
};

export default MainRecruitmentCardWithCarousel;
