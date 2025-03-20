"use client";

import Image from "next/image";
import RadioBtn from "../button/radioBtn";
import formatDateToDot from "@/utils/formatDateToDot";
import noimage from "@/images/test/test.svg";

interface RecruitmentCard2Props {
  title: string;
  image: string;
  startDate: string;
  endDate: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

/**
 *
 * @param title 모집공고 제목
 * @param image 모집공고 이미지
 * @param startDate 시작 날짜
 * @param endDate 마감 날짜
 * @param isSelected 선택되었는지 여부
 * @param onClick 클릭 핸들러
 * @param className 추가 스타일링
 *
 * @returns
 */

const RecruitmentCard2 = ({
  title,
  startDate,
  endDate,
  image,
  isSelected,
  onClick,
  className,
}: RecruitmentCard2Props) => {
  return (
    <div
      className={`w-full flex flex-row md:flex-col cursor-pointer ${className}`}
      onClick={onClick}
    >
      <RadioBtn isChecked={isSelected} label={""} onClick={onClick} />
      <Image
        src={image || noimage}
        alt={"recruitment_img"}
        width={80}
        height={80}
        className="mr-4 rounded-16 object-cover md:w-full md:mt-4 md:mr-0 aspect-[1/1]"
      />
      <div className="flex flex-col  gap-2.5 md:flex-col-reverse pt-1 md:px-2 md:pt-5 md:pb-4">
        <div className="text-subtext2 text-mobile_body4_r md:text-body4_r">
          {formatDateToDot(startDate)} ~ {formatDateToDot(endDate)}
        </div>
        <p className="text-text1 text-mobile_body1_sb md:text-body2_m">
          {title}
        </p>
      </div>
    </div>
  );
};

export default RecruitmentCard2;
