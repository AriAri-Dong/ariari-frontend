import { ClubDetailRes } from "@/types/club";
import { clubMemberRoleType } from "@/types/member";
import { createContext, useContext, useState } from "react";

interface ClubContextType {
  role: clubMemberRoleType | null;
  clubInfo: ClubDetailRes | null;
  setRole: (roleType: clubMemberRoleType) => void;
  setClubInfo: (info: ClubDetailRes) => void;
}

const ClubUserContext = createContext<ClubContextType | undefined>(undefined);

export const ClubProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<clubMemberRoleType | null>(null);
  const [clubInfo, setClubInfo] = useState<ClubDetailRes | null>(null);

  return (
    <ClubUserContext.Provider value={{ role, setRole, clubInfo, setClubInfo }}>
      {children}
    </ClubUserContext.Provider>
  );
};

export const useClubContext = () => {
  const context = useContext(ClubUserContext);
  if (!context) {
    throw new Error("useClubContext must be used within ProfileProvider");
  }
  return context;
};
