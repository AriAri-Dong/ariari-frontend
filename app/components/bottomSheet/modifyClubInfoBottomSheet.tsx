import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import close from "@/images/icon/close.svg";
import Alert from "@/components/alert/alert";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import defaultImg from "@/images/icon/defaultAriari.svg";
import { ModalProps } from "@/types/components/modal";
import TextInputWithCounter from "@/components/input/textInputWithCounter";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import Noti from "@/images/icon/noti.svg";
import test_image from "@/images/test/test_image.jpg";
import CustomInput from "@/components/input/customInput";
import LargeBtn from "../button/basicBtn/largeBtn";
import IconBtn from "../button/withIconBtn/IconBtn";

const OPTIONS = [
  { label: "동아리 소속", value: "아리아리" },
  { label: "활동 분야", value: "프로그래밍" },
  { label: "활동 지역", value: "서울" },
  { label: "활동 대상", value: "대학생 및 직장인" },
];

const ModifyClubInfoBottomSheet = ({ onClose, onSubmit }: ModalProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [clubName, setClubName] = useState<string>("");
  const [clubIntroduction, setClubIntroduction] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>("");

  const handleClubIntroductionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setClubIntroduction(event.target.value);
  };

  const handleClubNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClubName(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 용량 및 확장자 확인
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
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 md:hidden flex items-end bg-black/50">
      <div className="absolute inset-0" onClick={handleClose} />
      <div
        className={`relative w-full h-4/5 bg-background px-4 rounded-t-[24px] shadow-default transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        } flex flex-col`}
      >
        {/* 제목 영역 */}
        <div className="flex justify-between mt-[22px] mb-4">
          <h1 className="text-text1 text-mobile_h1_contents_title">
            활동후기 작성하기
          </h1>
          <Image
            src={close}
            alt={"닫기"}
            width={20}
            height={20}
            onClick={handleClose}
          />
        </div>
        {/* 구분선 */}
        <div className="h-[1px] bg-menuborder" />

        {/* 스크롤 가능한 내용 영역 */}
        <div className="flex-1 overflow-y-auto">
          {/* 공지 */}
          <div className="flex bg-sub_bg items-center gap-3 p-4 rounded-12 mt-[22px]">
            <Image src={Noti} alt="공지" width={32} height={32} />
            <p className="text-mobile_body3_m text-icon">
              동아리 이름과 세부 카테고리 수정은 아리아리 고객센터로
              문의해주세요.
            </p>
          </div>
          {/* 배너 */}
          <div className="flex items-center mt-4 mb-[14px] justify-between">
            <h3 className="text-text1 text-mobile_h2">동아리 배너 이미지</h3>
            <IconBtn
              type={"trash"}
              size={"small"}
              title={"삭제하기"}
              onClick={() => {}}
            />
          </div>
          <div className="relative">
            <Image
              src={test_image}
              alt={"Test Image"}
              className="rounded-20 w-full h-[82px]"
            />
            <div className="absolute bottom-2 right-2 cursor-pointer block">
              <WriteBtn size="small" onClick={triggerFileInput} />
            </div>
          </div>
          {/* 이미지 */}
          <div className="flex items-center mt-[30px] mb-[14px] justify-between">
            <h3 className="text-text1 text-mobile_h2">동아리 대표 이미지</h3>
            <IconBtn
              type={"trash"}
              size={"small"}
              title={"삭제하기"}
              onClick={() => {}}
            />
          </div>
          <div className="relative inline-block">
            <label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <Image
                src={uploadedImage || defaultImg}
                alt="Uploaded or Default"
                width={95}
                height={95}
                className="rounded-full border border-menuborder p-1 cursor-pointer"
              />
            </label>
            <div className="absolute bottom-0 right-0 translate-x-1/5 translate-y-1/5">
              <WriteBtn size="small" onClick={triggerFileInput} />
            </div>
          </div>
          <h3 className="text-text1 text-mobile_h2 mt-[30px] mb-[14px]">
            동아리 이름
          </h3>
          <CustomInput
            value={clubName}
            onChange={handleClubNameChange}
            placeholder={""}
            disable={true}
          />
          <h3 className="text-text1 text-mobile_h2 mt-[30px] mb-[14px]">
            동아리 한 줄 소개
          </h3>
          <TextInputWithCounter
            value={clubIntroduction}
            onChange={handleClubIntroductionChange}
            placeholder="동아리 한 줄 소개"
            maxLength={30}
          />
          <h3 className="text-text1 text-mobile_h2 mt-[30px] mb-[14px]">
            동아리 한 줄 소개
          </h3>
          <div className="flex justify-between mb-10 text-center">
            {OPTIONS.map((item) => {
              return (
                <div className="flex flex-col gap-2" key={item.label}>
                  <p className="text-subtext2 text-mobile_body3_r">
                    {item.label}
                  </p>
                  <h3 className="text-mobile_body1_sb text-text1">
                    {item.value}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
        {/* 고정 버튼 영역 */}
        <div className="pb-6 pt-[6px]">
          <LargeBtn title={"등록하기"} onClick={handleSubmit} />
        </div>
      </div>
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
      {alertVisible && <Alert text={alertMsg} />}
    </div>
  );
};

export default ModifyClubInfoBottomSheet;
