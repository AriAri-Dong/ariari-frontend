interface ButtonProps {
  title: string;
  onClick: () => void;
}

/**
 *
 * @param title 버튼 이름
 * @param onClick 버튼 클릭 핸들러
 * @returns
 */
const SmallButton = ({ title, onClick }: ButtonProps) => {
  return (
    <button
      className="py-3 px-[22px] text-base rounded-lg bg-primary text-background hover:bg-primary_hover focus:bg-primary_pressed"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default SmallButton;
