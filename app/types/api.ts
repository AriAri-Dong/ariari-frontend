export interface Pageable {
  page: number;
  size: number;
  sort?: string[];
}

export type AuthResponseType = {
  accessToken: string;
  refreshToken: string;
  isFirstLogin: boolean;
};

export type UserDataResponseType = {
  memberData: {
    id: string;
    nickname: string;
    profileType: string;
  };
  schoolData: {
    name: string;
  };
};
