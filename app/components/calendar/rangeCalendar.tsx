import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../public/style/custom.css";
import Image from "next/image";
import calendarIcon from "@/images/icon/calender.svg";

interface CustomCalendarProps {
  placeholder?: string;
  onDateChange?: (date: [Date | null, Date | null]) => void;
}

/**
 * 조회 기간을 선택하는 캘린더
 * @param placeholder
 * @param onDateChange 데이터 변경 핸들러
 * @returns
 */
const RangeCalendar = ({
  placeholder = "조회기간",
  onDateChange,
}: CustomCalendarProps) => {
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
    <div className="relative md:h-[44px]">
      <DatePicker
        selected={selectedRange[0]}
        onChange={handleDateChange}
        startDate={selectedRange[0]}
        endDate={selectedRange[1]}
        selectsRange={true}
        placeholderText={placeholder}
        dateFormat="yyyy.MM.dd"
        popperPlacement="bottom-center"
        customInput={
          <button
            className="flex items-center justify-between w-full bg-white rounded-30 
            border border-menuborder pl-3 pr-3 md:pr-4 py-[6px] md:pl-5 text-subtext1
            active:border-primary active:bg-white hover:bg-hover text-mobile_body2_m md:text-body1_m
            left-12 md:h-[44px] h-8"
          >
            <span className="text-nowrap text-mobile_body2_m md:text-body1_m">
              {formattedDate}
            </span>
            <Image
              src={calendarIcon}
              alt="캘린더"
              width={16}
              height={16}
              className="md:h-5 md:w-5 cursor-pointer ml-3 md:mr-[14px]"
            />
          </button>
        }
      />
    </div>
  );
};

export default RangeCalendar;
