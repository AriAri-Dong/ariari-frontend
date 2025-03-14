import { profileType } from "@/types/member";

export const getProfileImage = (profileType: profileType | null) => {
  const defaultProfile = "/images/profile/ariari.svg";

  if (!profileType || profileType.trim() === "") return defaultProfile;
  const profileKey = profileType.replace("ARIARI_", "").toLowerCase();

  return `/images/profile/${profileKey}.svg`;
};
