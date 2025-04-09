import React, { useState } from "react";
import Image from "next/image";
import vector from "@/images/icon/backVector.svg";
import pull_down from "@/images/icon/sub_pull_down.svg";
import { ApplicationFromViewModalProps } from "./applicationFormViewModal";
import Contour from "@/components/bar/contour";
import FileBadge from "@/components/badge/fileBadge";
import PDFDownloadBtn from "@/components/button/pdfDownloadBtn";
import CustomInput from "@/components/input/customInput";
import { useApplyDetailQuery } from "@/hooks/apply/useApplicationQuery";
import defaultImg from "@/images/icon/defaultAriari.svg";
import ApplicationFields from "@/components/list/applicationFields";
import { getProfileImage } from "@/utils/profileImage";

interface MobileApplicationFormViewModal extends ApplicationFromViewModalProps {
  onOpenStatusOptions: () => void;
}

const MobileApplicationFormViewModal = ({
  applyId,
  onOpenStatusOptions,
  onClose,
}: MobileApplicationFormViewModal) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("");

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

  const handleMenuClick = (label: string) => {
    setSelectedStatus(label);
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
            관심 동아리
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
          <div
            className="relative flex items-center gap-1 cursor-pointer"
            onClick={onOpenStatusOptions}
          >
            <p className="text-subtext2 text-mobile_body2_m">지원상태 변경</p>
            <Image alt={"버튼"} src={pull_down} width={20} height={20} />
          </div>
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
        />
        {/* {portfolio && portfolioData && (
          <>
            <div className="flex flex-col gap-2.5 mt-[30px]">
              <h3 className="text-text1 text-mobile_h3">포트폴리오</h3>
              <p className="text-subtext2 text-mobile_body3_r">
                포트폴리오 수집 목적 문구
              </p>
            </div>
            <CustomInput
              disable={true}
              value={portfolioData.portfolioText}
              placeholder={""}
              onChange={() => {}}
              className="mt-[14px]"
            />
            <div className="flex gap-2 mt-[14px] mb-20">
              {portfolioData.portfolioFile && (
                <FileBadge fileName={portfolioData.portfolioFile} />
              )}
              <PDFDownloadBtn
                file={portfolioData.portfolioFile}
                fileName={`${data.name}_Portfolio`}
              />
            </div>
          </>
        )} */}
      </div>
    </div>
  );
};

export default MobileApplicationFormViewModal;
