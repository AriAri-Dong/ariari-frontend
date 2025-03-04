"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import SubTap from "@/components/tab/subTap";
import useResponsive from "@/hooks/useResponsive";
import IconBtn from "@/components/button/withIconBtn/IconBtn";
import AllCheckBox from "@/components/checkBox/allCheckBox";
import ApplicationFormCard from "@/components/card/applicationFormCard";
import vector from "@/images/icon/sub_pull_down.svg";
import SingleSelectOptions from "@/components/pulldown/singleSelectOptions";
import { APPLICATION_FORM_DATA } from "@/data/application";
import NotiPopUp from "@/components/modal/notiPopUp";
import PullDown from "@/components/pulldown/pullDown";
import SubSearchInput from "@/components/input/subSearchInput";
import RangeCalendar from "@/components/calendar/rangeCalendar";
import CommonBottomSheet from "@/components/bottomSheet/commonBottomSheet";
import LeftMenu from "@/(club)/club/components/menu/leftMenu";
import MobileMenu from "@/(club)/club/components/menu/mobileMenu";

const OPTIONS = [
  { id: 0, label: "전체", number: 14 },
  { id: 1, label: "대기중", number: 14 },
  { id: 2, label: "면접중", number: 14 },
  { id: 3, label: "합격", number: 14 },
  { id: 4, label: "불합격", number: 14 },
];

const MOBILE_OPTIONS = [
  { id: 0, label: "지원 상태", number: 14 },
  { id: 1, label: "대기중", number: 14 },
  { id: 2, label: "면접중", number: 14 },
  { id: 3, label: "합격", number: 14 },
  { id: 4, label: "불합격", number: 14 },
];

