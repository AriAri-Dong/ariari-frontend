import React, { useState } from "react";
import Image from "next/image";
import tooltip from "@/images/icon/triangle.svg";
import vector from "@/images/icon/vector.svg";
import { useMyNotificationQuery } from "@/hooks/notification/useNotificationQuery";
import formatDateToDot, { formatTime } from "@/utils/formatDateToDot";

interface TooltipProps {
  children: React.ReactNode;
}

/**
 *
 * @param children 클릭 했을 때 툴팁이 보여져야하는 컴포넌트
 * @returns
 */
const NotificationModal = ({ children }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { myNotifications } = useMyNotificationQuery();

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
              {myNotifications.map((item, index) => {
                const { id, title, uri, isChecked, createdDateTime } = item;
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between py-[14px] px-2.5 cursor-pointer border-b last:border-0"
                  >
                    <div className="flex flex-col gap-[6px]">
                      <h3 className="text-text1 text-body2_m">{title}</h3>
                      <div className="flex gap-[10px] text-unselected text-body4_r">
                        <p>{formatDateToDot(createdDateTime, false)}</p>
                        <p>{formatTime(new Date(createdDateTime))}</p>{" "}
                      </div>
                    </div>
                    <Image
                      src={vector}
                      alt={"바로가기"}
                      width={24}
                      height={24}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationModal;
