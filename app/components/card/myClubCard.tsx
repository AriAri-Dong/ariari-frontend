import useResponsive from "@/hooks/useResponsive";
import Image from "next/image";
import rightArrow from "@/images/icon/vector.svg";
import defaultImg from "@/images/icon/defaultAriari.svg";
import { MyClubData } from "@/types/club";
import { useRouter } from "next/navigation";
import { formatRelativeTime } from "@/utils/formatRelativeTime";

const getLatestClubDate = (
  club: MyClubData
): { msg: string; date: string } | null => {
  const { clubActivityCreatedDt, clubNoticeCreatedDt } = club;
  if (!clubActivityCreatedDt && !clubNoticeCreatedDt) return null;
  if (!clubActivityCreatedDt)
    return { msg: "공지사항 추가", date: clubNoticeCreatedDt! };
  if (!clubNoticeCreatedDt)
    return { msg: "활동내역 추가", date: clubActivityCreatedDt! };

  return clubActivityCreatedDt > clubNoticeCreatedDt
    ? { msg: "활동내역 추가", date: clubActivityCreatedDt }
    : { msg: "공지사항 추가", date: clubNoticeCreatedDt };
};

interface MyClubCardProps {
  club: MyClubData;
}
const MyClubCard = ({ club }: MyClubCardProps) => {
  const router = useRouter();
  const isMdUp = useResponsive("md");
  const latest = getLatestClubDate(club);
  return (
    <div
      className="flex flex-col gap-1.5 w-[56px] cursor-pointer
        md:w-[282px] md:py-2 md:pl-2.5 md:pr-5
        md:flex-row md:space-between md:items-center md:gap-3.5 md:rounded-48 md:bg-hover md:active:bg-pressed"
      onClick={() => {
        router.push(`/club/activityHistory?clubId=${club.id}`);
      }}
    >
      <div className="relative w-[56px] h-[56px] md:w-[72px] md:h-[72px] rounded-full overflow-hidden">
        <Image
          src={club.profileUri || defaultImg}
          alt={`${club.name} img`}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center gap-1 ">
        <h3 className="text-mobile_body3_r text-text1 text-center md:text-h3 md:text-start md:w-[128px] truncate whitespace-nowrap overflow-hidden">
          {club.name}
        </h3>
        {isMdUp && latest && (
          <div className="flex gap-1 text-body3_m text-subtext2 whitespace-nowrap ">
            <p>{latest.msg}</p>
            <p>·</p>
            <p>{formatRelativeTime(latest.date)}</p>
          </div>
        )}
      </div>
      {isMdUp && (
        <Image
          src={rightArrow}
          alt={"동아리 바로가기"}
          className="w-5 h-5 md:w-6 md:h-6"
        />
      )}
    </div>
  );
};

export default MyClubCard;
