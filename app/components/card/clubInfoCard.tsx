"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MdFavorite } from "react-icons/md";
import { useRouter } from "next/navigation";
import { ClubListData } from "@/types/api";
import defaultImage from "@/images/test/test_image.jpg";
import {
  CLUB_FIELD,
  CLUB_PARTICIPANT,
  CLUB_REGION,
} from "@/constants/clubInfo";

/**
 *
 * @param name 동아리 이름
 * @param profileUri 동아리 프로필
 * @param afiliationType 소속
 * @param clubCategoryType 분야
 * @param clubRegionType 지역
 * @param participantType 대상
 * @param heartNumber 좋아요 개수
 * @param clubPageUrl 동아리 링크
 * @returns
 */
const ClubInfoCard = ({
  id,
  name,
  profileUri,
  bannerUri,
  clubCategoryType,
  clubRegionType,
  participantType,
  isMyBookmark,
  schoolData,
}: ClubListData) => {
  const router = useRouter();
  const [isHeart, setIsHeart] = useState<boolean>(isMyBookmark);
  const [heartNumberVal, setHeartNumberVal] = useState<number>(0);

  const onClubProfileClick = () => {
    router.push(`/club/management/recruitment/applicationStatus?clubId=${id}`);
  };

  const onHeartClick = () => {
    setIsHeart(!isHeart);
    setHeartNumberVal((prev) => (isHeart ? prev - 1 : prev + 1));
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center py-[6px] md:gap-5">
        <div className="relative w-[60px] h-[60px] md:w-[73px] md:h-[73px]">
          <Image
            src={profileUri || defaultImage}
            alt={"club_profile"}
            fill
            className="rounded-full object-cover cursor-pointer"
            onClick={onClubProfileClick}
          />
        </div>
        <div className="flex flex-col gap-[6px] md:gap-2">
          <h1
            className="text-mobile_h3 text-text1 md:text-h3 cursor-pointer"
            onClick={onClubProfileClick}
          >
            {name}
          </h1>
          <p className="text-subtext2 text-mobile_body3_m md:text-body2_m">
            {schoolData == null ? "연합" : "교내"} |{" "}
            {CLUB_FIELD[clubCategoryType]} | {CLUB_REGION[clubRegionType]} |{" "}
            {CLUB_PARTICIPANT[participantType]}
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
