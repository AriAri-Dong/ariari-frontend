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

// 동아리 공지사항 등록
export interface AddClubNoticeParams {
  clubId: string;
  formData: FormData;
}

export const addClubNotice = async ({
  clubId,
  formData,
}: AddClubNoticeParams) => {
  try {
    const res = await axiosInstance.post(
      `${CLUBS}/${clubId}${CLUB_NOTICE}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("Failed to post club notice", error);
    throw error;
  }
};
