import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SingleSelectOptions from "@/components/pulldown/singleSelectOptions";
import vector from "@/images/icon/sub_pull_down.svg";
import ResultBadge from "@/components/badge/resultBadge";
import close from "@/images/icon/close.svg";
import FileBadge from "@/components/badge/fileBadge";
import CustomInput from "@/components/input/customInput";
import PDFDownloadBtn from "@/components/button/pdfDownloadBtn";

export interface ApplicationFromViewModalProps {
  onClose: () => void;
  portfolio: boolean;
  portfolioData?: {
    portfolioPurpose: string;
    portfolioText: string;
    portfolioFile: string;
  };
  data: {
    name: string;
    image: string;
    nickname: string;
  };
  fields: { label: string; value: string }[];
}

const ApplicationFromViewModal = ({
  onClose,
  data,
  portfolio,
  portfolioData,
  fields,
}: ApplicationFromViewModalProps) => {
  const optionsRef = useRef<HTMLDivElement | null>(null);

  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleMenuClick = (label: string) => {
    setSelectedStatus(label);
  };

  const handleClose = () => {
    onClose();
  };

  const handleDownload = () => {};

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      id="background"
      className="fixed flex-col gap-5 inset-0 z-50 flex
      items-center justify-center backdrop-blur-sm bg-black bg-opacity-50"
      //   onClick={(e) =>
      //     (e.target as HTMLDivElement).id === "background" && handleClose()
      //   }
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
          <Image src={data.image} alt={"프로필"} />
          <h1 className="text-text1 text-h4_sb">{`(${data.name})의 지원서`}</h1>
          <span className="text-subtext2 text-body3_m">{data.nickname}</span>
        </div>
        <div className="flex gap-2">
          <div
            className="relative flex items-center gap-2 cursor-pointer"
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
          >
            <p className="text-subtext2 text-body1_m">지원상태 변경</p>
            <Image alt={"버튼"} src={vector} width={28} height={28} />
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
                  size="medium"
                  handleMenuClick={handleMenuClick}
                />
              </div>
            )}
          </div>
          <ResultBadge status={"합격"} />
        </div>
      </div>

      {/* Content 영역 */}
      <div className="bg-white w-[900px] max-h-[75vh] rounded-2xl shadow-modal flex flex-col p-6">
        <div className="custom-scrollbar overflow-y-auto">
          <div className="flex flex-col gap-10 ">
            {fields.map((field, index) => (
              <div key={index} className="flex flex-col gap-3">
                <h3 className="text-text1 text-h3">{field.label}</h3>
                <p className="text-subtext1 text-body1_m">{field.value}</p>
              </div>
            ))}
          </div>
          {portfolio && portfolioData && (
            <>
              <div className="flex flex-col gap-2.5 mt-10">
                <h3 className="text-text1 text-h3">포트폴리오</h3>
                <p className="text-subtext2 text-body1_r">
                  포트폴리오 수집 목적 문구
                </p>
              </div>
              <div className="flex gap-2 mt-5 mb-3 ">
                {portfolioData.portfolioFile && (
                  <FileBadge fileName={portfolioData.portfolioFile} />
                )}
                <PDFDownloadBtn
                  file={portfolioData.portfolioFile}
                  fileName={`${data.name}_Portfolio`}
                />
              </div>
              <CustomInput
                disable={true}
                value={portfolioData.portfolioText}
                placeholder={""}
                onChange={() => {}}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationFromViewModal;
