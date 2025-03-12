import React, { useState } from "react";
import Image from "next/image";
import { MainRecruitmentCardProps } from "@/types/components/card";
import DdayBadge from "../badge/dDayBadge";
import { MdBookmark } from "react-icons/md";
import { calculateRemainingDays } from "@/utils/dateFormatter";
import { useRouter } from "next/navigation";
import { RecruitmentData } from "@/types/recruitment";
import defaultImg from "@/images/icon/defaultAriari.svg";
import {
  CLUB_FIELD,
  CLUB_PARTICIPANT,
  CLUB_REGION,
} from "@/constants/clubInfo";

interface CardProps {
  data: RecruitmentData[];
}

const MainRecruitmentCard = ({ data }: CardProps) => {
  const router = useRouter();
  const [cardData, setCardData] = useState<RecruitmentData[]>(data);

  const toggleScrap = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.stopPropagation();
    setCardData((prevData) =>
      prevData.map((item, idx) =>
        idx === index ? { ...item, isScrap: !item.isMyBookmark } : item
      )
    );
  };

  if (cardData.length === 0) {
    return null;
  }

  const handleRouter = (id: number) => {
    router.push(`/recruitment/detail?id=${id}`);
  };

  return (
    <>
      {cardData.map((item, index) => {
        const isExpired = calculateRemainingDays(item.endDateTime) === "마감";
        return (
          <div
            key={index}
            className={`flex gap-4 md:gap-5 md:flex-col cursor-pointer ${
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
                className="rounded-3xl shadow-default"
              />
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 md:bottom-5">
                <DdayBadge date={item.endDateTime} />
              </div>
            </div>

            <div className="flex flex-col w-full md:px-2 md:mt-2.5 md:mb-6">
              <div className="flex justify-between">
                <p className="text-subtext1 text-mobile_body3_m mb-[6px] md:text-h4">
                  {/* {item.clubName} */}
                  {"동아리 이름"}
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
              <h3
                className="flex flex-wrap max-w-[166px] text-text1 text-mobile_body1_sb mb-5
              md:text-h3 md:h-[54px]"
              >
                {item.title}
              </h3>
              <p className="text-subtext2 text-mobile_body3_m md:text-body2_m">
                지금 | 데이터가 | 안들어오고 | 있습니다.
                {/* {schoolData == null ? "연합" : "교내"} |{" "}
                {CLUB_FIELD[clubCategoryType]} | {CLUB_REGION[clubRegionType]} |{" "}
                {CLUB_PARTICIPANT[participantType]} */}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MainRecruitmentCard;
