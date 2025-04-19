"use client";

import React, { useState } from "react";
import Image from "next/image";
import notification_default from "@/images/icon/notification_default.svg";
import notification_pressed from "@/images/icon/notification_pressed.svg";
import notification_unconfirmed from "@/images/icon/notification_unconfirmed.svg";
import { ButtonProps } from "@/types/components/button";

interface NotificationProps extends ButtonProps {
  size?: "large" | "small";
}

const NotificationRoundBtn = ({ size, onClick }: NotificationProps) => {
  const [notificationStatus, setNotificationStatus] = useState<
    "default" | "pressed" | "unconfirmed"
  >("default");

  const getNotificationImage = () => {
    switch (notificationStatus) {
      case "pressed":
        return notification_pressed;
      case "unconfirmed":
        return notification_unconfirmed;
      default:
        return notification_default;
    }
  };

  return (
    <button
      className="flex justify-center w-10 h-10 border border-menuborder bg-background rounded-full hover:bg-hover"
      onClick={onClick}
    >
      <Image
        src={getNotificationImage()}
        alt="notification"
        onMouseDown={() => setNotificationStatus("pressed")}
        onMouseUp={() => setNotificationStatus("default")}
        className="cursor-pointer place-self-center"
        height={`${size === "large" ? 24 : 20}`}
        width={`${size === "large" ? 24 : 20}`}
      />
    </button>
  );
};

export default NotificationRoundBtn;
