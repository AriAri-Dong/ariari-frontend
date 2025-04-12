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
