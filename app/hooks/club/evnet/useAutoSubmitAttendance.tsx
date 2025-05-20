"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSubmitAttendanceByKeyMutation } from "@/hooks/club/evnet/useClubEventMutation";

// 자동 출석 등록 훅 (링크)
export const useAutoSubmitAttendance = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const clubId = params.get("clubId") ?? "";
  const attendanceKey = params.get("attendanceKey");

  const cleanupUrl = () => {
    console.log("cleaning");
    router.replace(`/club/event?clubId=${clubId}`);
  };

  const { mutate: submitAttendance } = useSubmitAttendanceByKeyMutation({
    clubId,
    onSuccess: () => {
      onSuccess();
      cleanupUrl();
    },
    onError: () => {
      onError();
      cleanupUrl();
    },
  });

  useEffect(() => {
    if (attendanceKey) {
      submitAttendance(attendanceKey);
    }
  }, [attendanceKey, submitAttendance]);
};
