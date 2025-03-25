import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type WithdrawalSection = {
  content: string;
};

export type WithdrawalButton = {
  label: string;
  onClick: (router: AppRouterInstance) => void;
};

export type NoticeItem = {
  title: string;
  description?: string | null;
  sections: string[];
  button?: WithdrawalButton;
};
