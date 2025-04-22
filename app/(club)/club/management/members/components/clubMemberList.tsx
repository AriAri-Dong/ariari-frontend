"use client";

import { useState } from "react";
import { useClubContext } from "@/context/ClubContext";
import useResponsive from "@/hooks/useResponsive";
import Image from "next/image";
import checkIcon from "@/images/icon/checkBox_checked.svg";
import uncheckIcon from "@/images/icon/checkBox_unchecked.svg";
import SubPullDown from "@/components/pulldown/subPullDown";
import DeleteBtn from "@/components/button/iconBtn/deleteBtn";
import ImageToken from "@/components/token/imageToken";
import TokenPullDown from "@/components/pulldown/tokenPullDown";
import NotiPopUp from "@/components/modal/notiPopUp";

import { MEMBER_STATUS_TYPE, ROLE_TYPE } from "@/data/pulldown";
import { MAP_ROLE_TO_EN, MAP_ROLE_TO_KO } from "../util/mapRole";

import {
  MAP_STATUS_STYLES,
  MAP_STATUS_TO_EN,
  MAP_STATUS_TO_KO,
} from "../util/mapStatus";
import {
  ClubMemberData,
  clubMemberRoleType,
  clubMemberStatusType,
} from "@/types/member";
import Alert from "@/components/alert/alert";

interface ClubMemberListProps {
  data: ClubMemberData;
  isSelected: boolean;
  toggleMember: (memberId: string) => void;
  handleStatusChange: (
    memberId: string[],
    statusType: clubMemberStatusType
  ) => void;
  handleRoleChange: (memberId: string, roleType: clubMemberRoleType) => void;
  handleDeleteMember: (memberId: string) => void;
}

