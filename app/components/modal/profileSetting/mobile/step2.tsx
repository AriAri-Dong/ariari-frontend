import { useProfileContext } from "@/context/profileConetxt";
import { useState } from "react";

const Step2 = () => {
  const { profileData, updateProfileData } = useProfileContext();

  const [email, setEmail] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    updateProfileData({ email: value });
  };

  return (
    <>
      <p className={`text-subtext1 text-mobile_body2_r mt-4`}>
        재학 중인 학교가 있다면 학교를 등록하고 <br />
        교내 동아리를 아리아리에서 탐색해 보세요.
      </p>
      <input
        className="w-full bg-searchbar text-mobile_body1_r text-subtext2 py-3 px-4 rounded-xl 
      focus:border-blue-500 focus:outline-none mt-10"
        placeholder="재학중인 학교의 이메일을 입력해주세요."
        value={email}
        onChange={handleChange}
      />
    </>
  );
};

export default Step2;
