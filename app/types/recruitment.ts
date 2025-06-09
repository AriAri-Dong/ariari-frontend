import {
  ClubAffiliationType,
  ClubData,
  ClubFieldType,
  ClubRegionType,
  ParticipantType,
} from "@/types/club";
import { PageInfo } from "@/types/pageInfo";
import { ApplyFormData } from "./application";

export type ProcedureType = "DOCUMENT" | "INTERVIEW";
export type RecruitmentStatusType = "SCHEDULED" | "OPEN" | "CLOSED";

export interface RecruitmentData {
  id: string;
  clubId: string; // 동아리 ID
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
  recruitmentNoteDataList: RecruitmentNoteData[];
  clubAffiliationType?: ClubAffiliationType;
  clubCategoryType?: ClubFieldType;
  clubRegionType?: ClubRegionType;
  participantType?: ParticipantType;
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
  recruitmentNotes: RecruitmentNoteData[];
}
export interface FormDataRequest {
  saveReq: RecruitmentSaveReq;
  file: File | null;
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
  myRecentApplyTempId: string;
}
export interface ClubRecruitmentListResponse {
  recruitmentDataList: RecruitmentData[];
  pageInfo: PageInfo;
}
export interface ClubActiceRecruitmentResponse {
  recruitmentData: RecruitmentData;
}
