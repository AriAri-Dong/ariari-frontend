import React, { useState } from "react";
import Image from "next/image";
import { MainRecruitmentCardProps } from "@/types/components/card";
import DdayBadge from "../badge/dDayBadge";
import { MdBookmark } from "react-icons/md";
import { calculateRemainingDays } from "@/utils/dateFormatter";
import { useRouter } from "next/navigation";

interface CardProps {
  data: MainRecruitmentCardProps[];
}

const MainRecruitmentCard = ({ data }: CardProps) => {
  const router = useRouter();
  const [cardData, setCardData] = useState<MainRecruitmentCardProps[]>(data);

  const toggleScrap = (index: number) => {
    setCardData((prevData) =>
      prevData.map((item, idx) =>
        idx === index ? { ...item, isScrap: !item.isScrap } : item
      )
    );
  };

  if (cardData.length === 0) {
    return null;
  }

  const handleRouter = () => {
    // 경로 임시 설정
    router.push("/");
  };

  return (
    <>
      {cardData.map((item, index) => {
        const isExpired = calculateRemainingDays(item.date) === "마감";
        return (
          <div
            key={index}
            className={`flex gap-4 md:gap-5 md:flex-col cursor-pointer ${
              isExpired ? "opacity-50 backdrop-filter backdrop-blur-md" : ""
            }`}
            onClick={handleRouter}
          >
            <div className="relative min-w-[114px] md:w-full">
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
            <div className="felx flex-col w-full md:px-2 md:mt-2.5 md:mb-6">
              <div className="flex justify-between">
                <p className="text-subtext1 text-mobile_body3_m mb-[6px] md:text-h4">
                  {item.clubName}
                </p>
                <button
                  onClick={() => toggleScrap(index)}
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
                {item.tag.affiliation} | {item.tag.field} | {item.tag.region} |
                {item.tag.target}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MainRecruitmentCard;
