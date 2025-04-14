import React, { useEffect, useRef, useState } from "react";
import useResponsive from "@/hooks/useResponsive";

import Image from "next/image";
import IconBtn from "../button/withIconBtn/IconBtn";
import dotMenu from "@/images/icon/dotMenu.svg";
import replyArrow from "@/images/icon/reply_arrow.svg";
import CommentInput from "./commentInput";
import { EDIT_ACTION_TYPE, REPORT_ACTION_TYPE } from "@/data/pulldown";
import SingleSelectOptions from "../pulldown/singleSelectOptions";
import BottomSheet from "../pulldown/bottomSheet";
import ReportModal from "../modal/reportModal";
import ReportBottomSheet from "../bottomSheet/report/reportBottomSheet";
import Alert from "../alert/alert";
import { ClubActivityComment } from "@/types/clubActivity";
import {
  formatKoreanDateOnly,
  formatKoreanTimeOnly,
} from "@/utils/dateFormatter";
import { createClubActivityComment } from "@/api/club/activity/api";

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
  isReplying: boolean;
  comment?: ClubActivityComment;
};

const Comment = (props: CommentBaseProps) => {
  const { isReplying, isReply } = props;
  const comment = props.comment;

  const menuRef = useRef<HTMLDivElement>(null);
  const isMdUp = useResponsive("md");
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

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

  const handleLike = () => {
    if (!isReplying) {
      setMyLike(!myLike);
      setLikes((prev) => (myLike ? prev - 1 : prev + 1));
    }
  };

  const handleMenuClick = () => {
    setIsOptionOpen(!isOptionOpen);
  };

  const handleOptionClick = (label: string) => {
    if (label === "수정하기") {
      setIsEditing(true);
    } else if (label === "삭제하기") {
      // 삭제
      handleDelete();
    } else if (label === "신고하기") {
      setIsReportOpen(true);
    } else if (label === "차단하기") {
      setAlertMessage("차단되었습니다");
    }
    setIsOptionOpen(false);
  };

  const handleReportSubmit = () => {
    setIsReportOpen(false);
    setAlertMessage("신고가 정상적으로 접수되었습니다.");
  };

  const handleDelete = () => {
    setAlertMessage("삭제되었습니다");
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
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="flex flex-col gap-[2px] md:gap-[18px] md:items-center md:flex-row">
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
          {!isReplying && comment?.comments?.length !== undefined && (
            <div className="flex gap-0.5 md:gap-2 items-center">
              {!isReply && !isReplying && (
                <IconBtn
                  type="reply"
                  size="large"
                  title={isMdUp ? "답글" : ""}
                  onClick={() => setIsReplyFormOpen((prev) => !prev)}
                />
              )}
              <IconBtn
                type={myLike ? "like_active" : "like_inactive"}
                size="large"
                title={likes.toString()}
                onClick={handleLike}
              />
              {isMdUp ? (
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
                    <SingleSelectOptions
                      selectedOption=""
                      optionData={
                        comment.isMine ? EDIT_ACTION_TYPE : REPORT_ACTION_TYPE
                      }
                      size="small"
                      position="end"
                      handleMenuClick={handleOptionClick}
                    />
                  )}
                </div>
              ) : (
                <Image
                  src={dotMenu}
                  alt="menu"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                  onClick={handleMenuClick}
                />
              )}
            </div>
          )}
        </div>

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
                  setAlertMessage("답글이 등록되었어요.");
                  setIsReplyFormOpen(false);
                } catch (error) {
                  console.error(error);
                  setAlertMessage("답글 등록에 실패했어요.");
                }
              } else {
                setIsEditing(false);
              }
            }}
          />
        ) : (
          comment && (
            <p className="px-4 py-2 text-subtext1 text-mobile_body2_r bg-hover rounded-16 md:px-[18px] md:py-3.5 md:ml-[42px] md:text-body1_r">
              {comment.body}
            </p>
          )
        )}

        {!isReplying &&
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
                />
              ))}
              {isReplyFormOpen && (
                <Comment
                  isReply={true}
                  isReplying={true}
                  clubActivityId={props.clubActivityId}
                  role={props.role}
                  nickname={props.nickname}
                  comment={comment}
                />
              )}
            </div>
          )}
      </div>

      {!isMdUp && !isReplying && comment && isOptionOpen && (
        <BottomSheet
          optionData={comment.isMine ? EDIT_ACTION_TYPE : REPORT_ACTION_TYPE}
          selectedOptions=""
          onClose={() => setIsOptionOpen(false)}
          handleMenuClick={handleOptionClick}
        />
      )}
      {isReportOpen &&
        (isMdUp ? (
          <ReportModal
            onClose={() => setIsReportOpen(false)}
            onSubmit={() => setIsReportOpen(false)}
          />
        ) : (
          <ReportBottomSheet
            onClose={() => setIsReportOpen(false)}
            onSubmit={() => setIsReportOpen(false)}
          />
        ))}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default Comment;
