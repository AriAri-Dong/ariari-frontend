// 동아리 상세 페이지 LeftMenu, MobileMenu 내 데이터 맵핑

import {
  CLUB_LEFT_MENU_ADMIN,
  CLUB_LEFT_MENU_MEMBER,
  CLUB_LEFT_MENU_USER,
} from "@/data/club";

// 권한에 따른 메뉴 목록
export const CLUB_MENU_MAP = {
  ADMIN: CLUB_LEFT_MENU_ADMIN,
  MANAGER: CLUB_LEFT_MENU_ADMIN,
  GENERAL: CLUB_LEFT_MENU_MEMBER,
  USER: CLUB_LEFT_MENU_USER,
};

// 프로필 영역 권한 표기
export const CLUB_MENU_ROLE_LABELS = {
  ADMIN: "관리자",
  MANAGER: "관리자",
  GENERAL: "일반회원",
};
