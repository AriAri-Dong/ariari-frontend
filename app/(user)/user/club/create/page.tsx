"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PullDown from "@/components/pulldown/pullDown";
import {
  AFFILIATION_TYPE,
  AREA_TYPE,
  FIELD_TYPE,
  TARGET_TYPE,
} from "@/data/pulldown";
import TextInputWithCounter from "@/components/input/textInputWithCounter";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import LargeBtn from "@/components/button/basicBtn/largeBtn";
import defaultImg from "@/images/icon/defaultAriari.svg";
import Image from "next/image";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import vector from "@/images/icon/backVector.svg";
import Alert from "@/components/alert/alert";
import NotiPopUp from "@/components/modal/notiPopUp";
import { createClubWithFile, getAllClubsInfo } from "@/api/club/api";
import { convertToServerFormat } from "@/utils/convertToServerFormat";
import {
  ClubResponse,
  ClubSearchCondition,
  CreateClubData,
  Pageable,
} from "@/types/api";

const OPTIONS = [
  {
    label: "동아리 소속",
    key: "affiliationType",
    data: AFFILIATION_TYPE.slice(1),
  },
  { label: "동아리 분야", key: "fieldType", data: FIELD_TYPE.slice(1) },
  { label: "동아리 지역", key: "areaType", data: AREA_TYPE.slice(1) },
  { label: "동아리 대상", key: "targetType", data: TARGET_TYPE.slice(1) },
];

