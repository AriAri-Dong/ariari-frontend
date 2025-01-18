import { ClubQuestionData } from "@/models/club";
import { PageInfo } from "@/models/pageInfo";

export const pageInfo: PageInfo = {
  contentSize: 10,
  totalSize: 20,
  totalPages: 2,
};

export const QNA_DATA: ClubQuestionData[] = [
  {
    id: 1,
    title: "클럽에 어떻게 가입하나요?",
    body: "이 클럽에 가입하고 싶은데 방법을 모르겠어요. 알려주실 수 있나요?",
    memberData: {
      id: 101,
      nickname: "변성은",
    },
    clubAnswerData: {
      body: "클럽 홈페이지에 접속하여 가입 신청서를 작성해 주시면 됩니다.",
      clubMemberData: {
        id: 1,
        name: "관리자",
        clubMemberRoleType: "ADMIN",
        clubMemberStatusType: "ACTIVE",
        profileType: "ARIARI_DRAGON",
        memberData: {
          id: 201,
          nickname: "관리자1",
        },
      },
    },
  },
  {
    id: 2,
    title: "회원비는 얼마인가요?",
    body: "클럽 가입 비용이 궁금합니다.",
    memberData: {
      id: 102,
      nickname: "박찬진",
    },
    clubAnswerData: {
      body: "연회비는 50,000원이며, 모든 행사에 참여할 수 있는 권한이 포함됩니다. 연회비는 50,000원이며, 모든 행사에 참여할 수 있는 권한이 포함됩니다. 연회비는 50,000원이며, 모든 행사에 참여할 수 있는 권한이 포함됩니다.",
      clubMemberData: {
        id: 2,
        name: "회계 담당",
        clubMemberRoleType: "MANAGER",
        clubMemberStatusType: "ACTIVE",
        profileType: "ARIARI_PIG",
        memberData: {
          id: 202,
          nickname: "회계담당자",
        },
      },
    },
  },
  {
    id: 3,
    title: "해외 거주자도 가입할 수 있나요?",
    body: "저는 해외에 거주 중입니다. 가입이 가능할까요?",
    memberData: {
      id: 103,
      nickname: "권수연",
    },
    clubAnswerData: {
      body: "네, 해외 거주자도 가입 가능합니다! 자세한 내용은 문의해 주세요.",
      clubMemberData: {
        id: 3,
        name: "관리자",
        clubMemberRoleType: "ADMIN",
        clubMemberStatusType: "ACTIVE",
        profileType: "ARIARI_COW",
        memberData: {
          id: 203,
          nickname: "관리자2",
        },
      },
    },
  },
  {
    id: 4,
    title: "다음 클럽 모임 일정은 언제인가요?",
    body: "공지사항을 놓쳤어요. 다음 모임 날짜를 알려주세요.",
    memberData: {
      id: 104,
      nickname: "정현우",
    },
    clubAnswerData: {
      body: "다음 모임은 1월 20일 오후 7시에 커뮤니티 홀에서 열립니다.",
      clubMemberData: {
        id: 4,
        name: "총무",
        clubMemberRoleType: "MANAGER",
        clubMemberStatusType: "ACTIVE",
        profileType: "ARIARI_RABBIT",
        memberData: {
          id: 204,
          nickname: "총무담당",
        },
      },
    },
  },
  {
    id: 5,
    title: "연령 제한이 있나요?",
    body: "클럽에 가입하려면 최소 또는 최대 나이 제한이 있나요?",
    memberData: {
      id: 105,
      nickname: "최은지",
    },
    clubAnswerData: {
      body: "저희 클럽은 모든 연령대가 가입 가능하지만, 일부 행사는 특정 연령 제한이 있을 수 있습니다.",
      clubMemberData: {
        id: 5,
        name: "행사 기획자",
        clubMemberRoleType: "GENERAL",
        clubMemberStatusType: "ACTIVE",
        profileType: "ARIARI_TIGER",
        memberData: {
          id: 205,
          nickname: "기획자1",
        },
      },
    },
  },
  {
    id: 6,
    title: "클럽 행사에 게스트를 데려갈 수 있나요?",
    body: "다가오는 행사에 친구를 초대하고 싶은데, 가능할까요?",
    memberData: {
      id: 106,
      nickname: "한상민",
    },
    clubAnswerData: {
      body: "게스트 초대는 가능합니다. 다만, 사전에 알려주시면 준비에 도움이 됩니다.",
      clubMemberData: {
        id: 6,
        name: "관리자",
        clubMemberRoleType: "ADMIN",
        clubMemberStatusType: "ACTIVE",
        profileType: "ARIARI_DRAGON",
        memberData: {
          id: 206,
          nickname: "관리자3",
        },
      },
    },
  },
  {
    id: 7,
    title: "활동기간",
    body: "3개월만 활동하고 싶어요",
    memberData: {
      id: 106,
      nickname: "아무개",
    },
    clubAnswerData: null,
  },
  {
    id: 8,
    title: "회비",
    body: "회비 너무 비싸요",
    memberData: {
      id: 106,
      nickname: "아무개",
    },
    clubAnswerData: null,
  },
  {
    id: 9,
    title: "동아리방",
    body: "동아리방 있나요?",
    memberData: {
      id: 106,
      nickname: "아무개",
    },
    clubAnswerData: null,
  },
  {
    id: 10,
    title: "회장",
    body: "회장 이름 뭔가요",
    memberData: {
      id: 106,
      nickname: "아무개",
    },
    clubAnswerData: null,
  },
];
