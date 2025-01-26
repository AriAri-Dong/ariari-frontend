import { StaticImageData } from "next/image";

export interface MainRecruitmentCardProps {
  id: number;
  date: string;
  clubName: string;
  clubImageUrl?: string | StaticImageData;
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
export interface GuideData {
  title: string;
  instructions: string[];
}
