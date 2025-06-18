import { useEffect } from "react";
import Image from "next/image";
import backVector from "@/images/icon/backVector.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NotificationList from "@/components/list/notificationList";
import WhiteButton from "@/components/button/basicBtn/whiteBtn";
import {
  useClubNotificationQuery,
  useMyNotificationQuery,
} from "@/hooks/notification/useNotificationQuery";
import { useNotificationMutations } from "@/hooks/notification/useNotificationMutation";

interface ModalProps {
  onclose: () => void;
  target: "club" | "member";
}

/**
 * 모바일 화면에서 공통으로 사용되는 알림 모달(전체화면)
 * @param onClose 모달 닫기 함수
 * @param target club- 동아리 상세 페이지 내 동아리 알림 / member- 헤더 유저 알림
 * @returns
 */
const MobileNotificationModal = ({ onclose, target }: ModalProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const clubId = params.get("clubId") || "";

  const clubNotiQuery = useClubNotificationQuery(clubId || "", {
    enabled: target === "club" && !!clubId,
  });

  const myNotiQuery = useMyNotificationQuery({
    enabled: target === "member",
  });

  const {
    notificationList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = {
    ...(target === "club" ? clubNotiQuery : myNotiQuery),
    notificationList:
      target === "club"
        ? clubNotiQuery.clubNotifications
        : myNotiQuery.myNotifications,
  };

  // 알림 클릭 시 읽음 처리
  const { markClubNotificationAsRead, markMemberNotificationAsRead } =
    useNotificationMutations();

  const handleNotificationClick = (
    notificationId: string,
    uri: string | null
  ) => {
    const mutation =
      target === "club"
        ? markClubNotificationAsRead
        : markMemberNotificationAsRead;

    mutation.mutate(
      { alarmId: notificationId },
      {
        onSettled: () => {
          onclose();
          if (uri) {
            const cleanUri = uri.split("|")[0].trim();
            // 동아리 초대인 경우 예외
            if (cleanUri.startsWith("/club/invite")) {
              const queryString = uri.split("?")[1];
              if (queryString) {
                const urlParams = new URLSearchParams(window.location.search);
                const newParams = new URLSearchParams(queryString);

                // 기존 쿼리 문자열에 추가
                newParams.forEach((value, key) => {
                  urlParams.set(key, value);
                });

                router.push(`${pathname}?${urlParams.toString()}`);
              }
            } else {
              router.push(uri);
            }
          }
        },
      }
    );
  };

  // 전체 화면 스크롤 방지 (이중 스크롤이 생겨서 넣었습니다.)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-white z-50 px-4 lg:hidden">
      <div className="flex flex-row justify-between pt-[46px]">
        <div className="flex gap-2 mb-5">
          <Image
            src={backVector}
            alt={"뒤로가기"}
            width={24}
            height={24}
            onClick={onclose}
            className="cursor-pointer"
          />
          <h1 className="text-text1 text-mobile_h1_contents_title">알림</h1>
        </div>
      </div>
      <div
        className="flex flex-col overflow-y-scroll custom-scrollbar"
        style={{ maxHeight: "calc(100vh - 113px)" }}
      >
        <NotificationList
          notificationList={notificationList}
          onClickNotification={handleNotificationClick}
          className="first:pt-[6px] last:pb-[6px]"
        />
        {hasNextPage && (
          <div className="w-full mt-6 flex justify-center">
            <WhiteButton
              title={isFetchingNextPage ? "불러오는 중" : "더보기"}
              onClick={fetchNextPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNotificationModal;
