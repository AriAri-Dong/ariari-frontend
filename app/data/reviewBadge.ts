import employment from "@/images/icon/reviewBadge/employment.svg";
import experience from "@/images/icon/reviewBadge/experience.svg";
import health from "@/images/icon/reviewBadge/health.svg";
import interest from "@/images/icon/reviewBadge/interest.svg";
import relationship from "@/images/icon/reviewBadge/relationship.svg";
import selfDevelopment from "@/images/icon/reviewBadge/selfDevelopment.svg";
import skill from "@/images/icon/reviewBadge/skill.svg";
import { TagIconType } from "@/types/review";

export interface Badge {
  id: number;
  imageUrl: string;
  title: string;
  type: TagIconType;
}

export const REVIEW_BADGE_LIST: Badge[] = [
  {
    id: 1,
    imageUrl: employment,
    title: "취업준비에 도움이 돼요",
    type: "CAREER_PREPARATION",
  },
  {
    id: 2,
    imageUrl: experience,
    title: "인간관계를 넓힐 수 있어요",
    type: "NETWORKING",
  },
  {
    id: 3,
    imageUrl: health,
    title: "관심분야를 탐구할 수 있어요",
    type: "INTEREST_EXPLORATION",
  },
  {
    id: 4,
    imageUrl: interest,
    title: "자기 계발에 도움이 돼요",
    type: "SELF_DEVELOPMENT",
  },
  {
    id: 5,
    imageUrl: relationship,
    title: "전공 실력이나 성적을 높일 수 있어요",
    type: "ACADEMIC_IMPROVEMENT",
  },
  {
    id: 6,
    imageUrl: selfDevelopment,
    title: "건강증진에 도움이 돼요",
    type: "HEALTH_ENHANCEMENT",
  },
  {
    id: 7,
    imageUrl: skill,
    title: "다양한 경험을 할 수 있어요",
    type: "DIVERSE_EXPERIENCE",
  },
];
