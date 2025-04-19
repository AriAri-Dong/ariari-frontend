import {
  InterviewRatioType,
  InterviewType,
  ProcedureType,
} from "@/types/review";

export const getInterviewRatioType = (
  label: string
): InterviewRatioType | null => {
  switch (label) {
    case "그룹면접":
      return "MANY_VS_MANY";
    case "다대일면접":
      return "ONE_VS_MANY";
    case "개인면접":
      return "ONE_VS_ONE";
    default:
      return null;
  }
};

export const getInterviewType = (label: string): InterviewType | null => {
  switch (label) {
    case "온라인":
      return "ONLINE";
    case "오프라인":
      return "OFFLINE";
    case "전화":
      return "CALL";
    default:
      return null;
  }
};

export const getProcedureTypeLabel = (procedureType?: ProcedureType) => {
  switch (procedureType) {
    case "DOCUMENT":
      return "서류";
    case "INTERVIEW":
      return "서류 · 면접";
    default:
      return "";
  }
};

export const getInterviewRatioLabel = (ratioType?: InterviewRatioType) => {
  switch (ratioType) {
    case "MANY_VS_MANY":
      return "그룹면접";
    case "ONE_VS_MANY":
      return "다대일면접";
    case "ONE_VS_ONE":
      return "개인면접";
    default:
      return "";
  }
};

export const getInterviewTypeLabel = (interviewType?: InterviewType) => {
  switch (interviewType) {
    case "ONLINE":
      return "온라인";
    case "OFFLINE":
      return "오프라인";
    case "CALL":
      return "전화";
    default:
      return "";
  }
};
