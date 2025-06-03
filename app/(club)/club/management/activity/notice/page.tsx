"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import Alert from "@/components/alert/alert";
import useResponsive from "@/hooks/useResponsive";
import ReviewFloatingBtn from "@/components/button/floatingBtn/reviewFloatingBtn";
import LeftMenu from "@/(club)/club/components/menu/leftMenu";
import MobileMenu from "@/(club)/club/components/menu/mobileMenu";
import ClubNoticeHeader from "./components/clubNoticeHeader";
import ClubNoticeDropdown from "@/components/dropdown/clubNoticeDropdown";
import pin from "@/images/icon/pin.svg";
import { useClubContext } from "@/context/ClubContext";
import {
  useClubNoticeQuery,
  useClubPinnedNoticeQuery,
} from "@/hooks/club/useClubNoticeQuery";
import { useClubNoticeMutation } from "@/hooks/club/useClubNoticeMutation";
import ClubNoticeFormModal from "@/components/modal/club/notice/clubNoticeFormModal";
import ClubNoticeFormBottomsheet from "@/components/bottomSheet/notice/clubNoticeFormBottomSheet";
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
  const isMdUp = useResponsive("md");
  const params = useSearchParams();
  const clubId = params.get("clubId") || "";

  const { role } = useClubContext();

  const [openNotice, setOpenNotice] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<{
    id: string;
    isPinned: boolean;
  } | null>(null);

  const { pinnedNoticeList, isLoading } = useClubPinnedNoticeQuery(clubId);
  const {
    notices,
    totalSize,
    isLoadingNotices,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isNoticesError,
  } = useClubNoticeQuery(clubId);
  const { addNotice } = useClubNoticeMutation({ clubId });

  const handleDropdownToggle = (id: string, isPinned: boolean) => {
    setOpenDropdown((prev) =>
      prev?.id === id && prev?.isPinned === isPinned ? null : { id, isPinned }
    );
  };

  const handleWrite = () => {
    setOpenNotice(true);
  };

  // 새 공지 등록
  const handleAddNotice = (
    payload: {
      title: string;
      body: string;
      isFixed: boolean;
    },
    uploadedImages: string[]
  ) => {
    addNotice.mutate(
      { clubId, payload, uploadedImages },
      {
        onSuccess: () => {
          setAlertMessage("공지사항이 등록되었습니다.");
          setOpenNotice(false);
        },
      }
    );
  };

  if (!role) return;

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
                  총 {totalSize}개의 공지사항이 있어요.
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
                    {pinnedNoticeList.map((notice, index) => (
                      <ClubNoticeDropdown
                        key={`pinned-${notice.id}`}
                        idx={index + 1}
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
                        isLastPin={index === pinnedNoticeList.length - 1}
                        isSinglePin={pinnedNoticeList.length === 1}
                        role={role}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <ClubNoticeHeader role={role} />
              <div className="flex flex-col gap-2.5">
                {notices.map((notice, idx) => (
                  <ClubNoticeDropdown
                    key={`normal-${notice.id}`}
                    idx={idx + 1}
                    notice={notice}
                    isOpen={openDropdown?.id === notice.id}
                    setOpenDropdownId={() =>
                      handleDropdownToggle(notice.id, false)
                    }
                    pin={false}
                    role={role}
                  />
                ))}
              </div>
              {hasNextPage && (
                <div className="flex justify-center mt-9 md:mt-10">
                  <PlusBtn
                    title={isFetchingNextPage ? "불러오는 중" : "더보기"}
                    onClick={fetchNextPage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="fixed bottom-[77px] right-5 md:hidden">
          <WriteBtn onClick={handleWrite} />
        </div>
        {isMdUp
          ? openNotice && (
              <ClubNoticeFormModal
                modalType="create"
                onClose={() => setOpenNotice(false)}
                onSubmit={handleAddNotice}
                setAlertMessage={setAlertMessage}
              />
            )
          : openNotice && (
              <ClubNoticeFormBottomsheet
                modalType="create"
                onClose={() => setOpenNotice(false)}
                onSubmit={handleAddNotice}
                setAlertMessage={setAlertMessage}
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
