import { ATTENDANCE, CLUB_EVENT, CLUBS } from "@/api/apiUrl";
import axiosInstance from "@/api/axiosInstance";
import { Pageable } from "@/types/api";
import { ClubEventListRes, ClubEventSaveReq } from "@/types/clubEvent";

// 일정 등록
export const addClubEvent = async ({
  clubId,
  data,
}: {
  clubId: string;
  data: ClubEventSaveReq;
}) => {
  try {
    const res = await axiosInstance.post(
      `${CLUBS}/${clubId}${CLUB_EVENT}`,
      data
    );
    return res;
  } catch (error) {
    console.log("일정 등록 실패", error);
  }
};

// 일정 수정
export const updateClubEvent = async ({
  clubEventId,
  data,
}: {
  clubEventId: string;
  data: ClubEventSaveReq;
}) => {
  try {
    const res = await axiosInstance.put(`${CLUB_EVENT}/${clubEventId}`, data);
    return res.data;
  } catch (error) {
    console.error("일정 수정 실패", error);
    throw error;
  }
};

// 일정 삭제
export const deleteClubEvent = async (clubEventId: string) => {
  try {
    const res = await axiosInstance.delete(`${CLUB_EVENT}/${clubEventId}`);
    return res.data;
  } catch (error) {
    console.error("일정 삭제 실패", error);
    throw error;
  }
};

// 일정 리스트 조회
export const getClubEventList = async (
  clubId: string,
  page: Pageable["page"]
) => {
  try {
    const res = await axiosInstance.get<ClubEventListRes>(
      `${CLUBS}/${clubId}${CLUB_EVENT}`,
      {
        params: {
          page,
          size: 10,
          sort: "eventDateTime,desc",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("일정 리스트 조회 실패", error);
    return {
      clubEventDataList: [],
      pageInfo: { contentSize: 0, totalSize: 0, totalPages: 0 },
    };
  }
};

// 출석 등록 - 관리자
export const registerClubAttendance = async ({
  clubEventId,
  memberIds,
}: {
  clubEventId: string;
  memberIds: string[];
}) => {
  try {
    const res = await axiosInstance.post(
      `${CLUB_EVENT}/${clubEventId}${ATTENDANCE}`,
      memberIds
    );
    return res.data;
  } catch (error) {
    console.error("출석 등록 실패", error);
  }
};

// 출석 삭제
export const deleteClubAttendance = async ({
  clubEventId,
  memberIds,
}: {
  clubEventId: string;
  memberIds: string[];
}) => {
  try {
    const res = await axiosInstance.delete(
      `${CLUB_EVENT}/${clubEventId}${ATTENDANCE}`,
      {
        data: memberIds,
      }
    );
    return res.data;
  } catch (error) {
    console.error("출석 삭제 실패", error);
  }
};

// 출석 키 생성
export const createAttendanceKey = async (clubEventId: string) => {
  try {
    const res = await axiosInstance.post(
      `${CLUB_EVENT}/${clubEventId}${ATTENDANCE}/key`
    );
    return res.data;
  } catch (error) {
    console.error("출석 키 생성 실패", error);
  }
};

// 출석 등록 (링크) - 개인
export const submitAttendanceByKey = async (attendanceKey: string) => {
  try {
    const res = await axiosInstance.post(`${ATTENDANCE}/key/${attendanceKey}`);
    return res.data;
  } catch (error) {
    console.error("출석 등록 실패", error);
  }
};
