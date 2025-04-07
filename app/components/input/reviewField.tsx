import { PassReviewNoteData } from "@/types/review";
import CustomInput from "./customInput";

interface ReviewFieldProps {
  title: string;
  note: PassReviewNoteData;
  idx: number;
  className?: string;
}
const ReviewField = ({ title, note, idx, className }: ReviewFieldProps) => {
  return (
    <div className={className}>
      <p
        className={`md:text-h4 text-mobile_body1_sb text-text1 mb-4 md:mb-[18px]
        `}
      >
        {title}-{idx}
      </p>
      <div className="flex flex-col gap-[14px]">
        <CustomInput
          value={note.title}
          placeholder="작성된 문항"
          disable={true}
          onChange={() => {}}
        />
        <CustomInput
          value={note.body}
          placeholder="작성된 답변"
          disable={true}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default ReviewField;
