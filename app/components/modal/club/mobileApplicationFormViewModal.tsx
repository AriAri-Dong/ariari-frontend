import React, { useRef } from "react";
import Image from "next/image";
import vector from "@/images/icon/backVector.svg";
import { ApplicationFromViewModalProps } from "./applicationFormViewModal";
import Contour from "@/components/bar/contour";
import { useApplyDetailQuery } from "@/hooks/apply/useApplicationQuery";
import defaultImg from "@/images/icon/defaultAriari.svg";
import ApplicationFields from "@/components/list/applicationFields";
import { getProfileImage } from "@/utils/profileImage";
import UpdateApplyStatusOptions from "@/components/dropdown/updateApplyStatusOptions";

const MobileApplicationFormViewModal = ({
  applyId,
  setIsModalOpen,
  setSelectedOption,
  onClose,
}: ApplicationFromViewModalProps) => {
  const optionsRef = useRef<HTMLDivElement | null>(null);

  const { applyDetail, isError, isLoading } = useApplyDetailQuery(applyId);
  const {
    applyData,
    applyAnswerDataList,
    specialAnswerList,
    fileUri,
    portfolioUrl,
  } = applyDetail ?? {};

  const handleClose = () => {
    onClose();
  };

  if (!applyData) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-background z-50 flex flex-col
      justify-between pt-[46px] pb-5 px-4 md:hidden"
    >
      {/* 헤더 영역 */}
      <div className="flex flex-col">
        <div className="flex gap-2">
          <Image
            src={vector}
            alt={"뒤로가기"}
            width={24}
            height={24}
            onClick={handleClose}
            className="md:hidden cursor-pointer"
          />
          <h1 className="text-text1 text-mobile_h1_contents_title md:text-h1_contents_title">
            ({applyData.name})님의 지원서
          </h1>
        </div>
        <div className="flex justify-between mt-6 mb-5">
          <div className="flex gap-2.5">
            <Image
              src={
                getProfileImage(applyData?.memberData?.profileType) ||
                defaultImg
              }
              alt={"프로필"}
              width={48}
              height={48}
            />
            <div className="flex flex-col gap-0.5">
              <h1 className="text-text1 text-h4_sb">{applyData?.name}</h1>
              <p className="text-subtext2 text-mobile_body2_r">
                {applyData?.memberData.nickname}
              </p>
            </div>
          </div>
          <UpdateApplyStatusOptions
            checkedApplications={[applyId]}
            setIsModalOpen={setIsModalOpen}
            setSelectedStatus={setSelectedOption}
          />
        </div>
        <Contour className="mb-6" />
      </div>

      {/* 스크롤 가능한 콘텐츠 영역 */}
      <div className="flex-1 overflow-y-auto">
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
  );
};

export default MobileApplicationFormViewModal;
