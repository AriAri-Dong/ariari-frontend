import axiosInstance from "../axiosInstance";
import {
  CLUBS,
  CLUBS_EXTERNAL,
  CLUBS_EXTERNAL_RANKING,
  CLUBS_INTERNAL,
  CLUBS_INTERNAL_RANKING,
  CLUBS_MY,
  CLUBS_MY_ADMIN,
  CLUBS_MY_ADMIN_INTERNAL,
  CLUBS_MY_BOOKMARKS,
  CLUBS_SEARCH,
} from "../apiUrl";
import {
  ClubResponse,
  ClubSearchCondition,
  Pageable,
  ClubInfoResponse,
  CreateClubData,
} from "@/types/api";
import { AxiosError } from "axios";
import { MyClubListRes } from "@/types/club";
import { InviteMemberReq } from "@/types/member";

// 동아리 수정
export const updateClubInfo = async (clubId: number) => {
  try {
    const response = await axiosInstance.put(`${CLUBS}/${clubId}`);
    return response.data;
  } catch (error) {
    console.error("Error updating club info:", error);
    throw error;
  }
};

// 전체 동아리 조회
export const getAllClubsInfo = async (
  condition: ClubSearchCondition,
  pageable: Pageable
): Promise<ClubResponse> => {
  try {
    const filteredCondition = {
      clubCategoryTypes: condition.clubCategoryTypes?.length
        ? condition.clubCategoryTypes
        : undefined,
      clubRegionTypes: condition.clubRegionTypes?.length
        ? condition.clubRegionTypes
        : undefined,
      participantTypes: condition.participantTypes?.length
        ? condition.participantTypes
        : undefined,
    };

    const params = {
      ...filteredCondition,
      page: pageable.page,
      size: pageable.size,
      ...(pageable.sort ? { sort: pageable.sort.join(",") } : {}),
    };

    const response = await axiosInstance.get<ClubResponse>(CLUBS, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching club info:", error);
    throw error;
  }
};

// 교내 동아리 검색 조회
export const getInternalClubsInfo = async (
  condition: ClubSearchCondition,
  pageable: Pageable
): Promise<ClubResponse> => {
  try {
    const filteredCondition = {
      clubCategoryTypes: condition.clubCategoryTypes?.length
        ? condition.clubCategoryTypes
        : undefined,
      clubRegionTypes: condition.clubRegionTypes?.length
        ? condition.clubRegionTypes
        : undefined,
      participantTypes: condition.participantTypes?.length
        ? condition.participantTypes
        : undefined,
    };

    const params = {
      ...filteredCondition,
      page: pageable.page,
      size: pageable.size,
      ...(pageable.sort ? { sort: pageable.sort.join(",") } : {}),
    };

    const response = await axiosInstance.get<ClubResponse>(CLUBS_INTERNAL, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching club info:", error);
    throw error;
  }
};

// 교외 동아리 검색 조회
export const getExternalClubsInfo = async (
  condition: ClubSearchCondition,
  pageable: Pageable
): Promise<ClubResponse> => {
  try {
    const filteredCondition = {
      clubCategoryTypes: condition.clubCategoryTypes?.length
        ? condition.clubCategoryTypes
        : undefined,
      clubRegionTypes: condition.clubRegionTypes?.length
        ? condition.clubRegionTypes
        : undefined,
      participantTypes: condition.participantTypes?.length
        ? condition.participantTypes
        : undefined,
    };

    const params = {
      ...filteredCondition,
      page: pageable.page,
      size: pageable.size,
      ...(pageable.sort ? { sort: pageable.sort.join(",") } : {}),
    };

    const response = await axiosInstance.get<ClubResponse>(CLUBS_EXTERNAL, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching club info:", error);
    throw error;
  }
};

// 동아리 등록
export const createClub = async (clubData: any) => {
  try {
    const response = await axiosInstance.post(CLUBS, clubData);
    return response.data;
  } catch (error) {
    console.error("Error creating club:", error);
    throw error;
  }
};

// 동아리 검색 조회
export const getClubsInfo = async (
  query: string,
  pageable: Pageable
): Promise<ClubResponse> => {
  try {
    const params = {
      query,
      page: pageable.page,
      size: pageable.size,
      ...(pageable.sort ? { sort: pageable.sort.join(",") } : {}),
    };

    const response = await axiosInstance.get<ClubResponse>(CLUBS_SEARCH, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching club info:", error);
    throw error;
  }
};

// 내 동아리 목록 조회
export const getMyClubs = async (
  pageable: Pageable
): Promise<ClubInfoResponse> => {
  try {
    const params = {
      page: pageable.page,
      size: pageable.size,
      ...(pageable.sort ? { sort: pageable.sort.join(",") } : {}),
    };

    const response = await axiosInstance.get<ClubInfoResponse>(CLUBS_MY, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching my clubs info:", error);
    throw error;
  }
};

// 동아리 상세 조회
export const getClubDetails = async (clubId: string) => {
  try {
    const response = await axiosInstance.get(`${CLUBS}/${clubId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching club details:", error);
    throw error;
  }
};

// 동아리 북마크 등록
export const addClubBookmark = async (clubId: string) => {
  try {
    const response = await axiosInstance.post(`${CLUBS}/${clubId}/bookmark`);
    console.log("북마크 등록 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(" 북마크 등록 실패:", error);
    throw error;
  }
};

// 동아리 북마크 삭제
export const removeClubBookmark = async (clubId: string) => {
  try {
    const response = await axiosInstance.delete(`${CLUBS}/${clubId}/bookmark`);
    console.log("북마크 삭제 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(" 북마크 삭제 실패:", error);
    throw error;
  }
};

// 동아리 북마크 등록
export const postClubBookmark = async (clubId: string) => {
  try {
    const response = await axiosInstance.post(`${CLUBS}/${clubId}/bookmark`);
    console.log("북마크 등록 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(" 북마크 등록 실패:", error);
    throw error;
  }
};

// 동아리 북마크 삭제
export const deleteClubBookmark = async (clubId: string) => {
  try {
    const response = await axiosInstance.delete(`${CLUBS}/${clubId}/bookmark`);
    console.log("북마크 삭제 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(" 북마크 삭제 실패:", error);
    throw error;
  }
};

// 북마크 동아리 조회
export const getBookmarkClubsInfo = async (
  hasActiveRecruitment: boolean,
  pageable: Pageable
): Promise<ClubResponse> => {
  try {
    const params = {
      hasActiveRecruitment: hasActiveRecruitment,
      page: pageable.page,
      size: pageable.size,
      ...(pageable.sort ? { sort: pageable.sort.join(",") } : {}),
    };

    const response = await axiosInstance.get<ClubResponse>(CLUBS_MY_BOOKMARKS, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching club info:", error);
    throw error;
  }
};

// 동아리 등록
export const createClubWithFile = async (
  clubData: CreateClubData,
  file: File | null
) => {
  try {
    const formData = new FormData();
    formData.append("saveReq", JSON.stringify(clubData));

    if (file) formData.append("file", file);

    return axiosInstance.post(CLUBS, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error("Error creating club with file:", error);
    throw error;
  }
};

// 동아리 수정
export const updateClubWithFiles = async (
  clubId: string,
  bodyData: { body: string },
  profileFile: File | null,
  bannerFile: File | null
) => {
  try {
    const formData = new FormData();
    formData.append("modifyReq", JSON.stringify(bodyData));

    if (profileFile) {
      formData.append("profileFile", profileFile);
    }

    if (bannerFile) {
      formData.append("bannerFile", bannerFile);
    }

    const response = await axiosInstance.put(`${CLUBS}/${clubId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating club with files:", error);
    throw error;
  }
};

// 교내 동아리 랭킹 조회
export const getInternalClubRanking = (fieldType: string) => {
  return axiosInstance
    .get<ClubResponse>(CLUBS_INTERNAL_RANKING, {
      params: { categoryType: fieldType },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching internal recruitments:", error);
      throw error;
    });
};

// 교외 동아리 랭킹 조회
export const getExternalClubRanking = (fieldType: string) => {
  return axiosInstance
    .get<ClubResponse>(CLUBS_EXTERNAL_RANKING, {
      params: { categoryType: fieldType },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching external recruitments:", error);
      throw error;
    });
};

// 내가 ADMIN인 동아리 조회
export const getMyAdminClubs = async () => {
  try {
    const response = await axiosInstance.get<ClubResponse>(CLUBS_MY_ADMIN);
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};

// 내가 ADMIN인 교내 동아리 조회
export const getMyAdminInteralClubs = async () => {
  try {
    const response = await axiosInstance.get<ClubResponse>(
      CLUBS_MY_ADMIN_INTERNAL
    );
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};

// 동아리 폐쇄
export const deleteClub = async (clubId: string) => {
  try {
    const response = await axiosInstance.delete(`${CLUBS}/close/${clubId}`);
    return response.status;
  } catch (error) {
    throw error;
  }
};

// 내 동아리 조회
export const getMyClubList = async () => {
  try {
    const response = await axiosInstance.get<MyClubListRes>(CLUBS_MY);
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};

// 동아리 초대 키 생성 (링크)

export const createInviteClubKey = async (clubId: string) => {
  try {
    const res = await axiosInstance.post(`${CLUBS}/${clubId}/invite`);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};

// 동아리 초대 키로 가입 요청 (링크)

export const enterClubByInviteKey = async (inviteKey: string, name: string) => {
  try {
    const res = await axiosInstance.post<string>(`${CLUBS}/enter`, {
      inviteKey,
      name,
    });
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};

// 동아리 회원 초대 (알람)

export const createInviteClubAlarm = async (
  memberId: string,
  clubId: string
) => {
  try {
    const response = await axiosInstance.post<InviteMemberReq>(
      `${CLUBS}/inviteAlarm/`,
      {
        memberId,
        clubId,
      }
    );
    return response.status;
  } catch (err) {
    throw err;
  }
};

// 동아리 초대 수락 (알람)
export const enterClubByInviteAlarm = async (
  name: string,
  inviteAlarmCode: string,
  clubId: string
) => {
  try {
    const res = await axiosInstance.post<string>(
      `${CLUBS}/${clubId}/AlarmAccept`,
      {
        name,
        inviteAlarmCode,
        clubId,
      }
    );
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};
