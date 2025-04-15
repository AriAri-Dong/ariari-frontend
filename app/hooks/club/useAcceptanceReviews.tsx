import { useState, useCallback, useEffect } from "react";
import { getAcceptanceReview, postAcceptanceReview } from "@/api/review/api";
import { PageInfo } from "@/types/pageInfo";
import {
  ClubReviewData,
  PassReviewData,
  PassReviewSaveReq,
} from "@/types/review";

export const useAcceptanceReviews = (
  clubId: string,
  size?: number,
  sort?: string
) => {
  // 후기 관련
  const [review, setReview] = useState<PassReviewData[]>([]);

  const [page, setPage] = useState<number>(0);
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [openReview, setOpenReview] = useState<string | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // 후기 목록 불러오기
  const fetchClubReviews = useCallback(() => {
    setLoading(true);
    getAcceptanceReview(clubId, page, size, sort)
      .then((res) => {
        setReview((prev) =>
          page === 0 ? res.contents : [...prev, ...res.contents]
        );
        setPageInfo(res.pageInfo);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [clubId, page, sort, size]);

  // 후기 등록 핸들러
  const handleSubmit = (data: PassReviewSaveReq) => {
    postAcceptanceReview(clubId, data)
      .then(() => {
        setPage(0);
        setReview([]);
        setAlertMessage("활동후기가 등록되었습니다.");
        setIsReviewModalOpen(false);

        fetchClubReviews();
      })
      .catch((err) => {
        setAlertMessage(err.message);
      });
  };

  // 더보기 핸들러
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  // 후기 오픈 핸들러
  const handleOpenReview = (item: PassReviewData) => {
    setOpenReview((prev) => (prev === item.id ? null : item.id));
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchClubReviews();
  }, [fetchClubReviews]);

  return {
    review,
    pageInfo,
    loading,
    error,
    openReview,
    isReviewModalOpen,
    alertMessage,
    page,
    handleSubmit,
    handleLoadMore,
    handleOpenReview,
    setIsReviewModalOpen,
    setAlertMessage,
  };
};
