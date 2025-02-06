import React from "react";

interface BadgeProps {
  status: "enable" | "disable";
  type?: "recruitment" | "answer" | "none";
  text?: string;
}

/**
 * 뱃지 컴포넌트
 * @param status 활성/비활성화 상태
 * @param type 선택 사항, 기본값 "모집"
 * @param text type이 "none"일 경우 필수
 * @returns
 */
const Badge = ({ status, type = "recruitment", text }: BadgeProps) => {
  const statusVal = status === "enable";

  const getBadgeStyle = () => {
    if (type === "none") {
      return statusVal
        ? "text-primary bg-selectedoption_hover"
        : "text-subtext2 bg-token_bg";
    }
    return statusVal
      ? "text-primary bg-selectedoption_hover"
      : "text-subtext2 bg-token_bg";
  };

  const getBadgeText = () => {
    if (type === "recruitment") {
      return statusVal ? "모집중" : "모집마감";
    }
    if (type === "answer") {
      return statusVal ? "답변완료" : "미답변";
    }
    if (type === "none") {
      if (!text) {
        return "";
      }
      return text;
    }
    return "";
  };

  return (
    <div className="flex text-center">
      <div
        className={`rounded text-mobile_body3_m md:text-body3_m py-[3px] w-[62px] md:py-1 md:w-[64px] ${getBadgeStyle()}`}
      >
        {getBadgeText()}
      </div>
    </div>
  );
};

export default Badge;
