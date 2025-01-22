"use client";
import React from "react";
import Image from "next/image";
import { clubMemberStatusType } from "@/model/member";

import { MAP_STATUS_STYLES } from "@/(club)/club/members/util/mapStatus";
interface MemberStatusTokenProps {
  status: clubMemberStatusType;
}

const MemberStatusToken = ({ status }: MemberStatusTokenProps) => {
  return (
    <div
      className={`flex gap-1.5 items-center px-2.5 py-[3px] md:py-1 rounded-[4px] ${MAP_STATUS_STYLES[status].bgColor}`}
    >
      <Image
        src={MAP_STATUS_STYLES[status].image}
        alt="token_img"
        width={15}
        height={18}
        className="md:h-5"
      />
      <span className={`${MAP_STATUS_STYLES[status].textColor}`}>
        {MAP_STATUS_STYLES[status].text}
      </span>
    </div>
  );
};
export default MemberStatusToken;
