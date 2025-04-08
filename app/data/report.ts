import { ReportType } from "@/types/report";

export const REPORT_REASONS: { label: string; value: ReportType }[] = [
  { label: "스팸 홍보/도배글 입니다.", value: "SPAM_ADVERTISEMENT" },
  { label: "음란물입니다.", value: "PORNOGRAPHY" },
  { label: "불법정보를 포함하고 있습니다.", value: "ILLEGAL_INFORMATION" },
  { label: "욕설/생명경시/혐오/차별적 표현입니다.", value: "ABUSIVE_LANGUAGE" },
  { label: "개인정보 노출 게시물입니다.", value: "PERSONAL_INFORMATION" },
  { label: "불쾌한 표현이 있습니다.", value: "OFFENSIVE_EXPRESSION" },
  { label: "기타", value: "ETC" },
];
