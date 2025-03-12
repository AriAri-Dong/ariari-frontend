import { StaticImageData } from "next/image";
import { ClubFieldType, ClubRegionType, ParticipantType } from "@/types/club";
import { ProcedureType } from "@/types/recruitment";

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

export interface ClubInfoCard {
  id: string;
  startDate: string;
  endDate: string;
  clubName: string;
  clubImageUrl?: string | StaticImageData;
  title: string;
  imageUrl: string | StaticImageData;
  limits: number;
  tag: {
    affiliation: string;
    field: ClubFieldType;
    region: ClubRegionType;
    target: ParticipantType;
  };
  clubId: string;
  isMyRecruitmentScrap: boolean;
  procedureType: ProcedureType;
  recruitmentBookmarks: number;
  isMyClub: boolean;
  isMyApply: boolean;
  isMyClubBookmark: boolean;
}

export interface GuideData {
  title: string;
  instructions: string[];
}
