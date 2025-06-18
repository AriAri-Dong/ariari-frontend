import { useRouter } from "next/navigation";
import Image from "next/image";
import { ClubData } from "@/types/api";

const gradientClasses = [
  "bg-gradient-to-r from-primary via-primary to-transparent",
  "bg-gradient-to-r from-sub1 via-sub1 to-transparent",
  "bg-gradient-to-r from-sub2 via-sub2 to-transparent",
];

interface ClubRackingCardProps {
  club: ClubData;
  rank: number;
}
export const ClubRackingCard = ({ club, rank }: ClubRackingCardProps) => {
  const gradientClass = `${gradientClasses[rank - 1]} text-white mb-[8px]`;
  const router = useRouter();

  return (
    <>
      {/* 카드 */}
      <div
        key={club.id}
        className={`relative w-full rounded-lg cursor-pointer ${gradientClass}`}
        onClick={() => {
          router.push(`/club/activityHistory?clubId=${club.id}`);
        }}
      >
        <div
          className={`flex items-center gap-[16px] px-[24px] py-[16px] md:py-[32px] md:gap-[28px]`}
        >
          <div className="w-[38px] text-[32px] text-center leading-none md:w-[38px] md:text-[58px]">
            {rank}
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="text-mobile_h3 truncate mb-2 md:text-h2">
              {club.name}
            </div>
            <p className="text-mobile_body3_m truncate text-background md:text-body1_r">
              {club.body}
            </p>
          </div>
        </div>
        {/* 이미지 */}
        {club.profileUri && (
          <div
            className="absolute top-0 right-0 z-[-1] rounded-tr-lg rounded-br-lg "
            style={{
              height: "100%",
              width: "50%",
            }}
          >
            <Image
              src={club.profileUri}
              alt={`${club.name} 프로필 이미지`}
              layout="fill"
              objectFit="cover"
              className="rounded-tr-lg rounded-br-lg"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ClubRackingCard;
