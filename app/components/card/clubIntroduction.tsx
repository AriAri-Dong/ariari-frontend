import { TagData } from "@/types/review";
import ReviewBadge from "../badge/review/reviewBadge";

interface ClubIntroductionProps {
  introductionText: string;
  badgeType?: TagData;
}

const ClubIntroduction = ({
  introductionText,
  badgeType,
}: ClubIntroductionProps) => {
  return (
    <div
      className="flex w-full bg-searchbar flex-col gap-4 px-5 py-[22px] 
      rounded-xl md:px-7 md:py-[26px]"
    >
      <p className="text-body1_r text-subtext1">{introductionText}</p>
      {badgeType && (
        <div className="flex">
          <ReviewBadge tag={badgeType} />
        </div>
      )}
    </div>
  );
};

export default ClubIntroduction;
