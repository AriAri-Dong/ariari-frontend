import { formatBase64ToFile } from "@/utils/formatBase64ToFile";
import { useRef, useState } from "react";

export const MAX_IMAGES = 10;
const MAX_FILE_SIZE = 100 * 1024 * 1024;

interface useClubNoticeFormProps {
  onSubmit: (formData: FormData) => void;
  setAlertMessage: (message: string) => void;
}
export const useClubNoticeForm = ({
  onSubmit,
  setAlertMessage,
}: useClubNoticeFormProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [isFixed, setIsFixed] = useState<boolean>(false);
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

  // 공지사항 등록
  const handleSubmit = () => {
    if (validateForm()) {
      const formData = new FormData();

      formData.append("saveReq", JSON.stringify({ title, body, isFixed }));
      uploadedImages.forEach((image, idx) => {
        const fileName = `club-notice-${idx}`;
        const file = formatBase64ToFile(image, fileName);
        if (file) {
          formData.append("files", file);
        }
      });
      onSubmit(formData);
    }
  };

  return {
    title,
    setTitle,
    body,
    setBody,
    isFixed,
    setIsFixed,
    uploadedImages,
    fileInputRef,
    handleImageDelete,
    triggerFileInput,
    handleFileChange,
    validateForm,
    handleSubmit,
  };
};
