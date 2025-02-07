"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import checkIcon from "@/images/icon/radio_button_checked.svg";
import uncheckIcon from "@/images/icon/radio_button_unchecked.svg";

import WithdrawalCard from "@/components/card/withdrawalCard";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import MobileSnackBar from "@/components/bar/mobileSnackBar";
import HeaderSection from "./content/headerSection";
import useResponsive from "@/hooks/useResponsive";
import NotiPopUp from "@/components/modal/notiPopUp";
import Alert from "@/components/alert/alert";
import {
  CLUB_WITHDRAWAL_INFO_GENERAL,
  CLUB_WITHDRAWAL_INFO_MANAGER,
} from "@/data/withdrawal";
import { ClubMemberData } from "@/types/member";
import { CLUB_MEMBER_DATA } from "@/data/clubMembers";
import LeftMenu from "@/(club)/club/components/menu/leftMenu";

const WithDrawal = () => {
  const isMdUp = useResponsive("md");
  const router = useRouter();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const [clubMember, setClubMember] = useState<ClubMemberData | null>(
    CLUB_MEMBER_DATA[1]
  ); // 0 => 일반회원, 1 => 관리자로 테스트가능
  const [clubLimits, setClubLimits] = useState<number>(1);

  const isGeneral =
    clubMember == null || clubMember.clubMemberRoleType === "GENERAL";
  const withdrawalInfo = isGeneral
    ? CLUB_WITHDRAWAL_INFO_GENERAL
    : CLUB_WITHDRAWAL_INFO_MANAGER;

  // 탈퇴하기 버튼 클릭 핸들러
  const handleWithdrawalBtn = () => {
    if (isChecked) setShowConfirmModal(true);
    else {
      setAlertMessage("동의하지 않은 항목이 있습니다.");
    }
  };

  // 모달에서 탈퇴하기 버튼 클릭
  const handleWithdrawal = () => {
    setShowConfirmModal(false);
    // 탈퇴 로직 추가
    setShowSuccessModal(true);
    // 3초 뒤 메인 페이지로 이동
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  return (
    <div>
      {!isMdUp && (
        <HeaderSection
          title={isGeneral ? "동아리 탈퇴하기" : "동아리 폐쇄하기"}
        />
      )}
      <div className="flex lg:gap-9 md:mt-8">
        {/* 임시 메뉴 */}
        <LeftMenu />
        <div className="w-full flex flex-col gap-7 rounded-8 bg-background mt-5 mb-20 md:mb-[124px] md:mt-0 md:px-6 md:py-[26px] md:gap-10">
          <div className="flex flex-col gap-10 md:gap-12">
            {withdrawalInfo.map((info, index) => (
              <div key={index}>
                <WithdrawalCard info={info} />
              </div>
            ))}
          </div>
          <div className="border-t border-menuborder"></div>
          <div>
            <p className="mb-2.5 text-text1 text-mobile_h3 md:text-h3">
              {isGeneral ? "동아리 탈퇴하기" : "동아리 폐쇄하기"}
            </p>
            <p className="mb-3.5 text-mobile_body3_r md:text-body1_r text-subtext2 md:mb-6">
              {isGeneral
                ? "탈퇴 후에는 복구가 불가능하며, 동아리 관련 일부 데이터는 유지될 수 있습니다."
                : "폐쇄 후에는 복구가 불가능하며, 동아리 관련 모든 데이터가 삭제됩니다."}
            </p>
            <div
              className="flex cursor-pointer gap-[7px] mb-3.5 md:mb-6"
              onClick={() => setIsChecked(!isChecked)}
            >
              <Image
                src={isChecked ? checkIcon : uncheckIcon}
                alt={isChecked ? "Checked" : "Unchecked"}
                width={20}
                height={20}
              />
              <p className="text-mobile_body3_r md:text-body1_r text-primary ">
                {isGeneral
                  ? "아리아리 동아리 운영 원칙 제 3조 : 동아리 탈퇴 관련 조항의 내용을 모두 확인하였으며 동의합니다."
                  : "아리아리 동아리 운영 원칙 제 8조 : 동아리 폐쇄 관련 조항의 내용을 모두 확인하였으며 동의합니다."}
              </p>
            </div>
            {isMdUp ? (
              <SmallBtn
                title={isGeneral ? "탈퇴하기" : "폐쇄하기"}
                onClick={handleWithdrawalBtn}
              />
            ) : (
              <LargeBtn
                title={isGeneral ? "탈퇴하기" : "폐쇄하기"}
                onClick={handleWithdrawalBtn}
              />
            )}
          </div>
        </div>

        {/* 폐쇄/탈퇴 확인 모달 */}
        {showConfirmModal &&
          (isGeneral ? (
            <NotiPopUp
              onClose={() => {
                setShowConfirmModal(false);
              }}
              icon={"leave"}
              title={"정말 동아리를 탈퇴할까요?"}
              description={`탈퇴 후에는 복구가 불가능하며,\n동아리 관련 일부 데이터는 유지될 수 있어요.`}
              modalType={"button"}
              firstButton={handleWithdrawal}
              firstButtonText={"탈퇴하기"}
              secondButton={() => setShowConfirmModal(false)}
              secondButtonText={"취소하기"}
            />
          ) : clubLimits <= 2 ? (
            <NotiPopUp
              onClose={() => {
                setShowConfirmModal(false);
              }}
              icon={"delete"}
              title={"정말 동아리를 폐쇄할까요?"}
              description={`폐쇄 후에는 복구가 불가능하며,\n동아리 관련 모든 데이터가 삭제돼요.`}
              modalType={"button"}
              firstButton={handleWithdrawal}
              firstButtonText={"폐쇄하기"}
              secondButton={() => setShowConfirmModal(false)}
              secondButtonText={"취소하기"}
            />
          ) : (
            <NotiPopUp
              onClose={() => {
                setShowConfirmModal(false);
              }}
              icon={"warning"}
              title={"동아리원 수가 2명 이상이에요"}
              description={`동아리는 동아리 관리자가\n유일한 구성원일 때만 폐쇄가 가능해요.`}
              modalType={"x-button"}
            />
          ))}
        {/* 폐쇄/탈퇴 성공 모달 */}

        {showSuccessModal &&
          (isMdUp ? (
            <NotiPopUp
              onClose={() => {
                setShowSuccessModal(false);
              }}
              icon={isGeneral ? "check" : "closed"}
              title={`동아리 ${isGeneral ? "탈퇴" : "폐쇄"} 완료`}
              description="곧, 메인 페이지로 이동해요."
              modalType={"x-button"}
            />
          ) : (
            <MobileSnackBar
              text={`동아리 ${isGeneral ? "탈퇴" : "폐쇄"}가 완료되었습니다.`}
            />
          ))}
        {alertMessage && (
          <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
        )}
      </div>
    </div>
  );
};

export default WithDrawal;
