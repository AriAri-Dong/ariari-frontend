import React, { useEffect, useRef, useState } from "react";
import useResponsive from "@/hooks/useResponsive";

import Image from "next/image";
import IconBtn from "../button/withIconBtn/IconBtn";
import dotMenu from "@/images/icon/dotMenu.svg";
import replyArrow from "@/images/icon/reply_arrow.svg";
import CommentInput from "./commentInput";
import { EDIT_ACTION_TYPE, REPORT_ACTION_TYPE } from "@/data/pulldown";
import SingleSelectOptions from "../pulldown/singleSelectOptions";
import ReportModal from "../modal/reportModal";
import ReportBottomSheet from "../bottomSheet/report/reportBottomSheet";
import Alert from "../alert/alert";
import { ClubActivityComment } from "@/types/clubActivity";
import {
  formatKoreanDateOnly,
  formatKoreanTimeOnly,
} from "@/utils/dateFormatter";
import {
  blockClubActivityCommentUser,
  createClubActivityComment,
  deleteClubActivityComment,
  toggleClubActivityCommentLike,
  updateClubActivityComment,
} from "@/api/club/activity/api";
import AlertWithMessage from "../alert/alertWithMessage";
import { useUserStore } from "@/stores/userStore";
import { getProfileImage } from "@/utils/mappingProfile";
import { profileType } from "@/types/member";
import CommonBottomSheet from "../bottomSheet/commonBottomSheet";

type CommentBaseProps = {
  isReply: boolean;
  /**
   *
   * @param isReplying 답글 작성중 여부 (작성중 - comment X, 작성중 X - comment O)
   * @param comment 댓글 정보
   * @param isReply 답글 여부 (답글인 경우 들여쓰기 및 답글 불가)
   * @returns
   */
  clubActivityId: string;
  role?: null | "GENERAL" | "MANAGER" | "ADMIN";
  nickname?: string;
  profileType: profileType;
  isReplying: boolean;
  comment?: ClubActivityComment;
  onDeleteSuccess?: () => void;
  onEditSuccess?: () => void;
  onPostSuccess?: () => void;
};

