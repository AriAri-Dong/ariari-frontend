"use client";

import Image from "next/image";
import error from "@/images/icon/error.svg";

import { useRouter } from "next/navigation";
import { NoticeItem } from "@/types/components/withdrawInfo";

interface NoticeCardProps {
  info: NoticeItem;
}

const NoticeCard = ({ info }: NoticeCardProps) => {
  const router = useRouter();
  let sectionIndex = 0;

  return (
    <div className="flex flex-col gap-[14px] md:gap-[18px] ">
      <div className="text-text1 text-mobile_h3 md:text-h3">{info.title}</div>
      {info.description && (
        <div className="px-2.5 py-4 md:p-4 items-start md:items-center bg-hover rounded-12 gap-2 flex">
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
      )}
      <div className="flex flex-col gap-2">
        {info.sections.map((item, index) => {
          const isDescription = item.startsWith("-");
          const isDoubleDescription = item.startsWith("--");
          const text =
            isDescription || isDoubleDescription
              ? item.slice(isDoubleDescription ? 2 : 1).trim()
              : item;
          if (!isDescription && !isDoubleDescription) sectionIndex++;
          return (
            <div
              key={index}
              className="flex gap-1.5 text-mobile_body1_r md:text-body3_m text-icon"
            >
              {info.sections.length !== 1 &&
                (isDoubleDescription ? (
                  <p className="ml-2 w-2 text-center">◦</p>
                ) : isDescription ? (
                  <p className="w-2 text-center">•</p>
                ) : (
                  <p className="w-2">{sectionIndex + "."}</p>
                ))}
              <p>{text}</p>
            </div>
          );
        })}
      </div>
      {info.button && (
        <button
          onClick={() => info.button?.onClick(router)}
          className="w-fit bg-transparent px-1.5 py-1 text-subtext2 text-body3_m"
        >
          {info.button.label}
        </button>
      )}
    </div>
  );
};

export default NoticeCard;
