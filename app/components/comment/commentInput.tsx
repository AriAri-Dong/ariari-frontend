import { useState } from "react";
import SendBtn from "@/components/button/iconBtn/sendBtn";
import useResponsive from "@/hooks/useResponsive";

interface CommentInputProps {
  onSend: (text: string) => void;
  placeholder?: string;
  initialText?: string;
}

const CommentInput = ({
  initialText = "",
  placeholder,
  onSend,
}: CommentInputProps) => {
  const [comment, setComment] = useState(initialText);
  const isMdUp = useResponsive("md");

  const handleSubmit = () => {
    const trimmed = comment.trim();
    if (trimmed.length === 0) return;

    onSend(trimmed);
    setComment("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-1 pl-4 md:p-1.5 md:pl-[22px] bg-hover rounded-24 md:rounded-28 gap-3 md:gap-5">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? "댓글을 입력해주세요."}
        className="w-full py-1.5 bg-searchbar text-subtext1 placeholder:text-subtext2 text-mobile_body1_r md:py-1.5 md:text-body1_r focus:outline-none placeholder:text-subtext1"
      />
      <div className="flex items-center gap-4">
        {isMdUp && (
          <p className="text-body3_m text-unselected">{comment.length}/1000</p>
        )}
        <SendBtn onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default CommentInput;
