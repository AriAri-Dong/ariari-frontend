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

// 동아리 알림
export interface ClubNotificationData extends NotificationData {
  clubAlarmType: ClubNotificationType;
}

export interface ClubNotificationListRes {
  clubAlarmDataList: ClubNotificationData[];
  pageInfo: PageInfo;
}

// 유저 알림
export interface MemberNotificationData extends NotificationData {
  clubAlarmType: MemberNotificationType;
}

export interface MemberNotificationListRes {
  memberAlarmDataList: MemberNotificationData[];
  pageInfo: PageInfo;
}
