import axiosInstance from "../axiosInstance";
import {
  CLUBS,
  CLUBS_EXTERNAL,
  CLUBS_EXTERNAL_RANKING,
  CLUBS_INTERNAL,
  CLUBS_INTERNAL_RANKING,
  CLUBS_MY,
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
import axios from "axios";
import { AxiosError } from "axios";

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

    const response = await axios.get<ClubResponse>(CLUBS_EXTERNAL, { params });
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
): Promise<ClubInfoResponse> => {
  try {
    const params = {
      query,
      page: pageable.page,
      size: pageable.size,
      ...(pageable.sort ? { sort: pageable.sort.join(",") } : {}),
    };

    const response = await axiosInstance.get<ClubInfoResponse>(CLUBS_SEARCH, {
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
  file: File
) => {
  try {
    const formData = new FormData();
    formData.append("saveReq", JSON.stringify(clubData));
    formData.append("file", file);

    const response = await axiosInstance.post(CLUBS, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
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

    const response = await axiosInstance.put(`/clubs/${clubId}`, formData, {
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
  return axios
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
    const response = await axiosInstance.get<ClubResponse>("/clubs/my/admin");
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
