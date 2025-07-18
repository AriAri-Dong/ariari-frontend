"use client";

import { useRef, useState } from "react";
import heic2any from "heic2any";

import Image from "next/image";
import uploadIcon from "@/images/icon/upload.svg";
import x from "@/images/icon/x.svg";

import Alert from "../alert/alert";
import { Extensions } from "@/types/file";
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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxFileSize = 15 * 1024 * 1024; // 15MB

    if (file.size > maxFileSize) {
      setAlertMessage("파일 용량은 15MB를 초과할 수 없습니다.");
      return;
    }

    // HEIC 변환 처리
    if (
      file.type === "image/heic" ||
      file.name.toLowerCase().endsWith(".heic")
    ) {
      try {
        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/png",
        });

        const convertedFile = new File(
          [convertedBlob as BlobPart],
          file.name.replace(/\.heic$/i, ".png"),
          { type: "image/png" }
        );

        setUploadedFile(convertedFile);
        setUploadedImage(URL.createObjectURL(convertedFile));
        return;
      } catch (error) {
        console.error("HEIC 변환 실패:", error);
        setAlertMessage("HEIC 파일을 변환하는 데 실패했습니다.");
        return;
      }
    }

    // 일반 파일 확장자 확인
    if (!Extensions.includes(file.type)) {
      setAlertMessage(
        "pdf, jpg, png, gif, webp, bmp 파일만 업로드 가능합니다."
      );
      return;
    }

    // 정상 파일 처리
    setUploadedFile(file);
    setUploadedImage(URL.createObjectURL(file));
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
