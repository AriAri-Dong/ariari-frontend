import axiosInstance from "../axiosInstance";

import {
  REPORT_CLUB,
  REPORT_MEMBER,
  REPORT_PASSREVIEW,
  REPORT_CLUB_ACTIVITY,
  REPORT_CLUB_ACTIVITY_COMMENT,
  REPORT_CLUB_QUESTION,
  REPORT_APPLY,
  REPORT_RECRUITMENT,
  REPORT_CLUB_REVIEW,
} from "../apiUrl";
import { ReportReq, ReportTargetType } from "@/types/report";
import { AxiosError } from "axios";

const reportUrlMap: Record<ReportTargetType, string> = {
  CLUB: REPORT_CLUB,
  MEMBER: REPORT_MEMBER,
  PASS_REVIEW: REPORT_PASSREVIEW,
  CLUB_ACTIVITY: REPORT_CLUB_ACTIVITY,
  CLUB_ACTIVITY_COMMENT: REPORT_CLUB_ACTIVITY_COMMENT,
  CLUB_QUESTION: REPORT_CLUB_QUESTION,
  APPLY: REPORT_APPLY,
  RECRUITMENT: REPORT_RECRUITMENT,
  CLUB_REVIEW: REPORT_CLUB_REVIEW,
};

export const reportItem = async ({
  reportTargetType,
  reportType,
  body,
  reportedEntityId,
}: ReportReq) => {
  try {
    const url = reportUrlMap[reportTargetType];

    const { data } = await axiosInstance.post(url, {
      reportType,
      body,
      reportedEntityId,
    });

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response && err.response.data.code === 409) {
        // 409 - 이미 처리된 신고
        throw new Error("이미 신고한 게시물입니다");
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};
