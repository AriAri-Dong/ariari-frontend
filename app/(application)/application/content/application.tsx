import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useMyApplyListQuery,
  useMyApplyTmpListQuery,
} from "@/hooks/apply/useApplyQuery";

import Image from "next/image";
import notice from "@/images/icon/notice.svg";
import closed from "@/images/icon/popup/closed.svg";
import ListSection from "./listSection";
import SubTap from "@/components/tab/subTap";
import SmallBtn from "@/components/button/basicBtn/smallBtn";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import Alert from "@/components/alert/alert";
import ErrorNotice from "@/components/feedback/error";

import { OptionType } from "@/types/components/pulldown";
import { Metadata } from "next";
import { useUserStore } from "@/stores/userStore";

const ITEMS_PER_PAGE = 10;

export const metadata: Metadata = {
  title: "동아리 지원 | 아리아리",
  description:
    "지원한 동아리 목록과 합격 여부, 진행 상황을 확인할 수 있는 공간입니다.",
  openGraph: {
    title: "동아리 지원 | 아리아리",
    description:
      "지원한 동아리 목록과 합격 여부, 진행 상황을 확인할 수 있는 공간입니다.",
    url: "https://ariari.com/application",
    siteName: "아리아리",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "아리아리",
      },
    ],
    type: "website",
  },
};

const Application = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const isSignIn = !!user;

  const { data: { allApplications = [], totalCount: applyCount = 0 } = {} } =
    useMyApplyListQuery({ enabled: isSignIn });

  const { data: { tempList = [], totalCount: tmpApplyCount = 0 } = {} } =
    useMyApplyTmpListQuery({ enabled: isSignIn });

  // 전형 진행중
  const inProgressApplications = useMemo(() => {
    return allApplications.filter(
      (item) =>
        item.applyStatusType === "PENDENCY" ||
        item.applyStatusType === "INTERVIEW"
    );
  }, [allApplications]);
  // 최종 발표 완료
  const finishedApplications = useMemo(() => {
    return allApplications.filter(
      (item) =>
        item.applyStatusType === "APPROVE" || item.applyStatusType === "REFUSAL"
    );
  }, [allApplications]);

  const [options, setOptions] = useState<OptionType[]>([
    { id: 0, label: "전체", number: 0 },
    { id: 1, label: "작성중", number: 0 },
    { id: 2, label: "전형 진행중", number: 0 },
    { id: 3, label: "최종발표 완료", number: 0 },
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

  useEffect(() => {
    if (isSignIn) {
      // 전형 진행중, 최종발표 완료 업데이트
      const inProgress = allApplications.filter(
        (item) =>
          item.applyStatusType === "PENDENCY" ||
          item.applyStatusType === "INTERVIEW"
      );

      const finished = allApplications.filter(
        (item) =>
          item.applyStatusType === "APPROVE" ||
          item.applyStatusType === "REFUSAL"
      );

      // 지원서 수 계산
      const newOptions = [
        {
          id: 0,
          label: "전체",
          number: [...tempList, ...allApplications].length,
        },
        { id: 1, label: "작성중", number: tempList.length },
        { id: 2, label: "전형 진행중", number: inProgress.length },
        { id: 3, label: "최종발표 완료", number: finished.length },
      ];

      // 변경된 경우 업데이트
      setOptions((prevOptions) => {
        const isSame =
          prevOptions.length === newOptions.length &&
          prevOptions.every((prev, i) => prev.number === newOptions[i].number);

        return isSame ? prevOptions : newOptions;
      });
    }
  }, [allApplications, tempList, isSignIn]);

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
  if (!isSignIn) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <div className="text-[48px] mb-4">
          <Image
            src={closed}
            alt={"lock"}
            width={30}
            height={30}
            className="md:w-[70px] md:h-[70px]"
          />
        </div>
        <h2 className="text-text1 text-mobile_h1_contents_title mb-2 md:text-h1_contents_title">
          로그인이 필요한 서비스입니다
        </h2>
        <p className="text-subtext2 text-mobile_body2_m mb-6 md:text-h4">
          나의 동아리 지원 현황은 로그인 후 확인하실 수 있어요.
        </p>

        <SmallBtn title={"뒤로가기"} onClick={() => router.back()} />
      </div>
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
        <ListSection dataList={filteredApplications.slice(0, visibleItems)} />
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
