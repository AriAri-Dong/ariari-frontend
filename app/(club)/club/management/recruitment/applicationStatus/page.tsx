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
import NotiPopUp from "@/components/modal/notiPopUp";
import PullDown from "@/components/pulldown/pullDown";
import SubSearchInput from "@/components/input/subSearchInput";
import RangeCalendar from "@/components/calendar/rangeCalendar";
import CommonBottomSheet from "@/components/bottomSheet/commonBottomSheet";
import LeftMenu from "@/(club)/club/components/menu/leftMenu";
import MobileMenu from "@/(club)/club/components/menu/mobileMenu";
import { useApplicationQuery } from "@/hooks/apply/useApplicationQuery";
import { useSearchParams } from "next/navigation";
import { formatLocalDateTime } from "@/utils/dateFormatter";
import { ApplyData } from "@/types/application";
import { APPLY_STATUS } from "@/constants/application";

// 상단 필터링 탭
const FILTER_TABS = [
  { id: 1, label: "전체", number: 0 },
  { id: 2, label: "대기중", number: 0 },
];
const MOBILE_FILTER_TABS = [{ id: 0, label: "지원 상태" }, ...FILTER_TABS];

// 지원현황 - 지원서별 지원 상태 변경
export const STATUS_OPTIONS = [
  { id: 1, label: "면접중" },
  { id: 2, label: "합격" },
  { id: 3, label: "불합격" },
];

const ApplicationStatusPage = () => {
  const params = useSearchParams();
  const clubId = params.get("clubId") ?? "";

  const isMdUp = useResponsive("md");
  const optionsRef = useRef<HTMLDivElement | null>(null);

  const [filters, setFilters] = useState(FILTER_TABS);
  const [selectedFilter, setSelectedFilter] = useState<string>(
    FILTER_TABS[0].label
  );
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false); // 지원상태 변경 옵션 목록 open 여부
  const [selectedStatus, setSelectedStatus] = useState<string>(""); // 변경하고자 하는 지원 상태
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 지원상태 변경 확인 모달 open 여부

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false); // 지원서 상세 열람 모달 open 여부
  const [checkedApplications, setCheckedApplications] = useState<string[]>([]);

  const {
    allTabSize,
    pendingTabSize,
    applicationsList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalSize,
    isError,
  } = useApplicationQuery(clubId, {
    isPendent: selectedFilter === "대기중",
    query: searchQuery,
    startDateTime: dateRange[0] ? formatLocalDateTime(dateRange[0]) : undefined,
    endDateTime: dateRange[1] ? formatLocalDateTime(dateRange[1]) : undefined,
  });

  const handleMenuClick = (label: string) => {
    setSelectedStatus(label);
    setIsOptionsOpen(false);
    setIsModalOpen(true);
  };

  const handleReset = () => {
    setDateRange([null, null]);
    setSearchQuery("");
    setCheckedApplications([]);
  };

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const handleAllCheck = (isChecked: boolean) => {
    if (isChecked) {
      setCheckedApplications(applicationsList.map((item) => item.id));
    } else {
      setCheckedApplications([]);
    }
  };

  const handleSingleCheck = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedApplications((prev) => [...prev, id]);
    } else {
      setCheckedApplications((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleStatusChange = () => {
    setIsModalOpen(false);
  };

  const handleOpenForm = () => {
    setIsFormOpen(true);
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

  useEffect(() => {
    setFilters((prev) => [
      { ...prev[0], number: allTabSize },
      { ...prev[1], number: pendingTabSize },
    ]);
  }, [allTabSize, pendingTabSize]);

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
                  optionData={filters}
                  selectedOption={selectedFilter}
                  handleOption={(label: string) => setSelectedFilter(label)}
                />
              </div>

              <div
                className="flex gap-4 flex-col-reverse lg:flex-row justify-between items-start
              lg:items-center mb-4 lg:mb-[22px] lg:mt-[22px] lg:gap-0"
              >
                <p className="text-subtext2 text-mobile_body2_m md:text-h4">
                  총 {totalSize}개의 지원서가 있어요.
                </p>
                <div className="flex items-center flex-row-reverse md:flex-row gap-2.5 md:gap-5">
                  <IconBtn
                    type={"reset"}
                    size={"small"}
                    title={isMdUp ? "초기화" : ""}
                    onClick={handleReset}
                    className="whitespace-nowrap lg:mr-3.5"
                  />
                  <div className="lg:hidden flex items-center">
                    <PullDown
                      optionData={MOBILE_FILTER_TABS}
                      multiple={false}
                      selectedOption={[selectedFilter]}
                      handleOption={(label: string[]) => {
                        if (label[0] !== "지원 상태") {
                          setSelectedFilter(label[0]);
                        } else return;
                      }}
                      optionSize={"small"}
                    />
                  </div>
                  <div className="smm:block hidden">
                    <RangeCalendar
                      onDateChange={setDateRange}
                      selectedRange={dateRange}
                    />
                  </div>

                  <SubSearchInput
                    onSearch={handleSearchQuery}
                    placeholder={"이름 또는 공고 제목"}
                    className="lg:block hidden"
                  />
                </div>
                <div className="smm:hidden block">
                  <RangeCalendar
                    onDateChange={setDateRange}
                    selectedRange={dateRange}
                  />
                </div>
                <SubSearchInput
                  onSearch={handleSearchQuery}
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
                      checkedApplications.length === applicationsList.length
                    }
                    label={"전체 선택"}
                    onClick={() =>
                      handleAllCheck(
                        checkedApplications.length !== applicationsList.length
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
                          selectedOption={""}
                          optionData={STATUS_OPTIONS}
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
                      checkedApplications.length === applicationsList.length
                    }
                    label={"전체 선택"}
                    onClick={() =>
                      handleAllCheck(
                        checkedApplications.length !== applicationsList.length
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
              {/* 지원서 목록 */}
              <div className="flex flex-col  gap-2.5">
                {applicationsList.map((item: ApplyData) => {
                  return (
                    <ApplicationFormCard
                      key={item.id}
                      applyInfo={item}
                      isChecked={checkedApplications.includes(item.id)}
                      onClick={handleOpenForm}
                      onCheck={(isChecked) =>
                        handleSingleCheck(item.id, isChecked)
                      }
                    />
                  );
                })}
              </div>
              {hasNextPage && (
                <div className="flex justify-center mt-9 md:mt-10">
                  <PlusBtn title={"더보기"} onClick={fetchNextPage} />
                </div>
              )}
            </div>
          </div>
        </div>
        {isMdUp ? isFormOpen && null : isFormOpen && null}
        {isOptionsOpen && !isMdUp && (
          <CommonBottomSheet
            optionData={STATUS_OPTIONS}
            selectedOption={""}
            handleMenuClick={handleMenuClick}
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
