"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import notification_default from "@/images/icon/notification_default.svg";
import notification_pressed from "@/images/icon/notification_pressed.svg";
import notification_unconfirmed from "@/images/icon/notification_unconfirmed.svg";
import { ButtonProps } from "@/types/components/button";
import { useMyNotificationQuery } from "@/hooks/notification/useNotificationQuery";

interface NotificationProps extends ButtonProps {
  size: "large" | "small";
}

const Notification = ({ size, onClick }: NotificationProps) => {
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [hasUnreadNotification, setHasUnreadNotification] =
    useState<boolean>(false);

  const { myNotifications } = useMyNotificationQuery();

  const getNotificationImage = () => {
    if (isPressed) {
      return notification_pressed;
    }

    if (hasUnreadNotification) {
      return notification_unconfirmed;
    }

    return notification_default;
  };

  // 읽지 않은 알림 존재여부 체크
  useEffect(() => {
    if (myNotifications && myNotifications.length > 0) {
      const hasUnread = myNotifications.some(
        (notification) => !notification.isChecked
      );
      setHasUnreadNotification(hasUnread);
    } else {
      setHasUnreadNotification(false);
    }
  }, [myNotifications]);

  return (
    <button className="p-0.5 rounded-full hover:bg-hover" onClick={onClick}>
      <Image
        src={getNotificationImage()}
        alt="notification"
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        className="cursor-pointer"
        height={`${size === "large" ? 24 : 20}`}
        width={`${size === "large" ? 24 : 20}`}
      />
    </button>
  );
};

export default Notification;
