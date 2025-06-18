"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useResponsive from "@/hooks/useResponsive";
import { useClubContext } from "@/context/ClubContext";
import {
  useDeleteClubMutation,
  useWithdrawClubMutation,
} from "@/hooks/club/my/useMyClubMutation";
import { getClubMembers } from "@/api/member/api";

import Image from "next/image";
import checkIcon from "@/images/icon/radio_button_checked.svg";
import uncheckIcon from "@/images/icon/radio_button_unchecked.svg";

import NoticeCard from "@/components/card/NoticeCard";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import MobileSnackBar from "@/components/bar/mobileSnackBar";
import NotiPopUp from "@/components/modal/notiPopUp";
import Alert from "@/components/alert/alert";
import {
  CLUB_WITHDRAWAL_INFO_GENERAL,
  CLUB_WITHDRAWAL_INFO_MANAGER,
} from "@/data/withdrawal";

interface ClubWithdrawalCardProps {
  isWithdrawal: boolean;
}
const ClubWithdrawalCard = ({ isWithdrawal }: ClubWithdrawalCardProps) => {
  const isMdUp = useResponsive("md");
  const router = useRouter();
  const params = useSearchParams();
  const clubId = params.get("clubId") ?? "";
  const { role, clubInfo } = useClubContext();
  const { mutate: withdrawClub } = useWithdrawClubMutation({
    onError: () => {
      setAlertMessage("문제가 발생했습니다.<br />잠시 후 다시 시도해주세요.");
    },
    onSuccess: () => {
      setShowSuccessModal(true);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    },
  });
  const { mutate: deleteClub } = useDeleteClubMutation({
    onError: () => {
      setAlertMessage("문제가 발생했습니다.<br />잠시 후 다시 시도해주세요.");
    },
    onSuccess: () => {
      setShowSuccessModal(true);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    },
  });

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showBlockedModal, setShowBlockedModal] = useState(false);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const [clubLimits, setClubLimits] = useState<number>(1);

  const withdrawalInfo = isWithdrawal
    ? CLUB_WITHDRAWAL_INFO_GENERAL
    : CLUB_WITHDRAWAL_INFO_MANAGER;

  // 탈퇴하기 버튼 클릭 핸들러
  const handleWithdrawalBtn = () => {
    // 매니저 또는 관리자 탈퇴 불가
    if (isWithdrawal && (role === "ADMIN" || role === "MANAGER")) {
      setShowBlockedModal(true);
      return;
    }
    // 관리자만 폐쇄 가능
    if (!isWithdrawal && role !== "ADMIN") {
      setShowBlockedModal(true);
      return;
    }
    // 동아리원 수가 2명 이상일 때 폐쇄 불가
    if (!isWithdrawal && clubLimits > 1) {
      setShowBlockedModal(true);
      return;
    }
    // 체크박스 체크 여부 확인
    if (isChecked) {
      setShowConfirmModal(true);
    } else {
      setAlertMessage("동의하지 않은 항목이 있습니다.");
    }
  };

  // 모달에서 탈퇴하기 버튼 클릭
  const handleWithdrawal = () => {
    setShowConfirmModal(false);
    if (isWithdrawal) {
      // 탈퇴하기
      if (clubInfo?.clubMemberData.id) {
        withdrawClub(clubInfo?.clubMemberData.id);
      }
    } else {
      // 폐쇄하기
      deleteClub(clubId);
    }
  };

  useEffect(() => {
    getClubMembers(clubId).then((data) => {
      setClubLimits(data?.pageInfo.totalSize || 0);
    });
  }, [clubId, isWithdrawal]);

  return (
    <div className="w-full flex flex-col gap-7 rounded-8 bg-background mt-5 mb-20 md:mb-[124px] md:mt-0 md:px-6 md:py-[26px] md:gap-10">
      <div className="flex flex-col gap-10 md:gap-12">
        {withdrawalInfo.map((info, index) => (
          <div key={index}>
            <NoticeCard info={info} />
          </div>
        ))}
      </div>
      <div className="border-t border-menuborder"></div>
      <div>
        <p className="mb-2.5 text-text1 text-mobile_h3 md:text-h3">
          {isWithdrawal ? "동아리 탈퇴하기" : "동아리 폐쇄하기"}
        </p>
        <p className="mb-3.5 text-mobile_body3_r md:text-body1_r text-subtext2 md:mb-6">
          {isWithdrawal
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
            {isWithdrawal
              ? "아리아리 동아리 운영 원칙 : 동아리 탈퇴 관련 조항의 내용을 모두 확인하였으며 동의합니다."
              : "아리아리 동아리 운영 원칙 : 동아리 폐쇄 관련 조항의 내용을 모두 확인하였으며 동의합니다."}
          </p>
        </div>
        {isMdUp ? (
          <SmallBtn
            title={isWithdrawal ? "탈퇴하기" : "폐쇄하기"}
            onClick={handleWithdrawalBtn}
          />
        ) : (
          <LargeBtn
            title={isWithdrawal ? "탈퇴하기" : "폐쇄하기"}
            onClick={handleWithdrawalBtn}
          />
        )}
      </div>
      {/* 폐쇄/탈퇴 확인 모달 */}
      {showConfirmModal &&
        (isWithdrawal ? (
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
        ) : (
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
        ))}
      {/* 관리자/매니저 탈퇴 불가 / 동아리 폐쇄 불가*/}
      {showBlockedModal &&
        (isWithdrawal ? (
          <NotiPopUp
            onClose={() => setShowBlockedModal(false)}
            icon="not"
            modalType={"x-button"}
            title={
              role === "ADMIN"
                ? "관리자는 탈퇴가 불가능해요"
                : "매니저는 탈퇴가 불가능해요"
            }
            description={`동아리를 탈퇴하기 위해서는\n회원의 직책을 일반회원으로 변경해 주세요.`}
          />
        ) : (
          <NotiPopUp
            onClose={() => {
              setShowBlockedModal(false);
            }}
            icon={"warning"}
            title={
              role !== "ADMIN"
                ? "동아리 폐쇄는 관리자만 할 수 있어요"
                : "동아리원 수가 2명 이상이에요"
            }
            description={
              role !== "ADMIN"
                ? `동아리를 폐쇄하려면 관리자 권한이 필요해요.\n관리자에게 요청해 주세요.`
                : `동아리는 동아리 관리자가\n유일한 구성원일 때만 폐쇄가 가능해요.`
            }
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
            icon={isWithdrawal ? "check" : "closed"}
            title={`동아리 ${isWithdrawal ? "탈퇴" : "폐쇄"} 완료`}
            description="곧, 메인 페이지로 이동해요."
            modalType={"x-button"}
          />
        ) : (
          <MobileSnackBar
            text={`동아리 ${isWithdrawal ? "탈퇴" : "폐쇄"}가 완료되었습니다.`}
          />
        ))}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};
export default ClubWithdrawalCard;
