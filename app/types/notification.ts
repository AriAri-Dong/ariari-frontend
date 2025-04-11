import { PageInfo } from "./pageInfo";

export type ClubNotificationType =
  | "APPLY"
  | "MEMBER"
  | "RECRUITMENT"
  | "SYSTEM"
  | "ACTIVITY"
  | "QUESTION";

export type MemberNotificationType = "CLUB" | "APPLY" | "SYSTEM";

export interface NotificationData {
  id: string;
  title: string;
  uri: string;
  isChecked: boolean;
  createdDateTime: string;
}

export interface NotificationPageInfo extends PageInfo {
  unreadCount: number;
}

// 동아리 알림
export interface ClubNotificationData extends NotificationData {
  clubAlarmType: ClubNotificationType;
}

export interface ClubNotificationListRes {
  clubAlarmDataList: ClubNotificationData[];
  alarmPageInfo: NotificationPageInfo;
}

// 멤버 알림
export interface MemberNotificationData extends NotificationData {
  clubAlarmType: MemberNotificationType;
}

export interface MemberNotificationListRes {
  memberAlarmDataList: MemberNotificationData[];
  alarmPageInfo: NotificationPageInfo;
}
