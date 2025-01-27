export type JoinedClub = {
  id: number;
  name: string;
  users: { id: number; label: string }[];
  image: string;
};
export type Delegator = {
  name: string;
  id: number;
};