const ClubMemberList = ({
  data,
  isSelected,
  toggleMember,
  handleStatusChange,
  handleRoleChange,
  handleDeleteMember,
}: ClubMemberListProps) => {
  const { role, clubInfo } = useClubContext();
  const isMdUp = useResponsive("md");

  const [isManagerModalOpen, setIsManagerModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center gap-2.5 pr-3 py-2.5 rounded-[8px] bg-background md:flex-row md:px-6 md:py-2.5 md:gap-0">
      <div className="w-full md:flex md:justify-start md:items-center md:flex-[6]">
        <div className="w-full flex justify-between pl-2.5 mb-2.5 md:w-fit md:justify-start md:mb-0 md:mr-5  items-center md:p-0">
          <Image
            src={isSelected ? checkIcon : uncheckIcon}
            alt="checkbox"
            width={16}
            height={16}
            onClick={() => {
              if (role === "MANAGER" && data.clubMemberRoleType === "ADMIN") {
                setAlertMessage("관리자는 선택할 수 없습니다");
                return;
              }
              toggleMember(data.memberData.memberId);
            }}
            className="md:w-5 md:h-5 cursor-pointer"
          />
          <div className="md:hidden">
            <TokenPullDown
              optionData={MEMBER_STATUS_TYPE.slice(2)}
              selectedOption={MAP_STATUS_TO_KO[data.clubMemberStatusType]}
              handleOption={(value) => {
                if (role === "MANAGER" && data.clubMemberRoleType === "ADMIN") {
                  setAlertMessage("관리자의 활동 상태를 변경할 수 없습니다");
                  return;
                } else {
                  handleStatusChange(
                    [data.memberData.memberId],
                    MAP_STATUS_TO_EN[value]
                  );
                }
              }}
              ImageTokenComponent={
                <ImageToken
                  bgColor={MAP_STATUS_STYLES[data.clubMemberStatusType].bgColor}
                  textColor={
                    MAP_STATUS_STYLES[data.clubMemberStatusType].textColor
                  }
                  image={MAP_STATUS_STYLES[data.clubMemberStatusType].image}
                  text={MAP_STATUS_STYLES[data.clubMemberStatusType].text}
                />
              }
            />
          </div>
        </div>
        <div className="w-full ml-2.5 pb-2.5 border-b border-menuborder md:border-none md:m-0 md:p-0">
          <p className="mb-0.5 text-mobile_body1_sb text-text1 md:text-body1_sb">
            {data.memberData.nickname}
          </p>
          <p className="text-body2_m text-subtext2 md:text-body3_r">
            {data.name}
          </p>
        </div>
      </div>
      <div className="w-full flex justify-between md:flex-[4] ">
        <div className="md:flex-[2]">
          {/* ADMIN만 권한 수정 가능, 본인 수정 불가 */}
          {
            <SubPullDown
              optionData={ROLE_TYPE.slice(1)}
              selectedOption={MAP_ROLE_TO_KO[data.clubMemberRoleType]}
              handleOption={(value) => {
                if (value == "관리자") {
                  setIsManagerModalOpen(true);
                } else {
                  handleRoleChange(data.id, MAP_ROLE_TO_EN[value]);
                }
              }}
              onClick={
                role === "ADMIN"
                  ? null
                  : () =>
                      setAlertMessage("권한 수정은 관리자만 할 수 있습니다.")
              }
            />
          }
        </div>
        <div className="hidden flex-[2] md:flex justify-center">
          <TokenPullDown
            optionData={MEMBER_STATUS_TYPE.slice(2)}
            selectedOption={MAP_STATUS_TO_KO[data.clubMemberStatusType]}
            handleOption={(value) => {
              if (role === "MANAGER" && data.clubMemberRoleType === "ADMIN") {
                setAlertMessage("관리자의 활동 상태를 변경할 수 없습니다");
                return;
              } else {
                handleStatusChange(
                  [data.memberData.memberId],
                  MAP_STATUS_TO_EN[value]
                );
              }
            }}
            ImageTokenComponent={
              <ImageToken
                bgColor={MAP_STATUS_STYLES[data.clubMemberStatusType].bgColor}
                textColor={
                  MAP_STATUS_STYLES[data.clubMemberStatusType].textColor
                }
                image={MAP_STATUS_STYLES[data.clubMemberStatusType].image}
                text={MAP_STATUS_STYLES[data.clubMemberStatusType].text}
              />
            }
          />
        </div>
        <div className="flex-[1] flex justify-end items-center">
          {/* ADMIN인 경우 모두 삭제 가능(본인 제외), 매니저인 경우 일반 회원 삭제 가능 */}
          {((role === "ADMIN" && data.id != clubInfo?.clubMemberData.id) ||
            (role === "MANAGER" && data.clubMemberRoleType === "GENERAL")) && (
            <DeleteBtn
              onClick={() => {
                setIsDeleteModalOpen(true);
              }}
            />
          )}
        </div>
      </div>
      {/* modal */}
      {(isManagerModalOpen || isDeleteModalOpen) && (
        <NotiPopUp
          modalType="button"
          icon={isManagerModalOpen ? "school" : "delete"}
          title={
            isManagerModalOpen
              ? "관리자 권한을 위임할까요?"
              : "해당 동아리원을 삭제할까요?"
          }
          description={
            isManagerModalOpen
              ? `해당 동아리원에게 관리자 권한 위임시,\n일반회원으로 바뀌며 관리 기능 이용이 제한돼요.`
              : isMdUp
              ? ` 동아리에서 삭제된 회원은 동아리 소속에서 제외돼요.`
              : ` 동아리에서 삭제된 회원은\n동아리 소속에서 제외돼요.`
          }
          firstButton={() => {
            if (isManagerModalOpen) {
              handleRoleChange(data.id, "ADMIN");
              setIsManagerModalOpen(false);
            } else if (isDeleteModalOpen) {
              handleDeleteMember(data.id);
              setIsDeleteModalOpen(false);
            }
          }}
          firstButtonText={isManagerModalOpen ? "권한 위임하기" : "삭제하기"}
          secondButton={() => {
            isManagerModalOpen
              ? setIsManagerModalOpen(false)
              : setIsDeleteModalOpen(false);
          }}
          secondButtonText="취소하기"
          onClose={() => {
            isManagerModalOpen
              ? setIsManagerModalOpen(false)
              : setIsDeleteModalOpen(false);
          }}
        />
      )}
      {/* ====== 알림 ======*/}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default ClubMemberList;
