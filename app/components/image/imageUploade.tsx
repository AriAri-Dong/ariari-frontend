"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import uploadIcon from "@/images/icon/upload.svg";
import x from "@/images/icon/x.svg";

import Alert from "../alert/alert";
interface ImageUploadProps {
  uploadedImage: string | null;
  setUploadedImage: (value: string | null) => void;
  setUploadedFile: (value: File | null) => void;
}
const ImageUpload = ({
  uploadedImage,
  setUploadedImage,
  setUploadedFile,
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 용량 및 확장자 확인
      const maxFileSize = 15 * 1024 * 1024;
      const allowedExtensions = ["image/png", "image/jpeg", "image/svg+xml"];
      if (file.size > maxFileSize) {
        setAlertMessage("파일 용량은 15MB 를 초과할 수 없습니다.");
        return;
      }
      if (!allowedExtensions.includes(file.type)) {
        setAlertMessage("png, jpg, svg 파일만 업로드 가능합니다.");
        return;
      }

      setUploadedFile(file);
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setUploadedFile(null);
  };

  return (
    <div className="w-full bg-selectedoption_default cursor-pointer hover:bg-selectedoption_hover active:bg-selectedoption_pressed py-3 md:py-6 relative rounded-20">
      <label className="cursor-pointer">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <div>
          <Image
            src={uploadIcon}
            alt="Uploaded or Default"
            width={48}
            height={48}
            className="mx-auto md:w-[64px] md:h-[64px]   "
          />
          <p className="text-center text-primary text-body2_m">이미지 업로드</p>
        </div>
      </label>
      {uploadedImage && (
        <div className="relative w-[300px] h-[300px] mt-5 md:mt-6 md:w-[380px] md:h-[380px] mx-auto">
          <Image
            src={uploadedImage}
            alt="Uploaded image"
            width={300}
            height={300}
            className="w-[300px] h-[300px] md:w-[380px] md:h-[380px] object-cover rounded-20"
          />
          <Image
            src={x}
            alt="x"
            width={16}
            height={16}
            onClick={handleRemoveImage}
            className="absolute right-5 top-5 cursor-pointer md:w-5 md:h-5 "
          />
        </div>
      )}
      {alertMessage && (
        <Alert
          text={alertMessage}
          onClose={() => {
            setAlertMessage(null);
          }}
        />
      )}
    </div>
  );
};

export default ImageUpload;