const ApplicationStatusPage = () => {
  const isMdUp = useResponsive("md");
  const optionsRef = useRef<HTMLDivElement | null>(null);

  const [option, setOption] = useState<string>(OPTIONS[0].label);
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedSortOption, setSelectedSortOption] = useState<string[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<number[]>(
    []
  );

  const handleMenuClick = (label: string) => {
    setSelectedOption("");
    setSelectedStatus(label);
    setIsOptionsOpen(false);
    setIsModalOpen(true);
  };

  const handleAllCheck = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedApplications(APPLICATION_FORM_DATA.map((item) => item.id));
    } else {
      setSelectedApplications([]);
    }
  };

  const handleSingleCheck = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedApplications((prev) => [...prev, id]);
    } else {
      setSelectedApplications((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleStatusChange = () => {
    setIsModalOpen(false);
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setIsOptionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="bg-sub_bg flex justify-center items-center w-full pb-20 md:pb-[124px]">
        <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 md:mt-8 md:px-5">
          <MobileMenu />
          <div className="flex lg:gap-9">
            {/* 임시 메뉴 */}
            <LeftMenu />
            <div className="w-full">
              <div className="overflow-x-auto no-scrollbar hidden lg:block">
                <SubTap
                  optionData={OPTIONS}
                  selectedOption={option}
                  handleOption={setOption}
                />
              </div>

              <div
                className="flex gap-4 flex-col-reverse lg:flex-row justify-between items-start
              lg:items-center mb-4 lg:mb-[22px] lg:mt-[22px] lg:gap-0"
              >
                <p className="text-subtext2 text-mobile_body2_m md:text-h4">
                  총 {APPLICATION_FORM_DATA.length}개의 지원서가 있어요.
                </p>
                <div className="flex items-center flex-row-reverse md:flex-row gap-2.5 md:gap-5">
                  <IconBtn
                    type={"reset"}
                    size={"small"}
                    title={isMdUp ? "초기화" : ""}
                    onClick={() => {}}
                    className="whitespace-nowrap lg:mr-3.5"
                  />
                  <div className="lg:hidden flex items-center">
                    <PullDown
                      optionData={MOBILE_OPTIONS}
                      multiple={false}
                      selectedOption={selectedSortOption}
                      handleOption={setSelectedSortOption}
                      optionSize={"small"}
                    />
                  </div>
                  <div className="smm:block hidden">
                    <RangeCalendar />
                  </div>
                  <SubSearchInput
                    onSearch={() => {}}
                    placeholder={"이름 또는 공고 제목"}
                    className="lg:block hidden"
                  />
                </div>
                <div className="smm:hidden block">
                  <RangeCalendar />
                </div>
                <SubSearchInput
                  onSearch={() => {}}
                  placeholder={"이름 또는 공고 제목"}
                  className="lg:hidden"
                />
              </div>
              {isMdUp ? (
                <div
                  className="flex-row justify-between items-center w-full my-2.5 hidden md:flex
                  py-2.5 pl-6 pr-[150px] rounded-lg bg-white70 text-subtext2 text-body1_m"
                >
                  <AllCheckBox
                    isChecked={
                      selectedApplications.length ===
                      APPLICATION_FORM_DATA.length
                    }
                    label={"전체 선택"}
                    onClick={() =>
                      handleAllCheck(
                        selectedApplications.length !==
                          APPLICATION_FORM_DATA.length
                      )
                    }
                  />
                  <div
                    className="relative flex items-center gap-2 cursor-pointer"
                    onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                  >
                    <p>지원상태 변경</p>
                    <Image alt={"버튼"} src={vector} width={28} height={28} />
                    {isOptionsOpen && (
                      <div
                        ref={optionsRef}
                        className="absolute top-full mt-2 z-50 left-12"
                      >
                        <SingleSelectOptions
                          selectedOption={selectedOption}
                          optionData={[
                            { id: 1, label: "합격" },
                            { id: 2, label: "불합격" },
                            { id: 3, label: "대기중" },
                            { id: 4, label: "면접중" },
                          ]}
                          size="medium"
                          handleMenuClick={handleMenuClick}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex justify-between mb-4">
                  <AllCheckBox
                    isChecked={
                      selectedApplications.length ===
                      APPLICATION_FORM_DATA.length
                    }
                    label={"전체 선택"}
                    onClick={() =>
                      handleAllCheck(
                        selectedApplications.length !==
                          APPLICATION_FORM_DATA.length
                      )
                    }
                  />
                  <div
                    className="flex gap-1 items-center"
                    onClick={() => setIsOptionsOpen(true)}
                  >
                    <p className="text-subtext2 text-mobile_body2_m">
                      지원상태 변경
                    </p>
                    <Image alt={"버튼"} src={vector} width={20} height={20} />
                  </div>
                </div>
              )}
              <div className="flex flex-col  gap-2.5">
                {APPLICATION_FORM_DATA.map((item) => {
                  return (
                    <ApplicationFormCard
                      key={item.id}
                      clubName={item.activityName}
                      serviceNickname={item.nickname}
                      status={item.status}
                      recruitmentTitle={item.jobTitle}
                      isChecked={selectedApplications.includes(item.id)}
                      onClick={handleOpenForm}
                      onCheck={(isChecked) =>
                        handleSingleCheck(item.id, isChecked)
                      }
                    />
                  );
                })}
              </div>
              <div className="flex justify-center mt-9 md:mt-10">
                <PlusBtn title={"더보기"} onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
        {isMdUp ? openForm && null : openForm && null}
        {isOptionsOpen && !isMdUp && (
          <CommonBottomSheet
            optionData={OPTIONS}
            selectedOption={selectedStatus}
            handleMenuClick={(label: string) => {
              setSelectedStatus(label);
              setIsOptionsOpen(false);
              setIsModalOpen(true);
            }}
            onClose={() => setIsOptionsOpen(false)}
          />
        )}

        {isModalOpen && (
          <NotiPopUp
            onClose={() => setIsModalOpen(false)}
            icon="delete"
            title="지원상태 변경"
            description={`선택한 지원자들의 지원상태를 \n ${selectedStatus}로 변경할까요?`}
            firstButton={handleStatusChange}
            firstButtonText="변경하기"
            secondButton={() => setIsModalOpen(false)}
            secondButtonText="취소하기"
            modalType="button"
          />
        )}
      </div>
    </>
  );
};

export default ApplicationStatusPage;
