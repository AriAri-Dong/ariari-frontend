// 신고 유형
export type ReportType =
  | "SPAM_ADVERTISEMENT"
  | "PORNOGRAPHY"
  | "ILLEGAL_INFORMATION"
  | "ABUSIVE_LANGUAGE"
  | "PERSONAL_INFORMATION"
  | "OFFENSIVE_EXPRESSION"
  | "ETC";

// 신고 대상 유형
export type ReportTargetType =
  | "CLUB"
  | "MEMBER"
  | "PASS_REVIEW"
  | "CLUB_ACTIVITY"
  | "CLUB_ACTIVITY_COMMENT"
  | "CLUB_QUESTION"
  | "APPLY"
  | "RECRUITMENT"
  | "CLUB_REVIEW";

export interface ReportReq {
  reportTargetType: ReportTargetType;
  reportType: ReportType;
  body: string;
  reportedEntityId: string;
}
