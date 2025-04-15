import { StaticImageData } from "next/image";
import { ClubFieldType, ClubRegionType, ParticipantType } from "@/types/club";
import { ProcedureType } from "@/types/recruitment";
import { ApplyFormData } from "../application";

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
  applyFormData?: ApplyFormData;
  myRecentApplyTempId?: string;
}

export interface GuideData {
  title: string;
  instructions: string[];
}
