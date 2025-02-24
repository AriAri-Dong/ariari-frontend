import { PageInfo } from "./pageInfo";

export interface RecruitmentData {
  id: string; // 모집공고 ID
  title: string;
  body: string;
  posterUri: string;
  procedureType: "DOCUMENT" | "INTERVIEW"; // 전형 절차 (문서 or 면접)
  limits: number; // 모집 인원 제한
  createdDateTime: string;
  startDateTime: string;
  endDateTime: string;
  isActivated: boolean;
  isMyBookmark: boolean;
}

export interface ClubRecruitmentListRes {
  recruitmentDataList: RecruitmentData[];
  pageInfo: PageInfo;
}
