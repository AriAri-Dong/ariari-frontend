import { ClubFieldType, ClubRegionType, ParticipantType } from "@/types/club";

/**
 * club 상세 조회 내 활동 분야, 활동 지역, 활동 대상 매핑
 *
 * @example
 * CLUB_FIELD["AMITY"] // "친목"
 */
export const CLUB_FIELD: Record<ClubFieldType, string> = {
  CULTURE: "문화예술",
  VOLUNTEER: "봉사",
  STUDY: "학술",
  STARTUP: "창업",
  EMPLOYMENT: "취업",
  SPORTS: "체육",
  AMITY: "친목",
  ETC: "기타",
};
export const CLUB_REGION: Record<ClubRegionType, string> = {
  SEOUL_GYEONGGI: "수도권",
  CHUNGCHEONG: "충청/대전",
  GYEONGNAM: "경남/부산/울산",
  GYEONGBUK: "경북/대구",
  JEONNAM: "전남/광주",
  JEONBUK: "전북",
  GANGWON: "강원",
  JEJU: "제주",
  FOREIGN: "해외",
};

export const CLUB_PARTICIPANT: Record<ParticipantType, string> = {
  UNIVERSITY_STUDENT: "대학생",
  GRADUATE_STUDENT: "대학원생",
  OFFICE_WORKER: "직장인/일반인",
};
