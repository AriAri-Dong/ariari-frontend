import { ClubInfoCard } from "@/types/components/card";
import { RecruitmentResponse } from "@/types/recruitment";
import formatDateToDot from "@/utils/formatDateToDot";

export function transformRecruitmentToMainCard(
  recruitmentResponse: RecruitmentResponse
): ClubInfoCard {
  const {
    recruitmentData,
    clubData,
    bookmarks,
    isMyClub,
    isMyApply,
    applyFormData,
    myRecentApplyTempId,
  } = recruitmentResponse;

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
      affiliation: clubData.schoolData ? clubData.schoolData.name : "교외",
      field: clubData.clubCategoryType,
      region: clubData.clubRegionType,
      target: clubData.participantType,
    },
    procedureType: recruitmentData.procedureType,
    clubId: clubData.id,
    isMyClub: isMyClub,
    isMyApply: isMyApply,
    recruitmentBookmarks: bookmarks,
    isMyRecruitmentScrap: recruitmentData.isMyBookmark,
    isMyClubBookmark: clubData.isMyBookmark,
    applyFormData: applyFormData,
    myRecentApplyTempId: myRecentApplyTempId,
  };
}
