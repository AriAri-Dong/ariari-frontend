import React, { useRef, useState } from "react";
import Image from "next/image";
import vector from "@/images/icon/backVector.svg";
import pull_down from "@/images/icon/sub_pull_down.svg";
import { ApplicationFormViewModalProps } from "./applicationFormViewModal";
import SingleSelectOptions from "@/components/pulldown/singleSelectOptions";
import Contour from "@/components/bar/contour";
import FileBadge from "@/components/badge/fileBadge";
import PDFDownloadBtn from "@/components/button/pdfDownloadBtn";
import CustomInput from "@/components/input/customInput";

const MobileApplicationFormViewModal = ({
  onClose,
  data,
  portfolio,
  portfolioData,
  fields,
}: ApplicationFormViewModalProps) => {
  const optionsRef = useRef<HTMLDivElement | null>(null);

  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleClose = () => {
    onClose();
  };

  const handleMenuClick = (label: string) => {
    setSelectedStatus(label);
  };

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
            <Image src={data.image} alt={"프로필"} width={48} height={48} />
            <div className="flex flex-col gap-0.5">
              <h1 className="text-text1 text-h4_sb">{data.name}</h1>
              <p className="text-subtext2 text-mobile_body2_r">
                {data.nickname}
              </p>
            </div>
          </div>
          <div
            className="relative flex items-center gap-1 cursor-pointer"
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
          >
            <p className="text-subtext2 text-mobile_body2_m">지원상태 변경</p>
            <Image alt={"버튼"} src={pull_down} width={20} height={20} />
            {isOptionsOpen && (
              <div
                ref={optionsRef}
                className="absolute top-full mt-2 z-50 left-12"
              >
                <SingleSelectOptions
                  selectedOption={selectedStatus}
                  optionData={[
                    { id: 1, label: "합격" },
                    { id: 2, label: "불합격" },
                    { id: 3, label: "대기중" },
                    { id: 4, label: "면접중" },
                  ]}
                  size="small"
                  handleMenuClick={handleMenuClick}
                />
              </div>
            )}
          </div>
        </div>
        <Contour className="mb-6" />
      </div>

      {/* 스크롤 가능한 콘텐츠 영역 */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-[30px]">
          {fields.map((field, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h3 className="text-text1 text-mobile_h3">{field.label}</h3>
              <p className="text-subtext1 text-mobile_body1_r">{field.value}</p>
            </div>
          ))}
        </div>
        {portfolio && portfolioData && (
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
        )}
      </div>
    </div>
  );
};

export default MobileApplicationFormViewModal;
