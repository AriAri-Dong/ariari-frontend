import { useEffect } from "react";
import Image from "next/image";
import backVector from "@/images/icon/backVector.svg";
import {
  ClubNotificationData,
  MemberNotificationData,
} from "@/types/notification";
import ClubNotificationList from "@/components/list/notificationList";

interface ModalProps {
  onclose: () => void;
  notificationList: (ClubNotificationData | MemberNotificationData)[];
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
    <div className="fixed inset-0 bg-white z-50 px-4 lg:hidden">
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
        <ClubNotificationList
          notificationList={notificationList}
          className="first:pt-[6px] last:pb-[6px]"
        />
      </div>
    </div>
  );
};

export default MobileNotificationModal;