const Comment = (props: CommentBaseProps) => {
  const { isReplying, isReply } = props;
  const comment = props.comment;
  const myId = useUserStore((state) => state.user?.memberData.memberId);

  const menuRef = useRef<HTMLDivElement>(null);
  const isMdUp = useResponsive("md");
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [confirmAction, setConfirmAction] = useState<null | "delete" | "block">(
    null
  );

  const [blocked, setBlocked] = useState<boolean>(!!comment?.blocked);

  const [likes, setLikes] = useState<number>(
    !isReplying && comment ? comment.likes : 0
  );
  const [myLike, setMyLike] = useState<boolean>(
    !isReplying && comment ? comment.myLike : false
  );

  const date = formatKoreanDateOnly(
    isReplying ? new Date().toISOString() : comment?.createdDateTime || ""
  );
  const time = formatKoreanTimeOnly(
    isReplying ? new Date().toISOString() : comment?.createdDateTime || ""
  );

  const menuOptions =
    comment?.clubMember?.id === myId ? EDIT_ACTION_TYPE : REPORT_ACTION_TYPE;

  const handleLike = async () => {
    if (!isReplying && comment) {
      const prevMyLike = myLike;
      setMyLike(!prevMyLike);
      setLikes((prev) => (prevMyLike ? prev - 1 : prev + 1));

      try {
        await toggleClubActivityCommentLike({
          clubActivityId: props.clubActivityId,
          commentId: comment.clubActivityCommentId,
        });
      } catch (error) {
        console.error("댓글 좋아요 토글 실패:", error);
        setMyLike(prevMyLike);
        setLikes((prev) => (prevMyLike ? prev + 1 : prev - 1));
        setAlertMessage("좋아요 처리 중 오류가 발생했어요.");
      }
    }
  };

  const handleMenuClick = () => {
    setIsOptionOpen(!isOptionOpen);
  };

  const handleOptionClick = async (label: string) => {
    if (label === "삭제하기") {
      setConfirmAction("delete");
    } else if (label === "차단하기") {
      setConfirmAction("block");
    } else if (label === "수정하기") {
      setIsEditing(true);
    } else if (label === "신고하기") {
      setIsReportOpen(true);
    }
    setIsOptionOpen(false);
  };

  const handleConfirmedAction = async () => {
    if (!comment) return;

    try {
      if (confirmAction === "delete") {
        await deleteClubActivityComment({
          clubActivityId: props.clubActivityId,
          commentId: comment.clubActivityCommentId,
        });

        setAlertMessage("댓글이 삭제되었습니다.");

        setTimeout(() => {
          props.onDeleteSuccess?.();
        }, 1000);
      }
      if (confirmAction === "block") {
        await blockClubActivityCommentUser({
          commentId: comment.clubActivityCommentId,
        });
        setAlertMessage("해당 사용자가 차단되었습니다.");

        setTimeout(() => {
          props.onDeleteSuccess?.();
        }, 1000);
      }
    } catch (error) {
      console.error("요청 실패:", error);
      setAlertMessage(
        "요청 처리 중 오류가 발생했어요. <br/> 잠시후 다시 시도해주세요."
      );
    } finally {
      setIsOptionOpen(false);
      setConfirmAction(null);
    }
  };

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

  return (
    <div className="w-full flex gap-2">
      {isReply && (
        <div className="ml-2.5">
          <Image
            src={replyArrow}
            alt="replyArrow"
            width={18}
            height={18}
            className="md:w-6 md:h-6"
          />
        </div>
      )}
      <div className="w-full">
        {blocked ? (
          <div className="px-4 py-2 bg-hover rounded-16 md:px-[18px] md:py-3.5 md:ml-[42px]">
            <p className="text-subtext2 text-mobile_body2_r md:text-body1_r">
              차단된 유저의 댓글입니다.
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="flex flex-row items-center gap-2.5">
                  <Image
                    src={getProfileImage(props.profileType)}
                    alt="프로필 이미지"
                    width={28}
                    height={28}
                    className="rounded-full object-cover w-9 h-9"
                  />
                  <div className="flex flex-col md:flex-row gap-[2px] md:gap-[18px] items-start md:items-center">
                    <span className="text-subtext2 text-mobile_body1_m md:text-body1_m">
                      {isReplying ? props.nickname : comment?.clubMember.name}
                    </span>
                    <span className="flex gap-1.5 text-mobile_body4_r md:text-body4_r text-subtext2">
                      <p>{date}</p>
                      {!isReplying && <p>|</p>}
                      {!isReplying && <p>{time}</p>}
                    </span>
                  </div>
                </div>
              </div>
              {!isReplying && comment && (
                <div className="flex gap-0.5 md:gap-2 items-center">
                  {/* 댓글에만 답글 버튼 표시 (대댓글에는 X) */}
                  {!isReply && (
                    <IconBtn
                      type="reply"
                      size="large"
                      title={isMdUp ? "답글" : ""}
                      onClick={() => setIsReplyFormOpen((prev) => !prev)}
                    />
                  )}

                  {/* 좋아요 버튼 (댓글/대댓글 모두 표시) */}
                  <IconBtn
                    type={myLike ? "like_active" : "like_inactive"}
                    size="large"
                    title={likes.toString()}
                    onClick={handleLike}
                  />

                  {/* 도트 메뉴 (댓글/대댓글 모두 표시) */}
                  <div ref={menuRef} className="relative inline-block">
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
                            optionData={menuOptions}
                            size="small"
                            position="end"
                            handleMenuClick={handleOptionClick}
                          />
                        ) : (
                          <CommonBottomSheet
                            optionData={menuOptions}
                            onClose={() => setIsOptionOpen(false)}
                            handleMenuClick={handleOptionClick}
                            selectedOption={""}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {isEditing || isReplying ? (
          <CommentInput
            initialText={!isReplying && comment ? comment.body : ""}
            onSend={async (text) => {
              if (isReplying && comment) {
                try {
                  await createClubActivityComment({
                    clubActivityId: props.clubActivityId,
                    body: text,
                    parentCommentId: comment.clubActivityCommentId,
                  });
                  setAlertMessage("답글이 등록되었습니다..");
                  props.onPostSuccess?.();
                  setIsReplyFormOpen(false);
                } catch (error) {
                  console.error(error);
                  setAlertMessage(
                    "답글 등록에 실패했어요. </br> 잠시후 다시 시도해주세요."
                  );
                }
              } else if (isEditing && comment) {
                try {
                  await updateClubActivityComment({
                    clubActivityId: props.clubActivityId,
                    commentId: comment.clubActivityCommentId,
                    body: text,
                  });
                  setAlertMessage("댓글이 수정되었어요.");
                  props.onEditSuccess?.();
                  setIsEditing(false);
                } catch (error) {
                  console.error(error);
                  setAlertMessage(
                    "댓글 수정에 실패했어요.</br> 잠시후 다시 시도해주세요."
                  );
                }
              }
            }}
          />
        ) : (
          !blocked &&
          comment && (
            <p className="px-4 py-2 text-subtext1 text-mobile_body2_r bg-hover rounded-16 md:px-[18px] md:py-3.5 md:ml-[42px] md:text-body1_r">
              {comment.body}
            </p>
          )
        )}

        {!isReplying &&
          !blocked &&
          comment?.comments?.length !== undefined &&
          (comment.comments.length > 0 || isReplyFormOpen) && (
            <div className="flex flex-col mt-[18px] md:mt-[22px] gap-[18px] md:gap-[22px] ml-6 md:ml-[42px]">
              {comment.comments.map((item) => (
                <Comment
                  key={item.clubActivityCommentId}
                  comment={item}
                  isReply={true}
                  isReplying={false}
                  clubActivityId={props.clubActivityId}
                  role={props.role}
                  nickname={props.nickname}
                  onEditSuccess={props.onEditSuccess}
                  onDeleteSuccess={props.onDeleteSuccess}
                  profileType={props.profileType}
                />
              ))}
              {isReplyFormOpen && (
                <Comment
                  isReply={true}
                  isReplying={true}
                  clubActivityId={props.clubActivityId}
                  role={props.role}
                  nickname={props.nickname}
                  profileType={props.profileType}
                  comment={comment}
                  onEditSuccess={props.onEditSuccess}
                  onDeleteSuccess={props.onDeleteSuccess}
                  onPostSuccess={props.onPostSuccess}
                />
              )}
            </div>
          )}
      </div>

      {isReportOpen &&
        (isMdUp ? (
          <ReportModal
            id={comment?.clubActivityCommentId}
            reportTargetType="CLUB_ACTIVITY_COMMENT"
            onClose={() => setIsReportOpen(false)}
            onSubmit={() => {
              setIsReportOpen(false);
              setAlertMessage("신고가 정상적으로 접수되었습니다.");
            }}
          />
        ) : (
          <ReportBottomSheet
            id={comment?.clubActivityCommentId}
            reportTargetType="CLUB_ACTIVITY_COMMENT"
            onClose={() => setIsReportOpen(false)}
            onSubmit={() => {
              setIsReportOpen(false);
              setAlertMessage("신고가 정상적으로 접수되었습니다.");
            }}
          />
        ))}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
      {confirmAction && (
        <AlertWithMessage
          text={
            confirmAction === "delete"
              ? "댓글을 삭제할까요?"
              : "이 사용자를 차단할까요?"
          }
          description={
            confirmAction === "delete"
              ? "삭제된 댓글은 복구할 수 없어요."
              : "차단 시, 더 이상 해당 사용자의 활동을 볼 수 없어요."
          }
          leftBtnText="취소"
          rightBtnText="확인"
          onLeftBtnClick={() => setConfirmAction(null)}
          onRightBtnClick={handleConfirmedAction}
        />
      )}
    </div>
  );
};

export default Comment;
