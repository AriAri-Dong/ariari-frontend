import { Pageable } from "@/types/api";
import axiosInstance from "../axiosInstance";
import { CLUBS, MEMBER_MY_NOTIFICATION } from "../apiUrl";
import {
  ClubNotificationListRes,
  MemberNotificationListRes,
} from "@/types/notification";

// 동아리 알림 조회
export const getClubNotifications = async (
  clubId: string,
  page: Pageable["page"]
) => {
  try {
    const res = await axiosInstance.get<ClubNotificationListRes>(
      `${CLUBS}/${clubId}/alarm`,
      {
        params: {
          page,
          size: 10,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("Failed to fetch club notifications", error);
    return {
      clubAlarmDataList: [],
      alarmPageInfo: {
        contentSize: 0,
        totalSize: 0,
        totalPages: 0,
        unreadCount: 0,
      },
    };
  }
};

// 멤버 알림 조회
export const getMyNotifications = async (page: Pageable["page"]) => {
  try {
    const res = await axiosInstance.get<MemberNotificationListRes>(
      `${MEMBER_MY_NOTIFICATION}`,
      {
        params: {
          page,
          size: 10,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("Failed to fetch member notifications", error);
    return {
      memberAlarmDataList: [],
      alarmPageInfo: {
        contentSize: 0,
        totalSize: 0,
        totalPages: 0,
        unreadCount: 0,
      },
    };
  }
};

// 동아리 알림 읽음 처리
export const markClubNotificationAsRead = async (
  clubId: string,
  clubAlarmId: string
) => {
  try {
    const res = await axiosInstance.patch(
      `${CLUBS}/${clubId}/alarm/${clubAlarmId}/read`
    );
    return res.data;
  } catch (error) {
    console.log("failed to read club notification", error);
    throw error;
  }
};

// 멤버 알림 읽음 처리
export const markMemberNotificationAsRead = async (memberAlarmId: string) => {
  try {
    const res = await axiosInstance.patch(
      `${MEMBER_MY_NOTIFICATION}/${memberAlarmId}/read`
    );
    return res.data;
  } catch (error) {
    console.log("failed to read member notification", error);
    throw error;
  }
};
