import axiosInstance from "@/api/axiosInstance";
import { Pageable } from "@/types/api";
import { ClubFaqListRes, ClubQnaListRes } from "@/types/club";

// 동아리 상세 FAQ 리스트 조회
export const getClubFaqList = async (
  clubId: string,
  page: Pageable["page"]
) => {
  try {
    const res = await axiosInstance.get<ClubFaqListRes>(
      `/clubs/${clubId}/club-faqs`,
      {
        params: {
          page,
          size: 10,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("faq list 조회 실패");
    return {
      clubFaqDataList: [],
      pageInfo: { contentSize: 0, totalSize: 0, totalPages: 0 },
    };
  }
};

// 동아리 상세 Q&A 리스트 조회
export const getClubQnaList = async (
  clubId: string,
  page: Pageable["page"]
) => {
  try {
    const res = await axiosInstance.get<ClubQnaListRes>(
      `/clubs/${clubId}/club-questions`,
      {
        params: {
          page,
          size: 10,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("qna list 조회 실패");
    return {
      clubQuestionDataList: [],
      pageInfo: { contentSize: 0, totalSize: 0, totalPages: 0 },
    };
  }
};
