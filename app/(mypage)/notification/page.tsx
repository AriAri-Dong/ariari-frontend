"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import backVector from "@/images/icon/backVector.svg";
import vector from "@/images/icon/vector.svg";
import { TEMP_DATA } from "@/data/notification";

const NotificationPage = () => {
  const router = useRouter();

  const handlePrev = () => {
    router.push("/");
  };

  return (
    <div>
      <div className="flex flex-col gap-5 mt-[46px] md:mt-8 md:gap-[22px]">
        <div className="flex flex-row justify-between">
          <div className="flex gap-2">
            <Image
              src={backVector}
              alt={"뒤로가기"}
              width={24}
              height={24}
              onClick={handlePrev}
              className="md:hidden cursor-pointer"
            />
            <h1 className="text-text1 text-mobile_h1_contents_title md:text-h1_contents_title">
              알림
            </h1>
          </div>
        </div>
        <div className="flex flex-col pb-20">
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
                <p className="text-unselected text-mobile_body4_r">
                  {item.date}
                </p>
              </div>
              <Image src={vector} alt={"바로가기"} width={16} height={16} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
