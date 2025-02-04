import { StaticImageData } from "next/image";
import { ClubFieldType, ClubRegionType, ParticipantType } from "../club";
import { ProcedureType } from "@/types/recruitment";

export interface MainRecruitmentCardProps {
  id: number;
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
