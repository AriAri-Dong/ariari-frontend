"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ProfileSettingModal from "@/components/modal/profileSetting/profileSettingModal";
import useResponsive from "@/hooks/useResponsive";
import MobileProfileSettingModal from "@/components/modal/profileSetting/mobile/mobileProfileSettingModal";
import { useEffect, useState } from "react";
import HeaderToken from "@/api/headerToken";
import ClubRanking from "@/(home)/home/content/clubRanking";
import PopularRecruitment from "@/(home)/home/content/popularRecruitment";
import LatestRecruitment from "@/(home)/home/content/latestRecruitment";
import { useUserStore } from "@/providers/userStoreProvider";
import MobileSnackBar from "@/components/bar/mobileSnackBar";
import { getMemberData } from "@/api/member/api";

const HomePageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMdUp = useResponsive("md");

  const [isFirstLogin, setIsFirstLogin] = useState<boolean>(false); // 첫 로그인 여부
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // 로그인 완료 여부
  const { setUserData } = useUserStore((state) => state);

  const accessToken =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken") || ""
      : "";

  const [isFirstLoginModalOpen, setIsFirstLoginModalOpen] =
    useState<boolean>(false); // 첫 로그인 모달 상태

  const handleFirstLoginModalClose = () => {
    setIsFirstLoginModalOpen(false);
    router.replace("/", undefined); // 페이지를 리셋하는 방식으로 이동
  };

  // 첫 로그인 쿼리 파라미터 확인
  useEffect(() => {
    const searchParamFirstLogin = searchParams.get("firstLogin");
    if (searchParamFirstLogin === "1") {
      setIsFirstLogin(true); // 첫 로그인 확인
    }
  }, [searchParams]);

  // 토큰 설정
  useEffect(() => {
    if (accessToken) {
      HeaderToken.set(accessToken);
    }
  }, [accessToken]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await getMemberData();
  //       if (res) {
  //         setUserData(res);
  //         console.log("유저 정보 불러오기 성공:", res);
  //       }
  //     } catch (error) {
  //       console.error("유저 정보 불러오기 실패:", error);
  //     }
  //   })();
  // }, [setUserData]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getMemberData();
        console.log(res);
        if (res) {
          setUserData(res);
          setIsLoggedIn(true);
          console.log("유저 정보 불러오기 성공:", res);
        }
      } catch (error) {
        console.error("유저 정보 불러오기 실패:", error);
      }
    })();
  }, [setUserData]);

  return (
    <div className="w-full ">
      <ClubRanking />
      <PopularRecruitment />
      <LatestRecruitment />
      {isFirstLogin && isLoggedIn && (
        <MobileSnackBar text={"로그인이 완료되었습니다."} />
      )}
      {isFirstLogin &&
        isFirstLoginModalOpen &&
        (isMdUp ? (
          <ProfileSettingModal onClose={handleFirstLoginModalClose} />
        ) : (
          <MobileProfileSettingModal onClose={handleFirstLoginModalClose} />
        ))}
    </div>
  );
};

export default HomePageContent;
