import React, { useEffect } from "react";
import { useUserStore } from "@/providers/userStoreProvider";
import { useShallow } from "zustand/shallow";
import Image from "next/image";
import ResultBadge from "@/components/badge/resultBadge";
import close from "@/images/icon/close.svg";
import { useApplyDetailQuery } from "@/hooks/apply/useApplicationQuery";
import defaultImg from "@/images/icon/defaultAriari.svg";
import { APPLY_STATUS_MAP } from "@/constants/application";
import ApplicationFields from "@/components/list/applicationFields";
import { getProfileImage } from "@/utils/profileImage";
import UpdateApplyStatusOption from "@/components/dropdown/updateApplyStatusOption";

export interface ApplicationFormViewModalProps {
  applyId: string;
  onClose: () => void;
  setSelectedOption: (option: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

const ApplicationFormViewModal = ({
  applyId,
  onClose,
  setSelectedOption,
  setIsModalOpen,
}: ApplicationFormViewModalProps) => {
  const memberId = useUserStore(
    useShallow((state) => state.memberData.memberId)
  );
  const { applyDetail, isError, isLoading } = useApplyDetailQuery(applyId);
  const {
    applyData,
    applyAnswerDataList,
    specialAnswerList,
    fileUri,
    portfolioUrl,
  } = applyDetail ?? {};

  const handleClose = (e: React.MouseEvent) => {
    onClose();
    e.stopPropagation();
  };

  const handleDownload = () => {};

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!applyData) {
    return null;
  }

  return (
    <div
      id="background"
      className="fixed flex-col gap-5 inset-0 z-50 flex
      items-center justify-center backdrop-blur-sm bg-black bg-opacity-50"
      onClick={(e) =>
        (e.target as HTMLDivElement).id === "background" && handleClose(e)
      }
    >
      <div
        className="absolute top-4 right-4 cursor-pointer bg-white p-2 border border-menuborder rounded-full"
        onClick={handleClose}
      >
        <Image src={close} alt={"닫기"} width={24} height={24} />
      </div>
      {/* Header */}
      <div
        className="bg-background flex w-[900px] h-14 rounded-[32px] 
      items-center justify-between py-[14px] px-6"
      >
        <div className="flex gap-3 items-center">
          <Image
            src={
              getProfileImage(applyData.memberData.profileType!) || defaultImg
            }
            alt={"프로필"}
            width={32}
            height={32}
          />
          <h1 className="text-text1 text-h4_sb">{`(${applyData?.name})의 지원서`}</h1>
          <span className="text-subtext2 text-body3_m">
            {applyData?.memberData?.nickname}
          </span>
        </div>
        <div className="flex gap-2">
          {memberId !== applyData.memberData.memberId && (
            <UpdateApplyStatusOption
              checkedApplications={[applyId]}
              setSelectedStatus={setSelectedOption}
              setIsModalOpen={setIsModalOpen}
            />
          )}
          <ResultBadge status={APPLY_STATUS_MAP[applyData.applyStatusType]} />
        </div>
      </div>

      {/* Content 영역 */}
      <div className="bg-white w-[900px] max-h-[75vh] rounded-2xl shadow-modal flex flex-col p-6">
        <div className="custom-scrollbar overflow-y-auto">
          {/* 지원서 항목 리스트 */}
          <ApplicationFields
            name={applyData.name}
            specialAnswerList={specialAnswerList!}
            applyAnswerDataList={applyAnswerDataList || []}
            fileUri={fileUri}
            portfolioUrl={portfolioUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationFormViewModal;
