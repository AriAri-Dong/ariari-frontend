"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useClubContext } from "@/context/ClubContext";
import { useAcceptanceReviews } from "@/hooks/club/useAcceptanceReviews";
import useResponsive from "@/hooks/useResponsive";

import AcceptanceReviewDropdown from "@/components/dropdown/acceptanceReviewDropdown";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import DarkBtn from "@/components/button/withIconBtn/darkBtn";
import Alert from "@/components/alert/alert";
import AcceptanceReviewModal from "@/components/modal/review/acceptanceReviewModal";
import AcceptanceReviewBottomSheet from "@/components/bottomSheet/review/acceptanceReviewBottomSheet";
import ErrorNotice from "@/components/feedback/error";
import RecruitmentGuideFloatingBar from "@/components/bar/floatingBar/recruitmentGuideFloatingBar";
import MobileMenu from "@/(club)/club/components/menu/mobileMenu";
import LeftMenu from "@/(club)/club/components/menu/leftMenu";
import { useUserStore } from "@/stores/userStore";

const CONTENT_SIZE = 10;
const SORT = "createdDateTime,desc";

const AcceptanceReviewContent = () => {
  const params = useSearchParams();
  const clubId = params.get("clubId") ?? "";
  const router = useRouter();
  const isMdUp = useResponsive("md");

  const { role } = useClubContext();
  const { user } = useUserStore();
  const isSignIn = !!user;

  const {
    review,
    pageInfo,
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
  } = useAcceptanceReviews(clubId, CONTENT_SIZE, SORT);

  const handleRouter = () => {
    router.push(`/club/recruitment/clubId=${clubId}`);
  };
  const handleWrite = () => {
    setIsReviewModalOpen(true);
  };

  if (error) {
    return <ErrorNotice description={error} />;
  }

  return (
    <>
      <div className="bg-sub_bg flex justify-center items-center w-full pb-20 md:pb-[124px]">
        <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 mt-6 md:mt-8 md:px-5">
          <MobileMenu />
          <div className="flex gap-9">
            {/* 임시 메뉴 */}
            <LeftMenu />
            <div className="w-full">
              <p className="text-subtext2 text-mobile_body2_m md:text-h4 mb-4 md:mb-[22px]">
                총 {pageInfo?.totalSize}개의 합격후기가 있어요.
              </p>

              <div
                className="flex-row justify-between items-center w-full my-2.5 hidden md:flex
              py-1.5 pl-6 pr-[176px] rounded-lg bg-white70 text-subtext2 text-body1_m"
              >
                <p>제목</p>
                <p>작성일</p>
              </div>
              <div className="flex flex-col gap-3 md:gap-2.5">
                {review?.map((item, index) => {
                  return (
                    <AcceptanceReviewDropdown
                      key={item.id}
                      review={item}
                      onClick={() => handleOpenReview(item)}
                      isOpenReview={openReview === item.id}
                    />
                  );
                })}
              </div>
              {pageInfo && pageInfo?.totalPages > page + 1 && (
                <div className="flex justify-center mt-9 md:mt-10">
                  <PlusBtn title={"더보기"} onClick={handleLoadMore} />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* PC 모집안내 바 :  동아리 가입 x 또는 로그인 x*/}
        {(role == null || !isSignIn) && (
          <RecruitmentGuideFloatingBar
            isWriteButtonVisible={false}
            handleWrite={() => {}}
          />
        )}
        {/* 모바일 모집안내 바 : 동아리 가입 x 또는 로그인 x*/}

        {(role == null || !isSignIn) && (
          <div className="fixed bottom-5 md:hidden left-50% translate-1/2">
            <DarkBtn title={"모집공고 보기"} onClick={handleRouter} />
          </div>
        )}

        {/* 작성버튼 - 동아리 회원 */}
        {(role === "GENERAL" || role === "MANAGER") && (
          <div className="fixed w-full bottom-5 px-5 flex justify-end md:bottom-[44px] md:max-w-[1248px] md:px-5">
            <WriteBtn onClick={handleWrite} />
          </div>
        )}
        {isMdUp
          ? isReviewModalOpen && (
              <AcceptanceReviewModal
                onClose={() => setIsReviewModalOpen(false)}
                onSubmit={handleSubmit}
              />
            )
          : isReviewModalOpen && (
              <AcceptanceReviewBottomSheet
                onClose={() => setIsReviewModalOpen(false)}
                onSubmit={handleSubmit}
              />
            )}
        {alertMessage && (
          <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
        )}
      </div>
    </>
  );
};

export default AcceptanceReviewContent;
