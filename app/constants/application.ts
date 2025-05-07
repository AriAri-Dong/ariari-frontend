import { BADGE_ITEMS } from "@/data/club";
import { ApplyStatusType, ApplyStatusText } from "@/types/application";

export const APPLY_STATUS_MAP: Record<ApplyStatusType, ApplyStatusText> = {
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

// 지원현황 - 지원서별 지원 상태 변경 옵션
export const STATUS_OPTIONS = [
  { id: 1, label: "면접중" },
  { id: 2, label: "합격" },
  { id: 3, label: "불합격" },
];
