"use client";

import React, { useState } from "react";
import Image from "next/image";
import notification_default from "@/images/icon/notification_default.svg";
import notification_pressed from "@/images/icon/notification_pressed.svg";
import notification_unconfirmed from "@/images/icon/notification_unconfirmed.svg";

const Notification = () => {
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
    <>
      <Image
        src={getNotificationImage()}
        alt="notification"
        onMouseDown={() => setNotificationStatus("pressed")}
        onMouseUp={() => setNotificationStatus("default")}
        className="cursor-pointer"
        height={24}
        width={24}
      />
    </>
  );
};

export default Notification;
