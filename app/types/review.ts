import { PageInfo } from "./pageInfo";

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

// 활동후기 리스트
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
