import employment from "@/images/icon/reviewBadge/employment.svg";
import experience from "@/images/icon/reviewBadge/experience.svg";
import health from "@/images/icon/reviewBadge/health.svg";
import interest from "@/images/icon/reviewBadge/interest.svg";
import relationship from "@/images/icon/reviewBadge/relationship.svg";
import selfDevelopment from "@/images/icon/reviewBadge/selfDevelopment.svg";
import skill from "@/images/icon/reviewBadge/skill.svg";
import { TagIconType } from "@/types/review";

export const tagMap: Record<TagIconType, string> = {
  CAREER_PREPARATION: employment,
  NETWORKING: relationship,
  INTEREST_EXPLORATION: interest,
  SELF_DEVELOPMENT: selfDevelopment,
  ACADEMIC_IMPROVEMENT: skill,
  HEALTH_ENHANCEMENT: health,
  DIVERSE_EXPERIENCE: experience,
};
