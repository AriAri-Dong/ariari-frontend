"use client";

import { useState } from "react";
import NotiPopUp from "../notiPopUp";
import Step2 from "./step2";
interface InviteDialogProps {
  clubName: string | null;
  step: number;
  handleSubmit: (nickName: string) => void;
  onClose: () => void;
  handleNextStep: () => void;
}
const InviteDialog = ({
  clubName,
  step,
  handleNextStep,
  handleSubmit,
  onClose,
}: InviteDialogProps) => {
  const [nickname, setNickname] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <>
      {step == 1 && (
        <NotiPopUp
          modalType="button"
          icon={"invitation"}
          title="동아리 초대가 왔어요"
          description={`동아리에서 초대장을 보냈어요.\n초대를 수락하고 동아리에 가입할까요?`}
          firstButton={handleNextStep}
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
          description={`${clubName} 동아리 가입이 완료되었어요.\n새로운 회원이 되신 것을 환영해요!`}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default InviteDialog;
