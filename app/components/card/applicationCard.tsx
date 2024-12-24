"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import pen from "@/images/icon/pen.svg";
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

  return (
    <div
      className="w-full flex flex-col gap-3 py-3.5 px-4 mb-3 bg-background rounded-[8px] cursor-pointer md:pl-9 md:pr-[30px] md:py-[26px] md:mb-3.5 md:gap-5"
      onClick={onApplicationClick}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 md:gap-1.5">
          <Image
            src={pen}
            alt={"pen"}
            width={18}
            height={18}
            className="md:w-5 md:h-5"
          />
          <div className="text-right text-subtext1 text-h4_sb">
            {applicationStatus}
          </div>
        </div>
        {applicationStatus == "작성중" && (
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
                      item.title == clubStatus ? "bg-primary" : "bg-token_bg"
                    } rounded-[20px] flex-col justify-center items-center gap-2.5 inline-flex`}
                  >
                    <div
                      className={`text-center text-body4_r ${
                        item.title == clubStatus
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
                {item.id != 3 && (
                  <Image
                    src={chevron_right}
                    alt={"2"}
                    width={20}
                    height={20}
                    className="md:w-5 md:h-5 "
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-t border-menuborder"></div>
      <div className="items-center md:flex md:justify-between">
        <div className="text-text1 text-h4_sb mb-3 md:mb-0">{clubName}</div>
        <div className="flex items-center gap-8">
          <div className="text-subtext2 text-body4_r">{date}</div>
          {applicationStatus == "작성중" && (
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
