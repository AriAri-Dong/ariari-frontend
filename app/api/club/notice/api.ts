import { CLUB_NOTICE, CLUBS } from "@/api/apiUrl";
import axiosInstance from "@/api/axiosInstance";
import { ClubNoticeDataRes } from "@/types/club";

/**
 * 상단에 고정된 동아리 공지사항 리스트 조회
 * @param clubId
 * @returns 고정된 공지사항 리스트
 */
export const getClubFixedNoticeList = async (clubId: string) => {
  try {
    const res = await axiosInstance.get<ClubNoticeDataRes>(
      `${CLUBS}/${clubId}${CLUB_NOTICE}/fix`
    );
    return res.data;
  } catch (error) {
    console.log("Failed to fetch fixed club notices", error);
    throw error;
  }
};
