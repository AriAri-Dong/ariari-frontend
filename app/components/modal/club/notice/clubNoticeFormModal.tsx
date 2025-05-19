import Image from "next/image";
import React, { useEffect } from "react";
import close from "@/images/icon/close.svg";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import CustomInput from "@/components/input/customInput";
import RadioBtn from "@/components/button/radioBtn";
import RoundPlusBtn from "@/components/button/iconBtn/roundPlusBtn";
import img_delete from "@/images/icon/img_delete.svg";
import { useClubNoticeForm } from "@/hooks/club/useNoticeForm";
import { ClubNoticeImageData } from "@/types/club";

export interface ClubNoticeFormModalProps {
  modalType: "create" | "modify";
  onClose: () => void;
  onSubmit: (
    payload: {
      title: string;
      body: string;
      isFixed: boolean;
      deletedImageIds?: string[];
    },
    uploadImages: string[]
  ) => void;
  setAlertMessage: (message: string) => void;
  initialValues?: {
    title: string;
    body: string;
    isFixed: boolean;
    images?: ClubNoticeImageData[];
  };
}

const MAX_IMAGES = 10;

const ClubNoticeFormModal = ({
  modalType,
  onClose,
  onSubmit,
  setAlertMessage,
  initialValues,
}: ClubNoticeFormModalProps) => {
  const {
    title,
    body,
    isFixed,
    setTitle,
    setBody,
    setIsFixed,
    fileInputRef,
    existingImages,
    uploadedImages,
    handleFileChange,
    handleImageDelete,
    triggerFileInput,
    handleSubmit,
  } = useClubNoticeForm({
    modalType,
    onSubmit,
    setAlertMessage,
    initialValues,
  });
  // 스크롤 금지
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      id="background"
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50"
      onClick={(e) =>
        (e.target as HTMLDivElement).id === "background" && onClose()
      }
    >
      <div className="bg-white p-5 shadow-modal rounded-2xl w-[826px] max-h-[90vh] flex flex-col">
        <div className="flex justify-between mb-5">
          <h1 className="text-text1 text-h1_contents_title">
            공지사항 작성하기
          </h1>
          <Image
            src={close}
            alt={"닫기"}
            width={24}
            height={24}
            onClick={onClose}
            className="md:w-6 md:h-6 cursor-pointer"
          />
        </div>
        <div className="h-[1px] bg-menuborder" />

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <h3 className="flex text-text1 text-h3 mt-[22px] mb-[18px]">
            공지사항 제목
            <span className="text-noti text-body1_m pl-1">*</span>
          </h3>
          <CustomInput
            value={title}
            placeholder={"공지사항 제목을 작성해주세요"}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4"
          />
          <RadioBtn
            isChecked={isFixed}
            label={"공지사항 상단에 고정하기"}
            onClick={() => setIsFixed(!isFixed)}
            className={"py-1 px-[6px]"}
          />

          {/* 이미지 업로드 섹션 */}
          <div className="flex flex-col gap-2.5 mt-7 mb-[18px]">
            <h3 className="flex text-text1 text-h3">이미지 첨부</h3>
            <p className="text-subtext2 text-body1_r">
              이미지는 최대 10장까지 첨부할 수 있어요. (JPEG / PNG)
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {/* 기존 이미지 */}
            {existingImages.map((image, idx) => (
              <div key={image.id} className="relative">
                <Image
                  src={image.imageUri}
                  alt={`existing-${image.id}`}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover w-[100px] h-[100px]"
                />
                <button
                  onClick={() => handleImageDelete(image.id, true)}
                  className="absolute top-0 right-0 translate-x-1/5 translate-y-1/5 mr-2 mt-2"
                >
                  <Image src={img_delete} alt="삭제" width={20} height={20} />
                </button>
              </div>
            ))}
            {/* 새 업로드 이미지 */}
            {uploadedImages.map((image, index) => {
              return (
                <div key={image} className="relative">
                  <Image
                    src={image}
                    alt={`upload-${index}`}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover w-[100px] h-[100px]"
                  />
                  <button
                    onClick={() => handleImageDelete(image)}
                    className="absolute top-0 right-0 translate-x-1/5 translate-y-1/5 mr-2 mt-2"
                  >
                    <Image src={img_delete} alt="삭제" width={20} height={20} />
                  </button>
                </div>
              );
            })}
            {uploadedImages.length < MAX_IMAGES && (
              <label className="flex w-[100px] h-[100px] justify-center items-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
                <RoundPlusBtn onClick={triggerFileInput} className="p-3" />
              </label>
            )}
          </div>

          {/* 공지사항 상세 입력 */}
          <div className="flex justify-between mt-7 mb-3 items-center">
            <h3 className="flex text-text1 text-h3">
              공지사항 상세
              <span className="text-noti text-body1_m pl-1">*</span>
            </h3>
          </div>
          <div className="px-1">
            <textarea
              placeholder="동아리원들에게 공지하실 내용을 작성해 주세요."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength={3000}
              className="w-full p-2 border-0 rounded-md resize-none text-body1_r text-subtext1 
                  focus:outline-none focus:ring-[1px] focus:ring-searchbarborder placeholder:text-unselected 
                  flex-1 min-h-[30vh] max-h-[40vh]"
            />
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex items-center justify-end mt-6 pb-1 gap-[33px]">
          <p className="text-unselected text-h4">{body.length}/3000</p>
          <SmallBtn title="등록하기" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ClubNoticeFormModal;
