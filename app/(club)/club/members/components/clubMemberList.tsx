"use client";

import { useState } from "react";
import Image from "next/image";
import checkIcon from "@/images/icon/checkBox.svg";
import uncheckIcon from "@/images/icon/emptyCheckBox.svg";

import SubPullDown from "@/components/pulldown/subPullDown";
import DeleteBtn from "@/components/button/iconBtn/deleteBtn";
import ImageToken from "@/components/token/imageToken";
import TokenPullDown from "@/components/pulldown/tokenPullDown";
import NotiPopUp from "@/components/modal/notiPopUp";

import { MEMBER_STATUS_TYPE, ROLE_TYPE } from "@/data/pulldown";
import { MAP_ROLE_TO_KO } from "../util/mapRole";
import { MAP_STATUS_STYLES, MAP_STATUS_TO_KO } from "../util/mapStatus";
import { ClubMemberData } from "@/types/member";

interface ClubMemberListProps {
  data: ClubMemberData;
  isSelected: boolean;
  toggleMember: (memberId: number) => void;
}

const ClubMemberList = ({
  data,
  isSelected,
  toggleMember,
}: ClubMemberListProps) => {
  const [isManagerModalOpen, setIsManagerModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  return (
    <div className="w-full flex flex-col items-center gap-2.5 pr-3 py-2.5 rounded-[8px] bg-background md:flex-row md:px-6 md:py-2.5 md:gap-0">
      <div className="w-full md:flex md:justify-start md:items-center md:flex-[6]">
        <div className="w-full flex justify-between pl-2.5 mb-2.5 md:w-fit md:justify-start md:mb-0 md:mr-5  items-center md:p-0">
          <Image
            src={isSelected ? checkIcon : uncheckIcon}
            alt="checkbox"
            width={16}
            height={16}
            onClick={() => toggleMember(data.id)}
            className="md:w-5 md:h-5 cursor-pointer"
          />
          <div className="md:hidden">
            <TokenPullDown
              optionData={MEMBER_STATUS_TYPE.slice(2)}
              selectedOption={data.clubMemberStatusType}
              handleOption={() => {}}
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
          <SubPullDown
            optionData={ROLE_TYPE}
            selectedOption={MAP_ROLE_TO_KO[data.clubMemberRoleType]}
            handleOption={(value) => {
              if (value == "관리자") {
                setIsManagerModalOpen(true);
              }
            }}
          />
        </div>
        <div className="hidden flex-[2] md:flex justify-center">
          <TokenPullDown
            optionData={MEMBER_STATUS_TYPE.slice(2)}
            selectedOption={MAP_STATUS_TO_KO[data.clubMemberStatusType]}
            handleOption={() => {}}
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
          <DeleteBtn
            onClick={() => {
              setIsDeleteModalOpen(true);
            }}
          />
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
          description={`해당 동아리원에게 관리자 권한 위임시,\n일반회원으로 바뀌며 관리 기능 이용이 제한돼요.`}
          firstButton={() => {
            isManagerModalOpen
              ? setIsManagerModalOpen(false)
              : setIsDeleteModalOpen(false);
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
    </div>
  );
};

export default ClubMemberList;
