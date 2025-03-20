import { ApplyStatusType } from "@/types/application";

export const APPLY_STATUS: Record<
  ApplyStatusType,
  "대기중" | "면접중" | "합격" | "불합격"
> = {
  PENDENCY: "대기중",
  INTERVIEW: "면접중",
  APPROVE: "합격",
  REFUSAL: "불합격",
};
