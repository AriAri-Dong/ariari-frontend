import { useEffect } from "react";
import Image from "next/image";
import backVector from "@/images/icon/backVector.svg";
import vector from "@/images/icon/vector.svg";
import { NotificationData } from "@/types/notification";

interface ModalProps {
  onclose: () => void;
  notificationList: NotificationData[];
}

const MobileNotificationModal = ({ onclose, notificationList }: ModalProps) => {
  // 전체 화면 스크롤 방지 (이중 스크롤이 생겨서 넣었습니다.)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-white z-50 px-4 md:hidden">
      <div className="flex flex-row justify-between pt-[46px]">
        <div className="flex gap-2 mb-5">
          <Image
            src={backVector}
            alt={"뒤로가기"}
            width={24}
            height={24}
            onClick={onclose}
            className="cursor-pointer"
          />
          <h1 className="text-text1 text-mobile_h1_contents_title">알림</h1>
        </div>
      </div>
      <div
        className="flex flex-col overflow-y-scroll custom-scrollbar"
        style={{ maxHeight: "calc(100vh - 113px)" }}
      >
        {!notificationList ||
          (!notificationList?.length && <p>새로운 알림이 없습니다.</p>)}
        {notificationList.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-2.5 cursor-pointer py-[14px] border-b first:pt-[6px] last:pb-[6px] last:border-b-0"
          >
            <div className="flex flex-col">
              <h3 className="text-text1 text-mobile_body1_m">{item.title}</h3>
              <p className="text-unselected text-mobile_body4_r">
                {item.createdDateTime}
              </p>
            </div>
            <Image src={vector} alt={"바로가기"} width={16} height={16} />
          </div>
        ))}
      </div>
      <div className="h-5" />
    </div>
  );
};

export default MobileNotificationModal;
