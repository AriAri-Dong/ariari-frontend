import { clubMemberRoleType } from "@/models/member";

export const MAP_ROLE_TO_KO: Record<clubMemberRoleType, string> = {
  ADMIN: "관리자",
  MANAGER: "매니저",
  GENERAL: "일반회원",
};
