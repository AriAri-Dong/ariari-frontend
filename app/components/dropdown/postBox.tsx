"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import useResponsive from "@/hooks/useResponsive";

import RoundVectorBtn from "../button/iconBtn/roundVectorBtn";
import IconBtn from "../button/withIconBtn/IconBtn";
import NotiPopUp from "../modal/notiPopUp";
import Alert from "../alert/alert";
import ReportModal from "../modal/reportModal";
import ReportBottomSheet from "../bottomSheet/report/reportBottomSheet";
import SingleSelectOptions from "../pulldown/singleSelectOptions";
import CommentInput from "../comment/commentInput";
import Comment from "../comment/comment";

import dotMenu from "@/images/icon/dotMenu.svg";
import lock from "@/images/icon/lock.svg";
import lock_open from "@/images/icon/lock_open.svg";
import defaultImg from "@/images/icon/defaultAriari.svg";

import formatDateToDot from "@/utils/formatDateToDot";
import { EDIT_ACTION_TYPE, REPORT_ACTION_TYPE } from "@/data/pulldown";
import { ClubActivity, ClubActivityComment } from "@/types/clubActivity";
import ActivityCreateForm from "@/(club)/club/activityHistory/components/activityCreateForm";
import {
  createClubActivityComment,
  deleteClubActivity,
  getClubActivityDetail,
  toggleClubActivityLike,
} from "@/api/club/activity/api";
import { useClubContext } from "@/context/ClubContext";
import CommonBottomSheet from "../bottomSheet/commonBottomSheet";

interface PostBoxProps {
  data: ClubActivity;
  role: null | "GENERAL" | "MANAGER" | "ADMIN";
  nickname: string;
}

