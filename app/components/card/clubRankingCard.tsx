"use client";

interface Club {
  id: number;
  title: string;
  description: string;
  rank: number;
  imageSrc?: string;
}

interface ClubRankingCardProps {
  clubs: Club[];
}

const gradientClasses = [
  "bg-gradient-to-r from-primary via-primary to-[#D9D9D9]",
  "bg-gradient-to-r from-sub1 via-sub1 to-[#D9D9D9]",
  "bg-gradient-to-r from-sub2 via-sub2 to-[#D9D9D9]",
];

const ClubRankingCard = ({ clubs }: ClubRankingCardProps) => {
  return (
    <div className="grid grid-cols-1 mt-5 mb-[18px] md:grid-cols-2 md:gap-[18px] lg:grid-cols-3 lg:gap-4 lg:mb-[32px]">
      {clubs.map((club, index) => {
        const gradientClass = `${gradientClasses[index]} text-white mb-[8px]`;

        return (
          <div
            key={club.id}
            className={`w-full rounded-lg cursor-pointer ${gradientClass}`}
          >
            <div
              className={`flex items-center gap-[16px] px-[24px] py-[16px] md:py-[32px] md:gap-[28px]`}
            >
              <div className="w-[38px] text-[32px] text-center leading-none md:w-[38px] md:text-[58px]">
                {club.rank}
              </div>

              <div className="flex-1 overflow-hidden">
                <div className="text-mobile_h3 truncate mb-2 md:text-h2">
                  {club.title}
                </div>
                <p className="text-mobile_body3_m truncate text-background md:text-body1_r">
                  {club.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClubRankingCard;
