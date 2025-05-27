import Image from "next/image";
import close from "@/images/icon/close.svg";
import IconBtn from "../button/withIconBtn/IconBtn";

interface ClubMemberTokenProps {
  id: string;
  name: string;
  onDelete?: (id: string) => void;
}
const ClubMemberToken = ({ id, name, onDelete }: ClubMemberTokenProps) => {
  return (
    <div className="inline-flex items-center gap-1 px-2.5 py-[3.5px] rounded-[4px] bg-hover md:gap-1.5">
      <p className="text-subtext2 text-mobile_body2_m md:text-body2_m">
        {name}
      </p>
      {onDelete && (
        <button onClick={() => onDelete(id)}>
          <Image
            src={close}
            alt="삭제"
            width={14}
            height={14}
            className="md:w-3.5 md:h-3.5"
          />
        </button>
      )}
    </div>
  );
};

export default ClubMemberToken;
