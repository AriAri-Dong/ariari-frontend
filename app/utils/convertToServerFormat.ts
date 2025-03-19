import { CreateClubTypeData } from "@/types/api";

export const convertToServerFormat = (
  affiliation: string,
  field: string,
  region: string,
  target: string
): CreateClubTypeData => {
  // affiliationType 변환
  const affiliationType: "EXTERNAL" | "INTERNAL" =
    affiliation === "연합"
      ? "EXTERNAL"
      : affiliation === "교내"
      ? "INTERNAL"
      : "EXTERNAL";

  // categoryType 변환
  const categoryType:
    | "CULTURE"
    | "VOLUNTEER"
    | "STUDY"
    | "STARTUP"
    | "EMPLOYMENT"
    | "SPORTS"
    | "AMITY"
    | "ETC" =
    field === "문화예술"
      ? "CULTURE"
      : field === "봉사"
      ? "VOLUNTEER"
      : field === "학술"
      ? "STUDY"
      : field === "창업"
      ? "STARTUP"
      : field === "취업"
      ? "EMPLOYMENT"
      : field === "체육"
      ? "SPORTS"
      : field === "친목"
      ? "AMITY"
      : "ETC";

  // regionType 변환
  const regionType:
    | "SEOUL_GYEONGGI"
    | "CHUNGCHEONG"
    | "GYEONGNAM"
    | "GYEONGBUK"
    | "JEONNAM"
    | "JEONBUK"
    | "GANGWON"
    | "JEJU"
    | "FOREIGN" =
    region === "수도권"
      ? "SEOUL_GYEONGGI"
      : region === "충청/대전"
      ? "CHUNGCHEONG"
      : region === "경남/부산/울산"
      ? "GYEONGNAM"
      : region === "경북/대구"
      ? "GYEONGBUK"
      : region === "전남/광주"
      ? "JEONNAM"
      : region === "전북"
      ? "JEONBUK"
      : region === "강원"
      ? "GANGWON"
      : region === "제주"
      ? "JEJU"
      : "FOREIGN";

  // participantType 변환
  const participantType:
    | "UNIVERSITY_STUDENT"
    | "GRADUATE_STUDENT"
    | "OFFICE_WORKER" =
    target === "대학생"
      ? "UNIVERSITY_STUDENT"
      : target === "대학원생"
      ? "GRADUATE_STUDENT"
      : target === "직장인"
      ? "OFFICE_WORKER"
      : "UNIVERSITY_STUDENT";

  return {
    affiliationType,
    categoryType,
    regionType,
    participantType,
  };
};
