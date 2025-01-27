import { clubMemberStatusType } from "@/model/member";
import activeImg from "@/images/icon/token/on.svg";
import chillImg from "@/images/icon/token/bye.svg"; //이미지 교체 예정
import byeImg from "@/images/icon/token/bye.svg";

export const MAP_STATUS_STYLES: Record<
  clubMemberStatusType,
  { bgColor: string; textColor: string; image: string; text: string }
> = {
  ACTIVE: {
    bgColor: "bg-selectedoption_default",
    textColor: "text-primary",
    image: activeImg,
    text: "On",
  },
  INACTIVE: {
    bgColor: "bg-token_2_bg",
    textColor: "text-token_2",
    image: chillImg,
    text: "Chill",
  },
  WITHDRAWN: {
    bgColor: "bg-token_bg",
    textColor: "text-subtext2",
    image: byeImg,
    text: "Bye",
  },
};

export const MAP_STATUS_TO_EN: Record<string, clubMemberStatusType> = {
  활동중: "ACTIVE",
  휴식중: "INACTIVE",
  "활동 종료": "WITHDRAWN",
};
export const MAP_STATUS_TO_KO: Record<clubMemberStatusType, string> = {
  ACTIVE: "활동중",
  INACTIVE: "휴식중",
  WITHDRAWN: "활동 종료",
};
