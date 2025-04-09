import { ClubData } from "@/types/club";
import { PageInfo } from "@/types/pageInfo";
import { ApplyFormData } from "./application";

export type ProcedureType = "DOCUMENT" | "INTERVIEW";
export type RecruitmentStatusType = "SCHEDULED" | "OPEN" | "CLOSED";

export interface RecruitmentData {
  id: string;
  clubId: number; // 동아리 ID
  title: string;
  body: string;
  posterUri: string;
  procedureType: ProcedureType;
  limits: number;
  startDateTime: string;
  endDateTime: string;
  createdDateTime: string;
  // isActivated: boolean;
  recruitmentStatusType: RecruitmentStatusType;
  isMyBookmark: boolean;
}

export interface RecruitmentNoteData {
  question: string;
  answer: string;
}
export interface ApplyQuestionData {
  id: number;
  body: string;
}

export interface RecruitmentResponse {
  recruitmentData: RecruitmentData;
  recruitmentNoteDataList: RecruitmentNoteData[];
  clubData: ClubData;
  applyFormData: ApplyFormData;
  bookmarks: number;
  isMyClub: boolean;
  isMyApply: boolean;
}
export interface ClubRecruitmentListResponse {
  recruitmentDataList: RecruitmentData[];
  pageInfo: PageInfo;
}
