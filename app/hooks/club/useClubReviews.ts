import {
  getClubReview,
  getClubTagStatistics,
  postClubReview,
} from "@/api/review/api";
import { PageInfo } from "@/types/pageInfo";
import { ClubReviewData, ClubReviewSaveReq, TagData } from "@/types/review";
import { useState, useCallback, useEffect } from "react";

export const useClubReviews = (
  clubId: string,
  size?: number,
  sort?: string
) => {
  // 후기 관련
  const [review, setReview] = useState<ClubReviewData[]>([]);

  const [page, setPage] = useState<number>(0);
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [openReview, setOpenReview] = useState<string | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  // 태그 관련
  const [tagStatistics, setTagStatistics] = useState<TagData[]>([]);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // 활동 후기 목록 불러오기
  const fetchClubReviews = useCallback(() => {
    setLoading(true);
    getClubReview(clubId, page, size, sort)
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

  // 태그 통계 불러오기
  const fetchTagStatistics = useCallback(() => {
    getClubTagStatistics(clubId).then((res) => {
      setTagStatistics(res.sort((a, b) => b.rate - a.rate));
    });
  }, [clubId]);

  // 후기 등록 핸들러
  const handleSubmitSuccess = (data: ClubReviewSaveReq) => {
    postClubReview(clubId, data)
      .then(() => {
        setPage(0);
        setReview([]);
        setAlertMessage("활동후기가 등록되었습니다.");
        setIsReviewModalOpen(false);

        fetchClubReviews();
        fetchTagStatistics();
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
  const handleOpenReview = (item: ClubReviewData) => {
    setOpenReview((prev) => (prev === item.id ? null : item.id));
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchClubReviews();
  }, [fetchClubReviews]);

  useEffect(() => {
    fetchTagStatistics();
  }, [fetchTagStatistics]);

  return {
    review,
    pageInfo,
    loading,
    error,
    openReview,
    tagStatistics,
    isReviewModalOpen,
    alertMessage,
    page,
    handleSubmitSuccess,
    handleLoadMore,
    handleOpenReview,
    setIsReviewModalOpen,
    setAlertMessage,
  };
};
