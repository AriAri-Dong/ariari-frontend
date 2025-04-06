import useResponsive from "@/hooks/useResponsive";
import rightArrow from "@/images/icon/vector.svg";
import { ClubNotificationData } from "@/types/notification";
import formatDateToDot, { formatTime } from "@/utils/formatDateToDot";
import Image from "next/image";

interface ClubNotificationListProps {
  notificationList: ClubNotificationData[];
}

const ClubNotificationList = ({
  notificationList,
}: ClubNotificationListProps) => {
  const isMdUp = useResponsive("md");

  return (
    <ul className="max-h-[556px] mt-[14px] overflow-y-auto no-scrollbar">
      {notificationList.map((item, index) => {
        const { id, title, createdDateTime } = item;

        return (
          <li
            key={id}
            className="flex items-center justify-between py-[14px] px-2.5 cursor-pointer border-b last:border-b-0 last:pb-0"
          >
            <div className="flex flex-col gap-[6px]">
              <h3 className="text-text1 text-mobile_body1_m md:text-body2_m">
                {title}
              </h3>
              <div className="flex gap-[10px] text-unselected text-mobile_body4_r text-body4_r">
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

export default ClubNotificationList;
