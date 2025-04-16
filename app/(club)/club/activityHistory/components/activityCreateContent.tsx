"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import close from "@/images/icon/close.svg";
import Alert from "../../../../components/alert/alert";
import LargeBtn from "../../../../components/button/basicBtn/largeBtn";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import img_delete from "@/images/icon/img_delete.svg";
import RoundPlusBtn from "@/components/button/iconBtn/roundPlusBtn";
import useResponsive from "@/hooks/useResponsive";
import RadioBtn from "@/components/button/radioBtn";

const MAX_IMAGES = 10;

interface FaqFormContentProps {
  mode?: "create" | "edit";
  uploadedImages: File[];
  existingImages: { id: number; imageUri: string }[];
  handleImageDelete: (index: number, isExisting?: boolean) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  detail: string;
  setDetail: (value: string) => void;
  accessType: "ALL" | "CLUB_MEMBER";
  setAccessType: (value: "ALL" | "CLUB_MEMBER") => void;
  onClose: () => void;
  onSubmit: () => void;
}

/**
 * faq 모달/바텀시트 공통내용 컴포넌트
 * @param uploadedImages qna 제목
 * @param onClose 바텀시트/모달 닫는 함수
 * @param onSubmit 신고 제출 함수
 * @returns
 */
const ActivityCreateContent = ({
  mode,
  uploadedImages,
  existingImages,
  handleImageDelete,
  handleFileChange,
  detail,
  setDetail,
  accessType,
  setAccessType,
  onClose,
  onSubmit,
}: FaqFormContentProps) => {
  const isMdUp = useResponsive("md");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  console.log("existingImages", existingImages);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="h-full flex flex-col justify-between smax-h-[90vh]">
      <div className="flex justify-between items-center pb-4 border-b md:pb-5">
        <h2 className="text-mobile_h1_contents_title md:text-h1_contents_title">
          활동내역 작성하기
        </h2>
        <button
          onClick={onClose}
          className="w-5 h-5 flex justify-center items-center md:w-7 md:h-7"
        >
          <Image
            src={close}
            alt="닫기"
            width={16}
            height={16}
            className="md:w-6 md:h-6"
          />
        </button>
      </div>
      <section className="h-full overflow-y-scroll md:overflow-y-hidden">
        <div className="flex flex-col gap-2.5 mt-[22px] mb-[14px] md:mb-[18px]">
          <h3 className="flex text-text1 text-mobile_h2 md:text-h3">
            이미지 첨부
          </h3>
          <p className="text-subtext2 text-mobile_body3_r md:text-body1_r">
            이미지는 최대 10장까지 첨부할 수 있어요. (JPEG / PNG)
          </p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {/* 기존 이미지 렌더링 */}
          {existingImages?.map((img, index) => (
            <div key={`existing-${img.id}`} className="relative">
              <Image
                src={img.imageUri}
                alt={`기존 이미지 ${index}`}
                width={96}
                height={96}
                className="rounded-lg object-cover w-[96px] h-[96px]"
              />
              <button
                onClick={() => handleImageDelete(index, true)}
                className="absolute top-0 right-0 translate-x-1/5 translate-y-1/5 mr-2 mt-2"
              >
                <Image src={img_delete} alt="삭제" width={16} height={16} />
              </button>
            </div>
          ))}

          {/* 새로 업로드한 이미지 렌더링 */}
          {uploadedImages.map((file, index) => {
            const previewUrl = URL.createObjectURL(file);
            return (
              <div key={`new-${index}`} className="relative">
                <Image
                  src={previewUrl}
                  alt={`Uploaded ${index}`}
                  width={96}
                  height={96}
                  className="rounded-lg object-cover w-[96px] h-[96px]"
                />
                <button
                  onClick={() => handleImageDelete(index)}
                  className="absolute top-0 right-0 translate-x-1/5 translate-y-1/5 mr-2 mt-2"
                >
                  <Image src={img_delete} alt="삭제" width={16} height={16} />
                </button>
              </div>
            );
          })}

          {/* MAX_IMAGES 체크 시 합산으로 비교 */}
          {(existingImages?.length || 0) + uploadedImages.length <
            MAX_IMAGES && (
            <label className="flex w-[96px] h-[96px] justify-center items-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <RoundPlusBtn
                onClick={triggerFileInput}
                imageSize={20}
                className="p-1"
              />
            </label>
          )}
        </div>
        {!isMdUp && (
          <>
            <h3 className="flex text-mobile_h2 md:text-h3 mt-[30px] mb-[22px] md:mt-[28px] md:mb-[18px]">
              공개 범위
              <span className="text-noti text-mobile_body3_m pl-1">*</span>
            </h3>

            <div className="flex items-center gap-[14px] mb-4">
              <RadioBtn
                isChecked={accessType === "ALL"}
                onClick={() => {
                  setAccessType("ALL");
                }}
                label="전체공개"
                className="flex-1 gap-[14px] text-mobile_h4 p-2.5 pr-4"
                imgClassName="w-5 h-5"
              />
              <RadioBtn
                isChecked={accessType === "CLUB_MEMBER"}
                onClick={() => {
                  setAccessType("CLUB_MEMBER");
                }}
                label="동아리 내 공개"
                className="flex-1 gap-[14px] text-mobile_h4 p-2.5 pr-4"
                imgClassName="w-5 h-5"
              />
            </div>
          </>
        )}
        <h3 className="flex text-mobile_h2 md:text-h3 mt-[30px] mb-[14px] md:mt-[28px] md:mb-[18px]">
          활동내역 상세
          <span className="text-noti text-mobile_body3_m pl-1">*</span>
        </h3>
        <textarea
          placeholder="동아리원들과 공유하고 싶은 활동을 기록해 보세요."
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          maxLength={3000}
          className="w-full h-[160px] border-0 resize-none text-mobile_body1_r 
          text-subtext1 md:h-[360px] md:text-body1_r focus:outline-none placeholder:text-unselected"
        />
      </section>
      <div className="w-full mt-[6px] flex items-center justify-end md:justify-between">
        {isMdUp && (
          <div className="flex items-center gap-5 flex-shrink-0">
            <RadioBtn
              isChecked={accessType === "ALL"}
              onClick={() => {
                setAccessType("ALL");
              }}
              label="전체공개"
              className="md:gap-2.5 md:p-2.5 md:pr-4"
            />
            <RadioBtn
              isChecked={accessType === "CLUB_MEMBER"}
              onClick={() => {
                setAccessType("CLUB_MEMBER");
              }}
              label="동아리 내 공개"
              className="md:gap-2.5 md:p-2.5 md:pr-4"
            />
          </div>
        )}
        <div className="flex items-center gap-8 w-full justify-end">
          <p className="text-right text-unselected text-mobile_h4 basis-1/5 md:h4 md:basis-auto">
            {detail.length}/3000
          </p>
          <div className="basis-4/5 flex justify-end md:basis-auto">
            {isMdUp ? (
              <SmallBtn
                onClick={handleSubmit}
                title={mode === "edit" ? "수정하기" : "등록하기"}
              />
            ) : (
              <LargeBtn
                onClick={handleSubmit}
                title={mode === "edit" ? "수정하기" : "등록하기"}
              />
            )}
          </div>
        </div>
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default ActivityCreateContent;
