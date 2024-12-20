"use client";

import Image from "next/image";
import pointIcon from "@/images/icon/popup/point.svg";

interface PointStatusProps {
  username: string;
  point: number;
}

const PointStatusCard = ({ username, point }: PointStatusProps) => {
  return (
    <>
      <div
        className="hidden md:flex flex-col gap-10 w-[320px] h-[387px]
      rounded-2xl bg-selectedoption_default items-center place-content-center"
      >
        <Image src={pointIcon} alt={"point"} width={124} height={124} />
        <div className="flex flex-col gap-4 text-primary">
          <h3 className="text-h2">{username}님의 포인트</h3>
          <h2 className="flex items-center justify-center text-36">
            {point}&nbsp;
            <p className="text-h4_sb"> p</p>
          </h2>
        </div>
      </div>

      <div
        className="flex justify-between bg-selectedoption_default items-center
      rounded-lg h-[55px] px-5 text-primary md:hidden"
      >
        <h3 className="text-mobile_body1_sb">내 포인트 현황</h3>
        <p className="text-mobile_h4_sb">{point} p</p>
      </div>
    </>
  );
};

export default PointStatusCard;
