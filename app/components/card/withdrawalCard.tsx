"use client";

import Image from "next/image";
import error from "@/images/icon/error.svg";

import { WithdrawalInfoItem } from "@/types/components/withdrawInfo";
import { useRouter } from "next/navigation";

interface WithdrawalCardProps {
  info: WithdrawalInfoItem;
}

const WithdrawalCard = ({ info }: WithdrawalCardProps) => {
  const router = useRouter();

  return (
    <div className="inline-flex flex-col gap-[14px] md:gap-[18px] ">
      <div className="text-text1 text-mobile_h3 md:text-h3">{info.title}</div>
      <div className="px-2.5 py-4 md:p-4 bg-hover rounded-12 items-center gap-2 flex">
        <Image
          src={error}
          alt="error"
          width={18}
          height={18}
          className="md:w-6 md:h-6"
        />
        <div className="text-icon text-mobile_body1_sb md:text-body1_sb ">
          {info.description}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {info.sections.map((item, index) => (
          <div className="flex gap-1 text-mobile_body1_r md:text-body3_m text-icon">
            <p>{index + 1 + "."}</p>
            <p>{item}</p>
          </div>
        ))}
      </div>
      <div>
        {info.button && (
          <button
            onClick={() => info.button?.onClick(router)}
            className="bg-transparent px-1.5 py-1 bg-blue-500 text-subtext2 text-body3_m"
          >
            {info.button.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default WithdrawalCard;
