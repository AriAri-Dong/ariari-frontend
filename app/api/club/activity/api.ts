import {
  CLUB_ACTIVITY,
  CLUB_ACTIVITY_COMMENT,
  CLUB_ACTIVITY_COMMENT_BLOCK,
  CLUB_ACTIVITY_COMMENT_LICK,
  CLUB_ACTIVITY_LIKE,
} from "@/api/apiUrl";
import axiosInstance from "@/api/axiosInstance";
import { Pageable } from "@/types/api";
import {
  ClubActivityResponse,
  ClubActivity,
  mapActivityFromApi,
  mapActivityDetailFromApi,
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

  const ids = deletedImageIds ?? [];
  if (ids.length === 0) {
    formData.append("deletedImageIds", "");
  } else {
    ids.forEach((id) => {
      formData.append("deletedImageIds", id.toString());
    });
  }

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

// 활동 내역 상세 조회
export const getClubActivityDetail = async (
  clubActivityId: string
): Promise<Partial<ClubActivity>> => {
  const response = await axiosInstance.get(
    `${CLUB_ACTIVITY}/detail/${clubActivityId}`
  );

  return mapActivityDetailFromApi(response.data);
};

// 활동 내역 댓글 작성 (일반 댓글 or 대댓글)
export const createClubActivityComment = async ({
  clubActivityId,
  body,
  parentCommentId,
}: {
  clubActivityId: string;
  body: string;
  parentCommentId?: string;
}): Promise<void> => {
  await axiosInstance.post(
    `${CLUB_ACTIVITY_COMMENT}/${clubActivityId}`,
    { body },
    {
      params: parentCommentId ? { parentCommentId } : {},
    }
  );
};

// 활동 내역 댓글 수정
export const updateClubActivityComment = async ({
  clubActivityId,
  commentId,
  body,
}: {
  clubActivityId: string;
  commentId: string;
  body: string;
}): Promise<void> => {
  await axiosInstance.put(
    `${CLUB_ACTIVITY_COMMENT}/${clubActivityId}`,
    { body },
    {
      params: {
        commentId,
      },
    }
  );
};

// 활동 내역 댓글 삭제
export const deleteClubActivityComment = async ({
  clubActivityId,
  commentId,
}: {
  clubActivityId: string;
  commentId: string;
}): Promise<void> => {
  await axiosInstance.delete(`${CLUB_ACTIVITY_COMMENT}/${clubActivityId}`, {
    params: {
      commentId,
    },
  });
};

// 활동 내역 좋아요 추가/취소
export const toggleClubActivityLike = async (
  clubActivityId: string
): Promise<void> => {
  await axiosInstance.post(`${CLUB_ACTIVITY_LIKE}/${clubActivityId}`);
};

// 활동 내역 댓글 좋아요 추가/취소
export const toggleClubActivityCommentLike = async ({
  clubActivityId,
  commentId,
}: {
  clubActivityId: string;
  commentId: string;
}): Promise<void> => {
  await axiosInstance.post(
    `${CLUB_ACTIVITY_COMMENT_LICK}/${clubActivityId}`,
    null,
    {
      params: {
        commentId,
      },
    }
  );
};

// 활동 내역 댓글 유저 차단
export const blockClubActivityCommentUser = async ({
  commentId,
}: {
  commentId: string;
}): Promise<void> => {
  await axiosInstance.post(`${CLUB_ACTIVITY_COMMENT_BLOCK}`, null, {
    params: {
      commentId,
    },
  });
};
