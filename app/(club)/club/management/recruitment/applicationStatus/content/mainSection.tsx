"use client";

import React, { useEffect, useState } from "react";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import SubTap from "@/components/tab/subTap";
import useResponsive from "@/hooks/useResponsive";
import IconBtn from "@/components/button/withIconBtn/IconBtn";
import AllCheckBox from "@/components/checkBox/allCheckBox";
import ApplicationFormCard from "@/components/card/applicationFormCard";
import NotiPopUp from "@/components/modal/notiPopUp";
import PullDown from "@/components/pulldown/pullDown";
import SubSearchInput from "@/components/input/subSearchInput";
import LeftMenu from "@/(club)/club/components/menu/leftMenu";
import MobileMenu from "@/(club)/club/components/menu/mobileMenu";
import { useApplicationQuery } from "@/hooks/apply/useApplicationQuery";
import { useSearchParams } from "next/navigation";
import { formatLocalDateTime } from "@/utils/dateFormatter";
import { ApplyData } from "@/types/application";
import { useUpdateStatusMutation } from "@/hooks/apply/useApplicationMutation";
import { APPLY_STATUS_VALUE_MAP } from "@/constants/application";
import Alert from "@/components/alert/alert";
import { useApplyStatusOptions } from "@/hooks/apply/useApplyStatusOptions";
import InterviewNoticeModal from "@/components/modal/club/interviewNoticeModal";
import InterviewNoticeBottomSheet from "@/components/bottomSheet/interviewNoticeBottomSheet";
import MobileApplicationFormViewModal from "@/components/modal/club/mobileApplicationFormViewModal";
import UpdateApplyStatusOption from "@/components/dropdown/updateApplyStatusOption";
import StatelessRangeCalendar from "@/components/calendar/statelessRangeCalendar";
import useDebounce from "@/hooks/useDebounce";
import ApplicationFormViewModal from "@/components/modal/club/applicationFormViewModal";

// 상단 필터링 탭
const FILTER_TABS = [
  { id: 1, label: "전체", number: 0 },
  { id: 2, label: "대기중", number: 0 },
];
const MOBILE_FILTER_TABS = [{ id: 0, label: "지원 상태" }, ...FILTER_TABS];

