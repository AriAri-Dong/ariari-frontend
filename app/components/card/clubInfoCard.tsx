"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MdFavorite } from "react-icons/md";
import { useRouter } from "next/navigation";

interface ClubProfileCardProps {
  clubName: string;
  clubImage: string;
  affiliation: string;
  field: string;
  region: string;
  target: string;
  heartNumber: number;
  clubPageUrl: string;
}

/**
 *
 * @param clubName 동아리 이름
 * @param clubImage 동아리 프로필
 * @param affiliation 소속
 * @param field 분야
 * @param region 지역
 * @param target 대상
 * @param heartNumber 좋아요 개수
 * @param clubPageUrl 동아리 링크
 * @returns
 */
const ClubInfoCard = ({
  clubName,
  clubImage,
  affiliation,
  field,
  region,
  target,
  heartNumber,
  clubPageUrl,
}: ClubProfileCardProps) => {
  const router = useRouter();
  const [isHeart, setIsHeart] = useState<boolean>(false);
  const [heartNumberVal, setHeartNumberVal] = useState<number>(heartNumber);

  const onClubProfileClick = () => {
    router.push(clubPageUrl);
  };

  const onHeartClick = () => {
    setIsHeart(!isHeart);
    setHeartNumberVal((prev) => (isHeart ? prev - 1 : prev + 1));
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center py-[6px] md:gap-5">
        <Image
          src={clubImage}
          alt={"club_profile"}
          width={60}
          height={60}
          className="rounded-full object-cover md:w-[73px] md:h-[73px] cursor-pointer"
          onClick={onClubProfileClick}
        />
        <div className="flex flex-col gap-[6px] md:gap-2">
          <h1
            className="text-mobile_h3 text-text1 md:text-h3 cursor-pointer"
            onClick={onClubProfileClick}
          >
            {clubName}
          </h1>
          <p className="text-subtext2 text-mobile_body3_m md:text-body2_m">
            {affiliation} | {field} | {region} | {target}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1 md:mr-[6px]">
        <div className="cursor-pointer" onClick={onHeartClick}>
          {isHeart ? (
            <MdFavorite className="text-[#D1F75D] text-[20px] md:text-[28px]" />
          ) : (
            <MdFavorite className="text-[#E3E3E3] text-[20px] md:text-[28px]" />
          )}
        </div>
        <p className="text-mobile_body4_r text-center text-subtext1 md:text-body4_r">
          {heartNumberVal}
        </p>
      </div>
    </div>
  );
};

export default ClubInfoCard;
