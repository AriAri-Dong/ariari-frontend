"use client";

import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "@/providers/user-store-provider";
import { useShallow } from "zustand/shallow";

import Image from "next/image";
import notice from "@/images/icon/notice.svg";

import SubTap from "@/components/tab/subTap";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import Alert from "@/components/alert/alert";
import ErrorNotice from "@/components/feedback/error";

import { OptionType } from "@/types/components/pulldown";
import { ApplyData, ApplyTempData } from "@/types/application";
import {
  deleteMyApply,
  deleteMyApplyTmp,
  getMyApplyList,
  getMyApplyTmpList,
} from "@/api/apply/api";
import ListSection from "./listSection";

const ITEMS_PER_PAGE = 10;

const Application = () => {
  const isSignIn = useUserStore(useShallow((state) => state.isSignIn));

  // 지원 전체
  const [allApplications, setAllApplications] = useState<ApplyData[]>([]);
  // 임시지원
  const [tempList, setTempList] = useState<ApplyTempData[]>([]);
  // 전형 진행중
  const [inProgressApplications, setInProgressApplications] = useState<
    ApplyData[]
  >([]);
  // 최종 발표 완료
  const [finishedApplications, setFinishedApplications] = useState<ApplyData[]>(
    []
  );
  const [options, setOptions] = useState<OptionType[]>([
    { id: 0, label: "전체" },
    { id: 1, label: "작성중" },
    { id: 2, label: "전형 진행중" },
    { id: 3, label: "최종발표 완료" },
  ]);
  const [selectedOption, setSelectedOption] = useState<string>(
    options[0].label
  );

  const [visibleItems, setVisibleItems] = useState<number>(ITEMS_PER_PAGE);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [errorTitle, setErrorTitle] = useState<string | null>(null);
  // 더보기
  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
  };
  // 지원서 삭제
  const handleDeleteTmpApply = async (
    id: string,
    type: "APPLY" | "TEMP_APPLY"
  ) => {
    if (type === "TEMP_APPLY") {
      deleteMyApplyTmp(id)
        .then(() => {
          setTempList((prev) => prev.filter((item) => item.id !== id));
        })
        .catch((err) => {
          setAlertMessage(err.message);
        });
    }
    if (type === "APPLY") {
      deleteMyApply(id)
        .then(() => {
          setAllApplications((prev) => prev.filter((item) => item.id !== id));
        })
        .catch((err) => {
          setAlertMessage(err.message);
        });
    }
  };

  // 지원서 조회
  useEffect(() => {
    const fetchApplications = async () => {
      if (isSignIn) {
        // 지원서
        getMyApplyList()
          .then((data) => {
            setAllApplications(data.applyDataList);
          })
          .catch((err) => {
            setErrorMessage(err.message);
          });
        // 임시 지원
        getMyApplyTmpList()
          .then((data) => {
            setTempList(data.applyDataList);
          })
          .catch((err) => {
            setErrorMessage(err.message);
          });
      } else {
        setErrorMessage(
          "로그인하여 지원서를 조회하고 지원 내역을 쉽게 관리하세요."
        );
        setErrorTitle("Member Only");
      }
    };
    fetchApplications();
  }, []);
  useEffect(() => {
    // 지원서 개수 업데이트
    setOptions(
      [
        {
          id: 0,
          label: "전체",
          number: [...tempList, ...allApplications].length,
        },
        { id: 1, label: "작성중", number: tempList.length },
        { id: 2, label: "전형 진행중", number: inProgressApplications.length },
        { id: 3, label: "최종발표 완료", number: finishedApplications.length },
      ].map(({ number, ...rest }) => (number > 0 ? { ...rest, number } : rest))
    );

    // 전형 진행중, 최종발표 완료 업데이트
    const inProgress = allApplications.filter(
      (item) =>
        item.applyStatusType === "PENDENCY" ||
        item.applyStatusType === "INTERVIEW"
    );

    const finished = allApplications.filter(
      (item) =>
        item.applyStatusType === "APPROVE" || item.applyStatusType === "REFUSAL"
    );

    setInProgressApplications(inProgress);
    setFinishedApplications(finished);
  }, [allApplications, finishedApplications, inProgressApplications, tempList]);

  // 옵션 별 데이터
  const filteredApplications = useMemo(() => {
    switch (selectedOption) {
      case "전체":
        return [...tempList, ...allApplications];
      case "작성중":
        return tempList;
      case "전형 진행중":
        return inProgressApplications;
      case "최종발표 완료":
        return finishedApplications;
      default:
        return [];
    }
  }, [
    selectedOption,
    tempList,
    allApplications,
    inProgressApplications,
    finishedApplications,
  ]);

  if (errorMessage) {
    return (
      <ErrorNotice description={errorMessage} title={errorTitle ?? undefined} />
    );
  }

  return (
    <div>
      <div className="w-full inline-flex flex-col gap-4 mt-6 md:mt-8 md:gap-[22px]">
        <div className="md:flex md:items-center md:justify-between">
          <h1 className="text-text1 text-mobile_h1_contents_title mb-4 md:text-h1_contents_title md:mb-0">
            동아리 지원
          </h1>
          <div className="overflow-x-auto no-scrollbar">
            <SubTap
              optionData={options}
              selectedOption={selectedOption}
              handleOption={(value) => {
                if (selectedOption !== value) {
                  setSelectedOption(value);
                  setVisibleItems(ITEMS_PER_PAGE);
                }
              }}
            />
          </div>
        </div>
        <p className="text-subtext2 text-mobile_body2_m mb-5 md:text-h4 md:mb-[22px]">
          총 {filteredApplications.length}개의 지원서가 있어요.
        </p>
      </div>
      <div className="w-full p-4 mb-5 flex flex-col justify-start items-start gap-2.5 bg-white/70 rounded-12 md:px-5 md:mb-[22px]">
        <div className="self-stretch justify-start items-center  gap-3 md:gap-5 inline-flex">
          <Image
            src={notice}
            alt={"notice"}
            width={24}
            height={24}
            className="w-6 h-6 md:w-8 md:h-8"
          />
          <div className="grow shrink basis-0 text-mobile_body3_m text-icon md:text-body2_m">
            <p>
              현재 작성 중인 지원서와 제출 후 1개월이 지난 지원서는 자유롭게
              삭제할 수 있어요.
            </p>
            <p className="hidden md:flex">
              다른 경우엔 고객센터로 문의해주세요.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-grow md:mb-[124px] mb-[80px] min-h-[300px] md:min-h-[450px] ">
        <ListSection
          dataList={filteredApplications.slice(0, visibleItems)}
          handleDelete={handleDeleteTmpApply}
        />
        {visibleItems < filteredApplications.length && (
          <div className="self-center mt-9 md:mt-10">
            <PlusBtn title={"더보기"} onClick={handleLoadMore} />
          </div>
        )}
      </div>
      {/* ====== 알림 ======*/}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default Application;
