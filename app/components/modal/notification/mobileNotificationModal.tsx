import { useEffect } from "react";
import Image from "next/image";
import backVector from "@/images/icon/backVector.svg";
import vector from "@/images/icon/vector.svg";
import { TEMP_DATA } from "@/data/notification";

interface ModalProps {
  onclose: () => void;
}

const MobileNotificationModal = ({ onclose }: ModalProps) => {
  // 전체 화면 스크롤 방지 (이중 스크롤이 생겨서 넣었습니다.)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-white z-50 px-4">
      <div className="flex flex-row justify-between pt-[46px] md:hidden">
        <div className="flex gap-2 mb-5">
          <Image
            src={backVector}
            alt={"뒤로가기"}
            width={24}
            height={24}
            onClick={onclose}
            className="md:hidden cursor-pointer"
          />
          <h1 className="text-text1 text-mobile_h1_contents_title">알림</h1>
        </div>
      </div>
      <div
        className="flex flex-col overflow-y-scroll pb-20"
        style={{ maxHeight: "calc(100vh - 93px)" }}
      >
        {TEMP_DATA.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between px-2.5 cursor-pointer ${
              index === TEMP_DATA.length - 1
                ? "pt-[14px] pb-[6px]"
                : index === 0
                ? "border-b pb-[14px] pt-[6px]"
                : "border-b py-[14px]"
            }`}
          >
            <div className="flex flex-col">
              <h3 className="text-text1 text-mobile_body1_m">{item.title}</h3>
              <p className="text-unselected text-mobile_body4_r">{item.date}</p>
            </div>
            <Image src={vector} alt={"바로가기"} width={16} height={16} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileNotificationModal;
