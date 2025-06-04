"use client";

import useResponsive from "@/hooks/useResponsive";

import Badge from "../badge/badge";
import DeleteBtn from "../button/iconBtn/deleteBtn";
import EndBtn from "../button/iconBtn/endBtn";
import { RecruitmentStatusType } from "@/types/recruitment";
import {
  useDeleteRecruitmentMutation,
  useEndRecruitmentMutation,
} from "@/hooks/club/recruitment/useClubRecruitmentMutation";
import { useState } from "react";
import NotiPopUp from "../modal/notiPopUp";

type RecruitmentCardProps = {
  id: string;
  clubId: string;
  title: string;
  date: string;
  status: RecruitmentStatusType;
  isManager: boolean;
  onClick: () => void;
  setAlertMessage?: (msg: string) => void;
  className?: string;
};

const RecruitmentCard = ({
  id,
  clubId,
  title,
  date,
  status,
  isManager,
  className,
  onClick,
  setAlertMessage,
}: RecruitmentCardProps) => {
  const isMdUp = useResponsive("md");

  const [isRecruitmentCloseModalOpen, setIsRecruitmentCloseModalOpen] =
    useState<boolean>(false);
  const [isRecruitmentDeleteModalOpen, setIsRecruitmentDeleteModalOpen] =
    useState<boolean>(false);

  // 삭제 핸들러
  const { mutate: deleteRecruitment } = useDeleteRecruitmentMutation({
    clubId,
    onSuccess: () => setAlertMessage?.("삭제되었습니다."),
    onError: () => setAlertMessage?.("삭제에 실패했습니다."),
  });

  // 종료 핸들러
  const { mutate: endRecruitment } = useEndRecruitmentMutation({
    clubId,
    onSuccess: () => {
      setAlertMessage?.("모집이 종료되었습니다.");
      setIsRecruitmentCloseModalOpen(false);
    },
    onError: () => {
      setAlertMessage?.("모집 종료 실패");
      setIsRecruitmentCloseModalOpen(false);
    },
  });

  const handleDelete = () => {
    if (isManager) {
      deleteRecruitment(id);
    }
  };

  const handleEnd = () => {
    if (isManager) {
      endRecruitment(id);
    }
  };

  return (
    <div
      className={`w-full m-w-[1248px] p-4 md:px-6 md:py-[26px] rounded-lg bg-background focus:bg-hover md:hover:bg-hover md:focus:bg-pressed cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="flex flex-col items-start md:flex-row md:justify-between md:items-center">
        <div className="w-full flex flex-col items-start md:flex-row  md:items-center gap-3 md:gap-10 md:w-fit">
          <div className="w-full flex justify-between md:w-fit">
            <Badge status={status} />
            {!isMdUp && isManager && status !== "OPEN" && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRecruitmentDeleteModalOpen(true);
                }}
              >
                <DeleteBtn onClick={() => {}} />
              </div>
            )}
            {!isMdUp && isManager && status === "OPEN" && (
              <div
                className="flex items-center gap-1 px-1.5 py-1 text-mobile_body3_m text-subtext2"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRecruitmentCloseModalOpen(true);
                }}
              >
                <EndBtn onClick={() => {}} />
                <p>모집 종료</p>
              </div>
            )}
          </div>
          <h3 className="text-body1_m md:text-h4_sb text-text1">{title}</h3>
        </div>
        <div className="flex items-center gap-3 mt-2 md:mt-0">
          <p className="text-subtext2 text-body4_r md:px-3.5 md:text-body3_r">
            {date}
          </p>
          {isMdUp && isManager && status !== "OPEN" && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsRecruitmentDeleteModalOpen(true);
              }}
            >
              <DeleteBtn onClick={() => {}} />
            </div>
          )}
          {isMdUp && isManager && status === "OPEN" && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsRecruitmentCloseModalOpen(true);
              }}
            >
              <EndBtn onClick={() => {}} />
            </div>
          )}
        </div>
      </div>
      {/* 모집공고 종료 확인 모달 */}

      {isRecruitmentCloseModalOpen && (
        <NotiPopUp
          onClose={() => {
            setIsRecruitmentCloseModalOpen(false);
          }}
          icon={"check"}
          title={"모집을 종료할까요?"}
          description={
            "동아리 모집공고 게시물을 내리고,<br/>지원서 접수를 마감할까요?"
          }
          modalType={"button"}
          firstButton={() => {
            handleEnd();
            setIsRecruitmentCloseModalOpen(false);
          }}
          firstButtonText={"모집 종료하기"}
          secondButton={() => {
            setIsRecruitmentCloseModalOpen(false);
          }}
          secondButtonText={"취소하기"}
        />
      )}
      {/* 모집공고 삭제 확인 모달 */}

      {isRecruitmentDeleteModalOpen && (
        <NotiPopUp
          onClose={() => {
            setIsRecruitmentDeleteModalOpen(false);
          }}
          icon={"delete"}
          title={"모집을 삭제할까요?"}
          description={"동아리 모집공고를 삭제할까요?"}
          modalType={"button"}
          firstButton={() => {
            handleDelete();
            setIsRecruitmentDeleteModalOpen(false);
          }}
          firstButtonText={"모집 삭제하기"}
          secondButton={() => {
            setIsRecruitmentDeleteModalOpen(false);
          }}
          secondButtonText={"취소하기"}
        />
      )}
    </div>
  );
};

export default RecruitmentCard;
