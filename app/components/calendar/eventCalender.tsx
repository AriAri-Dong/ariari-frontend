import React, { useMemo } from "react";
import Image from "next/image";

import { addDays, format, isSameDay, parseISO } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ClubEventData } from "@/types/clubEvent";
import rightArrow from "@/images/icon/vector.svg";
import "../../../public/style/custom.css";

interface EventCalendarProps {
  eventList: ClubEventData[];
  onMonthChange?: (year: number, month: number) => void;
}
const EventCalendar = ({ eventList, onMonthChange }: EventCalendarProps) => {
  // 날짜별 일정 수 정리
  const eventMap = useMemo(() => {
    const map: Record<string, ClubEventData[]> = {};
    eventList.forEach((event) => {
      const dateKey = format(parseISO(event.eventDateTime), "yyyy-MM-dd");
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(event);
    });
    return map;
  }, [eventList]);

  return (
    <DatePicker
      inline
      calendarClassName="event-calendar pointer-events-none"
      disabledKeyboardNavigation
      renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
        <div className="flex justify-center mx-0 w-full pointer-events-auto">
          <div className="flex justify-between pt-4 mx-0 w-[230px]">
            <button onClick={decreaseMonth}>
              <Image
                src={rightArrow}
                alt={"이전"}
                className="w-5 h-5 rotate-180"
              />
            </button>
            <span className="text-body1_sb text-subtext1">
              {format(date, "yyyy.MM")}
            </span>
            <button onClick={increaseMonth}>
              <Image src={rightArrow} alt={"다음"} className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
      selected={null}
      dayClassName={(date) => {
        const key = format(date, "yyyy-MM-dd");
        const count = eventMap[key]?.length || 0;
        if (count === 1)
          return "relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full";
        if (count >= 2)
          return "relative after:absolute after:bottom-0 after:left-[calc(50%-5px)] after:w-1 after:h-1 after:bg-primary after:rounded-full before:absolute before:bottom-0 before:left-[calc(50%+3px)] before:w-1 before:h-1 before:bg-primary before:rounded-full";
        return "";
      }}
      onMonthChange={(date) => {
        if (onMonthChange) {
          onMonthChange(date.getFullYear(), date.getMonth() + 1);
        }
      }}
    />
  );
};

export default EventCalendar;
