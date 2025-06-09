"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import defaultImg from "@/images/icon/defaultAriari.svg";
import DdayBadge from "../badge/dDayBadge";
import { MdBookmark } from "react-icons/md";
import { calculateRemainingDays } from "@/utils/dateFormatter";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RoundVectorBtn from "../button/iconBtn/roundVectorBtn";
import useResponsive from "@/hooks/useResponsive";
import { RecruitmentData } from "@/types/recruitment";
import NotiPopUp from "../modal/notiPopUp";
import {
  addRecruitmentBookmark,
  removeRecruitmentBookmark,
} from "@/api/recruitment/api";
import LoginModal from "../modal/login/loginModal";
import MobileLoginModal from "../modal/login/mobileLoginModal";
import { useUserStore } from "@/stores/userStore";
import { getClubOptions } from "@/utils/convertToServerFormat";

interface CardProps {
  data: RecruitmentData[];
}

const MainRecruitmentCardWithCarousel = ({ data }: CardProps) => {
  const router = useRouter();
  const isXlUp = useResponsive("lx");
  const isSignIn = useUserStore((state) => !!state.user);

  const [cardData, setCardData] = useState<RecruitmentData[]>(data);
  const [isNotiPopUpOpen, setIsNotiPopUpOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const [isFirstSlide, setIsFirstSlide] = useState<boolean>(true);
  const [isLastSlide, setIsLastSlide] = useState<boolean>(false);
  const slickRef = useRef<Slider>(null);

  useEffect(() => {
    setCardData(data);
  }, [data]);

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

  const toggleScrap = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.stopPropagation();
    const updatedCardData = [...cardData];
    const targetItem = updatedCardData[index];

    if (!isSignIn) {
      setIsNotiPopUpOpen(true);
      return;
    }

    try {
      if (targetItem.isMyBookmark) {
        await removeRecruitmentBookmark(targetItem.id);
        targetItem.isMyBookmark = false;
      } else {
        await addRecruitmentBookmark(targetItem.id);
        targetItem.isMyBookmark = true;
      }

      setCardData(updatedCardData);
    } catch (error) {
      console.error("북마크 처리 중 오류가 발생했습니다.", error);
    }
  };

  useEffect(() => {
    const slidesToScroll = isXlUp ? 4 : 3;
    setIsLastSlide(cardData.length - slidesToScroll <= 0);
  }, [cardData.length, isXlUp]);

  if (cardData.length === 0) {
    return null;
  }

  const handleRouter = (id: string) => {
    router.push(`/recruitment/detail?id=${id}`);
  };

  const handleLoginRedirect = () => {
    setIsNotiPopUpOpen(false);
    setIsLoginModalOpen(true);
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
            const isExpired =
              calculateRemainingDays(item.endDateTime) === "마감";
            const clubData = {
              schoolData: item.clubAffiliationType === "INTERNAL" ? {} : null,
              clubCategoryType: item.clubCategoryType,
              clubRegionType: item.clubRegionType,
              participantType: item.participantType,
            };
            const options = getClubOptions(clubData);
            return (
              <div
                key={index}
                className={`flex gap-4 mr-[18px] md:gap-5 md:flex-col cursor-pointer ${
                  isExpired ? "opacity-50 backdrop-filter backdrop-blur-md" : ""
                }`}
                onClick={() => handleRouter(item.id)}
              >
                <div className="relative min-w-[114px] md:w-full aspect-square">
                  <Image
                    src={item.posterUri || defaultImg}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-3xl"
                  />
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 md:bottom-5">
                    <DdayBadge date={item.endDateTime} />
                  </div>
                </div>
                <div className="flex flex-col w-full md:px-2 md:mt-2.5 md:mb-6">
                  <div className="flex justify-between">
                    <p className="text-subtext1 text-mobile_body3_m mb-[6px] md:text-h4">
                      {item.title}
                    </p>
                    <button
                      onClick={(e) => toggleScrap(e, index)}
                      className="focus:outline-none"
                    >
                      {item.isMyBookmark ? (
                        <MdBookmark className="text-[#D1F75D] w-5 h-5 md:w-6 md:h-6" />
                      ) : (
                        <MdBookmark className="text-[#E3E3E3] w-5 h-5 md:w-6 md:h-6" />
                      )}
                    </button>
                  </div>
                  <h3 className="line-clamp-2 overflow-hidden text-ellipsis max-w-[166px] text-text1 text-mobile_body1_sb mb-5 md:text-h3 md:h-[54px]">
                    {item.body}
                  </h3>
                  <p className="text-subtext2 text-mobile_body3_m md:text-body2_m">
                    {options.map((opt) => opt.value).join(" | ")}
                  </p>
                </div>
              </div>
            );
          })}
        </Slider>
        {isNotiPopUpOpen && (
          <NotiPopUp
            onClose={() => setIsNotiPopUpOpen(false)}
            icon={"login"}
            title="로그인이 필요한 서비스입니다."
            description={`북마크를 등록하려면\n아리아리 서비스 로그인이 필요합니다.`}
            modalType={"button"}
            firstButton={handleLoginRedirect}
            firstButtonText="로그인 후 이용하기"
            secondButton={() => setIsNotiPopUpOpen(false)}
            secondButtonText="다음에 할게요"
          />
        )}

        {isLoginModalOpen && (
          <>
            <LoginModal onClose={() => setIsLoginModalOpen(false)} />
            <MobileLoginModal onClose={() => setIsLoginModalOpen(false)} />
          </>
        )}
      </div>
    </>
  );
};

export default MainRecruitmentCardWithCarousel;
