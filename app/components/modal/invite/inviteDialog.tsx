"use client";

import { useState } from "react";
import NotiPopUp from "../notiPopUp";
import Step2 from "./step2";
import { useEnterClubMutation } from "@/hooks/club/my/useMyClubMutation";
import { EnterClubRes } from "@/types/club";
import Alert from "@/components/alert/alert";
interface InviteDialogProps {
  inviteCode: string;
  onClose: () => void;
}
const InviteDialog = ({ inviteCode, onClose }: InviteDialogProps) => {
  const [step, setStep] = useState<number>(1);
  const [nickname, setNickname] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [data, setData] = useState<EnterClubRes | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const { mutate: enterClub, isPending } = useEnterClubMutation({
    onSuccess: (data) => {
      setData(data);
      setStep(3);
    },
    onError: (error) => {
      setAlertMessage(error.message);
    },
  });

  const handleSubmit = () => {
    enterClub({ inviteKey: inviteCode, name: nickname });
  };

  return (
    <>
      {step == 1 && (
        <NotiPopUp
          modalType="button"
          icon={"invitation"}
          title="동아리 초대가 왔어요"
          description={`동아리에서 초대장을 보냈어요.\n초대를 수락하고 동아리에 가입할까요?`}
          firstButton={() => {
            setStep(2);
          }}
          firstButtonText={"수락하기"}
          secondButton={onClose}
          secondButtonText="취소하기"
          onClose={onClose}
        />
      )}
      {step == 2 && (
        <Step2
          onClose={onClose}
          onSubmit={handleSubmit}
          nickname={nickname}
          setNickname={setNickname}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
      {step == 3 && (
        <NotiPopUp
          modalType="x-button"
          icon="celebration"
          title="동아리 가입 완료"
          description={`${data?.clubName} 동아리 가입이 완료되었어요.\n새로운 회원이 되신 것을 환영해요!`}
          onClose={onClose}
        />
      )}
      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </>
  );
};

export default InviteDialog;
