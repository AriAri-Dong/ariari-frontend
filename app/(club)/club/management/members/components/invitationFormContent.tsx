"use client";

import React, { useState } from "react";
import Image from "next/image";
import close from "@/images/icon/close.svg";
import SmallBtn from "@/components/button/basicBtn/smallBtn";

import checkIcon from "@/images/icon/radio_button_checked.svg";
import uncheckIcon from "@/images/icon/radio_button_unchecked.svg";
import copy from "@/images/icon/copy.svg";
import { ShareType } from "./invitationForm";
import Alert from "@/components/alert/alert";
import MemberSearch from "@/components/input/memberSearch";
interface InvitationFormContentProps {
  nickname: string;
  setNickname: (value: string) => void;
  alertMessage: string | null;
  setAlertMessage: (value: string | null) => void;
  shareType: ShareType;
  setShareType: (value: ShareType) => void;
  clubLink: string;
  ariariLink: string;
  errorMessage: string | null;
  setErrorMessage: (value: string | null) => void;
  onClose: () => void;
}

/**


 * @returns
 */
const InvitationFormContent = ({
  nickname,
  setNickname,
  alertMessage,
  setAlertMessage,
  shareType,
  setShareType,
  clubLink,
  ariariLink,
  errorMessage,
  setErrorMessage,
  onClose,
}: InvitationFormContentProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        shareType == "clubJoin" ? clubLink : ariariLink
      );
      setAlertMessage("URL이 복사 되었습니다.");
      return;
    } catch (err) {
      setAlertMessage("URL 복사에 실패했습니다.");
      return;
    }
  };
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center pb-4 border-b md:pb-5">
          <h2 className="text-mobile_h1_contents_title md:h1_contents_title">
            동아리 회원 초대하기
          </h2>
          <button
            onClick={onClose}
            className="md:w-5 md:h-5 flex justify-center items-center md:w-7 md:h-7"
          >
            <Image
              src={close}
              alt="닫기"
              width={16}
              height={16}
              className="md:w-6 md:h-6"
            />
          </button>
        </div>

        <div className="mt-[22px]">
          <h3 className="flex text-mobile_h2 mb-2.5 md:text-h3">
            초대장 보내기
          </h3>
          <p className="mb-[14px] text-mobile_body3_r text-subtext2 md:text-body1_r md:mb-[18px] ">
            동아리에 아리아리 사용자를 초대해 보세요.
          </p>
          <div className="flex flex-col gap-[14px] md:flex-row md:gap-5">
            <MemberSearch
              nickname={nickname}
              setNickname={setNickname}
              setErrorMessage={setErrorMessage}
              type="TOTAL_MEMBER"
            />
            <SmallBtn
              title={"초대하기"}
              onClick={() => {
                if (nickname) {
                  setAlertMessage("초대장을 전송했습니다.");
                } else {
                  setAlertMessage("초대할 회원을 선택해주세요.");
                }
              }}
              className="flex-shrink-0"
            />
          </div>
          {errorMessage && (
            <p className="pl-4 mt-1 text-noti text-mobile_body3_r md:pl-[22px] md:text-body4_r md:mt-2">
              {errorMessage}
            </p>
          )}
        </div>
        <div className="mt-[30px] md:mt-7">
          <h3 className="flex text-mobile_h2 mb-2.5 md:text-h3 md:flex-[6] ">
            초대링크 공유하기
          </h3>
          <p className="mb-[14px] whitespace-pre-wrap text-mobile_body3_r text-subtext2 md:text-body1_r md:mb-3">
            {
              "동아리 회원을 플랫폼으로 초대하거나,\n아리아리 회원을 동아리에자동으로 가입시켜 보세요."
            }
          </p>
          <div className="flex gap-[14px] mb-[14px] md:gap-5 md:mb-3">
            <div className="flex items-center gap-2.5 py-2.5 pl-2 pr-3 cursor-pointer md:p-2.5 md:pr-4">
              <Image
                src={shareType === "ariAriJoin" ? checkIcon : uncheckIcon}
                alt={shareType === "ariAriJoin" ? "Checked" : "Unchecked"}
                width={20}
                height={20}
                onClick={() => setShareType("ariAriJoin")}
                className="cursor-pointer"
              />
              <p
                className="text-subtext1 text-mobile_body1_m md:text-body1_m "
                onClick={() => setShareType("ariAriJoin")}
              >
                아리아리 초대 링크
              </p>
            </div>
            <div className="flex items-center  gap-2.5 py-2.5 pl-2 pr-3 cursor-pointer md:p-2.5 md:pr-4">
              <Image
                src={shareType === "clubJoin" ? checkIcon : uncheckIcon}
                alt={shareType === "clubJoin" ? "Checked" : "Unchecked"}
                width={20}
                height={20}
                onClick={() => setShareType("clubJoin")}
              />
              <p
                className="text-subtext1 text-mobile_body1_m md:text-body1_m "
                onClick={() => setShareType("clubJoin")}
              >
                동아리 초대 링크
              </p>
            </div>
          </div>
          <div className="flex px-4 py-[9px] mb-1 gap-4 border border-menuborder rounded-12 md:gap-5 md:px-[22px] md:py-[13px] md:mb-2">
            <p className="flex-grow text-subtext1 text-mobile_body1_r md:text-body1_r">
              {shareType === "clubJoin" ? clubLink : ariariLink}
            </p>
            <div
              className="flex items-center cursor-pointer gap-1 md:gap-1.5"
              onClick={handleCopy}
            >
              <Image
                src={copy}
                alt="copy"
                width={16}
                height={16}
                className="md:h-4.5 md:h-4.5"
              />
              <p className="text-primary text-mobile_body3_m md:text-body3_m">
                복사
              </p>
            </div>
          </div>
          <p className="pl-4 text-primary text-mobile_body3_r md:pl-[22px] md:text-body4_r">
            생성된 초대 링크를 공유해 보세요!
          </p>
        </div>
      </div>

      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default InvitationFormContent;
