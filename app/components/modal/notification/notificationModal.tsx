import React, { useState } from "react";
import Image from "next/image";
import tooltip from "@/images/icon/triangle.svg";
import { useMyNotificationQuery } from "@/hooks/notification/useNotificationQuery";
import NotificationList from "@/components/list/notificationList";

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
  const { myNotifications, isLoading } = useMyNotificationQuery({
    enabled: !!isOpen,
  });

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsOpen(false);
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
                <NotificationList notificationList={myNotifications} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationModal;
