"use client";

import { useState } from "react";
import MobileButtons from "../components/buttons/mobile_Buttons";
import PcButtons from "../components/buttons/PC_Buttons";
import Badges from "../components/badges";
import ProfileSettingModal from "@/components/modal/profileSetting/profileSettingModal";
import LoginModal from "@/components/modal/login/loginModal";
import MobileLoginModal from "@/components/modal/login/mobileLoginModal";
import MobileSnackBar from "@/components/bar/mobileSnackBar";
import MobileProfileSettingModal from "@/components/modal/profileSetting/mobile/mobileProfileSettingModal";
import InviteDialog from "@/components/modal/invite/inviteDialog";

const TestPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isButtonVisible, setIsButtonVisible] = useState<boolean>(true);
  const [isBadgeVisible, setIsBadgeVisible] = useState<boolean>(true);
  const [isInvitationModalOpen, setIsInvitationModalOpen] =
    useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
      <button
        className="py-2 px-4 mb-3 bg-token_1_bg text-white rounded-lg hover:bg-token_1"
        onClick={() => setIsInvitationModalOpen(!isInvitationModalOpen)}
      >
        {isInvitationModalOpen
          ? "Hidden invitation modal"
          : "Show invitation modal"}
      </button>
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
      {isInvitationModalOpen && (
        <InviteDialog
          clubName={"아리아리"}
          onClose={() => setIsInvitationModalOpen(false)}
        />
      )}

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
      {!isProfileOpen && <MobileSnackBar text={"로그인이 완료되었습니다."} />}
    </div>
  );
};

export default TestPage;
