interface ClubNoticeHeaderProps {
  role?: string;
}

const ClubNoticeHeader = ({ role }: ClubNoticeHeaderProps) => {
  return (
    <div
      className={`flex-row justify-between items-center w-full my-2.5 hidden md:flex
              py-2 pl-5 ${
                role === "ADMIN" ? "pr-[96px]" : "pr-[125px]"
              } rounded-lg bg-white70 text-subtext2 text-body1_m`}
    >
      <div className="flex gap-5">
        <p className="w-[76px] text-center">번호</p>
        <p>제목</p>
      </div>
      <p>게시일</p>
    </div>
  );
};

export default ClubNoticeHeader;
