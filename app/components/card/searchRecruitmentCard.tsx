import Image from "next/image";
import { MdBookmark } from "react-icons/md";
import defaultImg from "@/images/icon/defaultAriari.svg";
import useResponsive from "@/hooks/useResponsive";

interface RecruitmentCardProps {
  title: string;
  clubName: string;
  description?: string;
  deadline: string;
  isBookmarked: boolean;
}

const SearchRecruitmentCard = ({
  title,
  clubName,
  description,
  deadline,
  isBookmarked,
}: RecruitmentCardProps) => {
  const isMdUp = useResponsive("md");

  return (
    <div className="flex w-full flex-row gap-3 md:gap-4">
      <div className="relative inline-block">
        <div className="relative w-[80px] h-[80px] md:w-[117px] md:h-[117px]">
          <Image
            src={defaultImg}
            alt="모집공고"
            fill
            className="object-cover rounded-20 bg-white"
          />
        </div>

        <p
          className={`${
            isMdUp
              ? "hidden md:block md:absolute whitespace-nowrap bottom-6 left-1/2 -translate-x-1/2 translate-y-1/2 px-3 py-[6px] rounded-20 bg-black_50 text-white text-12"
              : "md:hidden text-center mt-0.5 text-unselected text-mobile_body3_sb"
          }
        `}
        >
          {deadline}
        </p>
      </div>
      <div className="flex lg:max-w-[390px] w-full flex-col md:gap-3 justify-between md:justify-normal">
        <div className="flex flex-row justify-between">
          <h1 className="w-[70%] md:w-[80%] truncate text-text1 md:text-h4_sb text-body1_sb">
            {title}
          </h1>

          {isMdUp && (
            <MdBookmark
              size={24}
              color={isBookmarked ? "#D1F75D" : "#E3E3E3"}
            />
          )}
        </div>
        <div>
          <p className="text-mobile_body3_m md:text-body2_m text-subtext2 w-[70%] md:w-[80%] truncate">
            {clubName}
          </p>
          <p className="text-mobile_body3_m md:text-body2_m text-subtext2">
            {/* {description} */}
            소속 | 분야 | 지역 | 대상
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchRecruitmentCard;
