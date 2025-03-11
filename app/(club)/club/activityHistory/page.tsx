"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import useResponsive from "@/hooks/useResponsive";

import LeftMenu from "@/(club)/club/components/menu/leftMenu";
import MobileMenu from "@/(club)/club/components/menu/mobileMenu";
import RecruitmentGuideFloatingBar from "@/components/bar/floatingBar/recruitmentGuideFloatingBar";
import WriteBtn from "@/components/button/iconBtn/writeBtn";
import DarkBtn from "@/components/button/withIconBtn/darkBtn";
import PlusBtn from "@/components/button/withIconBtn/plusBtn";
import PostBox from "@/components/dropdown/postBox";
import ActivityCreateForm from "./components/activityCreateForm";
import Alert from "@/components/alert/alert";

import { CLUB_ACTIVITY_DATA } from "@/data/clubActivity";
import { ClubActivity } from "@/types/club";

const ActivityHistoryPage = () => {
  const router = useRouter();
  const isMdUp = useResponsive("md");

  const [posts, setPosts] = useState<ClubActivity[]>(CLUB_ACTIVITY_DATA);
  const [isWriteFormOpen, setIsWriteFormOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const [authority, setAuthority] = useState<
    null | "GENERAL" | "MANAGER" | "ADMIN"
  >("ADMIN");

  const handleRouter = () => {
    router.push("/club/recruitment/clubId=${clubId}");
  };

  return (
    <div className="bg-sub_bg flex justify-center items-center w-full pb-20 md:pb-[124px]">
      <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 mt-6 md:mt-8 md:px-5">
        <MobileMenu />
        <div className="flex lg:gap-9">
          {/* 임시 메뉴 */}
          <div className="flex flex-col">
            <LeftMenu />
          </div>
          <div className="w-full">
            <p className="mb-4 text-subtext2 text-mobile_body2_m md:text-h4 md:mb-[22px]">
              총 {posts.length}개의 활동내역이 있어요.
            </p>
            <div className="flex flex-col gap-2.5">
              {posts.map((post) => (
                <PostBox
                  key={post.clubActivityId}
                  data={post}
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
      {/* 모집안내 바 - pc */}
      {authority == null && (
        <RecruitmentGuideFloatingBar
          deadline={new Date("2024-12-31T23:59:59")}
          isWriteButtonVisible={true}
          handleWrite={() => setIsWriteFormOpen(true)}
        />
      )}

      {/* ====== 모집안내 - mobile ======  */}
      {!isMdUp && authority == null && (
        <div className={`fixed bottom-5  left-50% translate-1/2`}>
          <DarkBtn title={"모집공고 보기"} onClick={handleRouter} />
        </div>
      )}

      {/* ====== 작성버튼 ======*/}
      {(authority == "ADMIN" || authority === "MANAGER") && (
        <div className="fixed w-full bottom-5 px-5 flex justify-end md:bottom-[44px] md:max-w-[1248px] md:px-5">
          <WriteBtn onClick={() => setIsWriteFormOpen(true)} />
        </div>
      )}
      {/* ====== 작성 Form ====== */}
      {isWriteFormOpen && (
        <ActivityCreateForm
          onClose={() => setIsWriteFormOpen(false)}
          onSubmit={() => {
            setAlertMessage("정상 등록되었습니다");
          }}
        />
      )}
      {/* ====== 알림 ======*/}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default ActivityHistoryPage;
