import useResponsive from "@/hooks/useResponsive";
import rightArrow from "@/images/icon/vector.svg";
import {
  ClubNotificationData,
  MemberNotificationData,
} from "@/types/notification";
import formatDateToDot, { formatTime } from "@/utils/formatDateToDot";
import Image from "next/image";

interface NotificationListProps {
  notificationList: (ClubNotificationData | MemberNotificationData)[];
  className?: string;
}

const NotificationList = ({
  notificationList,
  className,
}: NotificationListProps) => {
  const isMdUp = useResponsive("md");

  if (!notificationList.length) {
    return <p className="text-center">새로운 알림이 없습니다.</p>;
  }

  return (
    <ul>
      {notificationList.map((item, index) => {
        const { id, title, isChecked, createdDateTime } = item;

        return (
          <li
            key={id}
            className={`flex items-center justify-between py-[14px] px-2.5 cursor-pointer border-b last:border-b-0 ${
              isChecked && "opacity-70"
            } ${className}`}
          >
            <div className="flex flex-col gap-2 md:gap-[6px]">
              <h3
                className={`text-mobile_body1_m md:text-body2_m ${
                  isChecked ? "text-subtext2" : "text-text1"
                }`}
              >
                {title}
              </h3>
              <div className="flex md:gap-[10px] gap-2 text-unselected text-mobile_body4_r md:text-body4_r">
                <p>{formatDateToDot(createdDateTime, false)}</p>
                <p>{formatTime(new Date(createdDateTime))}</p>
              </div>
            </div>
            <Image
              src={rightArrow}
              alt={"알림 바로가기"}
              width={isMdUp ? 24 : 20}
              height={isMdUp ? 24 : 20}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default NotificationList;
