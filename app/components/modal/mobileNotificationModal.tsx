import Image from "next/image";
import vector from "@/images/icon/backVector.svg";

interface ModalProps {
  onclose: () => void;
}

const MobileNotificationModal = ({ onclose }: ModalProps) => {
  return (
    <div className="flex flex-row justify-between md:hidden">
      <div className="flex gap-2">
        <Image
          src={vector}
          alt={"뒤로가기"}
          width={24}
          height={24}
          onClick={onclose}
          className="md:hidden cursor-pointer"
        />
        <div className="flex flex-col gap-[22px]">
          <h1 className="text-text1 text-mobile_h1_contents_title md:text-h1_contents_title">
            알림
          </h1>
        </div>
      </div>
    </div>
  );
};

export default MobileNotificationModal;
