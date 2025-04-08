import { MemberData } from "./member";
import { PageInfo } from "./pageInfo";

export type ApplyStatusType = "PENDENCY" | "APPROVE" | "REFUSAL" | "INTERVIEW";
export type AppyStatusText = "대기중" | "합격" | "불합격" | "면접중";

export interface ApplyData {
  id: string;
  name: string;
  applyStatusType: ApplyStatusType;
  createdDateTime: string;
  memberData: MemberData;
  recruitmentTitle: string;
  clubName: string;
}

export interface ApplyListRes {
  applyDataList: ApplyData[];
  pageInfo: PageInfo;
}

export interface ApplyTempData {
  id: string;
  name: string;
  createdDateTime: string;
  recruitmentTitle: string;
  clubName: string;
}

export interface ApplyTempListRes {
  applyDataList: ApplyTempData[];
  pageInfo: PageInfo;
}

export interface ApplicationListConditionReq {
  isPendent: boolean;
  query?: string;
  startDateTime?: string;
  endDateTime?: string;
}

export interface ApplyAnswerData {
  body: string;
  applyQuestionData: {
    id: string;
    body: string;
  };
}

export type ApplySpecialFieldKeys =
  | "gender"
  | "birthday"
  | "phone"
  | "email"
  | "education"
  | "major"
  | "occupation"
  | "mbti"
  | "availablePeriod"
  | "preferredActivityField"
  | "hobby"
  | "sns"
  | "motivation"
  | "activityExperience"
  | "skill"
  | "aspiration"
  | "availableTime"
  | "referralSource";

// 추가 예정
export interface ApplyDetailRes {
  applyData: ApplyData;
  applyAnswerDataList: ApplyAnswerData[];
  specialAnswerList: Record<ApplySpecialFieldKeys, string | null>;
  fileUri?: string;
  portfolioUrl?: string;
}
