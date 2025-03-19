import { PageInfo } from "./pageInfo";

export interface RecruitmentNote {
  question: string;
  answer: string;
}
export interface RecruitmentData {
  id: number; // 모집공고 ID
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
  recruitmentNoteDataList: RecruitmentNote[];
}
export interface ClubRecruitmentListResponse {
  recruitmentDataList: RecruitmentData[];
  pageInfo: PageInfo;
}

export interface RecruitmentSaveReq {
  title: string;
  body: string;
  procedureType: "DOCUMENT" | "INTERVIEW";
  limits: number;
  startDateTime: string;
  endDateTime: string;
  recruitmentNotes: RecruitmentNote[];
}
export interface FormDataRequest {
  saveReq: RecruitmentSaveReq;
  file: File | null;
}
