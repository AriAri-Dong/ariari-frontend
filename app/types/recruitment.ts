import { ClubData } from "@/types/club";
import { PageInfo } from "@/types/pageInfo";

export type ProcedureType = "DOCUMENT" | "INTERVIEW";

export interface RecruitmentData {
  id: number;
  title: string;
  body: string;
  posterUri: string;
  procedureType: ProcedureType;
  limits: number;
  startDateTime: string;
  endDateTime: string;
  createdDateTime: string;
  isActivated: boolean;
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

export interface ApplyFormData {
  applyQuestionDataList: ApplyQuestionData[];
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
