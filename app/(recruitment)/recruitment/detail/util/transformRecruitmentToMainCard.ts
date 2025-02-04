import { MainRecruitmentCardProps } from "@/types/components/card";
import { RecruitmentResponse } from "@/types/recruitment";
import formatDateToDot from "@/utils/formatDateToDot";

export function transformRecruitmentToMainCard(
  recruitmentResponse: RecruitmentResponse
): MainRecruitmentCardProps {
  const { recruitmentData, clubData, bookmarks, isMyClub, isMyApply } =
    recruitmentResponse;

  return {
    id: recruitmentData.id,
    startDate: formatDateToDot(recruitmentData.startDateTime),
    endDate: formatDateToDot(recruitmentData.endDateTime),
    clubName: clubData.name,
    clubImageUrl: clubData.profileUri || undefined,
    title: recruitmentData.title,
    imageUrl: recruitmentData.posterUri,
    limits: recruitmentData.limits,
    tag: {
      affiliation: clubData.schoolData.name,
      field: clubData.clubCategoryType,
      region: clubData.clubRegionType,
      target: clubData.participantType,
    },
    procedureType: recruitmentData.procedureType,
    isMyClub: isMyClub,
    isMyApply: isMyApply,
    recruitmentBookmarks: bookmarks,
    isMyRecruitmentScrap: recruitmentData.isMyBookmark,
    isMyClubBookmark: clubData.isMyBookmark,
  };
}
