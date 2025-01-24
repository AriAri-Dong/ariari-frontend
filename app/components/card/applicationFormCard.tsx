import ResultBadge from "../badge/resultBadge";
import TransparentSmallBtn from "../button/basicBtn/transparentSmallBtn";
import CheckBox from "../checkBox/checkBox";

interface ApplicationFormCardProps {
  clubName: string;
  serviceNickname: string;
  status: "합격" | "불합격" | "대기중" | "면접중";
  recruitmentTitle: string;
  isChecked: boolean;
  onClick: () => void;
  onCheck: (isChecked: boolean) => void;
}

const ApplicationFormCard = ({
  clubName,
  serviceNickname,
  status,
  recruitmentTitle,
  isChecked,
  onClick,
  onCheck,
}: ApplicationFormCardProps) => {
  return (
    <div className="w-full bg-background py-[14px] px-4 md:py-[18px] md:px-6 rounded-lg">
      <div className="flex justify-between gap-3 md:gap-8">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between md:py-2">
            <div className="flex flex-col items-center gap-1 md:flex-row md:gap-3">
              <CheckBox
                isChecked={isChecked}
                label={clubName}
                onClick={() => onCheck(!isChecked)}
              />
              <p className="text-subtext2 self-start text-mobile_body2_m md:text-body3_m md:self-center">
                {serviceNickname}
              </p>
            </div>
            <ResultBadge status={status} />
          </div>
          <div className="flex justify-between gap-3">
            <p className="text-mobile_body3_r md:text-body2_m text-subtext2 w-full bg-sub_bg p-2.5 rounded-lg md:py-2 md:px-3">
              {recruitmentTitle}
            </p>
            <TransparentSmallBtn
              title={"열람하기"}
              onClick={onClick}
              round={true}
              className="md:hidden block"
            />
          </div>
        </div>
        <TransparentSmallBtn
          title={"열람하기"}
          onClick={onClick}
          round={true}
          className="hidden md:block"
        />
      </div>
    </div>
  );
};

export default ApplicationFormCard;
