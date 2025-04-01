import { TEMP_DATA } from "@/data/notification";
import useResponsive from "@/hooks/useResponsive";
import rightArrow from "@/images/icon/vector.svg";
import Image from "next/image";

const ClubNotificationList = () => {
  const isMdUp = useResponsive("md");

  return (
    <ul className="max-h-[556px] overflow-y-auto no-scrollbar">
      {TEMP_DATA.map((item, index) => (
        <li
          key={index}
          className="flex items-center justify-between py-[14px] px-2.5 cursor-pointer border-b last:border-b-0"
        >
          <div className="flex flex-col gap-[6px]">
            <h3 className="text-text1 text-mobile_body1_m md:text-body2_m">
              {item.title}
            </h3>
            <p className="text-unselected text-mobile_body4_r text-body4_r">
              {item.date}
            </p>
          </div>
          <Image
            src={rightArrow}
            alt={"알림 바로가기"}
            width={isMdUp ? 24 : 20}
            height={isMdUp ? 24 : 20}
          />
        </li>
      ))}
    </ul>
  );
};

export default ClubNotificationList;
