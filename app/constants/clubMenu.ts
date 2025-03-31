// 동아리 상세 페이지 LeftMenu, MobileMenu 내 데이터 맵핑

import {
  CLUB_LEFT_MENU_ADMIN,
  CLUB_LEFT_MENU_MEMBER,
  CLUB_LEFT_MENU_USER,
} from "@/data/club";

// menu icons
import AcceptanceReviewIcon from "../images/icon/clubMenu/acceptance_review.svg?svgr";
import AccountingIcon from "../images/icon/clubMenu/accounting.svg?svgr";
import ActivityReviewIcon from "../images/icon/clubMenu/activity_review.svg?svgr";
import ActivityHistoryIcon from "../images/icon/clubMenu/activity_history.svg?svgr";
import ActivityManagementIcon from "../images/icon/clubMenu/activity_management.svg?svgr";
import AnnouncementIcon from "../images/icon/clubMenu/announcement.svg?svgr";
import CloseClubIcon from "../images/icon/clubMenu/close_club.svg?svgr";
import HelpIcon from "../images/icon/clubMenu/help.svg?svgr";
import MembersIcon from "../images/icon/clubMenu/members.svg?svgr";
import NotificationIcon from "../images/icon/clubMenu/notification.svg?svgr";
import RecruitAnnouncementIcon from "../images/icon/clubMenu/recruit_announcement.svg?svgr";
import RecruitManagementIcon from "../images/icon/clubMenu/recruit_management.svg?svgr";
import ScheduleIcon from "../images/icon/clubMenu/schedule.svg?svgr";
import WithdrawalIcon from "../images/icon/clubMenu/withdrawal.svg?svgr";

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

export const MENU_ICONS: Record<
  string,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  acceptance_review: AcceptanceReviewIcon,
  accounting: AccountingIcon,
  activity_review: ActivityReviewIcon,
  activity_history: ActivityHistoryIcon,
  activity_management: ActivityManagementIcon,
  announcement: AnnouncementIcon,
  close_club: CloseClubIcon,
  help: HelpIcon,
  members: MembersIcon,
  notification: NotificationIcon,
  recruit_announcement: RecruitAnnouncementIcon,
  recruit_management: RecruitManagementIcon,
  schedule: ScheduleIcon,
  withdrawal: WithdrawalIcon,
};
