import { useState } from "react";
import ResultBadge from "../badge/resultBadge";
import TransparentSmallBtn from "../button/basicBtn/transparentSmallBtn";
import CheckBox from "../checkBox/checkBox";
import Alert from "../alert/alert";
import { ApplyData } from "@/types/application";
import { APPLY_STATUS_MAP } from "@/constants/application";

interface ApplicationFormCardProps {
  applyInfo: ApplyData;
  isChecked: boolean;
  onCheck: (isChecked: boolean) => void;
  setOpenApplication: (id: string) => void;
}

const ApplicationFormCard = ({
  applyInfo,
  isChecked,
  onCheck,
  setOpenApplication,
}: ApplicationFormCardProps) => {
  const { id, memberData, name, applyStatusType, recruitmentTitle } = applyInfo;
  const applyStatus = APPLY_STATUS_MAP[applyStatusType];
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // const handleSubmitSuccess = () => {
  //   setAlertMessage("면접 안내를 전송했습니다.");
  // };

  const handleView = () => {
    setOpenApplication(id);
  };

  return (
    <div className="w-full bg-background py-[14px] px-4 md:py-[18px] md:px-6 rounded-lg">
      <div className="flex justify-between gap-3 md:gap-8">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between md:py-2">
            <div className="flex flex-col items-center gap-1 md:flex-row md:gap-3">
              <CheckBox
                isChecked={isChecked}
                label={memberData.nickname}
                onClick={() => onCheck(!isChecked)}
              />
              <p className="text-subtext2 self-start text-mobile_body2_m md:text-body3_m md:self-center">
                {name}
              </p>
            </div>
            <ResultBadge status={applyStatus} />
          </div>
          <div className="flex justify-between gap-3">
            <p className="text-mobile_body3_r md:text-body2_m text-subtext2 w-full bg-sub_bg p-2.5 rounded-lg md:py-2 md:px-3">
              {recruitmentTitle}
            </p>
            <TransparentSmallBtn
              title={"열람하기"}
              onClick={handleView}
              round={true}
              className="md:hidden block"
            />
          </div>
        </div>
        <TransparentSmallBtn
          title={"열람하기"}
          onClick={handleView}
          round={true}
          className="hidden md:block"
        />
      </div>

      {alertMessage && (
        <Alert text={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
    </div>
  );
};

export default ApplicationFormCard;
