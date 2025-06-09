import React, { useState, useEffect } from "react";
import Image from "next/image";
import LargeBtn from "../../button/basicBtn/largeBtn";
import Alert from "@/components/alert/alert";
import { PROFILE_SETTING } from "@/data/profileSetting";
import check from "@/images/icon/check.svg";
import { updateProfileType } from "@/api/member/api";
import { useUserStore } from "@/stores/userStore";
import { getUser } from "@/utils/getUser";

interface ProfileModalProps {
  onClose: () => void;
}

const ModifyProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
  const profileType = useUserStore(
    (state) => state.user?.memberData.profileType
  );

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [selectedProfileType, setSelectedProfileType] = useState<string | null>(
    profileType ?? null
  );

  const [selectedProfileData, setSelectedProfileData] = useState(
    PROFILE_SETTING.find((item) => item.alias === profileType) ||
      PROFILE_SETTING[0]
  );

  // 프로필 타입이 null일 때 첫 번째 프로필을 기본 선택
  useEffect(() => {
    if (!profileType && !selectedProfileType) {
      setSelectedProfileType(PROFILE_SETTING[0].alias);
      setSelectedProfileData(PROFILE_SETTING[0]);
    }
  }, [profileType]);

  // 프로필 선택
  const handleProfileClick = (alias: string | null) => {
    setSelectedProfileType(alias);
    const newProfile = PROFILE_SETTING.find((item) => item.alias === alias);
    if (newProfile) setSelectedProfileData(newProfile);
  };

  // 프로필 변경
  const handleModifyProfile = async () => {
    if (!selectedProfileType) {
      setAlertMessage("프로필을 선택해주세요.");
      return;
    }

    try {
      const profileToUpdate = selectedProfileType || PROFILE_SETTING[0].alias!;
      await updateProfileType(profileToUpdate);
      await getUser();
      onClose();
    } catch (error) {
      setAlertMessage("프로필 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-[430px] px-5 pb-9 pt-[26px] bg-background rounded-2xl z-50">
        <h1 className="text-text1 text-h1_contents_title mb-8 text-center">
          프로필 이미지 변경
        </h1>

        {/* 선택한 프로필 미리보기 */}
        <div className="flex justify-center mb-4 mt-8">
          <Image
            src={selectedProfileData?.imageUrl || ""}
            alt={selectedProfileType || "프로필 기본 이미지"}
            width={112}
            height={112}
            className="rounded-full border border-menuborder p-1"
          />
        </div>

        {/* 프로필 선택 리스트 */}
        <div className="grid grid-cols-4 gap-5">
          {PROFILE_SETTING.map((item) => (
            <div
              key={item.id}
              className="relative flex justify-center items-center w-[76px] h-[76px] cursor-pointer rounded-full"
              onClick={() => handleProfileClick(item.alias)}
            >
              <Image
                src={item.imageUrl}
                alt={item.alias || "Default Profile"}
                width={76}
                height={76}
                className="rounded-full"
              />
              {selectedProfileType === item.alias && (
                <>
                  <div className="absolute inset-0 bg-black_50 rounded-full z-10 opacity-70"></div>
                  <div className="absolute z-20">
                    <Image src={check} alt="check" width={24} height={24} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col w-full gap-4 mt-8">
          <LargeBtn title={"변경하기"} onClick={handleModifyProfile} />
          <button
            onClick={onClose}
            className="text-primary text-body1_sb py-2.5"
          >
            닫기
          </button>
        </div>

        {alertMessage && (
          <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
        )}
      </div>
    </div>
  );
};

export default ModifyProfileModal;
