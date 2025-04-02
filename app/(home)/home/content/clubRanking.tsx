import PullDown from "@/components/pulldown/pullDown";
import SubTap from "@/components/tab/subTap";
import ClubRankingCard from "@/components/card/clubRankingCard";
import ClubRankingList from "@/components/card/clubRankingList";

import { AFFILIATION_TYPE, FIELD_TYPE } from "@/data/pulldown";
import { useEffect, useState } from "react";
import useResponsive from "@/hooks/useResponsive";
import FilterBtn from "@/components/button/iconBtn/filterBtn";
import NotiPopUp from "@/components/modal/notiPopUp";
import { authStore } from "@/stores/userStore";
import LoginModal from "@/components/modal/login/loginModal";
import MobileLoginModal from "@/components/modal/login/mobileLoginModal";
import { getExternalClubRanking, getInternalClubRanking } from "@/api/club/api";
import { ClubData } from "@/types/api";
import { useUserStore } from "@/providers/userStoreProvider";
import { useShallow } from "zustand/shallow";

const ClubRanking = () => {
  const isTab = useResponsive("md");
  const isDesktop = useResponsive("lg");

  const [data, setData] = useState<ClubData[]>([]);
  const [fieldType, setFieldType] = useState<string>(FIELD_TYPE[0].value);
  const [affiliationType, setAffiliationType] = useState<string[]>([
    AFFILIATION_TYPE[1].label,
  ]);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isLoginNotiPopUpOpen, setIsLoginNotiPopUpOpen] =
    useState<boolean>(false);
  const [isSchoolNotiPopUpOpen, setIsSchoolNotiPopUpOpen] =
    useState<boolean>(false);

  const isAuthenticated = useUserStore(useShallow((state) => state.isSignIn));
  const schoolCertification = useUserStore(
    useShallow((state) => state.schoolData)
  );

  const handleFieldOption = (value: string[]) => {
    setFieldType(value[0]);
  };

  const handleAffiliationOption = (value: string) => {
    if (!isAuthenticated) {
      setIsLoginNotiPopUpOpen(true);
    } else if (!schoolCertification && value === "교내") {
      setIsSchoolNotiPopUpOpen(true);
    } else {
      setAffiliationType([value]);
    }
  };

  useEffect(() => {
    const selectedFieldValue =
      FIELD_TYPE.find((item) => item.label === fieldType)?.value || "";

    if (affiliationType[0] === "교내") {
      getInternalClubRanking(selectedFieldValue)
        .then((data) => {
          setData(data.clubDataList);
          console.log("교내입니다");
        })
        .catch((error) => {
          console.error("Error fetching internal recruitments:", error);
        });
    } else {
      getExternalClubRanking(selectedFieldValue)
        .then((data) => {
          setData(data.clubDataList);
          console.log("교외입니다.");
        })
        .catch((error) => {
          console.error("Error fetching external recruitments:", error);
        });
    }
  }, [fieldType, affiliationType]);

  const handleLoginRedirect = () => {
    setIsLoginModalOpen(true);
    setIsLoginNotiPopUpOpen(false);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <section className="mt-5 mb-12 md:mt-8 md:mb-[68px]">
      <div className="flex justify-between items-center">
        <div className="text-mobile_h1_contents_title md:text-h1_contents_title">
          실시간 동아리 랭킹
        </div>
        <div className=" md:flex md:gap-[16px]">
          {isTab ? (
            <>
              <PullDown
                optionData={FIELD_TYPE.slice(1)}
                optionSize="small"
                handleOption={handleFieldOption}
                selectedOption={[fieldType]}
              />
              <SubTap
                optionData={AFFILIATION_TYPE.slice(1, 3)}
                selectedOption={affiliationType[0]}
                handleOption={handleAffiliationOption}
              />
            </>
          ) : (
            <FilterBtn onClick={() => setShowFilter(!showFilter)} />
          )}
        </div>
      </div>

      {showFilter && (
        <div className="flex mt-[16px] gap-[10px] md:hidden">
          <>
            <PullDown
              optionData={AFFILIATION_TYPE.slice(1)}
              optionSize="small"
              handleOption={setAffiliationType}
              selectedOption={affiliationType}
            />
            <PullDown
              optionData={FIELD_TYPE.slice(1)}
              optionSize="small"
              handleOption={(value: string[]) => setFieldType(value[0])}
              selectedOption={[fieldType]}
            />
          </>
        </div>
      )}

      <div>
        <ClubRankingCard clubs={data.slice(0, isDesktop ? 3 : isTab ? 2 : 1)} />
        <ClubRankingList
          clubs={data.slice(
            isDesktop ? 3 : isTab ? 2 : 1,
            isDesktop ? 10 : isTab ? 8 : 7
          )}
        />
      </div>

      {/* 로그인 팝업 */}
      {isLoginModalOpen && (
        <>
          <LoginModal onClose={handleLoginModalClose} />
          <MobileLoginModal onClose={handleLoginModalClose} />
        </>
      )}

      {isLoginNotiPopUpOpen && (
        <NotiPopUp
          onClose={() => setIsLoginNotiPopUpOpen(false)}
          icon="login"
          title="로그인이 필요한 서비스입니다."
          description={`교내 인기 동아리를 확인하기 위해서는\n로그인이 필요합니다.`}
          firstButton={handleLoginRedirect}
          firstButtonText="로그인 후 이용하기"
          secondButton={() => setIsLoginNotiPopUpOpen(false)}
          secondButtonText="다음에 할게요"
          modalType="button"
        />
      )}

      {isSchoolNotiPopUpOpen && (
        <NotiPopUp
          onClose={() => setIsSchoolNotiPopUpOpen(false)}
          icon="school"
          title="학교 등록이 필요한 서비스입니다."
          description={`교내 인기 동아리를 확인하기 위해서는\n학교 등록이 필요합니다.`}
          firstButton={() => {}}
          firstButtonText="학교 등록하기"
          secondButton={() => setIsSchoolNotiPopUpOpen(false)}
          secondButtonText="다음에 할게요"
          modalType="button"
        />
      )}
    </section>
  );
};

export default ClubRanking;
