"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import pen from "@/images/icon/application/pen.svg";
import check from "@/images/icon/application/check.svg";
import document from "@/images/icon/application/document.svg";
import tear from "@/images/icon/application/tear.svg";
import congratulation from "@/images/icon/application/congratulation.svg";

import chevron_right from "@/images/icon/chevron_right.svg";
import deleteIcon from "@/images/icon/delete.svg";

export interface ApplicationCardProps {
  clubId: number;
  clubName: string;
  applicationStatus: string;
  clubStatus: string;
  date: string;
}

/**
 *
 * @param clubId 동아리 id
 * @param clubName 동아리 이름
 * @param applicationStatus 나의 동아리 지원 상태
 * @param clubStatus 동아리 모집 진행 상태
 * @param date 작성일
 *
 * @returns
 */

const ApplicationCard = ({
  clubId,
  clubName,
  applicationStatus,
  clubStatus,
  date,
}: ApplicationCardProps) => {
  const router = useRouter();

  const onApplicationClick = () => {
    router.push(`/club/${clubId}`);
  };

  const status = [
    { id: 1, title: "작성중" },
    { id: 2, title: "전형 진행중" },
    { id: 3, title: "최종발표 완료" },
  ];

  const getIconForStatus = (status: string) => {
    switch (status) {
      case "작성중":
        return pen;
      case "서류 심사중":
        return document;
      case "서류 합격":
        return check;
      case "서류 불합격":
        return tear;
      case "최종 합격":
        return congratulation;
      case "최종 불합격":
        return tear;
    }
  };

  return (
    <div
      tabIndex={0}
      className="w-full flex flex-col gap-3 py-3.5 px-4 mb-3 bg-background rounded-[8px] cursor-pointer focus:bg-hover md:hover:bg-hover md:focus:bg-pressed md:pl-9 md:pr-[30px] md:py-[26px] md:mb-3.5 md:gap-5 "
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
            {applicationStatus}
          </div>
        </div>
        {applicationStatus === "작성중" && (
          <Image
            src={deleteIcon}
            alt={"delete"}
            width={20}
            height={20}
            className="md:hidden"
          />
        )}
        <div className="hidden items-center gap-2.5 md:flex">
          {status.map((item) => {
            return (
              <div key={item.id} className="flex gap-2.5">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 ${
                      item.title === clubStatus ? "bg-primary" : "bg-token_bg"
                    } rounded-[20px] flex-col justify-center items-center gap-2.5 inline-flex`}
                  >
                    <div
                      className={`text-center text-body4_r ${
                        item.title === clubStatus
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
          {clubName}
        </div>
        <div className="flex items-center gap-8">
          <div className="text-subtext2 text-mobile_body4_r md:text-body4_r">
            {date}
          </div>
          {applicationStatus === "작성중" && (
            <Image
              src={deleteIcon}
              alt={"delete"}
              width={20}
              height={20}
              className="hidden md:flex md:w-5 md:h-5"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
