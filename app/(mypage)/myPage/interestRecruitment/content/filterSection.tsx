import RadioBtn from "@/components/button/radioBtn";
import SubPullDown from "@/components/pulldown/subPullDown";
import { POPULARITY_SORT_TYPE } from "@/data/pulldown";
import useResponsive from "@/hooks/useResponsive";

interface FilterSectionProps {
  isDeadlineChecked: boolean;
  isRecruitmentChecked: boolean;
  toggleDeadlineCheck: () => void;
  toggleRecruitmentCheck: () => void;
  sortType: string;
  setSortType: (value: string) => void;
  dataCount: number;
}

const FilterSection = ({
  isDeadlineChecked,
  isRecruitmentChecked,
  toggleDeadlineCheck,
  toggleRecruitmentCheck,
  sortType,
  setSortType,
  dataCount,
}: FilterSectionProps) => {
  const isMdUp = useResponsive("md");

  return (
    <div
      className={`${
        isMdUp ? "flex-row justify-between items-center" : "flex-col gap-2"
      } flex w-full`}
    >
      {isMdUp ? (
        <div className="flex flex-row justify-between items-center w-full">
          <p className="text-subtext2 text-mobile_body2_m md:text-h4">
            총 {dataCount}개의 관심 모집공고가 있어요.
          </p>
          <div className="flex gap-4 items-center">
            <RadioBtn
              isChecked={isDeadlineChecked}
              label={"마감공고 제외"}
              onClick={toggleDeadlineCheck}
            />
            <RadioBtn
              isChecked={isRecruitmentChecked}
              label={"지원공고 제외"}
              onClick={toggleRecruitmentCheck}
            />
            <SubPullDown
              optionData={POPULARITY_SORT_TYPE.slice(1)}
              selectedOption={sortType}
              handleOption={setSortType}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center">
            <p className="text-subtext2 text-mobile_body2_m md:text-h4">
              총 {dataCount}개의 관심 모집공고가 있어요.
            </p>
            <SubPullDown
              optionData={POPULARITY_SORT_TYPE.slice(1)}
              selectedOption={sortType}
              handleOption={setSortType}
            />
          </div>
          <div className="flex gap-3">
            <RadioBtn
              isChecked={isDeadlineChecked}
              label={"마감공고 제외"}
              onClick={toggleDeadlineCheck}
            />
            <RadioBtn
              isChecked={isRecruitmentChecked}
              label={"지원공고 제외"}
              onClick={toggleRecruitmentCheck}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
