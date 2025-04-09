import { BADGE_ITEMS } from "@/data/club";
import { ApplyStatusType, AppyStatusText } from "@/types/application";

export const APPLY_STATUS_MAP: Record<ApplyStatusType, AppyStatusText> = {
  PENDENCY: "대기중",
  INTERVIEW: "면접중",
  APPROVE: "합격",
  REFUSAL: "불합격",
};

export type StatusValue = "refuse" | "interview" | "approve";

export const APPLY_STATUS_VALUE_MAP: Record<string, StatusValue> = {
  면접중: "interview",
  합격: "approve",
  불합격: "refuse",
} as const;

export const BADGE_TITLE_MAP = BADGE_ITEMS.reduce((acc, item) => {
  acc[item.key] = item.name;
  return acc;
}, {} as Record<string, string>);
