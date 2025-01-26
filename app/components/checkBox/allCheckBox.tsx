import Image from "next/image";
import checkIcon from "@/images/icon/checkBox_checked.svg";
import uncheckIcon from "@/images/icon/checkBox_unchecked.svg";

interface RadioButtonProps {
  isChecked: boolean;
  label: string;
  onClick: () => void;
  className?: string;
}

const AllCheckBox = ({
  isChecked,
  label,
  onClick,
  className,
}: RadioButtonProps) => {
  return (
    <div
      className={`flex flex:col md:flex-row items-center gap-1 md:gap-2.5
        cursor-pointer py-1 px-[6px] md:p-0 ${className}`}
      onClick={onClick}
    >
      <Image
        src={isChecked ? checkIcon : uncheckIcon}
        alt={isChecked ? "Checked" : "Unchecked"}
        width={16}
        height={16}
        className="md:w-5 md:h-5"
      />
      <p className="text-subtext2 text-body3_m  md:text-body1_m">{label}</p>
    </div>
  );
};

export default AllCheckBox;
