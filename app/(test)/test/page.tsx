"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MobileButtons from "../components/buttons/mobile_Buttons";
import PcButtons from "../components/buttons/PC_Buttons";
import Badges from "../components/badges";
import ProfileSettingModal from "@/components/modal/profileSetting/profileSettingModal";
import LoginModal from "@/components/modal/login/loginModal";
import MobileLoginModal from "@/components/modal/login/mobileLoginModal";
import MobileSnackBar from "@/components/bar/mobileSnackBar";
import MobileProfileSettingModal from "@/components/modal/profileSetting/mobile/mobileProfileSettingModal";
import useResponsive from "@/hooks/useResponsive";
import ModifyClubInfoModal from "@/components/modal/club/modifyClubInfoModal";
import ModifyClubInfoBottomSheet from "@/components/bottomSheet/modifyClubInfoBottomSheet";
import Alert from "@/components/alert/alert";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import helpText from "@/images/icon/mobile_point_Helptext.svg";
import ReviewFloatingBtn from "@/components/button/floatingBtn/reviewFloatingBtn";
import { getRecruitmentRanking } from "@/api/recruitment/api";
import { getSchoolData } from "@/api/school/api";
import { getAllClubsInfo, getMyClubs } from "@/api/club/api";

const TestPage = () => {
  const isMdUp = useResponsive("md");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(true);
  const [isBadgeVisible, setIsBadgeVisible] = useState<boolean>(true);
  const [openReview, setOpenReview] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleWrite = () => {
    setOpenReview(true);
  };

  const handleSubmitSuccess = () => {
    setAlertMessage("활동후기가 등록되었습니다.");
    setOpenReview(false);
  };

  useEffect(() => {
    const fetchAppliedList = async () => {
      const result = await getRecruitmentRanking();
      console.log(result);
    };

    fetchAppliedList();
  }, []);

  useEffect(() => {
    const fetchSchoolList = async () => {
      try {
        // getSchoolData 호출 시 Pageable 객체를 전달
        const data = await getSchoolData("학교 이름", {
          page: 10,
          size: 1,
          sort: ["name"],
        });
        console.log(data); // 데이터 출력
      } catch (err) {
        console.log(err);
      } finally {
        // 로딩 종료 처리 등
      }
    };

    fetchSchoolList();
  }, []);

  // 동아리 전체 조회
  // 동아리 상세 정보 조회
  // useEffect(() => {
  //   const fetchClubsInfo = async () => {
  //     try {
  //       const data = await getClubDetails("674459337435096561");
  //       console.log("동아리 상세 정보 >>", data);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //     }
  //   };

  //   fetchClubsInfo();
  // }, []);

  // 나의 동아리 조회
  useEffect(() => {
    const fetchClubsInfo = async () => {
      try {
        const data = await getMyClubs({ page: 0, size: 10, sort: ["name"] });
        console.log(data);
      } catch (err) {
        console.log(err);
      } finally {
      }
    };

    fetchClubsInfo();
  }, []);

  return (
    <div>
      <button
        className="py-2 px-4 mb-3 bg-pink-400 text-white text-body3_r
        rounded-lg hover:bg-pink-500"
        onClick={() => setIsButtonVisible(!isButtonVisible)}
      >
        {isButtonVisible
          ? "Hidden Button Components"
          : "Show Button Components"}
      </button>
      <button
        className="py-2 px-4 mb-3 bg-yellow-400 text-white text-body3_r
        rounded-lg hover:bg-yellow-500"
        onClick={() => setIsBadgeVisible(!isBadgeVisible)}
      >
        {isBadgeVisible ? "Hidden Badge Components" : "Show Badge Components"}
      </button>

      <button
        className="py-2 px-4 mb-3 bg-green-400 text-white rounded-lg hover:bg-green-500"
        onClick={handleOpenModal}
      >
        Open Login Dialog
      </button>
      <button
        className="py-2 px-4 mb-3 bg-cyan-400 text-white rounded-lg hover:bg-cyan-500"
        onClick={() => setIsProfileOpen(!isProfileOpen)}
      >
        {isProfileOpen
          ? "Hidden Profile Setting Components"
          : "Show Profile Setting Components"}
      </button>
      <Image
        src={helpText}
        alt={"helpText"}
        className="fixed bottom-[125px] right-1.5 md:hidden"
      />
      <div className="fixed bottom-[77px] right-5 md:hidden">
        <WriteBtn onClick={handleWrite} />
      </div>

      {/* Login Modal */}
      {isModalOpen && (
        <>
          <LoginModal onClose={handleCloseModal} />
          <MobileLoginModal onClose={handleCloseModal} />
        </>
      )}

      {/* Profile Setting Modal */}
      {isProfileOpen && (
        <>
          <ProfileSettingModal onClose={() => setIsProfileOpen(false)} />
          <MobileProfileSettingModal onClose={() => setIsProfileOpen(false)} />
        </>
      )}
      {/* {isInvitationModalOpen && (
        <InviteDialog
          clubName={"아리아리"}
          onClose={() => setIsInvitationModalOpen(false)}
        />
      )} */}

      {/* Button Components */}
      {isButtonVisible && (
        <div className="bg-pink-100 p-3">
          <PcButtons />
          <MobileButtons />
        </div>
      )}

      {/* Badge Components */}
      {isBadgeVisible && (
        <div className="bg-gray-100 p-3">
          <Badges />
        </div>
      )}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
      {!isProfileOpen && <MobileSnackBar text={"로그인이 완료되었습니다."} />}
      {isMdUp
        ? openReview && (
            <ModifyClubInfoModal
              onClose={() => setOpenReview(false)}
              onSubmit={handleSubmitSuccess}
            />
          )
        : openReview && (
            <ModifyClubInfoBottomSheet
              onClose={() => setOpenReview(false)}
              onSubmit={handleSubmitSuccess}
            />
          )}
      {!openReview && <ReviewFloatingBtn onClick={handleWrite} />}
    </div>
  );
};

export default TestPage;
