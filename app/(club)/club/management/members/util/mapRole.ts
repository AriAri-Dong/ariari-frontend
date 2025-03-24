import { clubMemberRoleType } from "@/types/member";

export const MAP_ROLE_TO_KO: Record<clubMemberRoleType, string> = {
  ADMIN: "관리자",
  MANAGER: "매니저",
  GENERAL: "일반회원",
};
export const MAP_ROLE_TO_EN: Record<string, clubMemberRoleType> = {
  관리자: "ADMIN",
  매니저: "MANAGER",
  일반회원: "GENERAL",
};
