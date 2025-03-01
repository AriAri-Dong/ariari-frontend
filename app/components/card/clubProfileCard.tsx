"use client";

interface ClubProfileCardProps {
  clubName: string;
  affiliation: string;
  field: string;
  region: string;
  target: string;
}

/**
 *
 * @param clubName 동아리 이름
 * @param affiliation 소속
 * @param field 분야
 * @param region 지역
 * @param target 대상
 * @returns
 */
const ClubProfileCard = ({
  clubName,
  affiliation,
  field,
  region,
  target,
}: ClubProfileCardProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-mobile_h4_sb text-text1">{clubName}</h1>
      <p className="text-subtext2 text-mobile_body3_m">
        {affiliation} | {field} | {region} | {target}
      </p>
    </div>
  );
};

export default ClubProfileCard;
