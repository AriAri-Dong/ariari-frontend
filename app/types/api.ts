export type AuthResponseType = {
  accessToken: string;
  refreshToken: string;
  isFirstLogin: boolean;
};

export type UserDataResponseType = {
  memberData: {
    // id: string;
    // nickname: string;
    // profileType: string;
    memberId: string;
    nickname: string;
  };
  schoolData: {
    name: string;
  };
};
