"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import Alert from "@/components/alert/alert";
import useResponsive from "@/hooks/useResponsive";
import ReviewFloatingBtn from "@/components/button/floatingBtn/reviewFloatingBtn";
import LeftMenu from "@/(club)/club/components/menu/leftMenu";
import MobileMenu from "@/(club)/club/components/menu/mobileMenu";
import ClubNoticeHeader from "./components/clubNoticeHeader";
import ClubNoticeDropdown from "@/components/dropdown/clubNoticeDropdown";
import { NOTICE_DATA } from "@/data/clubNotice";
import pin from "@/images/icon/pin.svg";
import CreateNoticeModal from "@/components/modal/club/notice/createNoticeModal";
import CreateNoticeBottomSheet from "@/components/bottomSheet/notice/createNoticeBottomsheet";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "공지사항 | 주요 소식을 전달합니다",
  description: "공지사항을 등록하고 멤버들에게 전달할 수 있는 공간입니다.",
  openGraph: {
    title: "공지사항 | 주요 소식을 전달합니다",
    description: "공지사항을 등록하고 멤버들에게 전달할 수 있는 공간입니다.",
    url: "https://ariari.com/club/management/activity",
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

const NoticePage = () => {
  const router = useRouter();
  const isMdUp = useResponsive("md");

  // 임시 권한 설정 (API 연동 전)
  const [authority, setAuthority] = useState<
    "USER" | "MEMBER" | "ADMIN" | "SERVICE_ADMIN"
  >("ADMIN");

  const [openNotice, setOpenNotice] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<{
    id: string;
    isPinned: boolean;
  } | null>(null);

  const handleDropdownToggle = (id: string, isPinned: boolean) => {
    setOpenDropdown((prev) =>
      prev?.id === id && prev?.isPinned === isPinned ? null : { id, isPinned }
    );
  };

  const handleRouter = () => {
    // 모집 공고 임시 경로
    router.push("/");
  };

  const handleWrite = () => {
    setOpenNotice(true);
  };

  const handleSubmitSuccess = () => {
    setAlertMessage("공지사항이 등록되었습니다.");
    setOpenNotice(false);
  };

  const pinnedNotices = NOTICE_DATA.filter((notice) => notice.pin);

  return (
    <>
      <div className="bg-sub_bg flex justify-center items-center w-full pb-20 md:pb-[124px]">
        <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 md:mt-8 md:px-5">
          <MobileMenu />
          <div className="flex lg:gap-9">
            {/* 임시 메뉴 */}
            <div className="flex flex-col">
              <LeftMenu />
            </div>
            <div className="w-full">
              <div className="flex flex-col md:flex-col-reverse">
                <p
                  className="text-subtext2 text-mobile_body2_m md:text-h4
              mb-4 md:mt-9 md:mb-[22px]"
                >
                  총 {NOTICE_DATA.length}개의 공지사항이 있어요.
                </p>
                <div>
                  <div className="flex items-center gap-3 md:gap-4 md:mb-4 mb-3">
                    <Image
                      src={pin}
                      alt={"pin"}
                      width={24}
                      height={24}
                      className="md:w-8 md:h-8"
                    />
                    <h1 className="text-text1 text-body1_sb md:text-h3">
                      고정된 공지사항
                    </h1>
                  </div>
                  <div className="md:mb-0 mb-4">
                    {NOTICE_DATA.filter((notice) => notice.pin).map(
                      (notice, index) => (
                        <ClubNoticeDropdown
                          key={`pinned-${notice.id}`}
                          notice={notice}
                          isOpen={
                            openDropdown?.id === notice.id &&
                            openDropdown?.isPinned
                          }
                          setOpenDropdownId={() =>
                            handleDropdownToggle(notice.id, true)
                          }
                          pin={true}
                          isFirstPin={index === 0}
                          isLastPin={index === pinnedNotices.length - 1}
                          isSinglePin={pinnedNotices.length === 1}
                          role={authority}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
              <ClubNoticeHeader role={authority} />
              <div className="flex flex-col gap-2.5">
                {NOTICE_DATA.map((notice) => (
                  <ClubNoticeDropdown
                    key={`normal-${notice.id}`}
                    notice={notice}
                    isOpen={
                      openDropdown?.id === notice.id && !openDropdown?.isPinned
                    }
                    setOpenDropdownId={() =>
                      handleDropdownToggle(notice.id, false)
                    }
                    pin={false}
                    role={authority}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-9 md:mt-10">
                <PlusBtn title={"더보기"} onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bottom-[77px] right-5 md:hidden">
          <WriteBtn onClick={handleWrite} />
        </div>
        {isMdUp
          ? openNotice && (
              <CreateNoticeModal
                onClose={() => setOpenNotice(false)}
                onSubmit={handleSubmitSuccess}
              />
            )
          : openNotice && (
              <CreateNoticeBottomSheet
                onClose={() => setOpenNotice(false)}
                onSubmit={handleSubmitSuccess}
              />
            )}
        {alertMessage && (
          <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
        )}
        {!openNotice && <ReviewFloatingBtn onClick={handleWrite} />}
      </div>
    </>
  );
};

export default NoticePage;
