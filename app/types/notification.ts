import { PageInfo } from "./pageInfo";

export type NotificationType =
  | "APPLY"
  | "MEMBER"
  | "RECRUITMENT"
  | "SYSTEM"
  | "ACTIVITY"
  | "QUESTION";

export interface NotificationData {
  id: string;
  title: string;
  uri: string;
  isChecked: boolean;
  clubAlarmType: NotificationType;
  createdDateTime: string;
}

// 동아리 알림
export interface ClubNotificationListRes {
  clubAlarmDataList: NotificationData[];
  pageInfo: PageInfo;
}

// 유저 알림
export interface MemberNotificationListRes {
  memberAlarmDataList: NotificationData[];
  pageInfo: PageInfo;
}
