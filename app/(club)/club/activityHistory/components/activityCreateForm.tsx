"use client";

import React, { useState, useEffect, useRef } from "react";
import useResponsive from "@/hooks/useResponsive";
import ActivityCreateContent from "./activityCreateContent";
import Alert from "@/components/alert/alert";

const MAX_IMAGES = 10;

interface ActivityCreateFormProps {
  onClose: () => void;
  onSubmit: () => void;
}

/**
 *
 * @param onClose 닫기 함수
 * @param onSubmit 제출 함수
 */

const ActivityCreateForm = ({ onClose, onSubmit }: ActivityCreateFormProps) => {
  const isTapOver = useResponsive("md");

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [detail, setDetail] = useState<string>("");
  const [accessType, setAccessType] = useState<"ALL" | "CLUB_MEMBER">("ALL");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleImageDelete = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
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
    if (!detail) {
      setAlertMessage("활동 내역 상세 내용을 입력하세요.");
      return;
    }

    onSubmit();
    setAlertMessage("정상 등록되었습니다.");
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return !isTapOver ? (
    <div
      id="background"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={(e) =>
        (e.target as HTMLDivElement).id === "background" && onClose()
      }
      style={{ zIndex: 1000 }}
    >
      <div
        className={`bg-white w-full p-4 shadow-modal rounded-t-2xl`}
        onClick={(e) => e.stopPropagation()}
        style={{ height: "calc(100vh - 40px)" }}
      >
        <ActivityCreateContent
          uploadedImages={uploadedImages}
          handleImageDelete={handleImageDelete}
          handleFileChange={handleFileChange}
          detail={detail}
          setDetail={setDetail}
          accessType={accessType}
          setAccessType={setAccessType}
          onClose={onClose}
          onSubmit={handleSubmit}
        />
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  ) : (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      style={{ zIndex: 1000 }}
    >
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative w-[826px] p-5 pb-6 bg-white rounded-[16px]">
        <ActivityCreateContent
          uploadedImages={uploadedImages}
          handleImageDelete={handleImageDelete}
          handleFileChange={handleFileChange}
          detail={detail}
          setDetail={setDetail}
          accessType={accessType}
          setAccessType={setAccessType}
          onClose={onClose}
          onSubmit={handleSubmit}
        />
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default ActivityCreateForm;
