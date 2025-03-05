import React, { useEffect, useRef, useState } from "react";
import useResponsive from "@/hooks/useResponsive";

import Image from "next/image";
import IconBtn from "../button/withIconBtn/IconBtn";
import DotMenuDropDown from "../dropdown/option/dotMenuDropdown";

import dotMenu from "@/images/icon/dotMenu.svg";
import replyArrow from "@/images/icon/reply_arrow.svg";

import formatDateToDot, { formatTime } from "@/utils/formatDateToDot";
import { profileImageMap } from "@/utils/mappingProfile";
import { ClubActivityComment } from "@/types/club";
import CommentInput from "./commentInput";
import { CLUB_MEMBER_DATA } from "@/data/clubMembers";
import { ClubMemberData } from "@/types/member";
import CommonBottomSheet from "../bottomSheet/commonBottomSheet";
import { EDIT_ACTION_TYPE, REPORT_ACTION_TYPE } from "@/data/pulldown";
import SingleSelectOptions from "../pulldown/singleSelectOptions";
import BottomSheet from "../pulldown/bottomSheet";
import ReportModal from "../modal/reportModal";
import ReportBottomSheet from "../bottomSheet/report/reportBottomSheet";
import Alert from "../alert/alert";
import NotiPopUp from "../modal/notiPopUp";

type CommentWithBodyProps = {
  comment: ClubActivityComment;
  isReplying: false;
};

type CommentInputProps = {
  isReplying: true;
};

type CommentBaseProps = {
  isReply: boolean;
} & (CommentWithBodyProps | CommentInputProps);

/**
 *
 * @param isReplying 답글 작성중 여부 (작성중 - comment X, 작성중 X - comment O)
 * @param comment 댓글 정보
 * @param isReply 답글 여부 (답글인 경우 들여쓰기 및 답글 불가)
 * @returns
 */

const Comment = (props: CommentBaseProps) => {
  const { isReplying, isReply } = props;

  const menuRef = useRef<HTMLDivElement>(null);
  const isMdUp = useResponsive("md");
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState<boolean>(false);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  const [likes, setLikes] = useState<number>(
    isReplying ? 0 : props.comment.likes
  );
  const [myLike, setMyLike] = useState<boolean>(
    isReplying ? false : props.comment.myLike
  );

  //  임시 프로필
  const [myMemberData, setMemberData] = useState<ClubMemberData>(
    CLUB_MEMBER_DATA[0]
  );

  //  답글 작성중인 경우 현재 시간
  const date = formatDateToDot(
    isReplying ? new Date().toISOString() : props.comment.createdDateTime
  );
  const time = formatTime(
    isReplying ? new Date() : new Date(props.comment.createdDateTime)
  );

  const handleLike = () => {
    if (!isReplying) {
      setMyLike(!myLike);
      if (myLike) {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
      }
    }
  };

  const handleMenuClick = () => {
    setIsOptionOpen(!isOptionOpen);
  };
  const handleOptionClick = (label: string) => {
    if (label === "수정하기") {
      setIsEditing(!isEditing);
    } else if (label === "삭제하기") {
      // 삭제
      handleDelete();
    } else if (label === "신고하기") {
      setIsOptionOpen(false);
      handleReport();
    } else if (label === "차단하기") {
      // 차단
      setAlertMessage("차단되었습니다");
    }
  };

  const handleReport = () => {
    setIsReportOpen(true);
  };

  const handleReportSubmit = () => {
    setIsReportOpen(false);
    setAlertMessage("신고가 정상적으로 접수되었습니다.");
  };

  const handleDelete = () => {
    setAlertMessage("삭제되었습니다");
  };

  // 메뉴 영역 밖 클릭 시 닫기
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
            <Image
              src={
                profileImageMap[
                  isReplying
                    ? myMemberData.profileType
                    : props.comment.clubMember.profileType
                ]
              }
              alt="profile"
              width={28}
              height={28}
              className="md:w-8 md:h-8"
            />
            <div className="flex flex-col gap-[2px] md:gap-[18px] md:items-center md:flex-row">
              <span className="text-subtext2 text-mobile_body1_m md:text-body1_m">
                {isReplying ? myMemberData.name : props.comment.clubMember.name}
              </span>

              <span className="flex gap-1.5 text-mobile_body4_r md:text-body4_r text-subtext2">
                <p>{date}</p>
                {!isReplying && <p>|</p>}
                {!isReplying && <p>{time}</p>}
              </span>
            </div>
          </div>
          {!isReplying && (
            <div className="flex gap-[2px] md:gap-2 items-center">
              {!isReply && (
                <IconBtn
                  type={"reply"}
                  size={"large"}
                  title={isMdUp ? "답글" : ""}
                  onClick={() => {
                    setIsReplyFormOpen(!isReplyFormOpen);
                  }}
                />
              )}
              <IconBtn
                type={myLike ? "like_active" : "like_inactive"}
                size={"large"}
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
                  {/* 메뉴 옵션 */}
                  {isMdUp && isOptionOpen && (
                    <SingleSelectOptions
                      selectedOption={""}
                      optionData={
                        props.comment.isMine
                          ? EDIT_ACTION_TYPE
                          : REPORT_ACTION_TYPE
                      }
                      size={"small"}
                      position="end"
                      handleMenuClick={(label) => {
                        handleOptionClick(label);
                        setIsOptionOpen(false);
                      }}
                    />
                  )}
                </div>
              ) : (
                <Image
                  src={dotMenu}
                  alt="menu"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                  onClick={handleMenuClick}
                />
              )}
            </div>
          )}
        </div>
        {isEditing || isReplying ? (
          <CommentInput
            initialText={isReplying ? "" : props.comment.body}
            onSend={() => {
              setIsEditing(false);
            }}
          />
        ) : (
          <p className="px-4 py-2 text-subtext1 text-mobile_body2_r bg-hover rounded-16 md:px-[18px] md:py-3.5 md:ml-[42px] md:text-body1_r">
            {props.comment.body}
          </p>
        )}
        {!isReplying &&
          (props.comment.comments.length > 0 || isReplyFormOpen) && (
            <div className="flex flex-col mt-[18px] md:mt-[22px] gap-[18px] md:gap-[22px]">
              {props.comment.comments.map((item) => (
                <div key={item.clubActivityCommentId}>
                  <Comment comment={item} isReply={true} isReplying={false} />
                </div>
              ))}
              {isReplyFormOpen && <Comment isReply={true} isReplying={true} />}
            </div>
          )}
      </div>
      {/* 메뉴 옵션 바텀시트 */}
      {!isMdUp && !isReplying && isOptionOpen && (
        <BottomSheet
          optionData={
            props.comment.isMine ? EDIT_ACTION_TYPE : REPORT_ACTION_TYPE
          }
          selectedOptions={""}
          onClose={() => {
            setIsOptionOpen(false);
          }}
          handleMenuClick={handleOptionClick}
        />
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
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default Comment;
