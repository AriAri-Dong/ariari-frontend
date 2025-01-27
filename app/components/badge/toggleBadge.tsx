interface ToggleBadgeProps {
  onClick: () => void;
  text: string;
  isSelected: boolean;
  className?: string;
}

const ToggleBadge = ({
  onClick,
  text,
  isSelected,
  className,
}: ToggleBadgeProps) => {
  return (
    <div
      className={`flex items-center py-[6px] px-4 text-mobile_body2_m md:text-body1_m cursor-pointer ${
        isSelected
          ? "text-white bg-primary rounded-2xl"
          : "text-subtext2 bg-sub_bg rounded"
      } ${className}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default ToggleBadge;
