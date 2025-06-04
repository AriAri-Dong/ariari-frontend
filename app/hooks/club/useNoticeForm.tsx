import { ClubNoticeImageData } from "@/types/club";
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

export const MAX_IMAGES = 10;
const MAX_FILE_SIZE = 100 * 1024 * 1024;

interface useClubNoticeFormProps {
  modalType: "create" | "modify";
  onSubmit: (payload: any, uploadedImages: string[]) => void;
  setAlertMessage: (message: string) => void;
  initialValues?: {
    title: string;
    body: string;
    isFixed: boolean;
    images?: ClubNoticeImageData[];
  };
}
export const useClubNoticeForm = ({
  modalType,
  onSubmit,
  setAlertMessage,
  initialValues,
}: useClubNoticeFormProps) => {
  const params = useSearchParams();
  const clubId = params.get("clubId") || "";

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState<string>(initialValues?.title ?? "");
  const [body, setBody] = useState<string>(initialValues?.body ?? "");
  const [isFixed, setIsFixed] = useState<boolean>(
    initialValues?.isFixed ?? false
  );
  const [existingImages, setExistingImages] = useState<ClubNoticeImageData[]>(
    initialValues?.images ?? []
  );
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const validateForm = () => {
    if (!title.trim()) {
      setAlertMessage("공지사항 제목을 입력해주세요.");
      return false;
    }
    if (!body.trim()) {
      setAlertMessage("공지사항 상세 내용을 입력해주세요.");
      return false;
    }
    return true;
  };

  const handleImageDelete = (id: string, isExisting?: boolean) => {
    if (isExisting) {
      setExistingImages((prev) => prev.filter((image) => image.id !== id));
    } else {
      setUploadedImages((prev) => prev.filter((image_id) => image_id !== id));
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const allowedExtensions = ["image/png", "image/jpeg"];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.size > MAX_FILE_SIZE) {
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

  // 공지사항 등록/수정
  const handleSubmit = () => {
    if (!validateForm()) return;

    // 등록
    if (modalType === "create") {
      onSubmit({ title, body, isFixed }, uploadedImages);
    }
    // 수정
    else {
      const deletedImageIds = (initialValues?.images ?? [])
        .filter(
          (initialImage) =>
            !existingImages.some((curImage) => curImage.id === initialImage.id)
        )
        .map((image) => image.id);

      onSubmit({ title, body, isFixed, deletedImageIds }, uploadedImages);
    }
  };

  return {
    title,
    setTitle,
    body,
    setBody,
    isFixed,
    setIsFixed,
    existingImages,
    uploadedImages,
    fileInputRef,
    handleImageDelete,
    triggerFileInput,
    handleFileChange,
    validateForm,
    handleSubmit,
  };
};
