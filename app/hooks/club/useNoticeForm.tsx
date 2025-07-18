import { ClubNoticeImageData } from "@/types/club";
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Extensions } from "@/types/file";
import heic2any from "heic2any";

export const MAX_IMAGES = 10;

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

  const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    const updatedImages: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // 용량 제한
      if (file.size > MAX_FILE_SIZE) {
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

          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) {
              setUploadedImages((prev) => {
                if (prev.length + updatedImages.length < MAX_IMAGES) {
                  return [...prev, e.target!.result as string];
                }
                return prev;
              });
            }
          };
          reader.readAsDataURL(convertedFile);
          continue;
        } catch (error) {
          console.error("HEIC 변환 실패:", error);
          setAlertMessage("HEIC 파일을 변환하는 데 실패했습니다.");
          return;
        }
      }

      // 허용 확장자 확인
      if (!Extensions.includes(file.type)) {
        setAlertMessage(
          "pdf, jpg, png, gif, webp, bmp 파일만 업로드 가능합니다."
        );
        return;
      }

      // 일반 이미지 처리
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedImages((prev) => {
            if (prev.length + updatedImages.length < MAX_IMAGES) {
              return [...prev, e.target!.result as string];
            }
            return prev;
          });
        }
      };
      reader.readAsDataURL(file);
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
