import Image from "next/image";
import SingleSelectOptions from "../pulldown/singleSelectOptions";
import vector from "@/images/icon/sub_pull_down.svg";
import { STATUS_OPTIONS } from "@/(club)/club/management/recruitment/applicationStatus/page";
import useResponsive from "@/hooks/useResponsive";
import CommonBottomSheet from "../bottomSheet/commonBottomSheet";

interface UpdateApplyStatusOptionsProps {
  isOptionsOpen: boolean;
  setIsOptionsOpen: (isOpen: boolean) => void;
  checkedApplications: string[];
  setAlertMessage?: (message: string) => void;
  setSelectedStatus: (status: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  optionsRef: React.RefObject<HTMLDivElement>;
}

// 지원상태 변경 옵션 open trigger(공통 버튼+dropdown/bottomSheet)
const UpdateApplyStatusOptions = ({
  isOptionsOpen,
  setIsOptionsOpen,
  checkedApplications,
  setAlertMessage,
  setSelectedStatus,
  setIsModalOpen,
  optionsRef,
}: UpdateApplyStatusOptionsProps) => {
  const isMdUp = useResponsive("md");

  // 지원 상태 변경 옵션 목록 중 메뉴 클릭
  const handleMenuClick = (label: string) => {
    setIsOptionsOpen(false);
    if (!checkedApplications.length) {
      setAlertMessage?.("선택된 지원서가 없습니다.");
      return;
    }
    setSelectedStatus(label);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="relative">
        <button
          className="relative flex items-center gap-2 cursor-pointer md:text-body1_m text-mobile_body2_m text-subtext2"
          onClick={() => {
            setIsOptionsOpen(!isOptionsOpen);
          }}
        >
          <p>지원상태 변경</p>
          <Image alt={"버튼"} src={vector} width={28} height={28} />
        </button>
        {isOptionsOpen &&
          (isMdUp ? (
            <div
              ref={optionsRef}
              className="absolute top-full mt-2 z-50 left-12"
            >
              <SingleSelectOptions
                selectedOption={""}
                optionData={STATUS_OPTIONS}
                size="medium"
                handleMenuClick={handleMenuClick}
              />
            </div>
          ) : (
            <CommonBottomSheet
              optionData={STATUS_OPTIONS}
              selectedOption={""}
              handleMenuClick={handleMenuClick}
              onClose={() => setIsOptionsOpen(false)}
            />
          ))}
      </div>
    </>
  );
};

export default UpdateApplyStatusOptions;
