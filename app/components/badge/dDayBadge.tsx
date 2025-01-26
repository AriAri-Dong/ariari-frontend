import { calculateRemainingDays } from "@/utils/dateFormatter";

interface DayBadgeProps {
  date: string;
}

const DdayBadge = ({ date }: DayBadgeProps) => {
  const remainingDaysText = calculateRemainingDays(date);
  const isExpired = remainingDaysText === "마감";

  return (
    <div
      className={`flex py-1 px-3 rounded-20 backdrop-blur-sm bg-black_50 ${
        isExpired ? "bg-opacity-50" : ""
      } md:py-[6px]`}
    >
      <p
        className={`text-mobile_body3_sb md:text-body1_sb ${
          isExpired ? "text-white" : "text-background"
        }`}
      >
        {remainingDaysText}
      </p>
    </div>
  );
};

export default DdayBadge;
