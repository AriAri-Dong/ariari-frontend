import { PageInfo } from "./pageInfo";

export interface NotificationData {
  id: string;
  title: string;
  uri: string;
  isChecked: boolean;
  clubAlarmType: "club" | "apply"; // 추가 예정
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
