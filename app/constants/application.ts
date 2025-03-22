import { ApplyStatusType, AppyStatusText } from "@/types/application";

export const APPLY_STATUS: Record<ApplyStatusType, AppyStatusText> = {
  PENDENCY: "대기중",
  INTERVIEW: "면접중",
  APPROVE: "합격",
  REFUSAL: "불합격",
};
