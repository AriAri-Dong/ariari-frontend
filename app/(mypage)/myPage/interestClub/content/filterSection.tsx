import RadioBtn from "@/components/button/radioBtn";
import SubPullDown from "@/components/pulldown/subPullDown";
import { POPULARITY_SORT_TYPE } from "@/data/pulldown";
import useResponsive from "@/hooks/useResponsive";

interface FilterSectionProps {
  isChecked: boolean;
  toggleCheck: () => void;
  sortType: string;
  setSortType: (value: string) => void;
  totalCount: number;
}

const FilterSection = ({
  isChecked,
  toggleCheck,
  sortType,
  setSortType,
  totalCount,
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
            총 {totalCount}개의 관심 동아리가 있어요.
          </p>
          <div className="flex gap-4 items-center">
            <RadioBtn
              isChecked={isChecked}
              label={"모집중인 동아리"}
              onClick={toggleCheck}
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
              총 {totalCount}개의 관심 동아리가 있어요.
            </p>
            <SubPullDown
              optionData={POPULARITY_SORT_TYPE.slice(1)}
              selectedOption={sortType}
              handleOption={setSortType}
            />
          </div>
          <RadioBtn
            isChecked={isChecked}
            label={"모집중인 동아리"}
            onClick={toggleCheck}
          />
        </div>
      )}
    </div>
  );
};

export default FilterSection;
