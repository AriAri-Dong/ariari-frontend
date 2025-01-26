import { ClubMemberData } from "@/models/member";

export const CLUM_MEMBER_DATA: ClubMemberData[] = [
  {
    id: 1,
    name: "변성은",
    clubMemberRoleType: "GENERAL",
    clubMemberStatusType: "ACTIVE",
    profileType: "ARIARI_MOUSE",
    memberData: {
      id: 101,
      nickname: "변성은",
    },
  },
  {
    id: 2,
    name: "권수연",
    clubMemberRoleType: "MANAGER",
    clubMemberStatusType: "ACTIVE",
    profileType: "ARIARI_RABBIT",
    memberData: {
      id: 102,
      nickname: "권수연",
    },
  },
  {
    id: 3,
    name: "박찬진",
    clubMemberRoleType: "ADMIN",
    clubMemberStatusType: "ACTIVE",
    profileType: "ARIARI_DRAGON",
    memberData: {
      id: 103,
      nickname: "박찬진",
    },
  },
];