const MainSection = () => {
  const params = useSearchParams();
  const clubId = params.get("clubId") ?? "";

  const isMdUp = useResponsive("md");

  const [filters, setFilters] = useState(FILTER_TABS);
  const [selectedFilter, setSelectedFilter] = useState<string>(
    FILTER_TABS[0].label
  );
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const debounceSearchQuery = useDebounce<string>(searchQuery);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const [checkedApplications, setCheckedApplications] = useState<string[]>([]);
  const [openApplicationId, setOpenApplicationId] = useState<string | null>(
    null
  );
  const {
    isModalOpen,
    setIsModalOpen,
    selectedOption,
    setSelectedOption,
    isInterviewOpen,
    setIsInterviewOpen,
  } = useApplyStatusOptions();

  // 지원 목록 조건에 따른 필터링
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
    query: debounceSearchQuery,
    startDateTime: dateRange[0] ? formatLocalDateTime(dateRange[0]) : undefined,
    endDateTime: dateRange[1] ? formatLocalDateTime(dateRange[1]) : undefined,
  });

  // 지원 상태 변경 mutation 훅
  const { updateApplicationStatus } = useUpdateStatusMutation({
    options: {
      onSuccess: () => {
        setAlertMessage("지원 상태를 성공적으로 변경했습니다.");
        setCheckedApplications([]);
      },
      onError: () => {
        setAlertMessage("지원 상태를 변경할 수 없습니다.");
      },
    },
  });

  // 검색 input query 변경
  // 기준: 1. 서비스 이름, 2. 지원서 이름, 3. 모집 공고 제목
  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  // 지원서 선택(checkbox)
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

  // 필터링 조건 초기화
  const handleReset = () => {
    setDateRange([null, null]);
    setSearchQuery("");
    setCheckedApplications([]);
  };

  // 지원 상태 변경 확인 모달 내 '변경하기' 버튼 클릭
  const handleStatusChange = () => {
    if (!selectedOption) return;
    if (selectedOption === "면접중") {
      setIsModalOpen(false);
      setIsInterviewOpen(true);
      return;
    }
    updateApplicationStatus.mutate({
      applications: openApplicationId
        ? [openApplicationId]
        : checkedApplications,
      type: APPLY_STATUS_VALUE_MAP[selectedOption],
    });
    setIsModalOpen(false);
  };

  // 면접 확인 메세지 전송
  const handleSubmitInterviewNotice = (message: string) => {
    if (!message) {
      setAlertMessage("면접 메세지를 입력해주세요.");
      return;
    }
    updateApplicationStatus.mutate({
      applications: checkedApplications,
      type: APPLY_STATUS_VALUE_MAP["면접중"],
      interviewMessage: message,
    });
    setIsInterviewOpen(false);
  };

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
                    <StatelessRangeCalendar
                      onDateChange={setDateRange}
                      selectedRange={dateRange}
                    />
                  </div>

                  <SubSearchInput
                    inputValue={searchQuery}
                    onSearch={handleSearchQuery}
                    placeholder={"이름 또는 공고 제목"}
                    className="lg:block hidden"
                  />
                </div>
                <div className="smm:hidden block">
                  <StatelessRangeCalendar
                    onDateChange={setDateRange}
                    selectedRange={dateRange}
                  />
                </div>
                <SubSearchInput
                  inputValue={searchQuery}
                  onSearch={handleSearchQuery}
                  placeholder={"이름 또는 공고 제목"}
                  className="lg:hidden"
                />
              </div>
              {applicationsList.length > 0 &&
                (isMdUp ? (
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
                    <UpdateApplyStatusOption
                      checkedApplications={checkedApplications}
                      setSelectedStatus={setSelectedOption}
                      setAlertMessage={setAlertMessage}
                      setIsModalOpen={setIsModalOpen}
                    />
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
                    <UpdateApplyStatusOption
                      checkedApplications={checkedApplications}
                      setSelectedStatus={setSelectedOption}
                      setAlertMessage={setAlertMessage}
                      setIsModalOpen={setIsModalOpen}
                    />
                  </div>
                ))}

              {/* 지원서 목록 */}
              <div className="flex flex-col gap-2.5">
                {applicationsList.map((item: ApplyData) => {
                  return (
                    <ApplicationFormCard
                      key={item.id}
                      applyInfo={item}
                      isChecked={checkedApplications.includes(item.id)}
                      onCheck={(isChecked) =>
                        handleSingleCheck(item.id, isChecked)
                      }
                      setOpenApplication={setOpenApplicationId}
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
      </div>

      {/* ===== 지원 상태 변경 확인 모달 ===== */}
      {isModalOpen && (
        <NotiPopUp
          onClose={() => setIsModalOpen(false)}
          icon="delete"
          title="지원상태 변경"
          description={`선택한 지원자들의 지원상태를 \n ${selectedOption}으로 변경할까요?`}
          firstButton={handleStatusChange}
          firstButtonText="변경하기"
          secondButton={() => setIsModalOpen(false)}
          secondButtonText="취소하기"
          modalType="button"
        />
      )}

      {/* ===== 지원서 상세보기 모달 =====*/}
      {isMdUp
        ? openApplicationId && (
            <ApplicationFormViewModal
              applyId={openApplicationId}
              onClose={() => setOpenApplicationId(null)}
              setIsModalOpen={setIsModalOpen}
              setSelectedOption={setSelectedOption}
            />
          )
        : openApplicationId && (
            <MobileApplicationFormViewModal
              applyId={openApplicationId}
              onClose={() => setOpenApplicationId(null)}
              setIsModalOpen={setIsModalOpen}
              setSelectedOption={setSelectedOption}
            />
          )}

      {/* ===== 면접 확인 메세지 전송 모달 ===== */}
      {isMdUp
        ? isInterviewOpen && (
            <InterviewNoticeModal
              onClose={() => setIsInterviewOpen(false)}
              onSubmit={(message: string) =>
                handleSubmitInterviewNotice(message)
              }
            />
          )
        : isInterviewOpen && (
            <InterviewNoticeBottomSheet
              onClose={() => setIsInterviewOpen(false)}
              onSubmit={(message: string) =>
                handleSubmitInterviewNotice(message)
              }
            />
          )}

      {/* ====== 알림 ======*/}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </>
  );
};

export default MainSection;
