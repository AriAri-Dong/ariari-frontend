"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

import { useClubContext } from "@/context/ClubContext";
import { getClubActivities } from "@/api/club/activity/api";
import { ClubActivity } from "@/types/clubActivity";

const ActivityHistoryPage = () => {
  const router = useRouter();
  const isMdUp = useResponsive("md");

  const [activities, setActivities] = useState<ClubActivity[]>([]);
  const [isWriteFormOpen, setIsWriteFormOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const { role, clubInfo } = useClubContext();

  console.log("role >>>", role);
  console.log("활동 내역 >>>", activities);
  console.log("닉네임 000 >>>", clubInfo?.clubMemberData.memberData.nickname);

  const handleRouter = () => {
    router.push(`/club/recruitment/clubId=${clubInfo?.clubData.id}`);
  };

  const fetchActivities = async (pageToLoad = 0) => {
    if (!clubInfo?.clubData.id) return;

    try {
      const { activities: fetched, pageInfo } = await getClubActivities(
        clubInfo.clubData.id,
        {
          page: pageToLoad,
          size: 10,
          sort: ["createdDateTime,desc"],
        }
      );

      if (pageToLoad === 0) {
        setActivities(fetched);
      } else {
        setActivities((prev) => [...prev, ...fetched]);
      }

      setPage(pageToLoad);

      setHasMore(pageToLoad + 1 < pageInfo.totalPages);
    } catch (err) {
      setAlertMessage(
        "활동 내역을 불러오는 데 실패했어요. <br/> 잠시후 다시 시도해주세요."
      );
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [clubInfo?.clubData.id]);

  return (
    <div className="bg-sub_bg flex justify-center items-center w-full pb-20 md:pb-[124px]">
      <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-lx px-4 md:mt-8 md:px-5">
        <MobileMenu />
        <div className="flex lg:gap-9">
          <div className="flex flex-col">
            <LeftMenu />
          </div>
          <div className="w-full">
            <p className="mb-4 text-subtext2 text-mobile_body2_m md:text-h4 md:mb-[22px]">
              총 {activities.length}개의 활동내역이 있어요.
            </p>
            <div className="flex flex-col gap-2.5">
              {activities.map((activity) => (
                <PostBox
                  key={activity.clubActivityId}
                  data={activity}
                  role={role}
                  nickname={
                    role === "ADMIN" || role === "MANAGER"
                      ? "동아리 대표"
                      : clubInfo?.clubMemberData.memberData.nickname || ""
                  }
                />
              ))}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-9 md:mt-10">
                <PlusBtn
                  title={"더보기"}
                  onClick={() => fetchActivities(page + 1)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {role == null && (
        <RecruitmentGuideFloatingBar
          deadline={new Date("2024-12-31T23:59:59")}
          isWriteButtonVisible={true}
          handleWrite={() => setIsWriteFormOpen(true)}
        />
      )}

      {!isMdUp && role == null && (
        <div className="fixed bottom-5 left-50% translate-1/2">
          <DarkBtn title={"모집공고 보기"} onClick={handleRouter} />
        </div>
      )}

      {(role === "ADMIN" || role === "MANAGER") && (
        <div className="fixed w-full bottom-5 px-5 flex justify-end md:bottom-[44px] md:max-w-[1248px] md:px-5">
          <WriteBtn onClick={() => setIsWriteFormOpen(true)} />
        </div>
      )}
      {isWriteFormOpen && (
        <ActivityCreateForm
          clubId={clubInfo?.clubData.id || ""}
          onClose={() => setIsWriteFormOpen(false)}
          onSubmit={async () => {
            try {
              await fetchActivities();
              setAlertMessage("활동 내역이 등록되었습니다");
              setIsWriteFormOpen(false);
              return true;
            } catch {
              setAlertMessage("업로드 후 데이터를 불러오는 데 실패했어요.");
              return false;
            }
          }}
        />
      )}

      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default ActivityHistoryPage;
