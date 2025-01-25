"use client";

import Image from "next/image";
import error from "@/images/icon/error.svg";
import RadioBtn from "../button/radioBtn";
import formatDateToDot from "@/utils/formatDateToDot";

interface RecruitmentCard2Props {
  title: string;
  image: string;
  startDate: string;
  endDate: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

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
      className={`w-full flex flex-row md:flex-col ${className}`}
      onClick={onClick}
    >
      <RadioBtn isChecked={isSelected} label={""} onClick={onClick} />
      <Image
        src={image}
        alt={"recruitment_img"}
        width={80}
        height={80}
        className="mr-4 object-cover md:w-full md:mt-4 md:mr-0 md:aspect-[1/1]"
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