const PostBox = ({ data, nickname }: PostBoxProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isMdUp = useResponsive("md");
  const { role, clubInfo } = useClubContext();
  const isClubMember = clubInfo?.clubMemberData;

  const [post, setPost] = useState<ClubActivity>(data);
  const [comments, setComments] = useState<ClubActivityComment[]>(
    post.comments || []
  );

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isNotiPopUpOpen, setIsNotiPopUpOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isClamped, setIsClamped] = useState<boolean>(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);

  const isFirstSlide = currentImageIndex === 0;
  const isLastSlide = currentImageIndex === post.images.length - 1;

  const isManager = role === "ADMIN" || role === "MANAGER";
  const optionData = isManager ? EDIT_ACTION_TYPE : REPORT_ACTION_TYPE;

  // 좋아요
  const handleLike = async () => {
    const prevMyLike = post.myLike;
    const prevLikes = post.likes;

    setPost((prev) => ({
      ...prev,
      myLike: !prevMyLike,
      likes: prevLikes + (prevMyLike ? -1 : 1),
    }));

    try {
      await toggleClubActivityLike(post.clubActivityId);
    } catch (error) {
      console.error("활동 내역 좋아요 실패:", error);
      setPost((prev) => ({
        ...prev,
        myLike: prevMyLike,
        likes: prevLikes,
      }));
      setAlertMessage(
        "좋아요 처리 중 오류가 발생했어요. </br> 잠시후 다시 시도해주세요."
      );
    }
  };

  // 옵션 메뉴
  const handleMenuClick = () => {
    setIsOptionOpen((prev) => !prev);
  };

  const handleOptionClick = (label: string) => {
    if (label === "수정하기") {
      setIsEditFormOpen(true);
    } else if (label === "삭제하기") {
      setIsNotiPopUpOpen(true);
    } else if (label === "신고하기") {
      setIsReportOpen(true);
    } else if (label === "차단하기") {
      setAlertMessage("차단되었습니다");
    }
    setIsOptionOpen(false);
  };

  // 신고
  const handleReportSubmit = () => {
    setIsReportOpen(false);
    setAlertMessage("신고가 정상적으로 접수되었습니다.");
  };

  // 삭제
  const handleDelete = async () => {
    try {
      await deleteClubActivity(post.clubActivityId);
      setIsNotiPopUpOpen(false);
      setAlertMessage("삭제 되었습니다.");

      window.location.reload();
    } catch (error) {
      setIsNotiPopUpOpen(false);
      setAlertMessage(
        "삭제 중 오류가 발생했어요. </br> 잠시후 다시 시도해주세요."
      );
    }
  };

  // 더보기 라인 클램프 계산
  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(contentRef.current).lineHeight
      );
      const maxHeight = lineHeight * 2;
      setIsClamped(contentRef.current.scrollHeight > maxHeight);
    }
  }, [post.body]);

  // 옵션 메뉴 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOptionOpen(false);
      }
    };

    if (isOptionOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOptionOpen]);

  // 이미지 슬라이드 관련
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentImageIndex((prev) =>
        Math.min(prev + 1, post.images.length - 1)
      ),
    onSwipedRight: () => setCurrentImageIndex((prev) => Math.max(prev - 1, 0)),
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
  });

  const handleToggleComments = async () => {
    const willOpen = !isCommentOpen;
    setIsCommentOpen(willOpen);

    if (willOpen) {
      try {
        const detailRes = await getClubActivityDetail(post.clubActivityId);

        if (detailRes.comments) {
          setComments(detailRes.comments);
        }
      } catch (e) {
        console.error("댓글 불러오기 실패", e);
        setAlertMessage(
          "댓글을 불러오는 데 실패했어요. </br> 잠시후 다시 시도해주세요."
        );
      }
    }
  };

  const refreshPostDetail = async () => {
    try {
      const detailRes = await getClubActivityDetail(post.clubActivityId);
      if (detailRes) {
        setPost(detailRes as ClubActivity);
        setComments(detailRes.comments || []);
      }
    } catch (e) {
      console.error("게시글 정보 갱신 실패", e);
      setAlertMessage("게시글 정보를 불러오는데 실패했어요.");
    }
  };

  return (
    <div className="bg-background p-[14px] pb-4 rounded-12 md:p-6 md:pb-[26px]">
      <div className="flex justify-between">
        <div className="flex items-center gap-[14px]">
          <Image
            src={clubInfo?.clubData.profileUri || defaultImg}
            alt={"프로필이미지"}
            width={44}
            height={44}
            className="md:w-[44px] md:h-[44px] rounded-full cursor-pointer object-cover"
          />
          <div>
            <p className="text-mobile_body1_m text-subtext2 md:text-h4">
              {post.clubMember.name}
            </p>
            <div className="flex items-center gap-1">
              <p className="text-mobile_body4_r text-subtext2 md:text-body4_r">
                {formatDateToDot(post.createdDateTime)}
              </p>
              {isMdUp && <p className="mx-1">·</p>}
              {isMdUp && (
                <div className="flex items-center gap-1">
                  <Image
                    src={post.accessType === "ALL" ? lock_open : lock}
                    alt="공개 범위"
                    width={16}
                    height={16}
                  />
                  <span className="text-mobile_body4_r text-subtext2 md:text-body4_r">
                    {post.accessType === "ALL" ? "전체 공개" : "동아리 내 공개"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div ref={menuRef} className="relative">
          <Image
            src={dotMenu}
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={handleMenuClick}
          />
          {isOptionOpen && (
            <>
              {isMdUp ? (
                <SingleSelectOptions
                  selectedOption=""
                  optionData={optionData}
                  size="small"
                  position="end"
                  handleMenuClick={(label) => {
                    handleOptionClick(label);
                  }}
                />
              ) : (
                <CommonBottomSheet
                  optionData={optionData}
                  onClose={() => setIsOptionOpen(false)}
                  handleMenuClick={(label) => {
                    handleOptionClick(label);
                  }}
                  selectedOption={""}
                />
              )}
            </>
          )}
        </div>
      </div>

      <div className="mt-4 md:mt-6">
        <p
          ref={contentRef}
          className={`whitespace-pre-line text-subtext1 text-mobile_body1_r md:text-body1_r ${
            isExpanded ? "" : "line-clamp-2"
          }`}
        >
          {post.body}
        </p>
        {!isExpanded && isClamped && (
          <button
            className="text-primary text-mobile_body1_sb md:text-body1_sb mt-2"
            onClick={() => setIsExpanded(true)}
          >
            더보기
          </button>
        )}

        {/* 이미지 슬라이드 */}
        {post.images.length > 0 && (
          <div {...handlers} className="relative w-full mt-3 md:mt-7">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <Image
                src={post.images[currentImageIndex]}
                alt={`image-${currentImageIndex + 1}`}
                layout="fill"
                objectFit="contain"
                className="absolute top-0 left-0 w-full h-full rounded-lg"
              />
            </div>

            {/* 좌우 버튼 */}
            {isMdUp && (
              <>
                {!isFirstSlide && (
                  <RoundVectorBtn
                    className="absolute rotate-180 top-1/2 left-4 -translate-y-1/2"
                    imageSize={30}
                    onClick={() => setCurrentImageIndex((prev) => prev - 1)}
                  />
                )}
                {!isLastSlide && (
                  <RoundVectorBtn
                    className="absolute top-1/2 right-4 -translate-y-1/2"
                    imageSize={30}
                    onClick={() => setCurrentImageIndex((prev) => prev + 1)}
                  />
                )}
              </>
            )}

            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white70 px-2 py-1 rounded-12 backdrop-blur-sm">
              <p className="text-center text-mobile_body3_r text-subtext2">
                {currentImageIndex + 1} / {post.images.length}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end items-center gap-4 mt-4 md:mt-6">
        <CommentInput
          onSend={async (text) => {
            try {
              await createClubActivityComment({
                clubActivityId: post.clubActivityId,
                body: text,
              });

              await refreshPostDetail();
              setAlertMessage("댓글이 등록되었어요.");
            } catch (e) {
              setAlertMessage("댓글 등록에 실패했어요.");
            }
          }}
        />

        <div className="flex items-center gap-1">
          <IconBtn
            type="comment"
            size="large"
            title={post.commentCount.toString()}
            onClick={handleToggleComments}
          />
          <IconBtn
            type={post.myLike ? "like_active" : "like_inactive"}
            size="large"
            title={post.likes.toString()}
            onClick={handleLike}
          />
        </div>
      </div>

      {/* 댓글 영역 */}
      {isCommentOpen && (
        <div className="flex flex-col gap-[18px] md:gap-[22px] mt-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Comment
                key={comment.clubActivityCommentId}
                comment={comment}
                isReply={false}
                isReplying={false}
                clubActivityId={post.clubActivityId}
                role={role}
                // nickname={nickname}
                nickname={comment.clubMember.name}
                profileType={comment.clubMember.profileType}
                onEditSuccess={refreshPostDetail}
                onDeleteSuccess={refreshPostDetail}
                onPostSuccess={refreshPostDetail}
                disabled={!isClubMember}
              />
            ))
          ) : (
            <p className="text-center text-subtext2 text-mobile_body3_r">
              아직 댓글이 없습니다. 첫 번째 댓글을 남겨보세요.
            </p>
          )}
        </div>
      )}

      {/* 팝업 및 모달 */}
      {isNotiPopUpOpen && (
        <NotiPopUp
          onClose={() => setIsNotiPopUpOpen(false)}
          icon="delete"
          title="활동내역 삭제"
          description="활동내역을 정말 삭제하시겠습니까?"
          modalType="button"
          firstButton={handleDelete}
          firstButtonText="삭제하기"
          secondButton={() => setIsNotiPopUpOpen(false)}
          secondButtonText="취소하기"
        />
      )}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
      {isMdUp
        ? isReportOpen && (
            <ReportModal
              onClose={() => setIsReportOpen(false)}
              onSubmit={handleReportSubmit}
            />
          )
        : isReportOpen && (
            <ReportBottomSheet
              onClose={() => setIsReportOpen(false)}
              onSubmit={handleReportSubmit}
            />
          )}
      {isEditFormOpen && (
        <ActivityCreateForm
          mode="edit"
          clubId={post.clubId || ""}
          onClose={() => setIsEditFormOpen(false)}
          onSubmit={async () => {
            try {
              setAlertMessage("활동 내역 수정이 완료되었습니다.");
              setIsEditFormOpen(false);
              await refreshPostDetail();
              // window.location.reload();
              return true;
            } catch (error) {
              setAlertMessage("수정 처리 중 오류가 발생했어요.");
              return false;
            }
          }}
          initialData={{
            clubActivityId: post.clubActivityId,
            accessType: post.accessType,
            detail: post.body,
            existingImages: post.images.map((uri, idx) => ({
              id: idx,
              imageUri: uri,
            })),
          }}
        />
      )}
    </div>
  );
};

export default PostBox;
