import { api } from "./api";
import {
  ClubMemberListRes,
  clubMemberRoleType,
  clubMemberStatusType,
} from "@/types/member";
// 동아리 회원 리스트 조회
export const getClubMembers = async (
  clubId: string,
  statusType?: clubMemberStatusType,
  query?: string, //검색어
  page?: number,
  size?: number
) => {
  const params: Record<string, any> = {
    ...(statusType && { statusType }),
    ...(query && { query }),
    ...(page && { page }),
    ...(size && { size }),
  };
  console.log("id", clubId);
  const response = await api.get<ClubMemberListRes>(
    `/clubs/${clubId}/club-members`,
    { params }
  );
  return response.data;
};
// 동아리 회원 권한 수정
export const putClubMembersRole = async (
  memberId: string,
  newRole: clubMemberRoleType
) => {
  console.log("id", memberId);
  const response = await api.put<ClubMemberListRes>(
    `/club-members/${memberId}/role`,
    // newRole
    { clubMemberRoleType: newRole }
  );
  return response.data;
};
// 동아리 회원 상태 수정
export const putClubMembersStatus = async (
  clubId: string,
  memberIds: string[],
  newStatus: clubMemberStatusType
) => {
  const response = await api.put<ClubMemberListRes>(
    `/clubs/${clubId}/club-members/status?clubMemberIds=${memberIds.join(",")}`,
    { clubMemberStatusType: newStatus }
  );
  return response.data;
};

// 동아리 회원 ADMIN 권한 위임
export const entrustAdmin = async (memberId: string) => {
  const response = await api.patch<ClubMemberListRes>(
    `club_members/${memberId}/entrust-admin`
  );
  return response.data;
};
// 동아리 회원 삭제
export const deleteClubMember = async (memberId: string) => {
  const response = await api.delete<ClubMemberListRes>(
    `club-members/${memberId}`
  );
  return response.data;
};
