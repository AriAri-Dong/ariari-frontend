import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../public/style/custom.css";
import Image from "next/image";
import calendarIcon from "@/images/icon/calender.svg";

interface CustomCalendarProps {
  placeholder?: string;
  onDateChange?: (date: Date | null) => void;
  initialDate?: Date | null;
}

/**
 * 단일 날짜를 선택하는 캘린더
 * @param placeholder
 * @param onDateChange 데이터 변경 핸들러
 * @param initialDate 초기 날짜
 * @returns
 */
const SingleDateCalendar = ({
  placeholder = "날짜 선택",
  initialDate,
  onDateChange,
}: CustomCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialDate ? initialDate : null
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(date);
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

  const formattedDate = selectedDate ? formatDate(selectedDate) : placeholder;

  return (
    <div className="relative md:h-[44px]">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        placeholderText={placeholder}
        dateFormat="yyyy.MM.dd"
        popperPlacement="bottom-end"
        customInput={
          <button
            className="flex items-center justify-between w-full bg-white rounded-30 
            border border-menuborder pl-3 pr-2 py-[6px] md:px-4 text-subtext1
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
              className="md:h-5 md:w-5 cursor-pointer ml-3 mb-1 md:mr-[14px]"
            />
          </button>
        }
      />
    </div>
  );
};

export default SingleDateCalendar;
