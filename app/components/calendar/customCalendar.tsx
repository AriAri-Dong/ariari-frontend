import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../public/style/custom.css"; // 위에서 수정한 CSS 적용
import Image from "next/image";
import calendarIcon from "@/images/icon/calender.svg";

interface CustomCalendarProps {
  label?: string;
  placeholder?: string;
  onDateChange?: (date: [Date | null, Date | null]) => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  label,
  placeholder = "날짜를 선택하세요.",
  onDateChange,
}) => {
  const [selectedRange, setSelectedRange] = useState<
    [Date | null, Date | null]
  >([null, null]);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setSelectedRange(dates);
    if (onDateChange) {
      onDateChange(dates);
    }
  };

  const formatDate = (date: Date | null): string => {
    return date
      ? date
          .toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\.$/, "")
      : "";
  };

  const formattedDate =
    selectedRange[0] && selectedRange[1]
      ? `${formatDate(selectedRange[0])} ~ ${formatDate(selectedRange[1])}`
      : placeholder;

  return (
    <div className="relative w-full max-w-[350px]">
      {label && (
        <p className="text-mobile_body2_m md:text-body1_m text-text1 mb-2">
          {label}
        </p>
      )}
      <DatePicker
        selected={selectedRange[0]}
        onChange={handleDateChange}
        startDate={selectedRange[0]}
        endDate={selectedRange[1]}
        selectsRange={true}
        placeholderText={placeholder}
        dateFormat="yyyy.MM.dd"
        popperPlacement="bottom-end"
        customInput={
          <button
            className="flex items-center justify-between w-full bg-white rounded-30 border
              border-menuborder px-4 py-2 shadow-md text-subtext1 focus:outline-none"
          >
            <span className="text-sm truncate">{formattedDate}</span>
            <Image
              src={calendarIcon}
              alt="캘린더"
              width={20}
              height={20}
              className="cursor-pointer ml-3"
            />
          </button>
        }
      />
    </div>
  );
};

export default CustomCalendar;
