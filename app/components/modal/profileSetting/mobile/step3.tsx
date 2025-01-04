import { useState } from "react";
import { useProfileContext } from "@/context/profileConetxt";
import IconBtn from "@/components/button/withIconBtn/IconBtn";

interface Step3Props {
  onResend: () => void;
  verificationFailed: boolean;
}

const Step3 = ({ onResend, verificationFailed }: Step3Props) => {
  const { profileData, updateProfileData } = useProfileContext();
  const [number, setNumber] = useState<string>("");
  const [email, setEmail] = useState<string>(profileData.email);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    updateProfileData({ email: value });
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNumber(value);
    updateProfileData({ verificationCode: value });
  };

  const handleResend = () => {
    onResend();
  };

  return (
    <>
      <p className={`text-subtext1 text-mobile_body2_r mt-4`}>
        재학 중인 학교가 있다면 학교를 등록하고 <br />
        교내 동아리를 아리아리에서 탐색해 보세요.
      </p>
      <div className="flex w-full justify-between items-center mt-10">
        <input
          className="w-full bg-searchbar text-mobile_body1_r text-subtext2 py-3 px-4 rounded-xl 
      focus:border-blue-500 focus:outline-none"
          placeholder="재학중인 학교의 이메일을 입력해 주세요."
          value={email}
          onChange={handleChange}
        />
        <IconBtn
          type={"reset"}
          size={"small"}
          title={""}
          onClick={handleResend}
        />
      </div>
      <div
        className="w-full py-2.5 bg-selectedoption_default 
      text-mobile_body2_r text-primary text-center rounded-lg mt-3"
      >
        해당 이메일로 인증번호를 발송하였습니다.
        <br />
        인증 메일이 도착하지 않았을시 재전송 버튼을 눌러주세요.
      </div>
      <div className="h-[1px] w-full bg-menuborder mb-8 mt-8" />
      <input
        className="w-full bg-searchbar text-mobile_body1_r text-subtext2 py-3 px-4 rounded-xl 
      focus:border-blue-500 focus:outline-none"
        placeholder="인증번호를 입력해주세요."
        value={number}
        onChange={handleNumberChange}
      />
      {verificationFailed && (
        <p className="w-full text-noti text-mobile_body4_r mt-2 pl-2">
          인증번호를 다시 확인해 주세요.
        </p>
      )}
    </>
  );
};

export default Step3;
