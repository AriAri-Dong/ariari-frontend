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
import BottomSheet from "../pulldown/bottomSheet";
import SingleSelectOptions from "../pulldown/singleSelectOptions";
import CommentInput from "../comment/commentInput";
import Comment from "../comment/comment";

import dotMenu from "@/images/icon/dotMenu.svg";
import lock from "@/images/icon/lock.svg";
import lock_open from "@/images/icon/lock_open.svg";

import formatDateToDot from "@/utils/formatDateToDot";
import { profileImageMap } from "@/utils/mappingProfile";
import { ClubActivity, ClubActivityComment } from "@/types/club";
import { EDIT_ACTION_TYPE, REPORT_ACTION_TYPE } from "@/data/pulldown";

const OPTION = [
  { id: 1, label: "수정하기" },
  { id: 2, label: "삭제하기" },
];

interface PostBoxProps {
  data: ClubActivity;
  role: null | "GENERAL" | "MANAGER" | "ADMIN";
}

const PostBox = ({ data, role }: PostBoxProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isMdUp = useResponsive("md");

  const [post, setPost] = useState<ClubActivity>(data);
  const [comments, setComments] = useState<ClubActivityComment[]>(
    post.comments
  );

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isNotiPopUpOpen, setIsNotiPopUpOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  //  더보기 관련 변수
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);

  const handleLike = () => {
    if (post.myLike) {
      setPost((prev) => ({
        ...prev,
        myLike: false,
        likes: prev.likes - 1,
      }));
    } else {
      setPost((prev) => ({
        ...prev,
        myLike: true,
        likes: prev.likes + 1,
      }));
    }
  };

  const handleMenuClick = () => {
    setIsOptionOpen(!isOptionOpen);
  };

  const handleOptionClick = (label: string) => {
    if (label === "수정하기") {
    } else if (label === "삭제하기") {
      // 삭제
      setIsNotiPopUpOpen(true);
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
    setIsNotiPopUpOpen(false);
    if (true) {
      setAlertMessage("삭제 되었습니다.");
    } else {
      setAlertMessage(`에러가 발생했습니다.<br /> 잠시 후 다시 시도해주세요.`);
    }
  };
  // 이미지 슬라이드
  const isFirstSlide = currentImageIndex === 0;
  const isLastSlide = currentImageIndex === post.images.length - 1;

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentImageIndex((prev) =>
        prev < post.images.length - 1 ? prev + 1 : prev
      ),
    onSwipedRight: () =>
      setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev)),
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
    delta: 10,
  });

  // 더보기 2줄 계산
  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(contentRef.current).lineHeight
      );
      const maxHeight = lineHeight * 2;
      setIsClamped(contentRef.current.scrollHeight > maxHeight);
    }
  }, [post.body]);

  const handleSliderPrevClick = () => {
    if (!isFirstSlide) setCurrentImageIndex((prev) => prev - 1);
  };

  const handleSliderNextClick = () => {
    if (!isLastSlide) setCurrentImageIndex((prev) => prev + 1);
  };

  // 메뉴 옵션 영역 밖 클릭 시 닫기
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
    <div
      className={`bg-background p-[14px] pb-4 rounded-12 md:p-6 md:pb-[26px]`}
    >
      <div className="flex flex-col gap-3.5 md:flex-row justify-between">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-[14px]">
            {/* 에러 발생 임시 주석 처리 */}
            {/* <Image
              src={profileImageMap[post.clubMember.profileType]}
              alt="vector"
              width={32}
              height={32}
              className="md:w-[44px] md:h-[44px]"
            /> */}
            <div>
              <p className="text-mobile_body1_m text-subtext2 md:text-h4">
                {post.clubMember.name}
              </p>
              <div className="flex items-center gap-1">
                <p className="text-mobile_body4_r text-subtext2 md:text-body4_r">
                  {formatDateToDot(post.createdDateTime)}
                </p>
                {isMdUp && (
                  <p className="text-mobile_body4_r text-subtext2 md:text-body4_r">
                    ·
                  </p>
                )}
                {isMdUp && (
                  <div className="flex items-centergap-[2px]">
                    <Image
                      src={post.accessType === "ALL" ? lock_open : lock}
                      alt="vector"
                      width={16}
                      height={16}
                    />
                    <p className="text-mobile_body1_m text-subtext2 md:text-body4_r">
                      {post.accessType === "ALL"
                        ? "전체 공개"
                        : "동아리 내 공개"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="">
            {(role === "ADMIN" || role === "MANAGER") && (
              <>
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
                    {isMdUp && isOptionOpen && (
                      <SingleSelectOptions
                        selectedOption={""}
                        optionData={
                          post.isMine ? EDIT_ACTION_TYPE : REPORT_ACTION_TYPE
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
              </>
            )}
          </div>
        </div>
      </div>
      <div className="md:mt-[22px] mt-4">
        <h1
          ref={contentRef}
          className={`whitespace-pre-line text-subtext1 text-mobile_body1_r md:text-body1_r ${
            isExpanded ? "" : "line-clamp-2"
          }`}
        >
          {post.body}
        </h1>
        {!isExpanded && isClamped && (
          <button
            className="px-1 py-[2px] md:py-1.5 text-primary text-mobile_body1_sb md:text-body1_sb mt-1.5 md:mt-2"
            onClick={() => setIsExpanded(true)}
          >
            더보기
          </button>
        )}

        {/* 이미지 영역 */}
        {post.images.length > 0 && (
          <div {...handlers} className="relative w-full mt-3 md:mt-7">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <Image
                src={post.images[currentImageIndex]}
                alt={`notice-image-${currentImageIndex + 1}`}
                layout="fill"
                objectFit="cover"
                className="absolute top-0 left-0 w-full h-full rounded-lg"
              />
            </div>

            {/* Slider */}
            <div className="hidden md:block">
              <RoundVectorBtn
                className={`absolute rotate-180 top-[calc(50%-24px)] ml-4 ${
                  isFirstSlide ? "hidden" : "block"
                }`}
                imageSize={30}
                onClick={handleSliderPrevClick}
              />
              <RoundVectorBtn
                className={`absolute top-[calc(50%-24px)] right-4 ${
                  isLastSlide ? "hidden" : "block"
                }`}
                imageSize={30}
                onClick={handleSliderNextClick}
              />
            </div>

            {/* 이미지 개수 */}
            <div
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white70 
                py-1 px-2.5 rounded-12 backdrop-blur-sm"
            >
              <p className="text-center text-mobile_body3_r md:text-body3_r text-subtext2">
                {currentImageIndex + 1} / {post.images.length}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col-reverse items-end md:flex-row md:items-center gap-4 md:gap-5 mt-3 md:mt-7">
          <CommentInput onSend={() => {}} />
          <div className="flex gap-1 flex-shrink-0 items-center">
            <IconBtn
              type={"comment"}
              size={"large"}
              title={post.commentCount.toString()}
              onClick={() => {
                setIsCommentOpen((prev) => !prev);
              }}
            />
            <IconBtn
              type={post.myLike ? "like_active" : "like_inactive"}
              size={"large"}
              title={post.likes.toString()}
              onClick={handleLike}
            />
          </div>
        </div>
      </div>
      {isCommentOpen && (
        <div className="mt-7">
          <div className="flex flex-col gap-[18px] md:gap-[22px]">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Comment
                  key={comment.clubActivityCommentId}
                  comment={comment}
                  isReply={false}
                  isReplying={false}
                />
              ))
            ) : (
              <p className="text-center text-mobile_body3_r md:ext-body3_r text-subtext2">
                아직 댓글이 없습니다. 첫 번째 댓글을 남겨보세요.
              </p>
            )}
          </div>
        </div>
      )}

      {!isMdUp && isOptionOpen && (
        <BottomSheet
          optionData={post.isMine ? EDIT_ACTION_TYPE : REPORT_ACTION_TYPE}
          selectedOptions={""}
          onClose={() => {
            setIsOptionOpen(false);
          }}
          handleMenuClick={handleOptionClick}
        />
      )}
      {isNotiPopUpOpen && (
        <NotiPopUp
          onClose={() => setIsNotiPopUpOpen(false)}
          icon={"delete"}
          title="활동내역 삭제"
          description={`활동내역을 정말 삭제하시겠습니까? `}
          modalType={"button"}
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
    </div>
  );
};

export default PostBox;
