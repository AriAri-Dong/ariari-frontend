import { SORT_OPTIONS } from "@/data/pulldown";

export const getLabelByValue = (value: string): string => {
  return SORT_OPTIONS.find((item) => item.value === value)?.label || "";
};

export const getValueByLabel = (label: string): string => {
  return SORT_OPTIONS.find((item) => item.label === label)?.value || "";
};
