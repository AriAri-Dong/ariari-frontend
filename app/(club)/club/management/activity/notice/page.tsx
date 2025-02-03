"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import Alert from "@/components/alert/alert";
import useResponsive from "@/hooks/useResponsive";
import ActivityReviewModal from "@/components/modal/review/activityReviewModal";
import ReviewFloatingBtn from "@/components/button/floatingBtn/reviewFloatingBtn";
import ActivityReviewBottomSheet from "@/components/bottomSheet/review/activityReviewBottomSheet";
import LeftMenu from "@/(club)/club/components/menu/leftMenu";
import MobileMenu from "@/(club)/club/components/menu/mobileMenu";
import ClubNoticeHeader from "./components/clubNoticeHeader";
import ClubNoticeDropdown from "@/components/dropdown/clubNoticeDropdown";
import { NOTICE_DATA } from "@/data/clubNotice";
import pin from "@/images/icon/pin.svg";
import CreateNoticeModal from "@/components/modal/club/notice/createNoticeModal";
import CreateNoticeBottomSheet from "@/components/bottomSheet/notice/createNoticeBottomsheet";

const NoticePage = () => {
  const router = useRouter();
  const isMdUp = useResponsive("md");

  const [openNotice, setOpenNotice] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

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
        <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 mt-6 md:mt-8 md:px-5">
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
              mb-4 mt-[22px] md:mt-9 md:mb-[22px]"
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
                          key={notice.id}
                          notice={notice}
                          isOpen={openDropdownId === notice.id}
                          setOpenDropdownId={setOpenDropdownId}
                          pin={true}
                          isFirstPin={index === 0}
                          isLastPin={index === pinnedNotices.length - 1}
                          isSinglePin={pinnedNotices.length === 1}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
              <ClubNoticeHeader />
              <div className="flex flex-col gap-2.5">
                {NOTICE_DATA.map((notice) => (
                  <ClubNoticeDropdown
                    key={notice.id}
                    notice={notice}
                    isOpen={openDropdownId === notice.id}
                    setOpenDropdownId={setOpenDropdownId}
                    pin={false}
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
