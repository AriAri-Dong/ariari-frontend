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
import CreateNoticeModal from "@/components/modal/club/notice/createNoticeModal";
import CreateNoticeBottomSheet from "@/components/bottomSheet/notice/createNoticeBottomsheet";
import { useClubContext } from "@/context/ClubContext";
import { useClubPinnedNoticeQuery } from "@/hooks/club/useClubNoticeQuery";
import { useClubNoticeMutation } from "@/hooks/club/useClubNoticeMutation";

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
  const { addClubNotice } = useClubNoticeMutation();

  const handleDropdownToggle = (id: string, isPinned: boolean) => {
    setOpenDropdown((prev) =>
      prev?.id === id && prev?.isPinned === isPinned ? null : { id, isPinned }
    );
  };

  const handleWrite = () => {
    setOpenNotice(true);
  };

  const handleSubmitSuccess = (formData: FormData) => {
    addClubNotice.mutate(
      { clubId, formData },
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
                  총 {clubId.length}개의 공지사항이 있어요.
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
              {/* <div className="flex flex-col gap-2.5">
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
                    role={role}
                  />
                ))}
              </div> */}
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
                setAlertMessage={setAlertMessage}
              />
            )
          : openNotice && (
              <CreateNoticeBottomSheet
                onClose={() => setOpenNotice(false)}
                onSubmit={handleSubmitSuccess}
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
