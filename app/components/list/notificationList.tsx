import rightArrow from "@/images/icon/vector.svg";
import { NotificationData } from "@/types/notification";

import formatDateToDot, { formatTime } from "@/utils/formatDateToDot";
import Image from "next/image";
import Link from "next/link";

interface NotificationListProps {
  notificationList: NotificationData[];
  className?: string;
}

// 알림 목록
const NotificationList = ({
  notificationList,
  className,
}: NotificationListProps) => {
  if (!notificationList.length) {
    return <p className="text-center">새로운 알림이 없습니다.</p>;
  }
  return (
    <ul>
      {notificationList.map((item, index) => {
        const { id, isChecked, title, uri, createdDateTime } = item;
        return (
          <li
            key={id}
            className={`py-[14px] px-2.5 border-b last:border-b-0 ${className}`}
          >
            <NotificationItemWrapper item={item}>
              <div className="w-full flex flex-col gap-2 text-left md:gap-[6px]">
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
            </NotificationItemWrapper>
          </li>
        );
      })}
    </ul>
  );
};

// uri 존재 여부에 따른 상위 wrapper
const NotificationItemWrapper = ({
  item,
  children,
  className,
}: {
  item: NotificationData;
  children: React.ReactNode;
  className?: string;
}) => {
  const { uri, isChecked } = item;

  const baseClassName = "w-full flex items-center justify-between gap-3";
  const newClassName = `${baseClassName} ${className ?? ""} ${
    isChecked ? "opacity-70" : ""
  }`;

  if (uri) {
    return (
      <Link href={uri} className={newClassName}>
        {children}
        <Image
          src={rightArrow}
          alt={"알림 바로가기"}
          className="w-5 h-5 md:w-6 md:h-6"
        />
      </Link>
    );
  }

  return (
    <button
      onClick={() => console.log("개별 알림 항목 클릭")}
      className={newClassName}
    >
      {children}
    </button>
  );
};

export default NotificationList;
