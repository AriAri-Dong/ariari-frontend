import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type WithdrawalSection = {
  content: string;
};

export type WithdrawalButton = {
  label: string;
  onClick: (router: AppRouterInstance) => void;
};

export type WithdrawalInfoItem = {
  title: string;
  description: string;
  sections: string[];
  button?: WithdrawalButton;
};