const CreateClubPage = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [submit, setSubmit] = useState<boolean>(false);
  const [createdClubId, setCreatedClubId] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [clubName, setClubName] = useState<string>("");
  const [clubIntroduction, setClubIntroduction] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selections, setSelections] = useState({
    affiliationType: [] as string[],
    fieldType: [] as string[],
    areaType: [] as string[],
    targetType: [] as string[],
  });

  const handleGoBack = () => {
    // 임시 경로
    router.push("/club");
  };

  const handleClubNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClubName(event.target.value);
  };

  const handleClubIntroductionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setClubIntroduction(event.target.value);
  };

  const handleSelectionChange =
    (key: keyof typeof selections) => (value: string[]) => {
      setSelections((prev) => ({ ...prev, [key]: value }));
    };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 용량 및 확장자 확인
      const maxFileSize = 100 * 1024 * 1024; // 100MB
      const allowedExtensions = ["image/png", "image/jpeg", "image/svg+xml"];
      if (file.size > maxFileSize) {
        setAlertMessage("파일 용량은 100MB를 초과할 수 없습니다.");
        setAlertVisible(true);
        return;
      }
      if (!allowedExtensions.includes(file.type)) {
        setAlertMessage("png, jpg, svg 파일만 업로드 가능합니다.");
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

  const validateForm = () => {
    if (
      !clubName.trim() ||
      selections.affiliationType.length === 0 ||
      selections.fieldType.length === 0 ||
      selections.areaType.length === 0 ||
      selections.targetType.length === 0
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setAlertVisible(false);
      setTimeout(() => {
        setAlertVisible(true);
        setAlertMessage("미입력한 항목이 있습니다.");
      }, 0);
      return;
    }

    setSubmit(true);
    setAlertVisible(false);

    const convertedData = convertToServerFormat(
      selections.affiliationType[0],
      selections.fieldType[0],
      selections.areaType[0],
      selections.targetType[0]
    );

    const clubData: CreateClubData = {
      name: clubName,
      body: clubIntroduction,
      ...convertedData,
    };

    try {
      let fileToSend: File;
      if (uploadedImage) {
        const base64Image = uploadedImage.split(",")[1];
        const byteArray = new Uint8Array(
          atob(base64Image)
            .split("")
            .map((c) => c.charCodeAt(0))
        );
        fileToSend = new File([byteArray], "club_image", {
          type: "image/jpeg",
        });
      } else {
        fileToSend = new File([], "");
      }

      await createClubWithFile(clubData, fileToSend);

      // 클럽 리스트에서 ID 찾기
      const response: ClubResponse = await getAllClubsInfo(
        {
          clubCategoryTypes: undefined,
          clubRegionTypes: undefined,
          participantTypes: undefined,
        },
        {
          page: 0,
          size: 100,
          sort: [""],
        }
      );

      const createdClub = response.clubDataList.find(
        (club) => club.name === clubName
      );

      if (createdClub) {
        setCreatedClubId(createdClub.id);
      } else {
        throw new Error("생성된 동아리를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("동아리 생성 실패:", error);
      setAlertMessage("동아리 생성에 실패했습니다.");
      setAlertVisible(true);
      setSubmit(false);
    }
  };

  const handleWritePosting = () => {
    setSubmit(false);

    if (createdClubId) {
      router.push(`/club/activityHistory?clubId=${createdClubId}`);
    } else {
      router.push("/exploration");
    }
  };

  const handleTakeALook = () => {
    setSubmit(false);
    // 임시 경로
    router.push("/exploration");
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between mt-[46px] mb-5 md:mt-8 md:mb-[22px]">
        <div className="flex gap-2">
          <Image
            src={vector}
            alt={"뒤로가기"}
            width={24}
            height={24}
            onClick={handleGoBack}
            className="md:hidden cursor-pointer"
          />
          <div className="flex flex-col gap-[22px]">
            <h1 className="text-text1 text-mobile_h1_contents_title md:text-h1_contents_title">
              동아리 만들기
            </h1>
          </div>
        </div>
      </div>
      <div className="bg-background rounded-lg md:py-[26px] md:px-6 md:mb-[124px]">
        <h3 className="flex text-mobile_h3 mb-[14px] md:text-h3 md:mb-[18px]">
          동아리 대표 이미지
        </h3>
        <p className="hidden md:block text-subtext1 text-body3_r mb-[18px] ">
          유해한 내용이 포함된 사진일 경우, 별도의 안내 없이 사진이 삭제
          처리되며 서비스 이용에 제한이 있을 수 있습니다. <br /> ( 100MB 이하의
          png, jpg, svg를 올려주세요 )
        </p>
        <div className="relative inline-block mb-[30px] md:mb-7">
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
              className="md:w-[152px] md:h-[152px] rounded-full border border-menuborder p-1 cursor-pointer"
            />
          </label>
          <div className="absolute bottom-0 right-0 translate-x-1/5 translate-y-1/5">
            <WriteBtn size="small" onClick={triggerFileInput} />
          </div>
        </div>

        <h3 className="flex text-mobile_h3 mb-[14px] md:text-h3 md:mb-2.5">
          동아리 이름
          <span className="text-noti text-mobile_body3_m pl-1">*</span>
        </h3>
        <TextInputWithCounter
          value={clubName}
          onChange={handleClubNameChange}
          placeholder="동아리 이름"
          maxLength={30}
          className="mb-[30px] md:mb-7 max-w-[770px]"
        />
        <h3 className="flex text-mobile_h3 mb-[14px] md:text-h3 md:mb-2.5">
          동아리 한 줄 소개
        </h3>
        <TextInputWithCounter
          value={clubIntroduction}
          onChange={handleClubIntroductionChange}
          placeholder="동아리 한 줄 소개"
          maxLength={30}
          className="mb-[30px] md:mb-7 max-w-[770px]"
        />
        {OPTIONS.map(({ label, key, data }) => (
          <div className="flex flex-col mb-[30px] md:mb-7" key={key}>
            <h3 className="flex text-mobile_h3 mb-[14px] md:text-h3 md:mb-[18px]">
              {label}
              <span className="text-noti text-mobile_body3_m pl-1">*</span>
            </h3>
            <div className="flex">
              <PullDown
                optionData={data}
                optionSize="small"
                handleOption={handleSelectionChange(
                  key as keyof typeof selections
                )}
                selectedOption={selections[key as keyof typeof selections]}
              />
            </div>
          </div>
        ))}
        <SmallBtn
          title={"동아리 만들기"}
          onClick={handleSubmit}
          className="hidden md:block"
        />
        <LargeBtn
          title={"동아리 만들기"}
          onClick={handleSubmit}
          className="block md:hidden mb-20"
        />
      </div>
      {alertVisible && <Alert text={alertMessage} />}
      {submit && (
        <NotiPopUp
          onClose={() => {
            setSubmit(false);
          }}
          icon={"celebration"}
          title={"동아리 개설 완료"}
          description={
            "동아리 개설을 축하드려요! <br/> 모집공고를 작성하고 동아리원들을 만나보세요"
          }
          modalType={"button"}
          firstButton={handleWritePosting}
          firstButtonText={"모집공고 작성하기"}
          secondButton={handleTakeALook}
          secondButtonText={"새 동아리 둘러보기"}
        />
      )}
    </div>
  );
};

export default CreateClubPage;
