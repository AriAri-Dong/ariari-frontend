export type clubMemberRoleType = "GENERAL" | "MANAGER" | "ADMIN";
export type clubMemberStatusType = "ACTIVE" | "INACTIVE" | "WITHDRAWN";
export type profileType =
  | "ARIARI_MOUSE"
  | "ARIARI_COW"
  | "ARIARI_TIGER"
  | "ARIARI_RABBIT"
  | "ARIARI_DRAGON"
  | "ARIARI_SNAKE"
  | "ARIARI_HORSE"
  | "ARIARI_SHEEP"
  | "ARIARI_MONKEY"
  | "ARIARI_CHICKEN"
  | "ARIARI_DOG"
  | "ARIARI_PIG"
  | null;

export interface MemberData {
  id: number; // $int64
  nickname: string;
}

export interface ClubMemberData {
  id: number; // $int64
  name: string;
  clubMemberRoleType: clubMemberRoleType;
  clubMemberStatusType: clubMemberStatusType;
  profileType: profileType;
  memberData: MemberData;
}
