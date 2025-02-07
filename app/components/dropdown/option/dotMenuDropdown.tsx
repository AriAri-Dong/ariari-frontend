interface DotMenuDropDownProps {
  onClick: (label: string) => void;
}

const DotMenuDropDown = ({ onClick }: DotMenuDropDownProps) => {
  return (
    <div
      className="absolute top-full right-0 mt-2 z-10 
        flex flex-col items-center justify-center 
        border border-menuborder rounded-lg p-2.5 shadow-default bg-white"
    >
      <p
        className="text-subtext1 text-body1_m cursor-pointer"
        onClick={() => onClick("수정하기")}
      >
        수정하기
      </p>
      <div className="h-[1px] w-[108px] bg-gray-200 my-2.5" />
      <p
        className="text-subtext1 text-body1_m cursor-pointer"
        onClick={() => onClick("삭제하기")}
      >
        삭제하기
      </p>
    </div>
  );
};

export default DotMenuDropDown;
