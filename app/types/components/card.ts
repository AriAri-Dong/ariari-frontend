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

export interface GuideData {
  title: string; // 제목
  instructions: string[]; // 가이드 내용 리스트
}
