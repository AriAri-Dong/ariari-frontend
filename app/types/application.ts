import { MemberData } from "./member";
import { PageInfo } from "./pageInfo";

export type ApplyStatusType = "PENDENCY" | "APPROVE" | "REFUSAL" | "INTERVIEW";

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

export type ApplyQuestionData = {
  id: string;
  body: string;
};

export type ApplyFormData = {
  specialQuestionList: SpecialQuestionList;
  applyQuestionDataList: ApplyQuestionData[];
  portfolio: boolean;
};

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

export type ApplyFormRes = {
  applyFormData: ApplyFormData;
};

export type ApplyAnswerReq = {
  applyQuestionId: string;
  body: string;
};

export type ApplySaveReq = {
  name: string;
  portfolioUrl: string;
  applyAnswers: ApplyAnswerReq[];
};
