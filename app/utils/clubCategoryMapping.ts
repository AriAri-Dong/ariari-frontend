import { ClubFieldType, ClubRegionType, ParticipantType } from "@/types/club";

export const fieldMap: Record<ClubFieldType, string> = {
  CULTURE: "문화",
  VOLUNTEER: "봉사",
  STUDY: "학습",
  STARTUP: "스타트업",
  EMPLOYMENT: "취업",
  SPORTS: "스포츠",
  AMITY: "친목",
  ETC: "기타",
};

export const regionMap: Record<ClubRegionType, string> = {
  SEOUL_GYEONGGI: "서울/경기",
  CHUNGCHEONG: "충청",
  GYEONGNAM: "경남",
  GYEONGBUK: "경북",
  JEONNAM: "전남",
  JEONBUK: "전북",
  GANGWON: "강원",
  JEJU: "제주",
  FOREIGN: "해외",
};

export const participantMap: Record<ParticipantType, string> = {
  UNIVERSITY_STUDENT: "대학교 학생",
  GRADUATE_STUDENT: "대학원생",
  OFFICE_WORKER: "직장인",
};
