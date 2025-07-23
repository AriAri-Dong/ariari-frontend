import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import close from "@/images/icon/close.svg";
import Alert from "@/components/alert/alert";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import defaultImg from "@/images/icon/defaultAriari.svg";
import defaultBgImg from "@/images/defaultAriariBg.svg";
import { ModalProps } from "@/types/components/modal";
import TextInputWithCounter from "@/components/input/textInputWithCounter";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import CustomInput from "@/components/input/customInput";
import NotiPopUp from "../notiPopUp";
import trash from "@/images/icon/delete.svg";
import NoticeBanner from "@/components/banner/noticeBanner";
import { updateClubWithFiles } from "@/api/club/api";
import { useSearchParams } from "next/navigation";
import { useClubInfoQuery } from "@/hooks/club/useClubInfoQuery";
import { getClubOptions } from "@/utils/convertToServerFormat";
import { Extensions } from "@/types/file";

/**
 * 동아리 정보 수정 모달
 * @param onClose: 모달 닫기 함수
 * @param onSubmit: 제출 함수
 */
const ModifyClubInfoModal = ({ onClose, onSubmit }: ModalProps) => {
  const searchParams = useSearchParams();
  const clubId = searchParams.get("clubId") || "";
  const { clubInfo } = useClubInfoQuery(clubId);
  const clubData = clubInfo?.clubData;

  const options = clubData ? getClubOptions(clubData) : [];

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const bannerFileInputRef = useRef<HTMLInputElement | null>(null);

  const [clubIntroduction, setClubIntroduction] = useState<string>(
    clubData?.body || ""
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    clubData?.profileUri || null
  );
  const [bannerImage, setBannerImage] = useState<string | null>(
    clubData?.bannerUri || null
  );
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);
  const [modify, setModify] = useState<boolean>(false);

  // 동아리 한 줄 소개
  const handleClubIntroductionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setClubIntroduction(event.target.value);
    setModify(true);
  };

  // 이미지 처리 공통 함수 (파일 용량 및 확장자 확인)
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxFileSize = 15 * 1024 * 1024; // 15MB 제한
    if (file.size > maxFileSize) {
      setAlertMsg("파일 용량은 15MB를 초과할 수 없습니다.");
      setAlertVisible(true);
      return;
    }

    const heic2any = (await import("heic2any")).default;

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
        reader.onload = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(convertedFile);
        return;
      } catch (error) {
        console.error("HEIC 변환 실패:", error);
        setAlertMsg("HEIC 파일을 변환하는 데 실패했습니다.");
        setAlertVisible(true);
        return;
      }
    }

    if (!Extensions.includes(file.type)) {
      setAlertMsg("pdf, jpg, png, gif, webp, bmp 파일만 업로드 가능합니다.");
      setAlertVisible(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleBannerFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setBannerImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxFileSize = 15 * 1024 * 1024;
    if (file.size > maxFileSize) {
      setAlertMsg("파일 용량은 15MB를 초과할 수 없습니다.");
      setAlertVisible(true);
      return;
    }
    const heic2any = (await import("heic2any")).default;

    // HEIC 처리
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
        reader.onload = () => {
          setBannerImage(reader.result as string);
        };
        reader.readAsDataURL(convertedFile);
        return;
      } catch (error) {
        console.error("HEIC 변환 실패:", error);
        setAlertMsg("HEIC 파일을 변환하는 데 실패했습니다.");
        setAlertVisible(true);
        return;
      }
    }

    if (!Extensions.includes(file.type)) {
      setAlertMsg("pdf, jpg, png, gif, webp, bmp 파일만 업로드 가능합니다.");
      setAlertVisible(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setBannerImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 동아리 배너 이미지
  const triggerBannerFileInput = () => {
    if (bannerFileInputRef.current) {
      bannerFileInputRef.current.click();
    }
    setModify(true);
  };

  // 동아리 대표 이미지
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    setModify(true);
  };

  // 수정하기
  const handleSubmit = async () => {
    // 동아리 한 줄 소개 값
    const bodyData = { body: clubIntroduction || "" };

    // 프로필 이미지 처리
    let profileFile: File | null = null;

    if (uploadedImage) {
      // 새 프로필 이미지가 업로드된 경우
      const base64Image = uploadedImage.includes("base64,")
        ? uploadedImage.split("base64,")[1]
        : null;

      if (base64Image) {
        try {
          const byteArray = new Uint8Array(
            atob(base64Image)
              .split("")
              .map((c) => c.charCodeAt(0))
          );
          profileFile = new File([byteArray], "profile_image", {
            type: "image/jpeg",
          });
        } catch (error) {
          console.error("Invalid Base64 string", error);
          setAlertMsg("프로필 이미지가 유효하지 않습니다.");
          setAlertVisible(true);
          return;
        }
      }
    } else if (uploadedImage === null) {
      // 프로필 이미지 삭제 요청 시, 기본 이미지를 설정
      const defaultImgFile = new File(
        [new Blob([defaultImg], { type: "image/svg+xml" })],
        "default_profile_image.svg",
        { type: "image/svg+xml" }
      );
      // profileFile = defaultImgFile; // 기본 이미지 파일을 보내도록 설정
      // 서버 에러 발생하는 부분!!!
      profileFile = null;
    } else {
      // 프로필 이미지가 수정되지 않은 경우, 기본 이미지를 그대로 사용
      if (clubData?.profileUri) {
        // 기존 이미지를 그대로 보내기 위해 기본 이미지를 사용할 수 있음
        const defaultImgFile = new File(
          [new Blob([defaultImg], { type: "image/svg+xml" })],
          "default_profile_image.svg",
          { type: "image/svg+xml" }
        );
        profileFile = defaultImgFile;
      }
    }

    // 배너 이미지 처리
    // 서버 에러 발생하는 부분!!! (배너 이미지 전송 시 서버 에러 발생)
    let bannerFile: File | null = null;

    if (bannerImage) {
      const base64Banner = bannerImage.includes("base64,")
        ? bannerImage.split("base64,")[1]
        : null;

      if (base64Banner) {
        try {
          const byteArray = new Uint8Array(
            atob(base64Banner)
              .split("")
              .map((c) => c.charCodeAt(0))
          );
          bannerFile = new File([byteArray], "banner_image", {
            type: "image/jpeg",
          });
        } catch (error) {
          console.error("Invalid Base64 string", error);
          setAlertMsg("배너 이미지가 유효하지 않습니다.");
          setAlertVisible(true);
          return;
        }
      }
    } else if (bannerImage === null) {
      // 배너 이미지 삭제 요청 시, 기본 배너 이미지를 설정
      const defaultBgFile = new File(
        [new Blob([defaultBgImg], { type: "image/svg+xml" })],
        "default_banner_image.svg",
        { type: "image/svg+xml" }
      );
      // bannerFile = defaultBgFile; // 기본 배너 이미지를 보내도록 설정
      bannerFile = null;
    } else {
      // 배너 이미지가 수정되지 않은 경우, 기본 배너 이미지를 그대로 사용
      if (clubData?.bannerUri) {
        // 기존 배너 이미지를 그대로 보내기 위해 기본 배너 이미지를 사용할 수 있음
        const defaultBgFile = new File(
          [new Blob([defaultBgImg], { type: "image/svg+xml" })],
          "default_banner_image.svg",
          { type: "image/svg+xml" }
        );
        bannerFile = defaultBgFile;
      }
    }

    try {
      // 동아리 정보 수정 API 호출
      await updateClubWithFiles(clubId, bodyData, profileFile, bannerFile);
      onSubmit();
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("Error updating club info:", error);
      setAlertMsg("동아리 정보 수정에 실패했습니다.");
      setAlertVisible(true);
    }
  };

  // 닫기
  const handleClose = () => {
    if (modify) {
      setSubmit(true);
    } else {
      onClose();
    }
  };

  // 이미지 삭제 처리
  const handleImageDelete = (imageType: "uploaded" | "banner") => {
    if (imageType === "uploaded") {
      setUploadedImage(null);
    } else {
      setBannerImage(null);
    }
  };

  // 스크롤 방지
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
        (e.target as HTMLDivElement).id === "background" && handleClose()
      }
    >
      <div
        className={`bg-white p-5 shadow-modal rounded-2xl w-[826px] max-h-[90vh] flex flex-col`}
      >
        <div className="flex justify-between mb-5">
          <h1 className="text-text1 text-h1_contents_title">
            동아리 정보 수정하기
          </h1>
          <Image
            src={close}
            alt={"닫기"}
            width={24}
            height={24}
            onClick={handleClose}
            className="md:w-6 md:h-6 cursor-pointer"
          />
        </div>
        <div className="h-[1px] bg-menuborder" />

        {/* content 영역 (스크롤 가능한 영역) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <NoticeBanner
            text={
              "동아리 이름과 세부 카테고리 수정은 아리아리 고객센터로 문의해주세요."
            }
            className="mt-[22px]"
          />
          {/* 동아리 배너 이미지 */}
          <h3 className="flex text-text1 text-h3 mt-7 mb-[18px]">
            동아리 배너 이미지
          </h3>
          <div className="relative group">
            <input
              ref={bannerFileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleBannerFileChange(e, setBannerImage)}
            />
            <Image
              src={bannerImage || defaultBgImg}
              alt={"Banner Image"}
              className="rounded-20 w-full h-[196px] transition-all duration-300"
              height={196}
              width={780}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-20">
              <div className="flex justify-center items-center w-full h-full">
                <div className="flex p-[6px] rounded-full bg-black_50 cursor-pointer">
                  <Image
                    alt={"delete"}
                    src={trash}
                    width={24}
                    height={24}
                    onClick={() => handleImageDelete("banner")}
                  />
                </div>
              </div>
            </div>
            <div className="absolute bottom-5 right-5 cursor-pointer block">
              <WriteBtn size="small" onClick={triggerBannerFileInput} />
            </div>
          </div>
          {/* 동아리 대표 이미지 */}
          <h3 className="flex text-text1 text-h3 mt-7 mb-[18px]">
            동아리 대표 이미지
          </h3>
          <div className="relative inline-block group">
            <label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, setUploadedImage)}
              />
              <Image
                src={uploadedImage || defaultImg}
                alt="Uploaded or Default"
                width={116}
                height={116}
                className="rounded-full border border-menuborder p-1 cursor-pointer h-[116px] w-[116px]"
              />
            </label>
            <div
              className="absolute rounded-full inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300
            w-[114px] h-[114px]"
            >
              <div className="flex justify-center items-center w-full h-full">
                <div className="flex p-[6px] rounded-full bg-black_50 cursor-pointer">
                  <Image
                    alt={"delete"}
                    src={trash}
                    width={24}
                    height={24}
                    onClick={() => handleImageDelete("uploaded")}
                  />
                </div>
              </div>
            </div>
            {/* 수정 버튼 */}
            <div className="absolute bottom-0 right-0 translate-x-1/5 translate-y-1/5">
              <WriteBtn size="small" onClick={triggerFileInput} />
            </div>

            {/* 삭제 아이콘 */}
          </div>
          {/* 동아리 이름 */}
          <h3 className="flex text-text1 text-h3 mt-7 mb-[18px]">
            동아리 이름
          </h3>
          <CustomInput
            value={clubData?.name || ""}
            onChange={() => {}}
            placeholder={""}
            disable={true}
          />
          {/* 동아리 한 줄 소개 */}
          <h3 className="flex text-text1 text-h3 mt-7 mb-[18px]">
            동아리 한 줄 소개
          </h3>
          <TextInputWithCounter
            value={clubIntroduction}
            onChange={handleClubIntroductionChange}
            placeholder="동아리 한 줄 소개"
            maxLength={30}
          />
          <h3 className="flex text-text1 text-h3 mt-7 mb-[18px]">
            동아리 세부 카테고리
          </h3>
          <div className="flex justify-between mb-10 text-center">
            {options.map((item) => (
              <div className="flex flex-col gap-[14px]" key={item.label}>
                <p className="text-subtext2 text-body2_m">{item.label}</p>
                <h3 className="text-h4_sb text-text1">{item.value}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end mt-6 pb-1">
          <SmallBtn title="수정하기" onClick={handleSubmit} />
        </div>
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
      {alertVisible && <Alert text={alertMsg} />}
      {submit && (
        <NotiPopUp
          onClose={() => {
            setSubmit(false);
          }}
          icon={"not"}
          title={"수정사항을 삭제할까요?"}
          description={
            "현재 수정 중이던 항목이 있어요. <br/> 해당 항목의 변경된 내용을 삭제할까요?"
          }
          modalType={"button"}
          firstButton={() => {
            onClose();
          }}
          firstButtonText={"삭제하기"}
          secondButton={() => {
            setSubmit(false);
          }}
          secondButtonText={"수정하기"}
        />
      )}
    </div>
  );
};

export default ModifyClubInfoModal;
