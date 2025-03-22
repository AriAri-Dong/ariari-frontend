import { ClubData } from "./club";
import { MemberData } from "./member";
import { PageInfo } from "./pageInfo";
import { RecruitmentData } from "./recruitment";

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
  recruitmentId: string;
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
  recruitmentId: string;
}

export interface ApplyTempListRes {
  applyDataList: ApplyTempData[];
  pageInfo: PageInfo;
}
export type ApplicationKeys =
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

export type SpecialQuestionList = {
  [key in ApplicationKeys]: string | null;
};

export interface ApplyQuestionData {
  id: string;
  body: string;
}

export interface ApplyFormData {
  specialQuestionList: SpecialQuestionList;
  applyQuestionDataList: ApplyQuestionData[];
  portfolio: boolean;
}

export type ApplyField =
  | { key: ApplicationKeys; name: string; type: "radio"; options: string[] }
  | {
      key: ApplicationKeys;
      name: string;
      type: "text";
      maxLength?: number;
      placeholder?: string;
    }
  | {
      key: ApplicationKeys;
      name: string;
      type: "textarea";
      maxLength?: number;
      placeholder?: string;
    }
  | { key: ApplicationKeys; name: string; type: "date" };

export interface ApplyFormRes {
  applyFormData: ApplyFormData;
}

export interface ApplyAnswerReq {
  applyQuestionId: string;
  body: string;
}

export interface ApplySaveReq {
  name: string;
  portfolioUrl: string;
  applyAnswers: ApplyAnswerReq[];
}

export interface ApplyAnswerTempData {
  body: string;
  applyQuestionData: ApplyQuestionData;
}

export interface ApplyTempDetailRes {
  applyData: ApplyTempData;
  clubData: ClubData;
  recruitmentData: RecruitmentData;
  applyAnswerDataList: ApplyAnswerTempData[];
  fileUri: string;
  portfolioUrl: string;
  specialAnswerList: SpecialQuestionList;
}

export interface ApplicationListConditionReq {
  isPendent: boolean;
  query?: string;
  startDateTime?: string;
  endDateTime?: string;
}
