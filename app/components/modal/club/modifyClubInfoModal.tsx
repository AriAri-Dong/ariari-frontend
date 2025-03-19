import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import close from "@/images/icon/close.svg";
import Alert from "@/components/alert/alert";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import defaultImg from "@/images/icon/defaultAriari.svg";
import { ModalProps } from "@/types/components/modal";
import TextInputWithCounter from "@/components/input/textInputWithCounter";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import test_image from "@/images/test/test_image.jpg";
import CustomInput from "@/components/input/customInput";
import NotiPopUp from "../notiPopUp";
import trash from "@/images/icon/delete.svg";
import NoticeBanner from "@/components/banner/noticeBanner";
import { updateClubWithFiles } from "@/api/club/api";
import { useSearchParams } from "next/navigation";
import { useClubInfoQuery } from "@/hooks/club/useClubInfoQuery";

const OPTIONS = [
  { label: "동아리 소속", value: "아리아리" },
  { label: "활동 분야", value: "프로그래밍" },
  { label: "활동 지역", value: "서울" },
  { label: "활동 대상", value: "대학생 및 직장인" },
];

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
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxFileSize = 100 * 1024 * 1024;
      const allowedExtensions = ["image/png", "image/jpeg", "image/svg+xml"];
      if (file.size > maxFileSize) {
        setAlertMsg("파일 용량은 100MB 를 초과할 수 없습니다.");
        setAlertVisible(true);
        return;
      }
      if (!allowedExtensions.includes(file.type)) {
        setAlertMsg("png, jpg, svg 파일만 업로드 가능합니다.");
        setAlertVisible(true);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setBannerImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxFileSize = 100 * 1024 * 1024;
      const allowedExtensions = ["image/png", "image/jpeg", "image/svg+xml"];
      if (file.size > maxFileSize) {
        setAlertMsg("파일 용량은 100MB 를 초과할 수 없습니다.");
        setAlertVisible(true);
        return;
      }
      if (!allowedExtensions.includes(file.type)) {
        setAlertMsg("png, jpg, svg 파일만 업로드 가능합니다.");
        setAlertVisible(true);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setBannerImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
    setSubmit(true);

    // 기존 clubData에서 기본 값 가져오기
    const bodyData = { body: clubIntroduction || "" };

    // 프로필 이미지 처리
    let profileFile = null;
    if (uploadedImage) {
      // Base64로 인코딩된 이미지인지 확인하고, 해당 부분만 추출
      const base64Image = uploadedImage.includes("base64,")
        ? uploadedImage.split("base64,")[1]
        : null; // base64, 부분을 제외한 실제 Base64 데이터만 추출

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
          setAlertMsg("이미지가 유효하지 않습니다.");
          setAlertVisible(true);
          setSubmit(false);
          return;
        }
      } else {
        // Base64 형식이 아니면 그대로 파일을 보내지 않음
        profileFile = null;
      }
    }

    // 배너 이미지 처리
    let bannerFile = null;
    if (bannerImage) {
      // Base64로 인코딩된 배너 이미지 처리
      const base64Banner = bannerImage.includes("base64,")
        ? bannerImage.split("base64,")[1]
        : null; // base64, 부분을 제외한 실제 Base64 데이터만 추출

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
          setSubmit(false);
          return;
        }
      } else {
        // Base64 형식이 아니면 그대로 파일을 보내지 않음
        bannerFile = null;
      }
    }

    try {
      // 동아리 정보 수정 API 호출
      await updateClubWithFiles(clubId, bodyData, profileFile, bannerFile);
      setSubmit(false); // 수정 완료 후 상태 초기화
      onSubmit();
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("Error updating club info:", error);
      setAlertMsg("동아리 정보 수정에 실패했습니다.");
      setAlertVisible(true);
      setSubmit(false); // 실패 후 상태 초기화
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
              src={bannerImage || test_image}
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
            {OPTIONS.map((item) => {
              return (
                <div className="flex flex-col gap-[14px]" key={item.label}>
                  <p className="text-subtext2 text-body2_m">{item.label}</p>
                  <h3 className="text-h4_sb text-text1">{item.value}</h3>
                </div>
              );
            })}
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
      {/* {submit && (
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
      )} */}
    </div>
  );
};

export default ModifyClubInfoModal;
