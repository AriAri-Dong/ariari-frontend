import SubPullDown from "@/components/pulldown/subPullDown";
import { SORT_OPTIONS } from "@/data/pulldown";
import useResponsive from "@/hooks/useResponsive";

interface FilterSectionProps {
  sortType: string;
  setSortType: (value: string) => void;
  dataCount: number;
}

const FilterSection = ({
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
            총 {dataCount}개의 모집공고가 있어요.
          </p>
          <SubPullDown
            optionData={SORT_OPTIONS.slice(1)}
            selectedOption={sortType}
            handleOption={setSortType}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center">
            <p className="text-subtext2 text-mobile_body2_m md:text-h4">
              총 {dataCount}개의 모집공고가 있어요.
            </p>
            <SubPullDown
              optionData={SORT_OPTIONS.slice(1)}
              selectedOption={sortType}
              handleOption={setSortType}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
