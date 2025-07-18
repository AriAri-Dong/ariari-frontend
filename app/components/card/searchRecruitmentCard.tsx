import Image from "next/image";
import { MdBookmark } from "react-icons/md";
import defaultImg from "@/images/icon/defaultAriari.svg";
import useResponsive from "@/hooks/useResponsive";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  addRecruitmentBookmark,
  removeRecruitmentBookmark,
} from "@/api/recruitment/api";
import Alert from "../alert/alert";
import {
  ClubAffiliationType,
  ClubFieldType,
  ClubRegionType,
  ParticipantType,
} from "@/types/club";
import { getClubOptions } from "@/utils/convertToServerFormat";

interface RecruitmentCardProps {
  id: string;
  title: string;
  clubName: string;
  description?: string;
  deadline: string;
  isBookmarked: boolean;
  clubAffiliationType?: ClubAffiliationType;
  clubCategoryType?: ClubFieldType;
  clubRegionType?: ClubRegionType;
  participantType?: ParticipantType;
}

const SearchRecruitmentCard = ({
  id,
  title,
  clubName,
  description,
  deadline,
  isBookmarked,
  clubAffiliationType,
  clubCategoryType,
  clubRegionType,
  participantType,
}: RecruitmentCardProps) => {
  const router = useRouter();
  const isMdUp = useResponsive("md");

  const [bookmarked, setBookmarked] = useState<boolean>(isBookmarked);
  const [loading, setLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const clubOptions = getClubOptions({
    schoolData: clubAffiliationType === "INTERNAL" ? {} : null,
    clubCategoryType,
    clubRegionType,
    participantType,
  });

  const handleRouter = () => {
    router.push(`/recruitment/detail?id=${id}`);
  };

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading) return;

    setLoading(true);
    try {
      if (bookmarked) {
        await removeRecruitmentBookmark(id);
      } else {
        await addRecruitmentBookmark(id);
      }
      setBookmarked((prev) => !prev);
    } catch (err) {
      setAlertMessage(
        "북마크 처리 중 오류가 발생했습니다.<br />잠시 후 다시 시도해주세요."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex w-full flex-row gap-3 md:gap-4 cursor-pointer"
      onClick={handleRouter}
    >
      <div className="relative flex-shrink-0">
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
          }`}
        >
          {deadline}
        </p>
      </div>

      <div className="flex flex-col flex-grow min-w-0 md:gap-3 md:justify-normal justify-between">
        <div className="flex flex-row justify-between items-start">
          <h1 className="truncate text-text1 md:text-h4_sb text-body1_sb min-w-0">
            {title}
          </h1>

          {isMdUp && (
            <div className="flex-shrink-0 ml-2">
              <MdBookmark
                size={24}
                color={bookmarked ? "#D1F75D" : "#E3E3E3"}
                onClick={handleBookmarkClick}
                className="cursor-pointer"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 md:gap-0.5 overflow-hidden">
          <p className="truncate text-mobile_body3_m md:text-body2_m text-subtext2 min-w-0">
            {clubName}
          </p>
          <p className="text-mobile_body3_m md:text-body2_m text-subtext2">
            {clubOptions.map((opt) => opt.value).join(" | ")}
          </p>
        </div>
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default SearchRecruitmentCard;
