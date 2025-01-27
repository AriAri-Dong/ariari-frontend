import Image from "next/image";
import checkIcon from "@/images/icon/checkBox_checked.svg";
import uncheckIcon from "@/images/icon/checkBox_unchecked.svg";

interface RadioButtonProps {
  isChecked: boolean;
  label: string;
  onClick: () => void;
  className?: string;
}

/**
 *
 * @param isChecked 체크 여부
 * @param label 버튼 이름
 * @param onClick 클릭 핸들러
 * @param className 추가 스타일
 * @returns
 */
const CheckBox = ({
  isChecked,
  label,
  onClick,
  className,
}: RadioButtonProps) => {
  return (
    <div
      className={`flex items-start flex-col md:flex-row md:items-center gap-3
        md:gap-[19px] cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Image
        src={isChecked ? checkIcon : uncheckIcon}
        alt={isChecked ? "Checked" : "Unchecked"}
        width={16}
        height={16}
        className="md:w-5 md:h-5"
      />
      <p className="text-text1 text-mobile_body1_sb md:text-h4_sb">{label}</p>
    </div>
  );
};

export default CheckBox;
