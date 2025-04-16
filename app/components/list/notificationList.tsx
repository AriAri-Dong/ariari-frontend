import { readClubNotification } from "@/api/notification/api";
import rightArrow from "@/images/icon/vector.svg";
import { NotificationData } from "@/types/notification";

import formatDateToDot, { formatTime } from "@/utils/formatDateToDot";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface NotificationListProps {
  notificationList: NotificationData[];
  className?: string;
}

// 알림 목록
const NotificationList = ({
  notificationList,
  className,
}: NotificationListProps) => {
  const router = useRouter();
  const params = useSearchParams();
  const clubId = params.get("clubId") || "";

  const handleClickNotification = (id: string, uri: string | null) => {
    readClubNotification(clubId, id).catch((error) =>
      console.log("알림 읽음 처리 실패", error)
    );
    if (uri) {
      router.push(uri);
    }
  };

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
            <button
              className={`w-full flex items-center justify-between gap-3 ${
                isChecked && "opacity-70"
              }`}
              onClick={() => handleClickNotification(id, uri)}
            >
              <div className="flex flex-col gap-2 text-left md:gap-[6px]">
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
              {uri && (
                <Image
                  src={rightArrow}
                  alt={"알림 바로가기"}
                  className="w-5 h-5 md:w-6 md:h-6"
                />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default NotificationList;
