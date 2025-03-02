import { useState } from "react";
import SendBtn from "@/components/button/iconBtn/sendBtn";
import useResponsive from "@/hooks/useResponsive";

interface CommentInputProps {
  onSend: () => void;
}

const CommentInput = ({ onSend }: CommentInputProps) => {
  const [comment, setComment] = useState("");
  const isMdUp = useResponsive("md");

  return (
    <div className="w-full flex justify-between items-center p-1 pl-4 md:p-1.5 md:pl-[22px] bg-hover rounded-24 md:rounded-28 gap-3 md:gap-5">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="답변을 입력해주세요."
        className="w-full py-1.5 bg-searchbar text-subtext1 placeholder:text-subtext2 text-mobile_body1_r md:py-1.5 md:text-body1_r focus:outline-none placeholder:text-subtext1"
      />
      <div className="flex items-center gap-4">
        {isMdUp && (
          <p className="text-body3_m text-unselected">{comment.length}/1000</p>
        )}
        <SendBtn onClick={onSend} />
      </div>
    </div>
  );
};

export default CommentInput;
