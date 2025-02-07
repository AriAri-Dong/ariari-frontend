"use client";

import { useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import RecruitmentCard2 from "@/components/card/recruitmentCard2";
import RoundVectorBtn from "@/components/button/iconBtn/roundVectorBtn";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";

import { RecruitmentData } from "@/types/recruitment";
import useResponsive from "@/hooks/useResponsive";

interface RecruitmentContainerProps {
  previousRecruitmentList: RecruitmentData[];
  selectedRecruitment: RecruitmentData | null;
  handleClick: (recruitment: RecruitmentData) => void;
}
/**
 *
 * @param previousRecruitmentList 이전 모집공고 리스트
 * @param selectedRecruitment 선택된 모집공고
 * @param handleClick 모집공고 선택 핸들러
 *
 * @returns
 */

const RecruitmentSlideContainer = ({
  previousRecruitmentList,
  selectedRecruitment,
  handleClick,
}: RecruitmentContainerProps) => {
  const isMdUp = useResponsive("md");
  const isLgUp = useResponsive("lg");

  const [isFirstSlide, setIsFirstSlide] = useState<boolean>(true);
  const [isLastSlide, setIsLastSlide] = useState<boolean>(false);
  const [mobileVisibleCount, setMobileVisibleCount] = useState<number>(3);

  const CustomArrow = ({ onClick, isHidden, direction }: any) => {
    if (isHidden) return null;

    return (
      <button
        onClick={onClick}
        className={`absolute top-1/2 -translate-y-1/2 z-10 ${
          direction === "left" ? "left-0 rotate-180" : "right-0"
        }`}
      >
        <RoundVectorBtn className="md:p-2 lg:p-3" onClick={onClick} />
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: isLgUp ? 6 : 4,
    slidesToScroll: isLgUp ? 6 : 4,

    afterChange: (index: number) => {
      setIsFirstSlide(index === 0);
      setIsLastSlide(
        isLgUp
          ? previousRecruitmentList.length - 6 <= index
          : previousRecruitmentList.length - 4 <= index
      );
      console.log(index);
    },

    nextArrow: <CustomArrow isHidden={isLastSlide} direction="right" />,
    prevArrow: <CustomArrow isHidden={isFirstSlide} direction="left" />,
  };

  return (
    <>
      {isMdUp && (
        <div className="relative">
          <Slider {...settings} className="px-7">
            {previousRecruitmentList.map((recruitment, index) => (
              <div key={index}>
                <RecruitmentCard2
                  title={recruitment.title}
                  startDate={recruitment.startDateTime}
                  endDate={recruitment.endDateTime}
                  image={recruitment.posterUri}
                  isSelected={selectedRecruitment?.id === recruitment.id}
                  onClick={() => handleClick(recruitment)}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
      {!isMdUp && (
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex flex-col gap-2.5 mb-4">
            {previousRecruitmentList
              .slice(0, mobileVisibleCount)
              .map((recruitment, index) => (
                <RecruitmentCard2
                  key={index}
                  title={recruitment.title}
                  startDate={recruitment.startDateTime}
                  endDate={recruitment.endDateTime}
                  image={recruitment.posterUri}
                  isSelected={selectedRecruitment?.id === recruitment.id}
                  onClick={() => handleClick(recruitment)}
                />
              ))}
          </div>
          <PlusBtn
            title={"더보기"}
            onClick={() => {
              setMobileVisibleCount(mobileVisibleCount + 3);
            }}
            className={`mx-auto ${
              mobileVisibleCount > previousRecruitmentList.length && "hidden"
            }`}
          />
        </div>
      )}
    </>
  );
};
export default RecruitmentSlideContainer;
