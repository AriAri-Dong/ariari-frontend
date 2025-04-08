"use client";

import Image from "next/image";
import { ClubData } from "@/types/club";
import defaultImg from "@/images/icon/defaultAriari.svg";
import { useRouter } from "next/navigation";
import useResponsive from "@/hooks/useResponsive";

interface ClubRankingListProps {
  clubs: ClubData[];
}

const ClubRankingList = ({ clubs }: ClubRankingListProps) => {
  const router = useRouter();

  const isTab = useResponsive("md");
  const isDesktop = useResponsive("lg");

  return (
    <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden">
      <div
        className={`grid gap-4 grid-cols-[repeat(3,minmax(204px,1fr))] md:grid-cols-[repeat(2,minmax(204px,1fr))] lg:grid-cols-[repeat(3,minmax(204px,1fr))]`}
      >
        {clubs.map((club, index) => (
          <div
            key={club.id}
            className="min-w-[204px] rounded-lg flex-shrink-0 cursor-pointer "
            onClick={() => {
              router.push(`/club/activityHistory?clubId=${club.id}`);
            }}
          >
            <div className="flex items-center gap-[18px] md:gap-[30px]">
              <div className="flex items-center gap-[14px] md:gap-[26px]">
                <Image
                  src={club.profileUri || defaultImg}
                  alt={club.name}
                  width={56}
                  height={56}
                  className="md:w-[98px] md:h-[98px] rounded-full object-cover"
                />

                <div className="text-base font-semibold md:text-2xl">
                  {isDesktop ? index + 4 : isTab ? index + 3 : index + 2}
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="text-mobile_h4_sb truncate mb-1 md:text-h3 md:mb-2">
                  {club.name}
                </div>
                <p className="w-[80%] text-mobile_body3_r truncate text-subtext2 md:text-body1_r">
                  {club.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubRankingList;
