import { StaticImageData } from "next/image";

export interface MainRecruitmentCardProps {
  date: string;
  clubName: string;
  title: string;
  imageUrl: string | StaticImageData;
  tag: {
    affiliation: string;
    field: string;
    region: string;
    target: string;
  };
  isScrap: boolean;
}
