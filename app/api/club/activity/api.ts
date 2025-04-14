import { CLUB_ACTIVITY } from "@/api/apiUrl";
import axiosInstance from "@/api/axiosInstance";
import { Pageable } from "@/types/api";
import {
  ClubActivityResponse,
  ClubActivity,
  mapActivityFromApi,
} from "@/types/clubActivity";

interface CreateClubActivityParams {
  clubId: string;
  accessType: "ALL" | "CLUB_MEMBER";
  body: string;
  images?: File[];
}

interface UpdateClubActivityParams {
  clubActivityId: string;
  accessType: "ALL" | "CLUB_MEMBER";
  body: string;
  newImages?: File[];
  deletedImageIds?: number[];
}

// 활동 내역 등록
export const createClubActivity = async ({
  clubId,
  accessType,
  body,
  images,
}: CreateClubActivityParams): Promise<void> => {
  const formData = new FormData();
  formData.append("accessType", accessType);
  formData.append("body", body);

  if (images && images.length > 0) {
    images.forEach((image) => {
      formData.append("images", image);
    });
  }

  await axiosInstance.post(`${CLUB_ACTIVITY}/${clubId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 활동 내역 수정
export const updateClubActivity = async ({
  clubActivityId,
  accessType,
  body,
  newImages,
  deletedImageIds,
}: UpdateClubActivityParams): Promise<void> => {
  const formData = new FormData();
  formData.append("accessType", accessType);
  formData.append("body", body);

  newImages?.forEach((image) => {
    formData.append("newImages", image);
  });

  deletedImageIds?.forEach((id) => {
    formData.append("deletedImageIds", id.toString());
  });

  await axiosInstance.put(
    `${CLUB_ACTIVITY}/detail/${clubActivityId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// 활동 내역 삭제
export const deleteClubActivity = async (
  clubActivityId: string
): Promise<void> => {
  await axiosInstance.delete(`${CLUB_ACTIVITY}/detail/${clubActivityId}`);
};

// 활동 내역 조회
export const getClubActivities = async (
  clubId: string,
  pageable: Pageable
): Promise<{
  activities: ClubActivity[];
  pageInfo: ClubActivityResponse["pageInfo"];
}> => {
  const response = await axiosInstance.get<ClubActivityResponse>(
    `${CLUB_ACTIVITY}/${clubId}`,
    {
      params: {
        page: pageable.page,
        size: pageable.size,
        ...(pageable.sort && { sort: pageable.sort }),
      },
      paramsSerializer: {
        serialize: (params) =>
          Object.entries(params)
            .map(([key, value]) => {
              if (Array.isArray(value)) {
                return value
                  .map((v) => `${key}=${encodeURIComponent(v)}`)
                  .join("&");
              }
              return `${key}=${encodeURIComponent(String(value))}`;
            })
            .join("&"),
      },
    }
  );

  const activities = response.data.clubActivityDataList.map(mapActivityFromApi);
  return {
    activities,
    pageInfo: response.data.pageInfo,
  };
};
