import React, { useState } from "react";
import Image from "next/image";
import tooltip from "@/images/icon/triangle.svg";
import { useMyNotificationQuery } from "@/hooks/notification/useNotificationQuery";
import NotificationList from "@/components/list/notificationList";
import { useRouter, usePathname } from "next/navigation";
import { useNotificationMutations } from "@/hooks/notification/useNotificationMutation";
import WhiteButton from "@/components/button/basicBtn/whiteBtn";

interface TooltipProps {
  children: React.ReactNode;
}

/**
 * PC 화면- 헤더 유저 알림
 * @param children 클릭 했을 때 툴팁이 보여져야하는 컴포넌트
 * @returns
 */
const NotificationModal = ({ children }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const {
    myNotifications,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useMyNotificationQuery({
    enabled: !!isOpen,
  });

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // 알림 클릭 시 읽음 처리
  const { markMemberNotificationAsRead } = useNotificationMutations();

  const handleNotificationClick = (
    notificationId: string,
    uri: string | null
  ) => {
    markMemberNotificationAsRead.mutate(
      { alarmId: notificationId },
      {
        onSettled: () => {
          setIsOpen(false);
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

  return (
    <div className="relative flex items-center">
      <div onClick={toggleModal} className="cursor-pointer">
        {children}
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={closeModal}></div>
          <div
            className="z-50 tooltip-container absolute mt-4 top-10
          left-1/2 transform -translate-x-1/2"
          >
            <Image
              src={tooltip}
              alt={"tooltip"}
              width={24}
              height={24}
              className="absolute -top-2 left-1/2 transform -translate-x-1/2"
            />
            <div
              className="tooltip-content py-2.5 px-4 bg-background
              rounded-xl w-[400px] max-h-[548px] shadow-default
              overflow-y-scroll custom-scrollbar"
            >
              {!isLoading && (
                <NotificationList
                  notificationList={myNotifications}
                  onClickNotification={handleNotificationClick}
                />
              )}
              {hasNextPage && (
                <div className="w-full my-3 flex justify-center">
                  <WhiteButton
                    title={isFetchingNextPage ? "불러오는 중" : "더보기"}
                    onClick={fetchNextPage}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationModal;
