import { PageInfo } from "./pageInfo";

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
export interface ClubNotificationListRes {
  clubAlarmDataList: NotificationData[];
  alarmPageInfo: NotificationPageInfo;
}

// 멤버 알림
export interface MemberNotificationListRes {
  memberAlarmDataList: NotificationData[];
  alarmPageInfo: NotificationPageInfo;
}
