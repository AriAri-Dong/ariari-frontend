import { UserDataResponseType } from "@/types/api";
import {
  MEMBERS_MY_NICKNAME,
  MEMBERS_MY_PROFILE,
  MEMBERS,
  MEMBERS_MY,
  CLUB_MEMBERS,
  CLUBS,
  CLUB_MEMBERS_,
} from "../apiUrl";
import axiosInstance from "../axiosInstance";
import {
  ClubMemberListRes,
  clubMemberRoleType,
  clubMemberStatusType,
  MemberListRes,
} from "@/types/member";

// 닉네임 변경 API
export const updateNickname = async (nickname: string) => {
  try {
    const { data } = await axiosInstance.put(MEMBERS_MY_NICKNAME, { nickname });
    console.log("닉네임 변경 성공 >>>", data);
    return data;
  } catch (err) {
    console.error("닉네임 변경 실패:", err);
    throw err;
  }
};

// 프로필 변경 API
export const updateProfileType = async (profileType: string | null) => {
  try {
    const { data } = await axiosInstance.put(MEMBERS_MY_PROFILE, {
      profileType,
    });
    console.log("프로필 변경 성공 >>>", data);
    return data;
  } catch (err) {
    console.error("프로필 변경 실패:", err);
    throw err;
  }
};

// 닉네임으로 회원 데이터 조회
export const getMemberDataByNickname = async (nickname: string) => {
  try {
    const { data } = await axiosInstance.get<UserDataResponseType[]>(MEMBERS, {
      params: { nickname },
    });
    console.log("성공 >>>", data);
    return data;
  } catch (err) {
    console.error("회원 정보 조회 실패:", err);
    return [];
  }
};

// 현재 로그인된 사용자 정보 조회
export const getMemberData = async () => {
  try {
    const { data } = await axiosInstance.get<UserDataResponseType>(MEMBERS_MY);
    console.log("성공 >>>", data);
    return data;
  } catch (err) {
    console.error("유저 정보 조회 실패:", err);
    return null;
  }
};

// 동아리 회원 리스트 조회
export const getClubMembers = async (
  clubId: string,
  statusType?: clubMemberStatusType | undefined,
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
  try {
    const { data } = await axiosInstance.get<ClubMemberListRes>(
      `${CLUBS}/${clubId}${CLUB_MEMBERS}`,
      { params }
    );
    return data;
  } catch (err) {
    console.log("동아리 회원 리스트 조회 실패", err);
  }
};

// 동아리 회원 권한 수정
export const putClubMembersRole = async (
  memberId: string,
  newRole: clubMemberRoleType
) => {
  try {
    const { data } = await axiosInstance.put<ClubMemberListRes>(
      `${CLUB_MEMBERS}/${memberId}/role`,

      { clubMemberRoleType: newRole }
    );
    return data;
  } catch (err) {
    console.log("동아리 회원 권한 수정 실패", err);
  }
};
// 동아리 회원 상태 수정
export const putClubMembersStatus = async (
  clubId: string,
  memberIds: string[],
  newStatus: clubMemberStatusType
) => {
  try {
    const { data } = await axiosInstance.put<ClubMemberListRes>(
      `${CLUBS}/${clubId}${CLUB_MEMBERS}/status?clubMemberIds=${memberIds.join(
        ","
      )}`,
      { clubMemberStatusType: newStatus }
    );
    return data;
  } catch (err) {
    console.log("동아리 회원 상태 수정 실패", err);
  }
};

// 동아리 회원 ADMIN 권한 위임
export const entrustAdmin = async (memberId: string) => {
  try {
    const { data } = await axiosInstance.patch<ClubMemberListRes>(
      `${CLUB_MEMBERS_}/${memberId}/entrust-admin`
    );
    return data;
  } catch (err) {
    console.log("ADMIN 회원 권한 위임 실패", err);
  }
};
// 동아리 회원 삭제
export const deleteClubMember = async (memberId: string) => {
  try {
    const { data } = await axiosInstance.delete<ClubMemberListRes>(
      `${CLUB_MEMBERS}/${memberId}`
    );
    return data;
  } catch (err) {
    console.log("동아리 회원 삭제 실패", err);
  }
};
// 닉네임으로 회원 통합 검색
export const getMemberList = async (
  nickname: string,
  page?: number,
  size?: number
) => {
  const params: Record<string, any> = {
    ...(nickname && { nickname }),
    ...(page && { page }),
    ...(size && { size }),
  };
  try {
    const { data } = await axiosInstance.get<MemberListRes>(MEMBERS, {
      params,
    });
    return data;
  } catch (err) {
    console.log("회원 검색 실패", err);
    throw err;
  }
};

// 동아리 회원 탈퇴

export const withdrawalClub = async (clubMemberId: string) => {
  try {
    const response = await axiosInstance.delete<ClubMemberListRes>(
      `${CLUB_MEMBERS}/withdrawal/${clubMemberId}`
    );
    return response.status;
  } catch (err) {
    console.log("동아리 회원 탈퇴 실패", err);
    throw err;
  }
};
