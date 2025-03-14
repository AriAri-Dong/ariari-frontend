"use client";

import React, { createContext, useContext, useState } from "react";

export interface ProfileData {
  username: string;
  selectedProfileType: string;
  email: string;
  verificationCode: string;
}

interface ProfileContextProps {
  profileData: ProfileData;
  updateProfileData: (data: Partial<ProfileData>) => void;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(
  undefined
);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    username: "",
    selectedProfileType: "",
    email: "",
    verificationCode: "",
  });

  const updateProfileData = (data: Partial<ProfileData>) => {
    setProfileData((prev) => ({ ...prev, ...data }));
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within ProfileProvider");
  }
  return context;
};
