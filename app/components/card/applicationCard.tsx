"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import pen from "@/images/icon/application/pen.svg";
import check from "@/images/icon/application/check.svg";
import document from "@/images/icon/application/document.svg";
import tear from "@/images/icon/application/tear.svg";
import congratulation from "@/images/icon/application/congratulation.svg";

import chevron_right from "@/images/icon/chevron_right.svg";
import deleteIcon from "@/images/icon/delete.svg";
import DeleteBtn from "../button/iconBtn/deleteBtn";
import NotiPopUp from "../modal/notiPopUp";
import ApplicationFormViewModal from "../modal/club/applicationFormViewModal";
import MobileApplicationFormViewModal from "../modal/club/mobileApplicationFormViewModal";

import daysDifference from "@/utils/dayDifference";
import formatDateToDot from "@/utils/formatDateToDot";
import { ApplyData, ApplyStatusType, ApplyTempData } from "@/types/application";
import ApplicationFormModal from "../modal/club/applicationFormModal";
import ApplicationFormBottomSheet from "../bottomSheet/applicationFormBottomSheet";
import useResponsive from "@/hooks/useResponsive";
import {
  useDeleteApplyMutation,
  useDeleteTmpMutation,
} from "@/hooks/apply/useApplyMutation";
import Alert from "../alert/alert";

export interface ApplicationCardProps {
  data: ApplyData | ApplyTempData;
  applicationStatus: ApplyStatusType | "DRAFT";
  type: "APPLY" | "TEMP_APPLY";
  handleDeleteSuccess: () => void;
  handleDeleteError: () => void;
}

/**
 *
 * @param data 지원 정보
 * @param applicationStatus 동아리 지원 상태
 *
 * @returns
 */

