import { PageInfo } from "./pageInfo";

// --------- 활동 후기 -----------

export interface TagData {
  id: string;
  body: string;
  icon: TagIconType;
  rate: number;
}

export type TagIconType =
  | "CAREER_PREPARATION"
  | "NETWORKING"
  | "INTEREST_EXPLORATION"
  | "SELF_DEVELOPMENT"
  | "ACADEMIC_IMPROVEMENT"
  | "HEALTH_ENHANCEMENT"
  | "DIVERSE_EXPERIENCE";

// 활동후기 상세
export interface ClubReviewDetail {
  id: string;
  title: string;
  body: string;
  nickname: string;
  creatorId: string;
  createdDateTime: string;
  tagDataList: TagData[];
}

// 활동후기 리스트 정보
export interface ClubReviewData {
  id: string;
  title: string;
  createdDateTime: string;
}

// 활동후기 리스트 res
export interface ClubReviewListRes {
  contents: ClubReviewData[];
  pageInfo: PageInfo;
}
// 활동후기 작성 req
export interface ClubReviewSaveReq {
  title: string;
  body: string;
  icons: TagIconType[];
}

// --------- 합격후기 -----------

export type ProcedureType = "DOCUMENT" | "INTERVIEW";
export type InterviewType = "ONLINE" | "OFFLINE" | "CALL";
export type InterviewRatioType = "ONE_VS_ONE" | "ONE_VS_MANY" | "MANY_VS_MANY";

// 합격후기 리스트 정보
export interface PassReviewData {
  id: string;
  title: string;
  createdDateTime: string;
  documentNoteCount: number;
  interviewNoteCount: number;
}

// 합격후기 리스트 res
export interface PassReviewListRes {
  contents: PassReviewData[];
  pageInfo: PageInfo;
}

// 질문 답변
export interface PassReviewNoteData {
  title: string;
  body: string;
}

// 합격후기 상세 정보
export interface PassReviewDetail {
  id: string;
  creatorId: string;
  procedureType: ProcedureType;
  interviewType: InterviewType;
  interviewRatioType: InterviewRatioType;
  interviewMood: number;
  documentNotes: PassReviewNoteData[];
  interviewNotes: PassReviewNoteData[];
  createdDateTime: string;
}

// 질문 답변 타입
export interface PassReviewNote {
  title: string;
  body: string;
  noteType: ProcedureType;
}

// 합격후기 작성 req
export interface PassReviewSaveReq {
  title: string;
  procedureType: ProcedureType;
  passReviewNotes: PassReviewNote[];
  interviewType?: InterviewType;
  interviewRatioType?: InterviewRatioType;
  interviewMood?: number;
}
