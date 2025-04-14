"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MdFavorite } from "react-icons/md";
import { useRouter } from "next/navigation";
import { ClubData } from "@/types/api";
import defaultImg from "@/images/icon/defaultAriari.svg";
import {
  CLUB_FIELD,
  CLUB_PARTICIPANT,
  CLUB_REGION,
} from "@/constants/clubInfo";
import { addClubBookmark, removeClubBookmark } from "@/api/club/api";

/**
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
}: ClubData) => {
  const router = useRouter();
  const [isHeart, setIsHeart] = useState<boolean>(isMyBookmark);
  // 현재 북마크 개수에 대한 데이터 없음
  const [heartNumberVal, setHeartNumberVal] = useState<number>(
    isMyBookmark ? 1 : 0
  );

  const onClubProfileClick = () => {
    router.push(`/club/activityHistory?clubId=${id}`);
  };

  const onHeartClick = async () => {
    try {
      setIsHeart((prev) => !prev);
      setHeartNumberVal((prev) => (isHeart ? Math.max(prev - 1, 0) : prev + 1));

      if (isHeart) {
        await removeClubBookmark(id);
      } else {
        await addClubBookmark(id);
      }
    } catch (error) {
      console.error("북마크 변경 실패:", error);
      setIsHeart((prev) => !prev);
      setHeartNumberVal((prev) => (isHeart ? prev + 1 : Math.max(prev - 1, 0)));
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center py-[6px] md:gap-5">
        <div className="relative">
          <Image
            src={profileUri || defaultImg}
            alt={"club_profile"}
            width={60}
            height={60}
            className="rounded-full object-cover cursor-pointer md:w-[73px] md:h-[73px]"
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
