import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addClubEvent,
  deleteClubAttendance,
  registerClubAttendance,
  submitAttendanceByKey,
  updateClubEvent,
  deleteClubEvent,
} from "@/api/club/event/api";
import { QUERY_KEYS } from "@/constants/queryKeys";

type AttendancMutationProps = {
  clubId: string;
  onSuccess?: () => void;
  onError?: () => void;
};
// 동아리 일정 등록
export const useAddClubEventMutation = ({
  clubId,
  onSuccess,
  onError,
}: AttendancMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addClubEvent,
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.clubEventList(clubId),
      });
    },
    onError: (error) => {
      console.log("add event error", error);
      onError?.();
    },
  });
};

// 동아리 일정 수정
export const useUpdateClubEventMutation = ({
  clubId,
  onSuccess,
  onError,
}: AttendancMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateClubEvent,
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.clubEventList(clubId),
      });
    },
    onError: (error) => {
      console.log("update event error", error);
      onError?.();
    },
  });
};

// 일정 삭제
export const useDeleteClubEventMutation = ({
  clubId,
  onSuccess,
  onError,
}: AttendancMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClubEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.clubEventList(clubId),
      });

      onSuccess?.();
    },
    onError: (error) => {
      console.error("delete event error", error);
      onError?.();
    },
  });
};

// 출석 등록
export const useRegisterClubAttendanceMutation = ({
  clubId,
  onSuccess,
  onError,
}: AttendancMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerClubAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.clubEventList(clubId),
      });
      onSuccess?.();
    },
    onError: (error) => {
      console.error("register attendance error", error);
      onError?.();
    },
  });
};

// 출석 삭제

export const useDeleteClubAttendanceMutation = ({
  clubId,
  onSuccess,
  onError,
}: AttendancMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClubAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.clubEventList(clubId),
      });
      onSuccess?.();
    },
    onError: (error) => {
      console.error("delete attendance error", error);
      onError?.();
    },
  });
};

// 직접 출석 (링크)
export const useSubmitAttendanceByKeyMutation = ({
  clubId,
  onSuccess,
  onError,
}: AttendancMutationProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitAttendanceByKey,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clubEventList", clubId],
      });
      onSuccess?.();
    },
    onError: (error) => {
      console.error("submit attendance error", error);
      onError?.();
    },
  });
};
