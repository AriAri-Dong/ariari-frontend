import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import close from "@/images/icon/close.svg";
import Alert from "@/components/alert/alert";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import CustomInput from "@/components/input/customInput";
import RadioBtn from "@/components/button/radioBtn";
import RoundPlusBtn from "@/components/button/iconBtn/roundPlusBtn";
import img_delete from "@/images/icon/img_delete.svg";

export interface CreateNoticeModalProps {
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    details: string;
    images: string[];
  }) => void;
}

const MAX_IMAGES = 10;

const CreateNoticeModal = ({ onClose, onSubmit }: CreateNoticeModalProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [pin, setPin] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const validateForm = () => {
    if (!title.trim()) {
      setAlertMessage("공지사항 제목을 입력해주세요.");
      return false;
    }
    if (!details.trim()) {
      setAlertMessage("공지사항 상세 내용을 입력해주세요.");
      return false;
    }
    return true;
  };

  const handleImageDelete = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: string[] = [];
      const maxFileSize = 100 * 1024 * 1024;
      const allowedExtensions = ["image/png", "image/jpeg"];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.size > maxFileSize) {
          setAlertMessage("파일 용량은 100MB를 초과할 수 없습니다.");
          return;
        }
        if (!allowedExtensions.includes(file.type)) {
          setAlertMessage("png, jpg 파일만 업로드 가능합니다.");
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedImages((prev) => {
              if (prev.length < MAX_IMAGES) {
                return [...prev, e.target!.result as string];
              }
              return prev;
            });
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({ title, details, images: uploadedImages });
      onClose();
    }
  };

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
            isChecked={pin}
            label={"공지사항 상단에 고정하기"}
            onClick={() => setPin(!pin)}
          />

          {/* 이미지 업로드 섹션 */}
          <div className="flex flex-col gap-2.5 mt-7 mb-[18px]">
            <h3 className="flex text-text1 text-h3">이미지 첨부</h3>
            <p className="text-subtext2 text-body1_r">
              이미지는 최대 10장까지 첨부할 수 있어요. (JPEG / PNG)
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image}
                  alt={`Uploaded ${index}`}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover w-[100px] h-[100px]"
                />
                <button
                  onClick={() => handleImageDelete(index)}
                  className="absolute top-0 right-0 translate-x-1/5 translate-y-1/5 mr-2 mt-2"
                >
                  <Image src={img_delete} alt="삭제" width={20} height={20} />
                </button>
              </div>
            ))}

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
                <RoundPlusBtn onClick={triggerFileInput} />
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
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              maxLength={3000}
              className="w-full p-2 border-0 rounded-md resize-none text-body1_r text-subtext1 
                  focus:outline-none focus:ring-[1px] focus:ring-searchbarborder placeholder:text-unselected 
                  flex-1 min-h-[30vh] max-h-[40vh]"
            />
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex items-center justify-end mt-6 pb-1 gap-[33px]">
          <p className="text-unselected text-h4">{details.length}/3000</p>
          <SmallBtn title="등록하기" onClick={handleSubmit} />
        </div>
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default CreateNoticeModal;
