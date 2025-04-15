import { CLUBS } from "@/api/apiUrl";
import axiosInstance from "@/api/axiosInstance";
import { Pageable } from "@/types/api";
import {
  ClubFaqData,
  ClubFaqListRes,
  ClubQnaListRes,
  ClubQuestionData,
} from "@/types/club";

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

// 동아리 상세 FAQ 등록(관리자)
export const addFaq = async ({
  clubId,
  data,
}: {
  clubId: string;
  data: Omit<ClubFaqData, "clubMemberData" | "id">;
}) => {
  try {
    const res = await axiosInstance.post(`${CLUBS}/${clubId}/club-faqs`, data);
    console.log("add faq res", res);
    return res;
  } catch (error) {
    console.log("add faq error", error);
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

// 동아리 상세 Q&A 질문 등록(role - GENERAL, null)
export const addQuestion = async ({
  clubId,
  data,
}: {
  clubId: string;
  data: Pick<ClubQuestionData, "title" | "body">;
}) => {
  try {
    const res = await axiosInstance.post(
      `${CLUBS}/${clubId}/club-questions`,
      data
    );
    console.log("add question res", res);
    return res;
  } catch (error) {
    console.log("add question error", error);
  }
};

// 동아리 상세 Q&A 답변 등록(role - ADMIN, MANAGER)
type AddAnswer = {
  clubId: string;
  clubQuestionId: string;
  data: { body: string };
};
export const addAnswer = async ({
  clubId,
  clubQuestionId,
  data,
}: AddAnswer) => {
  try {
    const res = await axiosInstance.post(
      `${CLUBS}/${clubId}/question/${clubQuestionId}/answers`,
      data
    );
    console.log("add answer res", res);
    return res;
  } catch (error) {
    console.log("add answer error", error);
  }
};