const ApplicationCard = ({
  data,
  applicationStatus,
  type,
  handleDeleteSuccess,
  handleDeleteError,
}: ApplicationCardProps) => {
  const isMdUp = useResponsive("md");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isApplicationFormOpen, setIsApplicationFormOpen] =
    useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const deleteTmp = useDeleteTmpMutation({
    recruitmentId: data.recruitmentId,
    onSuccess: handleDeleteSuccess,
    onError: handleDeleteError,
  });
  const deleteApply = useDeleteApplyMutation({
    recruitmentId: data.recruitmentId,
    onSuccess: handleDeleteSuccess,
    onError: handleDeleteError,
  });

  const onApplicationClick = () => {
    setIsApplicationFormOpen(true);
  };
  const onDeleteClick = () => {
    if (type === "APPLY") {
      deleteApply.mutate(data.id);
    }
    if (type === "TEMP_APPLY") {
      deleteTmp.mutate(data.id);
    }
  };

  const status = [
    { id: 1, title: "작성중", key: ["DRAFT"] },
    { id: 2, title: "전형 진행중", key: ["PENDENCY", "INTERVIEW"] },
    { id: 3, title: "최종발표 완료", key: ["APPROVE", "REFUSAL"] },
  ];

  const getIconForStatus = (status: ApplyStatusType | "DRAFT") => {
    switch (status) {
      case "DRAFT":
        return pen;
      case "PENDENCY":
        return document;
      case "INTERVIEW":
        return check;
      // case "서류 불합격":
      //   return tear;
      case "APPROVE":
        return congratulation;
      case "REFUSAL":
        return tear;
    }
  };
  const STATUS_MAP = {
    DRAFT: "작성중",
    PENDENCY: "서류 심사중",
    INTERVIEW: "서류 합격",
    APPROVE: "최종 합격",
    REFUSAL: "최종 불합격",
  };

  const canDelete =
    applicationStatus === "DRAFT" || daysDifference(data.createdDateTime) > 30;

  return (
    <div
      className={`w-full flex flex-col gap-3 py-3.5 px-4 mb-2.5 bg-background rounded-[8px] md:px-6 md:py-[26px] md:mb-2.5 md:gap-5
      ${
        !isApplicationFormOpen &&
        "focus:bg-hover md:hover:bg-hover md:active:bg-pressed cursor-pointer"
      }`}
      onClick={onApplicationClick}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 md:gap-1.5">
          <Image
            src={getIconForStatus(applicationStatus)}
            alt={applicationStatus}
            width={18}
            height={18}
            className="md:w-5 md:h-5"
          />
          <div className="text-right text-subtext1 text-mobile_body1_sb md:text-h4_sb">
            {STATUS_MAP[applicationStatus]}
          </div>
        </div>
        {canDelete && (
          <div className="md:hidden">
            <button
              className="flex w-5 h-5 justify-center items-center p-0.5 rounded-full cursor-pointer hover:bg-hover focus:bg-hover"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            >
              <Image src={deleteIcon} alt={"delete"} width={16} height={16} />
            </button>
          </div>
        )}
        <div className="hidden items-center gap-2.5 md:flex">
          {status.map((item) => {
            return (
              <div key={item.id} className="flex gap-2.5">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 flex items-center justify-center ${
                      item.key.includes(applicationStatus)
                        ? "bg-primary"
                        : "bg-token_bg"
                    } rounded-[20px]`}
                  >
                    <div
                      className={`text-center text-body4_r ${
                        item.key.includes(applicationStatus)
                          ? "text-background"
                          : "text-subtext2"
                      }`}
                    >
                      {item.id}
                    </div>
                  </div>
                  <div className="text-right text-subtext1 text-body3_m">
                    {item.title}
                  </div>
                </div>
                {item.id !== 3 && (
                  <Image src={chevron_right} alt={"2"} width={20} height={20} />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-t border-menuborder"></div>
      <div className="items-center md:flex md:justify-between">
        <div className="text-text1 text-mobile_body1_m mb-3 md:mb-0 md:text-h4_sb ">
          {data.clubName}
        </div>
        <div className="flex items-center gap-8">
          <div className="text-subtext2 text-mobile_body4_r md:text-body4_r">
            {formatDateToDot(data.createdDateTime)}
          </div>
          {canDelete && (
            <button
              className="hidden md:flex w-7 h-7 justify-center items-center p-0.5 rounded-full cursor-pointer hover:bg-hover focus:bg-hover"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            >
              <Image src={deleteIcon} alt={"delete"} width={24} height={24} />
            </button>
          )}
        </div>
      </div>
      {isModalOpen && (
        <NotiPopUp
          onClose={() => setIsModalOpen(false)}
          icon="delete"
          title={
            applicationStatus === "DRAFT"
              ? "작성중인 지원서 삭제"
              : "지원서 삭제"
          }
          description={
            applicationStatus === "DRAFT"
              ? "작성중인 지원서를 정말 삭제하시겠습니까?"
              : "지원서를 정말 삭제하시겠습니까?"
          }
          firstButton={() => {
            onDeleteClick();
            setIsModalOpen(false);
          }}
          firstButtonText="삭제하기"
          secondButton={() => setIsModalOpen(false)}
          secondButtonText="아니요"
          modalType="button"
        />
      )}
      {type === "TEMP_APPLY" &&
        isApplicationFormOpen &&
        (isMdUp ? (
          <ApplicationFormModal
            recruitmentId={data.recruitmentId}
            myRecentApplyTempId={data.id}
            onClose={() => {
              setIsApplicationFormOpen(false);
            }}
            onSubmit={() => {
              setAlertMessage("지원서가 제출되었습니다.");
            }}
          />
        ) : (
          <ApplicationFormBottomSheet
            recruitmentId={data.recruitmentId}
            myRecentApplyTempId={data.id}
            onClose={() => {
              setIsApplicationFormOpen(false);
            }}
            onSubmit={() => {
              setAlertMessage("지원서가 제출되었습니다.");
            }}
          />
        ))}
      {type === "APPLY" &&
        isApplicationFormOpen &&
        (isMdUp ? (
          <ApplicationFormViewModal
            applyId={data.id}
            onClose={() => {
              setIsApplicationFormOpen(false);
            }}
            setSelectedOption={() => {}}
            setIsModalOpen={() => {}}
          />
        ) : (
          <MobileApplicationFormViewModal
            applyId={data.id}
            onClose={() => {
              setIsApplicationFormOpen(false);
            }}
            setSelectedOption={() => {}}
            setIsModalOpen={() => {}}
          />
        ))}
      {/* == 알림 == */}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default ApplicationCard;
