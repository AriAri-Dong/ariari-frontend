"use client";

import React, { useState, useEffect, useRef } from "react";
import useResponsive from "@/hooks/useResponsive";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import ActivityCreateContent from "./activityCreateContent";
import Alert from "@/components/alert/alert";
import {
  createClubActivity,
  updateClubActivity,
} from "@/api/club/activity/api";

const MAX_IMAGES = 10;

interface ActivityCreateFormProps {
  clubId: string;
  onClose: () => void;
  onSubmit: () => Promise<boolean>;
  mode?: "create" | "edit";
  initialData?: {
    clubActivityId: string;
    accessType: "ALL" | "CLUB_MEMBER";
    detail: string;
    existingImages: { id: number; imageUri: string }[];
  };
}

/**
 *
 * @param onClose 닫기 함수
 * @param onSubmit 제출 함수
 */

const ActivityCreateForm = ({
  clubId,
  onClose,
  onSubmit,
  mode,
  initialData,
}: ActivityCreateFormProps) => {
  const isTapOver = useResponsive("md");
  const queryClient = useQueryClient();

  console.log("123123123", clubId);

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<
    { id: number; imageUri: string }[]
  >(initialData?.existingImages || []);
  const [detail, setDetail] = useState<string>(initialData?.detail || "");
  const [accessType, setAccessType] = useState<"ALL" | "CLUB_MEMBER">(
    initialData?.accessType || "ALL"
  );
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleImageDelete = (index: number, isExisting?: boolean) => {
    if (isExisting) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const maxFileSize = 100 * 1024 * 1024;
    const allowedExtensions = ["image/png", "image/jpeg"];

    const newFiles: File[] = [];

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

      newFiles.push(file);
    }

    setUploadedImages((prev) => {
      const total = prev.length + newFiles.length + existingImages.length;
      if (total > MAX_IMAGES) {
        setAlertMessage("최대 10장까지 업로드할 수 있습니다.");
        return prev;
      }
      return [...prev, ...newFiles];
    });
  };

  const handleSubmit = async () => {
    if (!detail.trim()) {
      setAlertMessage("활동 내역 상세 내용을 입력하세요.");
      return false;
    }

    try {
      if (mode === "edit" && initialData) {
        const deletedImageIds =
          initialData.existingImages
            .filter((img) => !existingImages.find((e) => e.id === img.id))
            .map((img) => img.id) ?? [];

        await updateClubActivity({
          clubActivityId: initialData.clubActivityId,
          accessType,
          body: detail,
          newImages: uploadedImages,
          deletedImageIds,
        });
      } else {
        await createClubActivity({
          clubId,
          accessType,
          body: detail,
          images: uploadedImages,
        });
      }

      const success = await onSubmit();
      return success;
    } catch (e) {
      setAlertMessage(
        "업로드 중 오류가 발생했습니다.</br> 잠시 후 다시 시도해 주세요."
      );
      return false;
    } finally {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.myClubList] });
    }
  };

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setAccessType(initialData.accessType);
      setDetail(initialData.detail);
      setExistingImages(initialData.existingImages);
    }
  }, [mode, initialData]);

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
          mode={mode}
          uploadedImages={uploadedImages}
          existingImages={existingImages}
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
          mode={mode}
          uploadedImages={uploadedImages}
          existingImages={existingImages}
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
